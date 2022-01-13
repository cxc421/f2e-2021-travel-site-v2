import { FC } from "react";
import cn from "classnames";
import style from "./card-detail-button.module.scss";

export interface CardDetailButtonProps {
  className?: string;
  active?: boolean;
  rounded?: boolean;
}

export const CardDetailButton: FC<CardDetailButtonProps> = ({
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
