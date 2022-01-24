import { FC } from "react";
import Image from "next/image";
import style from "./no-data.module.scss";
import umbrellaImgSrc from "./images/yellow-umbrella.png";

export const NoData: FC = () => (
  <div className={style.container}>
    <Image src={umbrellaImgSrc} width={54} height={54} alt="no-data" />
    <div className={style.textArea}>
      <span className={style.textHightlight}>Oop！</span>
      <span className={style.textDescription}>
        很抱歉，
        <br className={style.textLineBreak} />
        找不到符合此搜尋相關的內容。
      </span>
    </div>
  </div>
);
