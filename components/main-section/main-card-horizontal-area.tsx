import type { FC } from "react";
import style from "./main-card-horizontal-area.module.scss";

export const MainCardHorizontalArea: FC = ({ children }) => (
  <div className={style.container}>{children}</div>
);
