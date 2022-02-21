import type { FC } from "react";
import Image, { ImageLoader } from "next/image";
import style from "./banner.module.scss";
import sloganImgSrc from "./images/slogan.png";
import { UnsplashPicture } from "../../libs/picture-api/picture-types";

const toUnsplashUrl = (src: string, width: number, quality?: number) =>
  `${src}&auto=format&fit=max&crop=entropy&q=${quality || 100}&w=${width}`;

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return toUnsplashUrl(src, width, quality);
};
export interface Banner {
  bgSrc: StaticImageData;
  bgUrl: null | UnsplashPicture;
  filterContent?: JSX.Element;
}

export const Banner: FC<Banner> = ({ bgSrc, bgUrl, filterContent }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.bgImgWrapper}>
          {bgUrl ? (
            <Image
              className={style.bgImg}
              src={bgUrl.url}
              blurDataURL={toUnsplashUrl(bgUrl.url, 400, 80)}
              alt={bgUrl.alt}
              loader={imageLoader}
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              priority
            />
          ) : (
            <Image
              className={style.bgImg}
              src={bgSrc}
              alt="banner"
              layout="fill"
              objectFit="cover"
              placeholder="blur"
              priority
            />
          )}
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
