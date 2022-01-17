import { FC, MouseEventHandler } from "react";
import cn from "classnames";
import style from "./button.module.scss";

export interface ButtonProps {
  size: number | string;
  bgColor: "red" | "yellow" | "green" | "black" | "white";
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

export const Button: FC<ButtonProps> = ({
  size,
  bgColor,
  className,
  children,
  onClick,
}) => {
  return (
    <div
      className={cn(style.container, style[bgColor], className)}
      style={{ width: size, height: size }}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
