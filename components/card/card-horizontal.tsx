import Image from "next/image";
import { FC, useState } from "react";
import style from "./card-horizontal.module.scss";
import gpsImgSrc from "./images/gps.png";
import noImgSrc from "./images/no-img.png";
import { CardDetailButton } from "./card-detail-button";

export interface CardHorizontalProps {
  img?: string;
  title?: string;
  description?: string;
  location?: string;
}

export const CardHorizontal: FC<CardHorizontalProps> = ({
  img = "",
  title = "",
  description = "",
  location = "",
}) => {
  const [loadImgFailed, setLoadImgFailed] = useState(false);

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
              className={style.img}
              src={img || ""}
              layout="fill"
              alt={title}
              objectFit="cover"
              onError={() => setLoadImgFailed(true)}
            />
          )}
          <CardDetailButton active rounded className={style.detailButton} />
        </div>
        <div className={style.content}>
          <div>
            <h3 className={style.title}>{title}</h3>
            <p className={style.description}>{description}</p>
          </div>
          <div className={style.bottom}>
            <div className={style.location}>
              <Image src={gpsImgSrc} width={16} height={20} alt="gps" />
              <span>{location}</span>
            </div>
            <CardDetailButton className={style.detailButton} />
          </div>
        </div>
      </div>
      <div className={style.shadow} />
    </div>
  );
};
