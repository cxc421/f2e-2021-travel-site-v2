import { FC } from "react";
import style from "./main-title.module.scss";

export interface MainTitleProps {
  type: "triangle" | "rectangle";
  id?: string;
}

export const MainTitle: FC<MainTitleProps> = ({ type, id, children }) => {
  return (
    <h2 className={style.container} id={id}>
      <span className={style[type]} role="img" />
      <span className={style.text}>{children}</span>
    </h2>
  );
};
