import type { NextPage } from "next";
import type { FC, Dispatch, SetStateAction } from "react";
import type { HeaderType } from "../components/header/header";
import type { CategoryAttractions } from "../components/selectbox/category-attractions-selectbox";
import type { CityValue } from "../components/selectbox/city-selectbox";
import type { MainSectionType } from "../components/main-section/main-section";
import type { IntegratedData } from "../libs/types";
import type { CardDetailProps } from "../components/card/card-detail";
import type { UnsplashPicture } from "../libs/picture-api/picture-types";

import { createContext, useContext, useState, useRef, useEffect } from "react";
import { Header } from "../components/header/header";
import { Banner } from "../components/banner/banner";
import { Button } from "../components/button/button";
import { GpsButton } from "../components/button/gps-button";
import { SearchButton } from "../components/button/search-button";
import { Searchbox } from "../components/searchbox/searchbox";
import { CategoryAttractionsSelectbox } from "../components/selectbox/category-attractions-selectbox";
import { CitySelectbox } from "../components/selectbox/city-selectbox";
import { MainSection } from "../components/main-section/main-section";
import { MainTitle } from "../components/main-section/main-title";
import { MainCardHorizontalArea } from "../components/main-section/main-card-horizontal-area";
import { MainCardVerticalArea } from "../components/main-section/main-card-vertical-area";
import { Footer } from "../components/footer/footer";
import { HorizontalScroll } from "../components/horizontal-scroll/horizontal-scroll";
import { CityGallery } from "../components/city-gallery/city-gallery";
import { CardHorizontal } from "../components/card/card-horizontal";
import { CardVertical } from "../components/card/card-vertical";
import { CardDetail } from "../components/card/card-detail";
import { Modal } from "../components/modal/modal";
import { Loading } from "../components/loading/loading";
import { NoData } from "../components/no-data/no-data";
import { SearchPanel } from "../components/search-panel/search-panel";
import { ResultSection } from "../components/result/result";
import { ScrollTopButton } from "../components/scroll-top-button/scroll-top-button";

import { useSearchHistory } from "../utils/useSearchHistory";
import { useShowSearchPanel } from "../utils/useShowSearchPanel";
import { useIntegratedData } from "../utils/useIntegratedData";
import { fetchAttractionsData } from "../utils/getPageData";

import sharedStyle from "../styles/shared.module.scss";
import bannerImgSrc from "../images/banner-good-weather.png";

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
  const { searchText, category, setCategory, city, setCity } =
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
    if (category === "" && searchText.trim().length === 0) {
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
    if (category === "" && searchText.trim().length === 0) {
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
 *  Attractions Page
 */
interface AttractionsPageProps {
  defaultActivities: IntegratedData[];
  defaultRestaurants: IntegratedData[];
  bannerUrl: null | UnsplashPicture;
  isReady?: boolean;
}

const Attractions: NextPage<AttractionsPageProps> = ({
  defaultActivities,
  defaultRestaurants,
  bannerUrl,
}) => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HeaderType>(null);
  const mainSectionRef = useRef<MainSectionType>(null);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<CategoryAttractions>("");
  const [city, setCity] = useState<CityValue>("");
  const [detailCardData, setDetailCardData] = useState<CardDetailProps | null>(
    null
  );
  const { data, dataState, dataTitle, dataTotal, queryData, loadMore } =
    useIntegratedData();
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

  const handleClickGps = async () => {
    queryData({
      types: category === "" ? ["activity", "scenicSpot"] : [category],
      positionBy: "gps",
      searchText,
    });
  };

  const handleSearch = async () => {
    const searchTerm = searchText.trim();
    const haveSearchTerm = searchTerm.length > 0;
    if (!haveSearchTerm && category === "") return;

    if (haveSearchTerm) {
      saveSearchHistory(searchTerm);
    }

    queryData({
      types: category === "" ? ["activity", "scenicSpot"] : [category],
      positionBy: "city",
      city: city !== "" ? city : undefined,
      searchText,
    });
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
    queryData({
      types: ["scenicSpot"],
      positionBy: "city",
      city,
    });
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
            dataTotal={dataTotal}
            loadMore={loadMore}
            titleText={dataTitle}
            titleType="triangle"
            onClickCard={handleClickCard}
            headerRef={headerRef}
            mainSectionRef={mainSectionRef}
            scrollableContainer={pageRef.current}
          />
        ) : (
          <NoData />
        );
      break;
    }
    default: {
      console.error("Fetch data failed...");
      mainContent = <NoData />;
    }
  }

  return (
    <AttractionCtx.Provider value={context}>
      <div className="page" ref={pageRef}>
        <Header
          mobileFilterContent={<MobileFilter onClickSearch={handleSearch} />}
          onClickGpsBtn={handleClickGps}
          onClickGoToSerachBtn={() => setShowSearchPanel(true)}
          ref={headerRef}
        />
        <Banner
          bgSrc={bannerImgSrc}
          bgUrl={bannerUrl}
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
        <ScrollTopButton scrollableContainer={pageRef.current} />
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
      </div>
    </AttractionCtx.Provider>
  );
};

Attractions.getInitialProps = async ({ req }) => {
  if (req) {
    try {
      const result = await fetchAttractionsData();
      return {
        ...result,
        isReady: true,
      };
    } catch (err) {
      return {
        defaultActivities: [],
        defaultRestaurants: [],
        bannerUrl: null,
        isReady: true,
      };
    }
  }

  return {
    defaultActivities: [],
    defaultRestaurants: [],
    bannerUrl: null,
    isReady: false,
  };
};

export default Attractions;
