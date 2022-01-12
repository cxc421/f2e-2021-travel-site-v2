import Image from "next/image";
import { FC } from "react";
import cn from "classnames";
import style from "./card-detail.module.scss";
import gpsImgSrc from "./images/gps.png";

export interface CardDetailProps {
  img?: string;
  title?: string;
  description?: string;
  location?: string;
}

export const CardDetail: FC<CardDetailProps> = ({
  img = "",
  title = "",
  description = "",
  location = "",
}) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.imgArea}>
          <Image
            className={style.img}
            src={img || ""}
            layout="fill"
            alt={title}
            objectFit="cover"
          />
          <div role="button" className={cn(style.detailButton, style.active)}>
            活動詳情
          </div>
        </div>
        <div className={style.content}>
          <h3 className={style.title}>{title}</h3>
          <p className={style.description}>{description}</p>
          <div className={style.bottom}>
            <div className={style.location}>
              <Image src={gpsImgSrc} width={16} height={20} alt="gps" />
              <span>{location}</span>
            </div>
            <div role="button" className={style.detailButton}>
              活動詳情
            </div>
          </div>
        </div>
      </div>
      <div className={style.shadow} />
    </div>
  );
};
