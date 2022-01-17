import { FC, MouseEventHandler } from "react";
import Image from "next/image";
import { Button } from "./button";
import previousImgSrc from "./images/arrow-left-black.png";

export interface PreviousButtonProps {
  size: number | string;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  title?: string;
}

export const PreviousButton: FC<PreviousButtonProps> = ({
  size,
  className,
  onClick,
  title,
}) => (
  <Button size={size} className={className} onClick={onClick} bgColor="white">
    <Image
      src={previousImgSrc}
      width={6}
      height={8}
      title={title}
      alt="previous"
    />
  </Button>
);
