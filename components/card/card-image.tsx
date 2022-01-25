import Image from "next/image";
import type { ImageProps } from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import cn from "classnames";
import style from "./card-image.module.scss";
import noImgSrc from "./images/no-img.png";

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
        <Image
          className={style.errorImg}
          width={67}
          height={44}
          src={noImgSrc}
          alt="No Image"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(style.successImgWrapper, {
        [style.isSuccess]: loadSuccess,
      })}
    >
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
    </div>
  );
};
