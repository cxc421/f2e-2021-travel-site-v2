import {
  FC,
  TransitionEventHandler,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import cn from "classnames";
import style from "./modal.module.scss";
import { CloseButton } from "../button/close-button";

function useModalRoot() {
  const [modalRoot, setModalRoot] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const modalRoot = document.createElement("div");
    modalRoot.id = `modal-root-${Date.now()}`;
    document.body.appendChild(modalRoot);
    setModalRoot(modalRoot);
    return () => {
      document.body.removeChild(modalRoot);
    };
  }, []);

  return modalRoot;
}

function useClickOutside(show: boolean, callback: () => void) {
  useEffect(() => {
    if (show) {
      document.body.addEventListener("click", callback);
      return () => document.body.removeEventListener("click", callback);
    }
  }, [show, callback]);
}

export interface ModalProps {
  show: boolean;
  onHide: () => void;
}

export const Modal: FC<ModalProps> = ({ children, show, onHide }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const modalRoot = useModalRoot();
  const [trasnClassName, setTransClassName] = useState<"show" | "hide">("hide");

  const toHide = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.removeAttribute("data-bg");
    }
    setTransClassName("hide");
  }, [containerRef]);

  const handleContainerTransitionEnd: TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (trasnClassName === "hide" && e.propertyName === "opacity") {
      onHide();
    }
  };

  const handleContentTransitionEnd: TransitionEventHandler<HTMLDivElement> = (
    e
  ) => {
    if (trasnClassName === "show" && e.propertyName === "transform") {
      if (containerRef.current) {
        containerRef.current.setAttribute("data-bg", "blur");
      }
    }
  };

  useClickOutside(show, toHide);

  useEffect(() => {
    if (modalRoot && show) {
      const key = setTimeout(() => setTransClassName("show"), 1);
      return () => clearTimeout(key);
    }
  }, [modalRoot, show]);

  if (!modalRoot || !show) {
    return null;
  }
  // if (!modalRoot) return null;

  return createPortal(
    <div
      ref={containerRef}
      className={cn(style.container, style[trasnClassName])}
      onTransitionEnd={handleContainerTransitionEnd}
      onClick={toHide}
    >
      <div className={style.contentWrapper}>
        <div
          className={style.content}
          onClick={(e) => e.stopPropagation()}
          onTransitionEnd={handleContentTransitionEnd}
        >
          {children}
          <div className={style.closeBtnWrapper}>
            <CloseButton
              className={style.closeBtn}
              size="100%"
              onClick={toHide}
              title="Close"
            />
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};
