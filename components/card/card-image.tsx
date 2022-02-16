import Image from "next/image";
import type { ImageProps } from "next/image";
import { FC, useEffect, useRef, useState, RefObject } from "react";
import cn from "classnames";
import style from "./card-image.module.scss";
import noImgBigSrc from "./images/no-img-144x89.png";
import noImgSmallSrc from "./images/no-img-68x45.png";

const blackListUrls = ["http://210.69.151.212"];

function useIsMountedRef(): RefObject<boolean> {
  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return isMountedRef;
}

function useIsDelay(hasError: boolean) {
  const [isDelay, setIsDelay] = useState(true);
  useEffect(() => {
    if (!hasError) {
      const key = setTimeout(() => setIsDelay(false), 50);
      return () => clearTimeout(key);
    }
  }, [hasError]);
  return isDelay;
}

export interface CardImageProps extends ImageProps {
  errorImageType?: "small" | "big";
}

export const CardImage: FC<CardImageProps> = ({
  errorImageType = "small",
  src,
  alt,
  onError,
  ...otherProps
}) => {
  const isMounted = useIsMountedRef().current;
  const [hasError, setHasError] = useState(
    typeof src !== "string" ||
      src.length === 0 ||
      blackListUrls.some((url) => src.startsWith(url))
  );
  const isDelay = useIsDelay(hasError);
  const [loadSuccess, setLoadSuccess] = useState(false);
  const imageSrcRef = useRef(src);

  useEffect(() => {
    if (imageSrcRef.current !== src) {
      setHasError(false);
      setLoadSuccess(false);
      imageSrcRef.current = src;
    }
  }, [src]);

  if (hasError) {
    return (
      <div className={style.errorImgWrapper}>
        {errorImageType === "small" ? (
          <Image width={68} height={45} src={noImgSmallSrc} alt="No Image" />
        ) : (
          <>
            <div className={style.responsizeErrorImgBig}>
              <Image width={144} height={89} src={noImgBigSrc} alt="No Image" />
            </div>
            <div className={style.responsizeErrorImgSmall}>
              <Image
                width={68}
                height={45}
                src={noImgSmallSrc}
                alt="No Image"
              />
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(style.successImgWrapper, {
        [style.isSuccess]: loadSuccess,
      })}
    >
      {!isDelay && (
        <Image
          src={src}
          alt={alt}
          {...otherProps}
          onError={(e) => {
            if (!isMounted) return;

            if (onError) {
              onError(e);
            }
            setHasError(true);
          }}
          onLoadingComplete={() => {
            if (!isMounted) return;
            setLoadSuccess(true);
          }}
        />
      )}
    </div>
  );
};
