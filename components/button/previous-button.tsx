import { FC, MouseEventHandler } from "react";
import Image from "next/image";
import { Button, ButtonProps } from "./button";
import previousBlackImgSrc from "./images/arrow-left-black.png";
import previousWhiteImgSrc from "./images/arrow-left-white.png";

export interface PreviousButtonProps {
  size: number | string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  title?: string;
  bgColor?: ButtonProps["bgColor"];
}

export const PreviousButton: FC<PreviousButtonProps> = ({
  size,
  className,
  onClick,
  title,
  bgColor = "white",
}) => (
  <Button size={size} className={className} onClick={onClick} bgColor={bgColor}>
    <Image
      src={bgColor === "black" ? previousWhiteImgSrc : previousBlackImgSrc}
      width={6}
      height={8}
      title={title}
      alt="previous"
    />
  </Button>
);
