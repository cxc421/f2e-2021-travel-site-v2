import Image from "next/image";
import { FC, useState } from "react";
import { NextButton } from "../button/next-button";
import { PreviousButton } from "../button/previous-button";
import style from "./card-detail.module.scss";
import gpsImgSrc from "./images/gps-lg.png";
import timeImgSrc from "./images/time.png";
import ticketImgSrc from "./images/ticket.png";
import telImgSrc from "./images/tel.png";
import { HorizontalWindow } from "../horizontal-window/horizontal-window";
import { CardImage } from "./card-image";

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
  const [imageShowIdx, setImageShowIdx] = useState(0);

  const toNextImg = () => {
    setImageShowIdx((idx) => (idx < images.length - 1 ? idx + 1 : idx));
  };

  const toPrevImg = () => {
    setImageShowIdx((idx) => (idx > 0 ? idx - 1 : idx));
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.imgArea}>
          <HorizontalWindow showWindowIdx={imageShowIdx}>
            {images.map((img, idx) => (
              <CardImage
                key={idx}
                src={img.url}
                layout="fill"
                alt={img.description}
                title={img.description}
                objectFit="cover"
              />
            ))}
          </HorizontalWindow>
        </div>
        {images.length > 1 && (
          <div className={style.buttonRow}>
            <PreviousButton size={32} onClick={toPrevImg} />
            <span>
              {imageShowIdx + 1} / {images.length}
            </span>
            <NextButton size={32} onClick={toNextImg} />
          </div>
        )}
        {websiteUrl ? (
          <a
            className={style.title}
            href={websiteUrl}
            target="_blank"
            rel="noreferrer"
          >
            {title}
          </a>
        ) : (
          <div className={style.title}>{title}</div>
        )}
        <div className={style.description}>{description}</div>
        <div className={style.infoArea}>
          {time && <CardDetailItem iconSrc={timeImgSrc}>{time}</CardDetailItem>}
          {price && (
            <CardDetailItem iconSrc={ticketImgSrc}>{price}</CardDetailItem>
          )}
          {address && (
            <CardDetailItem iconSrc={gpsImgSrc}>{address}</CardDetailItem>
          )}
          {phone && (
            <CardDetailItem iconSrc={telImgSrc}>{phone}</CardDetailItem>
          )}
        </div>
      </div>
      <div className={style.shadow} />
    </div>
  );
};
