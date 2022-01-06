import { FC, MouseEventHandler } from "react";
import Image from "next/image";
import { Button } from "./button";
import gpsImgSrc from "./images/gps.png";

export interface GpsButtonProps {
  size: number;
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
  title?: string;
}

export const GpsButton: FC<GpsButtonProps> = ({
  size,
  className,
  onClick,
  title,
}) => (
  <Button size={size} className={className} onClick={onClick} bgColor="yellow">
    <Image src={gpsImgSrc} width={16} height={22} title={title} alt="gps" />
  </Button>
);
