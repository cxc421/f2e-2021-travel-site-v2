import { FC } from "react";
import Image from "next/image";
import style from "./card-vertical.module.scss";
import gpsSmImgSrc from "./images/gps-sm.png";
import { CardButton } from "./card-button";
import { CardImage } from "./card-image";

export interface CardVerticalProps {
  img?: string;
  title?: string;
  location?: string;
  imageButtonText?: string;
  onClick?: () => void;
}

export const CardVertical: FC<CardVerticalProps> = ({
  img = "",
  title = "",
  location = "",
  imageButtonText,
  onClick,
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container} onClick={onClick}>
        <div className={style.imgArea}>
          <CardImage
            src={img || ""}
            layout="fill"
            alt={title}
            objectFit="cover"
          />
          <CardButton active rounded className={style.detailButton}>
            {imageButtonText}
          </CardButton>
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.location}>
          <Image width={11} height={14} src={gpsSmImgSrc} alt="gps" />
          <span>{location}</span>
        </div>
      </div>
      <div className={style.shadow} />
    </div>
  );
};
