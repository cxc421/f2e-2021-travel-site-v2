import { FC, MouseEventHandler } from "react";
import Image from "next/image";
import { Button, ButtonProps } from "./button";
import nextImgSrc from "./images/arrow-right-white.png";

export interface NextButtonProps {
  size: number | string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  title?: string;
  bgColor?: ButtonProps["bgColor"];
}

export const NextButton: FC<NextButtonProps> = ({
  size,
  className,
  onClick,
  title,
  bgColor = "black",
}) => (
  <Button size={size} className={className} onClick={onClick} bgColor={bgColor}>
    <Image src={nextImgSrc} width={6} height={8} title={title} alt="next" />
  </Button>
);
