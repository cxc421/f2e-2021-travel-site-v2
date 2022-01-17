import { FC, TransitionEventHandler, useEffect, useState } from "react";
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

export interface ModalProps {
  show: boolean;
  onHide: () => void;
}

export const Modal: FC<ModalProps> = ({ children, show, onHide }) => {
  const modalRoot = useModalRoot();
  const [trasnClassName, setTransClassName] = useState<"show" | "hide">("hide");
  // const [trasnClassName, setTransClassName] = useState<"show" | "hide">("show");

  useEffect(() => {
    if (modalRoot && show) {
      const key = setTimeout(() => setTransClassName("show"), 1);
      return () => clearTimeout(key);
    }
  }, [modalRoot, show]);

  const toHide = () => setTransClassName("hide");

  const handleTransitionEnd: TransitionEventHandler<HTMLDivElement> = (e) => {
    if (trasnClassName === "hide" && e.propertyName === "opacity") {
      onHide();
    }
  };

  if (!modalRoot || !show) {
    return null;
  }
  // if (!modalRoot) return null;

  return createPortal(
    <div
      className={cn(style.container, style[trasnClassName])}
      onTransitionEnd={handleTransitionEnd}
      onClick={toHide}
    >
      <div className={style.content} onClick={(e) => e.stopPropagation()}>
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
    </div>,
    modalRoot
  );
};
