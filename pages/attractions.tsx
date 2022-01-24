import type { NextPage, GetStaticProps } from "next";
import sharedStyle from "../styles/shared.module.scss";
import { Header } from "../components/header/header";
import { Button } from "../components/button/button";
import bannerImgSrc from "../images/banner-good-weather.png";
import { Banner } from "../components/banner/banner";
import { GpsButton } from "../components/button/gps-button";
import { SearchButton } from "../components/button/search-button";
import { Searchbox } from "../components/searchbox/searchbox";
import {
  FC,
  createContext,
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import {
  CategoryAttractions,
  CategoryAttractionsSelectbox,
} from "../components/selectbox/category-attractions-selectbox";
import {
  CityValue,
  cityOptions,
  CitySelectbox,
} from "../components/selectbox/city-selectbox";
import { MainSection } from "../components/main-section/main-section";
import { MainTitle } from "../components/main-section/main-title";
import { Footer } from "../components/footer/footer";
import { HorizontalScroll } from "../components/horizontal-scroll/horizontal-scroll";
import { CityGallery } from "../components/city-gallery/city-gallery";
import { CardHorizontal } from "../components/card/card-horizontal";
import { MainCardHorizontalArea } from "../components/main-section/main-card-horizontal-area";
import { MainCardVerticalArea } from "../components/main-section/main-card-vertical-area";
import { CardVertical } from "../components/card/card-vertical";
import { Coordinate, IntegratedData, TdxApiType } from "../libs/types";
import { Modal } from "../components/modal/modal";
import { CardDetail, CardDetailProps } from "../components/card/card-detail";
import { cardDetailTestData } from "../components/card/card-detail-test-data";
import useLogOnce from "../utils/useLogOnce";
import { Loading } from "../components/loading/loading";
import { MainPageButtonsArea } from "../components/main-section/main-page-button-area";
import { useScrollToId } from "../utils/useScrollToId";
import { getIntegratedData } from "../libs/integrated-api/integrated-api";

/**
 *  Server Side Code
 */
interface AttractionsPageProps {
  defaultActivities: IntegratedData[];
  defaultRestaurants: IntegratedData[];
}

export const getStaticProps: GetStaticProps<
  AttractionsPageProps
> = async () => {
  // Default Activities
  const defaultActivities = await getIntegratedData({
    types: ["activity"],
    number: 4,
    smallestEndDate: new Date().toUTCString(),
    needPicture: true,
    needValidLocation: true,
  });

  // Default Restaurant
  const defaultRestaurants = await getIntegratedData({
    types: ["restaurant"],
    number: 10,
    needPicture: true,
    searchTerm: "好吃 美味 用餐",
    searchProperty: "description",
    orderBy: "shuffle",
  });

  return {
    props: {
      defaultActivities,
      defaultRestaurants,
    },
    revalidate: 60, // 60 sec
  };
};

/**
 * Attraction Context
 */
export interface AttractionContext {
  category: CategoryAttractions;
  setCategory: Dispatch<SetStateAction<CategoryAttractions>>;
  city: CityValue;
  setCity: Dispatch<SetStateAction<CityValue>>;
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
 *  Welcome Section
 */
interface WelcomeSectionProps {
  defaultActivities: IntegratedData[];
  defaultRestaurants: IntegratedData[];
  onSelectCity: (city: CityValue) => void;
  onClickCard: (data: IntegratedData) => void;
}

const WelcomeSection: FC<WelcomeSectionProps> = ({
  defaultActivities,
  defaultRestaurants,
  onSelectCity,
  onClickCard,
}) => (
  <>
    <MainTitle type="triangle">熱門城市</MainTitle>
    <HorizontalScroll>
      <CityGallery onSelectCity={onSelectCity} />
    </HorizontalScroll>
    <MainTitle type="triangle">熱門活動</MainTitle>
    <MainCardHorizontalArea>
      {/* {Array.from({ length: 4 }).map((_, idx) => (
      <CardHorizontal
        key={idx}
        img="https://www.taiwan.net.tw/att/event/38a0d7b6-432c-458a-9b29-f278fe7728ef.jpg"
        title="合歡山國際暗空公園-星空清境跨年活動"
        description="竹子湖海拔670公尺，位居大屯山、七星山與小觀音山間的谷地。曾是火山堰塞湖，湖水退去後留下肥沃的土壤，形成典型的農村聚落，近年結合在地花卉等產業與自然、人文資源發展休閒農業，成為臺北市第三個休閒農業區。"
        location="臺北市 北投區"
        onClick={() => setDetailCardData(cardDetailTestData)}
      />
    ))} */}
      {defaultActivities.map((data) => (
        <CardHorizontal
          key={data.id}
          img={data.picture[0]?.url}
          title={data.name}
          description={data.description}
          location={data.location}
          imageButtonText="活動詳情"
          onClick={() => onClickCard(data)}
        />
      ))}
    </MainCardHorizontalArea>
    <MainTitle type="rectangle">熱門餐飲</MainTitle>
    <MainCardVerticalArea>
      {/* {Array.from({ length: 10 }).map((_, index) => (
      <CardVertical
        key={index}
        img="https://www.taiwan.net.tw/att/event/38a0d7b6-432c-458a-9b29-f278fe7728ef.jpg"
        title="合歡山國際暗空公園-星空清境跨年活動"
        location="臺北市 北投區"
        onClick={() => setDetailCardData(cardDetailTestData)}
      />
    ))} */}
      {defaultRestaurants.map((data) => (
        <CardVertical
          key={data.id}
          img={data.picture[0]?.url}
          title={data.name}
          location={data.location}
          imageButtonText="餐飲詳情"
          onClick={() => onClickCard(data)}
        />
      ))}
    </MainCardVerticalArea>
  </>
);

/**
 * Result Section
 */
interface ResultSectionProps {
  data: IntegratedData[];
  titleText: string;
  onClickCard: (data: IntegratedData) => void;
}

const ResultSection: FC<ResultSectionProps> = ({
  data,
  titleText,
  onClickCard,
}) => {
  const PER_PAGE_DATA_NUM = 20;
  const titleId = "result-title";
  const [page, setPage] = useState<number>(1);
  useScrollToId(page, "__next");

  const startIdx = PER_PAGE_DATA_NUM * (page - 1);
  const endIdx = startIdx + PER_PAGE_DATA_NUM;
  const displayData = data.slice(startIdx, endIdx);
  const showPageButton = data.length > PER_PAGE_DATA_NUM;

  const handleClickNextBtn = () => {
    const hasNextPage = endIdx < data.length;
    if (hasNextPage) {
      setPage((page) => page + 1);
    }
  };

  const handleClickPrevBtn = () => {
    const hasPrevPage = page > 1;
    if (hasPrevPage) {
      setPage((page) => page - 1);
    }
  };

  const typeToImageBtnText = (type: TdxApiType) => {
    switch (type) {
      case "activity":
        return "活動詳情";
      case "hotel":
        return "住宿詳情";
      case "restaurant":
        return "美食詳情";
      case "scenicSpot":
        return "景點詳情";
    }
  };

  const cardContent = displayData.map((data) => (
    <CardVertical
      key={data.id}
      img={data.picture[0]?.url}
      title={data.name}
      location={data.location}
      imageButtonText={typeToImageBtnText(data.type)}
      onClick={() => onClickCard(data)}
    />
  ));

  return (
    <>
      <MainTitle type="triangle" id={titleId}>
        {titleText}
      </MainTitle>
      <MainCardVerticalArea>{cardContent}</MainCardVerticalArea>
      {showPageButton && (
        <MainPageButtonsArea
          onClickNextBtn={handleClickNextBtn}
          onClickPrevBtn={handleClickPrevBtn}
          page={page}
        />
      )}
    </>
  );
};

/**
 *  Attractions Page
 */

type DataState = "idle" | "success" | "loading" | "error";

const Attractions: NextPage<AttractionsPageProps> = ({
  defaultActivities,
  defaultRestaurants,
}) => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<CategoryAttractions>("");
  const [city, setCity] = useState<CityValue>("");
  const [detailCardData, setDetailCardData] = useState<CardDetailProps | null>(
    null
  );
  const [dataState, setDataState] = useState<DataState>("idle");
  const [data, setData] = useState<IntegratedData[]>([]);
  const [dataTitle, setDataTitle] = useState("");

  const context: AttractionContext = {
    city,
    setCity,
    category,
    setCategory,
    searchText,
    setSearchText,
  };

  useLogOnce(defaultActivities);
  useLogOnce(defaultRestaurants);

  const handleClickCard = (data: IntegratedData) => {
    setDetailCardData({
      title: data.name,
      images: data.picture,
      description: data.description,
      time: data.time,
      phone: data.phone,
      address: data.address,
      websiteUrl: data.websiteUrl,
      price: data.charge,
    });
  };

  const handleClickCity = async (city: CityValue) => {
    setDataState("loading");
    try {
      const scenicSpots = await getIntegratedData({
        types: ["scenicSpot"],
      });

      setDataState("success");
      setData(scenicSpots);
      const cityText =
        cityOptions.find((option) => option.value === city)?.text || "台灣";
      setDataTitle(`${cityText}的景點`);
    } catch (err) {
      console.error(err);
      setDataState("error");
    }
  };

  let mainContent: JSX.Element | null = null;

  switch (dataState) {
    case "idle": {
      mainContent = (
        <WelcomeSection
          defaultActivities={defaultActivities}
          defaultRestaurants={defaultRestaurants}
          onSelectCity={handleClickCity}
          onClickCard={handleClickCard}
        />
      );
      break;
    }
    case "loading": {
      mainContent = <Loading />;
      break;
    }
    case "success": {
      mainContent = (
        <ResultSection
          data={data}
          titleText={dataTitle}
          onClickCard={handleClickCard}
        />
      );
      // console.log(data);
      break;
    }
    default: {
      mainContent = <h3>Something Wrong...</h3>;
    }
  }

  return (
    <AttractionCtx.Provider value={context}>
      <Header mobileFilterContent={<MobileFilter />} />
      <Banner bgSrc={bannerImgSrc} filterContent={<TabletFiler />} />
      <MainSection>{mainContent}</MainSection>
      <Footer />
      <Modal
        show={detailCardData !== null}
        onHide={() => setDetailCardData(null)}
      >
        {detailCardData && <CardDetail {...detailCardData} />}
      </Modal>
    </AttractionCtx.Provider>
  );
};

export default Attractions;
