import Image from "next/image";
import { FC, MouseEventHandler, useState } from "react";
import { City } from "../selectbox/city-selectbox";
import style from "./city-gallery.module.scss";
import mapImgSrc from "./images/map_M.png";

type GalleryCityElement = {
  text: string;
  value: City;
  imgSrc: StaticImageData;
}[];

const galleryCityList: GalleryCityElement[] = [
  [{ text: "台北市", value: "Taipei", imgSrc: require("./images/taipei.png") }],
  [
    {
      text: "新北市",
      value: "NewTaipei",
      imgSrc: require("./images/new-taipei.png"),
    },
    {
      text: "桃園市",
      value: "Taoyuan",
      imgSrc: require("./images/taoyuan.png"),
    },
  ],
  [
    {
      text: "新竹市",
      value: "Hsinchu",
      imgSrc: require("./images/hsinchu.png"),
    },
  ],
  [
    {
      text: "台中",
      value: "Taichung",
      imgSrc: require("./images/taichung.png"),
    },
    {
      text: "南投",
      value: "NantouCounty",
      imgSrc: require("./images/nantou.png"),
    },
  ],
  [
    {
      text: "嘉義",
      value: "Chiayi",
      imgSrc: require("./images/chiayi.png"),
    },
  ],
  [
    {
      text: "台南",
      value: "Tainan",
      imgSrc: require("./images/tainan.png"),
    },
  ],
  [
    {
      text: "高雄",
      value: "Kaohsiung",
      imgSrc: require("./images/kaohsiung.png"),
    },
    {
      text: "屏東",
      value: "PingtungCounty",
      imgSrc: require("./images/pingtung.png"),
    },
  ],
  [
    {
      text: "宜蘭",
      value: "YilanCounty",
      imgSrc: require("./images/yilan.png"),
    },
  ],
  [
    {
      text: "花蓮",
      value: "HualienCounty",
      imgSrc: require("./images/hualien.png"),
    },
    {
      text: "台東",
      value: "TaitungCounty",
      imgSrc: require("./images/taitung.png"),
    },
  ],
  [
    {
      text: "連江",
      value: "LienchiangCounty",
      imgSrc: require("./images/tpkm.png"),
    },
  ],
];

export interface CityGalleryProps {
  onSelectCity: (city: City) => void;
}

type MouseDownPosition = {
  pageX: number;
  pageY: number;
};

export const CityGallery: FC<CityGalleryProps> = ({ onSelectCity }) => {
  const [mdPos, setMdPos] = useState<MouseDownPosition>({ pageX: 0, pageY: 0 });

  const handleMouseDown: MouseEventHandler<HTMLDivElement> = (e) =>
    setMdPos({ pageX: e.pageX, pageY: e.pageY });

  const handleMouseUp = (pageX: number, pageY: number, city: City) => {
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
