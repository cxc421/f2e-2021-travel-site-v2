import Image from "next/image";
import { FC } from "react";
import cn from "classnames";
import gifSrc from "./images/loading.gif";
import style from "./loading.module.scss";

export interface LoadingProps {
  className?: string;
}

export const Loading: FC<LoadingProps> = ({ className }) => (
  <div className={cn(style.container, className)}>
    <div className={style.imgWrapper}>
      <Image
        className={className}
        src={gifSrc}
        width={394}
        height={300}
        alt="loading"
        priority
      />
    </div>
  </div>
);
