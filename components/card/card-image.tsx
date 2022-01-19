import Image from "next/image";
import type { ImageProps } from "next/image";
import { FC, useEffect, useRef, useState } from "react";
import style from "./card-image.module.scss";
import noImgSrc from "./images/no-img.png";

export const CardImage: FC<ImageProps> = ({
  src,
  alt,
  onError,
  ...otherProps
}) => {
  const [hasError, setHasError] = useState(false);
  const imageSrcRef = useRef(src);

  useEffect(() => {
    if (imageSrcRef.current !== src) {
      setHasError(false);
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
    <Image
      src={src}
      alt={alt}
      {...otherProps}
      onError={(e) => {
        if (onError) {
          onError(e);
        }
        setHasError(true);
      }}
    />
  );
};
