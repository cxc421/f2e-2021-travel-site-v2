import { FC } from "react";
import style from "./main-title.module.scss";

export interface MainTitleProps {
  type: "triangle" | "rectangle";
}

export const MainTitle: FC<MainTitleProps> = ({ type, children }) => {
  return (
    <h2 className={style.container}>
      <span className={style[type]} role="img" />
      <span className={style.text}>{children}</span>
    </h2>
  );
};
