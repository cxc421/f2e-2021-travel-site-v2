import { FC } from "react";
import style from "./main-card-vertical-area.module.scss";

export const MainCardVerticalArea: FC = ({ children }) => (
  <div className={style.container}>{children}</div>
);
