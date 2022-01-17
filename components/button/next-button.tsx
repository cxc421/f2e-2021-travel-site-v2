import { FC, MouseEventHandler } from "react";
import Image from "next/image";
import { Button } from "./button";
import nextImgSrc from "./images/arrow-right-white.png";

export interface NextButtonProps {
  size: number | string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  title?: string;
}

export const NextButton: FC<NextButtonProps> = ({
  size,
  className,
  onClick,
  title,
}) => (
  <Button size={size} className={className} onClick={onClick} bgColor="black">
    <Image src={nextImgSrc} width={6} height={8} title={title} alt="next" />
  </Button>
);
