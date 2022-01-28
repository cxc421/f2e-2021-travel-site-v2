import Image from "next/image";
import { FC } from "react";
import cn from "classnames";
import style from "./card-horizontal.module.scss";
import gpsImgSrc from "./images/gps.png";
import { CardButton } from "./card-button";
import { CardImage } from "./card-image";
import { useIsTouchDevice } from "../../utils/useIsTouchDevice";

export interface CardHorizontalProps {
  img?: string;
  title?: string;
  description?: string;
  location?: string;
  onClick?: () => void;
  imageButtonText?: string;
}

export const CardHorizontal: FC<CardHorizontalProps> = ({
  img = "",
  title = "",
  description = "",
  location = "",
  onClick,
  imageButtonText,
}) => {
  const isTouch = useIsTouchDevice();

  return (
    <div className={style.wrapper}>
      <div
        className={cn(style.container, { [style.canHover]: !isTouch })}
        onClick={onClick}
      >
        <div className={style.imgArea}>
          <CardImage
            className={style.img}
            src={img || ""}
            layout="fill"
            alt={title}
            objectFit="cover"
          />
          <CardButton active rounded className={style.detailButton}>
            {imageButtonText}
          </CardButton>
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
            <CardButton className={style.detailButton} />
          </div>
        </div>
      </div>
      <div className={style.shadow} />
    </div>
  );
};
