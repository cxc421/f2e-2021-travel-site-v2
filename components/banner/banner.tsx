import type { FC } from "react";
import Image from "next/image";
import style from "./banner.module.scss";
import sloganImgSrc from "./images/slogan.png";

export interface Banner {
  bgSrc: StaticImageData;
  filterContent?: JSX.Element;
}

export const Banner: FC<Banner> = ({ bgSrc, filterContent }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.bgImgWrapper}>
          <Image
            className={style.bgImg}
            src={bgSrc}
            alt="banner"
            layout="fill"
            objectFit="cover"
            placeholder="blur"
            priority
          />
        </div>
        <div className={style.sloganImgWrapper}>
          <Image
            src={sloganImgSrc}
            alt="Welcome to Taiwan"
            width={488}
            height={71}
          />
        </div>
        <h1 className={style.sloganText}>
          台北、台中、台南、屏東、宜蘭……遊遍台灣
        </h1>
        <div className={style.filterArea}>{filterContent}</div>
      </div>
      <div className={style.shadow} />
    </div>
  );
};
