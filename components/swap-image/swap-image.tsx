import type { FC } from "react";

import { useState } from "react";
import Image, { ImageLoader } from "next/image";
import cn from "classnames";
import { Blurhash } from "react-blurhash";
import { useIsMountRef } from "../../utils/useIsMountRef";
import style from "./swap-image.module.scss";

export interface SwapImageProps {
  src: string;
  alt: string;
  hash: string | null;
  loader?: ImageLoader;
}

export const SwapImage: FC<SwapImageProps> = ({ src, alt, hash, loader }) => {
  const [imgLoadComplete, setImgLoadComplete] = useState(false);
  const isMountRef = useIsMountRef();

  const handleImageLoadingComplete = () => {
    if (isMountRef.current) {
      setImgLoadComplete(true);
    }
  };

  return (
    <div className={style.container}>
      {hash && (
        <div>
          <Blurhash hash={hash} width="100%" height="100%" />
        </div>
      )}
      <div>
        <Image
          className={cn(style.transitionImage, {
            [style.show]: imgLoadComplete,
          })}
          onLoadingComplete={handleImageLoadingComplete}
          src={src}
          alt={alt}
          loader={loader}
          layout="fill"
          objectFit="cover"
          priority
        />
      </div>
    </div>
  );
};
