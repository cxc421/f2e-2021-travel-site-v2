import { FC, useEffect, useState } from "react";
import cn from "classnames";
import style from "./scroll-top-button.module.scss";

function useShowScrollToTopButton(scrollableContainer: HTMLElement | null) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (scrollableContainer) {
      const updateShow = () => {
        setShow(scrollableContainer.scrollTop > 0.5 * window.innerHeight);
      };
      scrollableContainer.addEventListener("scroll", updateShow);
      return () =>
        scrollableContainer.removeEventListener("scroll", updateShow);
    }
  }, [scrollableContainer]);

  return show;
}

export interface ScrollTopButtonProps {
  scrollableContainer: HTMLElement | null;
}

export const ScrollTopButton: FC<ScrollTopButtonProps> = ({
  scrollableContainer,
}) => {
  const show = useShowScrollToTopButton(scrollableContainer);

  const scrollToTop = () => {
    scrollableContainer?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <a
      className={cn(style.container, show ? style.show : style.hide)}
      href="#"
      role="button"
      aria-label="Scroll to top"
      onClick={scrollToTop}
    >
      <svg
        height="48"
        viewBox="0 0 48 48"
        width="48"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path className={style.bg} d="M0 0h48v48h-48z"></path>
        <path
          className={style.arrow}
          d="M14.83 30.83l9.17-9.17 9.17 9.17 2.83-2.83-12-12-12 12z"
        ></path>
      </svg>
    </a>
  );
};
