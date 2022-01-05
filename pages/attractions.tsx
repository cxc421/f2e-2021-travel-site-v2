import type { NextPage } from "next";
import sharedStyle from "../styles/shared.module.scss";
import { Header } from "../components/header/header";
import { Button } from "../components/button/button";
import { CustomSelectbox } from "../components/selectbox/custom-selectbox";
import cities from "../constants/cities";
import bannerImgSrc from "../images/banner-good-weather.png";
import { Banner } from "../components/banner/banner";

const MobileFilter = () => {
  const categoryOptions = [
    { value: "", text: "類別" },
    { value: "ScenicSpot", text: "景點" },
    { value: "Activity", text: "活動" },
  ];
  const cityOptions = [{ value: "", text: "所有縣市" }].concat(cities);

  return (
    <div className={sharedStyle.mobileFilterContainer}>
      <CustomSelectbox
        options={categoryOptions}
        defaultValue=""
        className={sharedStyle.mobileSelectbox}
      />
      <CustomSelectbox
        options={cityOptions}
        defaultValue=""
        className={sharedStyle.mobileSelectbox}
      />
      <Button bgColor="red" size={40} className={sharedStyle.sendButton}>
        送出
      </Button>
    </div>
  );
};

const Attractions: NextPage = () => {
  return (
    <>
      <Header mobileFilterContent={<MobileFilter />} />
      <Banner bgSrc={bannerImgSrc} />
      <h1>Attractions</h1>
    </>
  );
};

export default Attractions;
