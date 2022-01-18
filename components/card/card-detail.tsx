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
  const [loadImgFailed, setLoadImgFailed] = useState(false);
  const [imageIdx, setImageIdx] = useState(() => (images.length > 0 ? 0 : -1));
  const validImgIdx = !loadImgFailed && imageIdx >= 0;
  const imgSrc = validImgIdx ? images[imageIdx].url : noImgSrc;
  const imgDesciprion = validImgIdx ? images[imageIdx].description : "No Image";

  const toNextImg = () => {
    const newImgIdx = imageIdx < images.length - 1 ? imageIdx + 1 : 0;
    setImageIdx(newImgIdx);
    setLoadImgFailed(false);
  };

  const toPrevImg = () => {
    const newImgIdx = imageIdx > 0 ? imageIdx - 1 : images.length - 1;
    setImageIdx(newImgIdx);
    setLoadImgFailed(false);
  };

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.imgArea}>
          <Image
            src={imgSrc}
            layout="fill"
            alt={imgDesciprion}
            title={imgDesciprion}
            objectFit="cover"
            onError={() => setLoadImgFailed(true)}
          />
        </div>
        {images.length > 1 && (
          <div className={style.buttonRow}>
            <PreviousButton size={32} onClick={toPrevImg} />
            <span>
              {imageIdx + 1} / {images.length}
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
