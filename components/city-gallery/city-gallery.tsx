import { FC } from "react";
import { City } from "../selectbox/city-selectbox";
import style from "./city-gallery.module.scss";

type GalleryCityElement = {
  text: string;
  value: City;
  imgSrc: StaticImageData;
}[];

const galleryCityList: GalleryCityElement[] = [
  [{ text: "台北市", value: "Taipei", imgSrc: require("./images/taipei.png") }],
  // [
  //   {
  //     text: "新北市",
  //     value: "NewTaipei",
  //     imgSrc: require("./images/new-taipei.png"),
  //   },
  //   {
  //     text: "桃園市",
  //     value: "Taoyuan",
  //     imgSrc: require("./images/taoyuan.png"),
  //   },
  // ],
  // [
  //   {
  //     text: "新竹市",
  //     value: "Hsinchu",
  //     imgSrc: require("./images/hsinchu.png"),
  //   },
  // ],
];

export interface CityGalleryProps {
  onSelectCity?: (city: City) => void;
}

export const CityGallery: FC<CityGalleryProps> = ({ onSelectCity }) => (
  <div className={style.container}>
    {galleryCityList.map((galleryCityElement, idx) => {
      return (
        <div key={idx} className={style.cardWrapper}>
          {galleryCityElement.map((galleryCity) => (
            <div key={galleryCity.value} className={style.card}>
              <div className={style.cardImg}></div>
            </div>
          ))}
        </div>
      );
    })}
  </div>
);
