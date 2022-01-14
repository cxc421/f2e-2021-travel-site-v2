import { FC } from "react";
import cn from "classnames";
import style from "./card-button.module.scss";

export interface CardButtonProps {
  className?: string;
  active?: boolean;
  rounded?: boolean;
}

export const CardButton: FC<CardButtonProps> = ({
  children,
  className,
  active,
  rounded,
}) => (
  <div
    role="button"
    className={cn(
      style.container,
      { [style.active]: active },
      { [style.rounded]: rounded },
      className
    )}
  >
    {children || "活動詳情"}
  </div>
);
