import Image from "next/image";
import type { ImageProps } from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import style from "./card-image.module.scss";
import noImgSrc from "./images/no-img-144.png";

function useIsMounted(): boolean {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);

  return isMounted;
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

export const CardImage: FC<ImageProps> = ({
  src,
  alt,
  onError,
  ...otherProps
}) => {
  const isMounted = useIsMounted();
  const [hasError, setHasError] = useState(
    typeof src !== "string" || src.length === 0
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
        <div className={style.errorImg}>
          <Image width={144} height={89} src={noImgSrc} alt="No Image" />
        </div>
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
