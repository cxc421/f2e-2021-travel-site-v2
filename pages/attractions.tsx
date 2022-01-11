import type { NextPage } from "next";
import sharedStyle from "../styles/shared.module.scss";
import { Header } from "../components/header/header";
import { Button } from "../components/button/button";
import bannerImgSrc from "../images/banner-good-weather.png";
import { Banner } from "../components/banner/banner";
import { GpsButton } from "../components/button/gps-button";
import { SearchButton } from "../components/button/search-button";
import { Searchbox } from "../components/searchbox/searchbox";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import {
  CategoryAttractions,
  CategoryAttractionsSelectbox,
} from "../components/selectbox/category-attractions-selectbox";
import { City, CitySelectbox } from "../components/selectbox/city-selectbox";
import { MainSection } from "../components/main-section/main-section";
import { MainTitle } from "../components/main-title/main-title";
import { Footer } from "../components/footer/footer";
import { HorizontalScroll } from "../components/horizontal-scroll/horizontal-scroll";
import { CityGallery } from "../components/city-gallery/city-gallery";
import { CardDetail } from "../components/card/card-detail";

/**
 * Attraction Context
 */
export interface AttractionContext {
  category: CategoryAttractions;
  setCategory: Dispatch<SetStateAction<CategoryAttractions>>;
  city: City;
  setCity: Dispatch<SetStateAction<City>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const AttractionCtx = createContext<AttractionContext | null>(null);

function useAttractionContext() {
  const value = useContext(AttractionCtx);
  if (!value) {
    throw new Error(
      `useAttractionContext() must be used within attraction page`
    );
  }
  return value;
}

/**
 * Attraction Mobile Filter
 */
const MobileFilter = () => {
  const { category, setCategory, city, setCity } = useAttractionContext();

  return (
    <div className={sharedStyle.mobileFilterContainer}>
      <CategoryAttractionsSelectbox
        value={category}
        onChange={setCategory}
        className={sharedStyle.mobileSelectbox}
      />
      <CitySelectbox
        value={city}
        onChange={setCity}
        className={sharedStyle.mobileSelectbox}
      />
      <Button bgColor="red" size={40} className={sharedStyle.sendButton}>
        送出
      </Button>
    </div>
  );
};

/**
 * Attraction Tablet & Desktop Filter
 */
const TabletFiler = () => {
  const { searchText, setSearchText, category, setCategory, city, setCity } =
    useAttractionContext();

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
        <CategoryAttractionsSelectbox
          value={category}
          onChange={setCategory}
          className={sharedStyle.tabletInput}
        />
        <CitySelectbox
          value={city}
          onChange={setCity}
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

/**
 *  Attractions Page
 */

const Attractions: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<CategoryAttractions>("");
  const [city, setCity] = useState<City>("");

  const context: AttractionContext = {
    city,
    setCity,
    category,
    setCategory,
    searchText,
    setSearchText,
  };

  return (
    <AttractionCtx.Provider value={context}>
      <Header mobileFilterContent={<MobileFilter />} />
      <Banner bgSrc={bannerImgSrc} filterContent={<TabletFiler />} />
      <MainSection>
        <MainTitle type="triangle">熱門城市</MainTitle>
        <HorizontalScroll>
          <CityGallery onSelectCity={setCity} />
        </HorizontalScroll>
        <MainTitle type="triangle">熱門活動</MainTitle>
        <div>
          <CardDetail
            img="https://www.taiwan.net.tw/att/event/38a0d7b6-432c-458a-9b29-f278fe7728ef.jpg"
            title="合歡山國際暗空公園-星空清境跨年活動"
            description="竹子湖海拔670公尺，位居大屯山、七星山與小觀音山間的谷地。曾是火山堰塞湖，湖水退去後留下肥沃的土壤，形成典型的農村聚落，近年結合在地花卉等產業與自然、人文資源發展休閒農業，成為臺北市第三個休閒農業區。「竹子湖」自民國58年（西元1969年）從日本引進白色海芋，每一株花的花期大約是8~10天，竹子湖受陽明山國家公園管制範圍的保護，擁有豐沛潔淨的山泉水源，經多年的努力推廣，目前竹子湖白色海芋年產量占全臺海芋產量百分之80~90，每年3~5月盛開時的浪漫氣氛，加上陽明山的自然風光，都吸引國內外眾多遊客前往竹子湖海芋田賞海芋、採海芋，品嚐在地美食佳餚。竹子湖海芋季迄今已辦理19年，同時思考多元發展，自民國101年（西元2012年）開始推動繡球花產業，民國106年（西元2017年）起辦理繡球花推廣活動，民國109年（西元2020年）首度將竹子湖海芋季與繡球花季串聯舉辦。活動以海芋季及繡球花季為主軸，辦理開幕式、花藝設計展、採海芋花體驗、假日免費生態人文導覽解說、平日付費生態農園體驗及花田有約等活動，近5年海芋季及繡球花季期間參與人次平均達50萬以上。"
            location="臺北市 北投區"
          />
        </div>
        <MainTitle type="rectangle">熱門餐飲</MainTitle>
      </MainSection>
      <Footer />
    </AttractionCtx.Provider>
  );
};

export default Attractions;
