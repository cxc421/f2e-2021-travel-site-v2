import { FC, MouseEventHandler } from "react";
import Image from "next/image";
import { Button } from "./button";
import closeImgSrc from "./images/close.png";

export interface CloseButtonProps {
  size: number;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  title?: string;
}

export const CloseButton: FC<CloseButtonProps> = ({
  size,
  className,
  onClick,
  title,
}) => (
  <Button size={size} className={className} onClick={onClick} bgColor="red">
    <Image src={closeImgSrc} width={15} height={15} title={title} alt="close" />
  </Button>
);
