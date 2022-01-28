import type { NextPage, GetStaticProps } from "next";
import sharedStyle from "../styles/shared.module.scss";
import { Header, HeaderType } from "../components/header/header";
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
  useContext,
  useState,
  useRef,
  useEffect,
  RefObject,
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
import {
  MainSection,
  MainSectionType,
} from "../components/main-section/main-section";
import { MainTitle } from "../components/main-section/main-title";
import { Footer } from "../components/footer/footer";
import { HorizontalScroll } from "../components/horizontal-scroll/horizontal-scroll";
import { CityGallery } from "../components/city-gallery/city-gallery";
import { CardHorizontal } from "../components/card/card-horizontal";
import { MainCardHorizontalArea } from "../components/main-section/main-card-horizontal-area";
import { MainCardVerticalArea } from "../components/main-section/main-card-vertical-area";
import { CardVertical } from "../components/card/card-vertical";
import {
  IntegratedData,
  IntegratedDataFilter,
  TdxApiType,
} from "../libs/types";
import { Modal } from "../components/modal/modal";
import { CardDetail, CardDetailProps } from "../components/card/card-detail";
import useLogOnce from "../utils/useLogOnce";
import { Loading } from "../components/loading/loading";
import { MainPageButtonsArea } from "../components/main-section/main-page-button-area";
import { getIntegratedData } from "../libs/integrated-api/integrated-api";
import { NoData } from "../components/no-data/no-data";
import { getGpsLocation } from "../utils/getGpsLocation";
import { SearchPanel } from "../components/search-panel/search-panel";
import { useSearchHistory } from "../utils/useSearchHistory";
import { useShowSearchPanel } from "../utils/useShowSearchPanel";

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
    orderBy: "shuffle",
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
interface MobileFilterProps {
  onClickSearch: () => void;
}

const MobileFilter: FC<MobileFilterProps> = ({ onClickSearch }) => {
  const { category, setCategory, city, setCity } = useAttractionContext();

  const [showCategoryTooltip, setShowCategoryTooltip] = useState(false);
  const prevCategoryRef = useRef(category);

  useEffect(() => {
    // hide category tooltup if category change
    if (prevCategoryRef.current !== category) {
      prevCategoryRef.current = category;
      setShowCategoryTooltip(false);
      // hide category tooltup after one second
    } else if (showCategoryTooltip) {
      const key = setTimeout(() => setShowCategoryTooltip(false), 1000);
      return () => clearTimeout(key);
    }
  }, [showCategoryTooltip, prevCategoryRef, category]);

  const handleClickSearchBtn = () => {
    if (category === "") {
      setShowCategoryTooltip(true);
    } else {
      onClickSearch();
    }
  };

  return (
    <div className={sharedStyle.mobileFilterContainer}>
      <CategoryAttractionsSelectbox
        value={category}
        onChange={setCategory}
        className={sharedStyle.mobileSelectbox}
        showTooltip={showCategoryTooltip}
      />
      <CitySelectbox
        value={city}
        onChange={setCity}
        className={sharedStyle.mobileSelectbox}
      />
      <Button
        bgColor="red"
        size={40}
        className={sharedStyle.sendButton}
        onClick={handleClickSearchBtn}
      >
        送出
      </Button>
    </div>
  );
};

/**
 * Attraction Tablet & Desktop Filter
 */
interface TabletFilerProps {
  onClickSearch: () => void;
  onClickGps: () => void;
  onTypeEnter: () => void;
}

const TabletFiler: FC<TabletFilerProps> = ({
  onClickSearch,
  onClickGps,
  onTypeEnter,
}) => {
  const { searchText, setSearchText, category, setCategory, city, setCity } =
    useAttractionContext();

  const [showCategoryTooltip, setShowCategoryTooltip] = useState(false);
  const prevCategoryRef = useRef(category);

  useEffect(() => {
    // hide category tooltup if category change
    if (prevCategoryRef.current !== category) {
      prevCategoryRef.current = category;
      setShowCategoryTooltip(false);
      // hide category tooltup after one second
    } else if (showCategoryTooltip) {
      const key = setTimeout(() => setShowCategoryTooltip(false), 1000);
      return () => clearTimeout(key);
    }
  }, [showCategoryTooltip, prevCategoryRef, category]);

  const handleClickSearchBtn = () => {
    if (category === "") {
      setShowCategoryTooltip(true);
    } else {
      onClickSearch();
    }
  };

  return (
    <div className={sharedStyle.tabletFilterContainer}>
      <div>
        <Searchbox
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className={sharedStyle.tabletInput}
          onTypeEnter={onTypeEnter}
        />
        <GpsButton
          size={40}
          title="定位"
          className={sharedStyle.tabletButton}
          onClick={onClickGps}
        />
      </div>
      <div>
        <CategoryAttractionsSelectbox
          value={category}
          onChange={setCategory}
          className={sharedStyle.tabletInput}
          showTooltip={showCategoryTooltip}
        />
        <CitySelectbox
          value={city}
          onChange={setCity}
          className={sharedStyle.tabletInput}
        />
        <SearchButton
          size={40}
          title="搜尋"
          className={sharedStyle.tabletButton}
          onClick={handleClickSearchBtn}
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
  headerRef: RefObject<HeaderType>;
  mainSectionRef: RefObject<MainSectionType>;
}

const ResultSection: FC<ResultSectionProps> = ({
  data,
  titleText,
  onClickCard,
  headerRef,
  mainSectionRef,
}) => {
  const PER_PAGE_DATA_NUM = 20;
  const [page, setPage] = useState<number>(1);

  const startIdx = PER_PAGE_DATA_NUM * (page - 1);
  const endIdx = startIdx + PER_PAGE_DATA_NUM;
  const displayData = data.slice(startIdx, endIdx);
  const showPageButton = data.length > PER_PAGE_DATA_NUM;
  const totalPage = Math.ceil(data.length / PER_PAGE_DATA_NUM);

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

  useEffect(() => {
    const headerElement = headerRef.current;
    const mainSectionElement = mainSectionRef.current;
    if (headerElement && mainSectionElement) {
      const root = document.getElementById("__next");
      const headerHeight = headerElement.getBoundingClientRect().height;
      const mainSectionTop = mainSectionElement.getBoundingClientRect().top;

      root?.scrollTo({
        top: root.scrollTop - (headerHeight - mainSectionTop),
        behavior: "smooth",
      });
    }
  }, [page, headerRef, mainSectionRef]);

  const cardContent = displayData.map((data) => (
    <CardVertical
      key={data.id}
      img={data.picture[0]?.url}
      title={data.name}
      location={
        data.location === "to see the official site" ||
        data.location === "詳見官網" ||
        data.location === undefined
          ? data.city || data.address
          : data.location
      }
      imageButtonText={typeToImageBtnText(data.type)}
      disKm={data.disKm}
      onClick={() => onClickCard(data)}
    />
  ));

  return (
    <>
      <MainTitle type="triangle">{titleText}</MainTitle>
      <MainCardVerticalArea>{cardContent}</MainCardVerticalArea>
      {showPageButton && (
        <MainPageButtonsArea
          onClickNextBtn={handleClickNextBtn}
          onClickPrevBtn={handleClickPrevBtn}
          page={page}
          totalPage={totalPage}
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
  const headerRef = useRef<HeaderType>(null);
  const mainSectionRef = useRef<MainSectionType>(null);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<CategoryAttractions>("");
  const [city, setCity] = useState<CityValue>("");
  const [detailCardData, setDetailCardData] = useState<CardDetailProps | null>(
    null
  );
  const [dataState, setDataState] = useState<DataState>("idle");
  const [data, setData] = useState<IntegratedData[]>([]);
  const [dataTitle, setDataTitle] = useState("");
  const { searchHistory, saveSearchHistory, clearSearchHistory } =
    useSearchHistory();
  const { showSearchPanel, setShowSearchPanel } = useShowSearchPanel();

  const context: AttractionContext = {
    city,
    setCity,
    category,
    setCategory,
    searchText,
    setSearchText,
  };

  // useLogOnce(defaultActivities);
  // useLogOnce(defaultRestaurants);

  const handleClickGps = async () => {
    const searchTerm = searchText.trim();
    const haveSearchTerm = searchTerm.length > 0;

    setDataState("loading");
    try {
      const position = await getGpsLocation();
      const data = await getIntegratedData({
        types: category === "" ? ["activity", "scenicSpot"] : [category],
        searchTerm: haveSearchTerm ? searchTerm : undefined,
        position,
        maxDisKm: 15,
        orderBy: "distance",
      });
      const displaySearchText = haveSearchTerm ? `含有 "${searchTerm}"` : "";
      const displayCategoryText =
        category === ""
          ? "景點與活動"
          : category === "activity"
          ? "活動"
          : "景點";
      const title = `附近${displaySearchText}的${displayCategoryText}`;
      setData(data);
      setDataTitle(title);
      setDataState("success");
    } catch (err) {
      console.error(err);
      setDataState("error");
    }
  };

  const handleSearch = async () => {
    const searchTerm = searchText.trim();
    const haveSearchTerm = searchTerm.length > 0;
    if (!haveSearchTerm && category === "") return;

    const filter: IntegratedDataFilter = {
      types: category === "" ? ["activity", "scenicSpot"] : [category],
      city: city !== "" ? city : undefined,
      searchTerm: haveSearchTerm ? searchTerm : undefined,
    };
    const displayLocationText = filter.city ? `${filter.city}` : "台灣";
    const displaySearchText = haveSearchTerm ? `含有 "${searchTerm}"` : "";
    const displayCategoryText =
      category === ""
        ? "景點與活動"
        : category === "activity"
        ? "活動"
        : "景點";
    const title = `${displayLocationText}${displaySearchText}的${displayCategoryText}`;

    if (haveSearchTerm) {
      saveSearchHistory(searchTerm);
    }
    setDataState("loading");
    try {
      const data = await getIntegratedData(filter);

      setDataState("success");
      setData(data);
      setDataTitle(title);
      setSearchText("");
    } catch (err) {
      console.error(err);
      setDataState("error");
    }
  };

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
        city,
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

  const handleHideSearchPanel = () => {
    setShowSearchPanel(false);
    if (searchText.trim().length > 0) {
      handleSearch();
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
      mainContent =
        data.length > 0 ? (
          <ResultSection
            data={data}
            titleText={dataTitle}
            onClickCard={handleClickCard}
            headerRef={headerRef}
            mainSectionRef={mainSectionRef}
          />
        ) : (
          <NoData />
        );
      // console.log(data);
      break;
    }
    default: {
      console.error("Fetch data failed...");
      mainContent = <NoData />;
    }
  }

  return (
    <AttractionCtx.Provider value={context}>
      <Header
        mobileFilterContent={<MobileFilter onClickSearch={handleSearch} />}
        onClickGpsBtn={handleClickGps}
        onClickGoToSerachBtn={() => setShowSearchPanel(true)}
        ref={headerRef}
      />
      <Banner
        bgSrc={bannerImgSrc}
        filterContent={
          <TabletFiler
            onClickSearch={handleSearch}
            onClickGps={handleClickGps}
            onTypeEnter={handleSearch}
          />
        }
      />
      <MainSection ref={mainSectionRef}>{mainContent}</MainSection>
      <Footer />
      <Modal
        show={detailCardData !== null}
        onHide={() => setDetailCardData(null)}
      >
        {detailCardData && <CardDetail {...detailCardData} />}
      </Modal>
      <SearchPanel
        searchText={searchText}
        setSearchText={setSearchText}
        show={showSearchPanel}
        onHide={handleHideSearchPanel}
        searchHistory={searchHistory}
        clearSearchHistory={clearSearchHistory}
      />
    </AttractionCtx.Provider>
  );
};

export default Attractions;
