import { FC } from "react";
import cn from "classnames";
import style from "./result-scroll-top-button.module.scss";

export interface ScrollToTopButtonProps {
  onClick: () => void;
  show: boolean;
}

export const ScrollToTopButton: FC<ScrollToTopButtonProps> = ({
  onClick,
  show,
}) => (
  <a
    className={cn(style.container, show ? style.show : style.hide)}
    href="#"
    role="button"
    aria-label="Scroll to top"
    onClick={onClick}
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
