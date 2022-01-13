import { FC, useState } from "react";
import Image from "next/image";
import style from "./card-vertical.module.scss";
import noImgSrc from "./images/no-img.png";
import gpsSmImgSrc from "./images/gps-sm.png";
import { CardDetailButton } from "./card-detail-button";

export interface CardVerticalProps {
  img?: string;
  title?: string;
  location?: string;
}

export const CardVertical: FC<CardVerticalProps> = ({
  img = "",
  title = "",
  location = "",
}) => {
  const [loadImgFailed, setLoadImgFailed] = useState(img.length === 0);

  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.imgArea}>
          {loadImgFailed ? (
            <div className={style.errorImgWrapper}>
              <Image
                className={style.errorImg}
                width={67}
                height={44}
                src={noImgSrc}
                alt="No Image"
              />
            </div>
          ) : (
            <Image
              src={img || ""}
              layout="fill"
              alt={title}
              objectFit="cover"
              onError={() => setLoadImgFailed(true)}
            />
          )}
          <CardDetailButton active rounded className={style.detailButton} />
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
