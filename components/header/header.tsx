import type { FC } from "react";
import style from "./header.module.scss";

export interface HeaderProps {}

export const Header: FC<HeaderProps> = () => {
  return <div className={style.container}></div>;
};
