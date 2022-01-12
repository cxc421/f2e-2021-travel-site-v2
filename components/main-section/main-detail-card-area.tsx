import type { FC } from "react";
import style from "./main-detail-card-area.module.scss";

export const MainDetailCarrdArea: FC = ({ children }) => (
  <div className={style.container}>{children}</div>
);
