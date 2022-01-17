import Image from "next/image";
import { FC, useState } from "react";
import { NextButton } from "../button/next-button";
import { PreviousButton } from "../button/previous-button";
import style from "./card-detail.module.scss";
import noImgSrc from "./images/no-img.png";
import gpsImgSrc from "./images/gps-lg.png";
import timeImgSrc from "./images/time.png";
import ticketImgSrc from "./images/ticket.png";
import telImgSrc from "./images/tel.png";

interface CardDetailItemProps {
  iconSrc: StaticImageData;
  iconWidth?: number;
  iconHeight?: number;
}

const CardDetailItem: FC<CardDetailItemProps> = ({
  iconSrc,
  iconHeight = 24,
  iconWidth = 24,
  children,
}) => (
  <div className={style.item}>
    <Image src={iconSrc} width={iconWidth} height={iconHeight} alt="icon" />
    <span className={style.itemText}>{children}</span>
  </div>
);

export interface CardDetailProps {
  title: string;
  images: { url: string; description: string }[];
  description: string;
  time?: string;
  price?: string;
  address?: string;
  phone?: string;
  websiteUrl?: string;
}

export const CardDetail: FC<CardDetailProps> = ({
  title,
  images,
  description,
  time,
  price,
  address,
  phone,
  websiteUrl,
}) => {
  const [imageIdx, setImageIdx] = useState(() => (images.length > 0 ? 0 : -1));
  const imgSrc = imageIdx >= 0 ? images[imageIdx].url : noImgSrc;
  const imgDesciprion =
    imageIdx >= 0 ? images[imageIdx].description : "No Image";

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.imgArea}>
          <Image
            src={imgSrc}
            layout="fill"
            alt={imgDesciprion}
            objectFit="cover"
          />
        </div>
        <div className={style.buttonRow}>
          <PreviousButton size={32} />
          <NextButton size={32} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.description}>{description}</div>
        <div className={style.infoArea}>
          <CardDetailItem iconSrc={timeImgSrc}>{time}</CardDetailItem>
          <CardDetailItem iconSrc={ticketImgSrc}>{price}</CardDetailItem>
          <CardDetailItem iconSrc={gpsImgSrc}>{address}</CardDetailItem>
          <CardDetailItem iconSrc={telImgSrc}>{phone}</CardDetailItem>
        </div>
      </div>
      <div className={style.shadow} />
    </div>
  );
};
