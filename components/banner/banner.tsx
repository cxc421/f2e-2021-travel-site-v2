import type { FC } from "react";
import type { UnsplashPicture } from "../../libs/picture-api/picture-types";

import Image, { ImageLoader } from "next/image";
import { SwapImage } from "../swap-image/swap-image";
import style from "./banner.module.scss";
import sloganImgSrc from "./images/slogan.png";

const toUnsplashUrl = (src: string, width: number, quality?: number) =>
  `${src}&auto=format&fit=max&crop=entropy&q=${quality || 60}&w=${width}`;

const imageLoader: ImageLoader = ({ src, width, quality }) => {
  return toUnsplashUrl(src, width, quality);
};
export interface Banner {
  bgSrc?: StaticImageData;
  bgUrl: null | UnsplashPicture;
  filterContent?: JSX.Element;
}

export const Banner: FC<Banner> = ({ bgSrc, bgUrl, filterContent }) => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.bgImgWrapper}>
          {bgUrl && (
            <SwapImage
              src={bgUrl.url}
              alt={bgUrl.alt}
              hash={bgUrl.hash}
              loader={imageLoader}
            />
          )}
          {bgSrc && (
            <Image
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
