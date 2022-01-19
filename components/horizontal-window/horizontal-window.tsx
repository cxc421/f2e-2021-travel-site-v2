import { Children, FC } from "react";
import style from "./horizontal-window.module.scss";

export interface HorizontalWindowProps {
  showWindowIdx: number;
}

export const HorizontalWindow: FC<HorizontalWindowProps> = ({
  children,
  showWindowIdx,
}) => (
  <div className={style.container}>
    <div
      className={style.windowSlider}
      style={{ transform: `translateX(-${100 * showWindowIdx}%)` }}
    >
      {Children.map(children, (child) => (
        <div className={style.window}>{child}</div>
      ))}
    </div>
  </div>
);
