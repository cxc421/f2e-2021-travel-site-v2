import type { NextPage } from "next";
import sharedStyle from "../styles/shared.module.scss";
import { Header } from "../components/header/header";
import { Button } from "../components/button/button";
import { CustomSelectbox } from "../components/selectbox/custom-selectbox";
import cities from "../constants/cities";
import bannerImgSrc from "../images/banner-good-weather.png";
import { Banner } from "../components/banner/banner";
import { GpsButton } from "../components/button/gps-button";
import { SearchButton } from "../components/button/search-button";
import { Searchbox } from "../components/searchbox/searchbox";
import { useState } from "react";

// Filter Options Definition
const categoryOptions = [
  { value: "", text: "類別" },
  { value: "ScenicSpot", text: "景點" },
  { value: "Activity", text: "活動" },
];
const cityOptions = [{ value: "", text: "所有縣市" }].concat(cities);

const MobileFilter = () => {
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

const TabletFiler = () => {
  const [searchText, setSearchText] = useState("");

  return (
    <div className={sharedStyle.tabletFilterContainer}>
      <div>
        <Searchbox
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={sharedStyle.tabletInput}
        />
        <GpsButton
          size={40}
          title="Get current location"
          className={sharedStyle.tabletButton}
        />
      </div>
      <div>
        <CustomSelectbox
          options={categoryOptions}
          defaultValue=""
          className={sharedStyle.tabletInput}
        />
        <CustomSelectbox
          options={cityOptions}
          defaultValue=""
          className={sharedStyle.tabletInput}
        />
        <SearchButton
          size={40}
          title="Search"
          className={sharedStyle.tabletButton}
        />
      </div>
    </div>
  );
};

const Attractions: NextPage = () => {
  return (
    <>
      <Header mobileFilterContent={<MobileFilter />} />
      <Banner bgSrc={bannerImgSrc} filterContent={<TabletFiler />} />
      <h1>Attractions</h1>
    </>
  );
};

export default Attractions;
