import Image from "next/image";
import { FC } from "react";
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
  const descriptionLimit = 96;
  const displayDescription =
    description.length > descriptionLimit
      ? description.slice(0, descriptionLimit - 3) + "..."
      : description;

  return (
    <div className={style.container}>
      <div className={style.imgArea}>
        <Image src={img || ""} layout="fill" alt={title} objectFit="cover" />
      </div>
      <div className={style.content}>
        <h3 className={style.title}>{title}</h3>
        <p className={style.description}>{displayDescription}</p>
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
  );
};
