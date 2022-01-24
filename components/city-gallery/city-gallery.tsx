import Image from "next/image";
import { FC, MouseEventHandler, useState } from "react";
import { CityValue } from "../selectbox/city-selectbox";
import style from "./city-gallery.module.scss";
import mapImgSrc from "./images/map_M.png";

type GalleryCityElement = {
  text: string;
  value: CityValue;
  imgSrc: StaticImageData;
}[];

const galleryCityList: GalleryCityElement[] = [
  [{ text: "台北市", value: "臺北市", imgSrc: require("./images/taipei.png") }],
  [
    {
      text: "新北市",
      value: "新北市",
      imgSrc: require("./images/new-taipei.png"),
    },
    {
      text: "桃園市",
      value: "桃園市",
      imgSrc: require("./images/taoyuan.png"),
    },
  ],
  [
    {
      text: "新竹市",
      value: "新竹市",
      imgSrc: require("./images/hsinchu.png"),
    },
  ],
  [
    {
      text: "台中",
      value: "臺中市",
      imgSrc: require("./images/taichung.png"),
    },
    {
      text: "南投",
      value: "南投縣",
      imgSrc: require("./images/nantou.png"),
    },
  ],
  [
    {
      text: "嘉義",
      value: "嘉義市",
      imgSrc: require("./images/chiayi.png"),
    },
  ],
  [
    {
      text: "台南",
      value: "臺南市",
      imgSrc: require("./images/tainan.png"),
    },
  ],
  [
    {
      text: "高雄",
      value: "高雄市",
      imgSrc: require("./images/kaohsiung.png"),
    },
    {
      text: "屏東",
      value: "屏東縣",
      imgSrc: require("./images/pingtung.png"),
    },
  ],
  [
    {
      text: "宜蘭",
      value: "宜蘭縣",
      imgSrc: require("./images/yilan.png"),
    },
  ],
  [
    {
      text: "花蓮",
      value: "花蓮縣",
      imgSrc: require("./images/hualien.png"),
    },
    {
      text: "台東",
      value: "臺東縣",
      imgSrc: require("./images/taitung.png"),
    },
  ],
  [
    {
      text: "連江",
      value: "連江縣",
      imgSrc: require("./images/tpkm.png"),
    },
  ],
];

export interface CityGalleryProps {
  onSelectCity: (city: CityValue) => void;
}

type MouseDownPosition = {
  pageX: number;
  pageY: number;
};

export const CityGallery: FC<CityGalleryProps> = ({ onSelectCity }) => {
  const [mdPos, setMdPos] = useState<MouseDownPosition>({ pageX: 0, pageY: 0 });

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) =>
    setMdPos({ pageX: e.pageX, pageY: e.pageY });

  const handleMouseUp = (pageX: number, pageY: number, city: CityValue) => {
    if (pageX === mdPos.pageX && pageY === mdPos.pageY) {
      onSelectCity(city);
    }
  };

  return (
    <div className={style.container}>
      {galleryCityList.map((galleryCityElement, idx) => {
        return (
          <div key={idx} className={style.cardWrapper}>
            {galleryCityElement.map((galleryCity) => (
              <div
                key={galleryCity.value}
                className={style.card}
                onMouseDown={handleMouseDown}
                onMouseUp={(e) =>
                  handleMouseUp(e.pageX, e.pageY, galleryCity.value)
                }
              >
                <div className={style.cardImgWrapper}>
                  <Image
                    className={style.cardImg}
                    src={galleryCity.imgSrc}
                    layout="fill"
                    placeholder="blur"
                    objectFit="cover"
                    alt={galleryCity.text}
                  />
                  <div className={style.cardContent}>
                    <Image src={mapImgSrc} width={24} height={24} alt="map" />
                    <span>{galleryCity.text}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};
