import { FC } from "react";
import Image from "next/image";
import cn from "classnames";
import style from "./card-vertical.module.scss";
import gpsSmImgSrc from "./images/gps-sm.png";
import { CardButton } from "./card-button";
import { CardImage } from "./card-image";
import { useIsTouchDevice } from "../../utils/useIsTouchDevice";

interface DistanceTagProps {
  disKm?: number;
}

const DistanceTag: FC<DistanceTagProps> = ({ disKm }) => {
  if (!disKm) return null;

  let valueText: number;
  let valueUnit: string;

  if (disKm < 1) {
    valueText = Number((disKm * 1000).toPrecision(2));
    valueUnit = "m";
  } else {
    valueText = Number(disKm.toPrecision(2));
    valueUnit = "km";
  }

  return <div className={style.distanceTag}>{`${valueText} ${valueUnit}`}</div>;
};

export interface CardVerticalProps {
  img?: string;
  title?: string;
  location?: string;
  imageButtonText?: string;
  disKm?: number;
  onClick?: () => void;
}

export const CardVertical: FC<CardVerticalProps> = ({
  img = "",
  title = "",
  location = "",
  disKm,
  imageButtonText,
  onClick,
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
        <div className={style.bottom}>
          <div className={style.location}>
            <Image width={11} height={14} src={gpsSmImgSrc} alt="gps" />
            <span>{location}</span>
          </div>
          <DistanceTag disKm={disKm} />
        </div>
      </div>
      <div className={style.shadow} />
    </div>
  );
};
