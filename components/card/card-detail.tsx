import Image from "next/image";
import { FC, useState } from "react";
import style from "./card-detail.module.scss";
import noImgSrc from "./images/no-img.png";

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
    <div className={style.container}>
      <div className={style.imgArea}>
        <Image
          src={imgSrc}
          layout="fill"
          alt={imgDesciprion}
          objectFit="cover"
        />
      </div>
      <div className={style.buttonRow}></div>
      <div className={style.title}></div>
      <div className={style.description}></div>
      <div className={style.infoArea}></div>
    </div>
  );
};
