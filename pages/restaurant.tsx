import type { NextPage, GetStaticProps } from "next";
import sharedStyle from "../styles/shared.module.scss";
import { Button } from "../components/button/button";
import { Header, HeaderType } from "../components/header/header";
import bannerImgSrc from "../images/banner-room.png";
import { Banner } from "../components/banner/banner";
import {
  CategoryRestaurant,
  CategoryRestaurantSelectbox,
} from "../components/selectbox/category-restaurant-selectbox";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
  useRef,
  FC,
} from "react";
import {
  CityValue,
  CitySelectbox,
} from "../components/selectbox/city-selectbox";
import { Searchbox } from "../components/searchbox/searchbox";
import { GpsButton } from "../components/button/gps-button";
import { SearchButton } from "../components/button/search-button";
import { IntegratedData } from "../libs/types";
import { getIntegratedData } from "../libs/integrated-api/integrated-api";
import { MainTitle } from "../components/main-section/main-title";
import { MainCardVerticalArea } from "../components/main-section/main-card-vertical-area";
import { CardVertical } from "../components/card/card-vertical";
import {
  MainSection,
  MainSectionType,
} from "../components/main-section/main-section";
import { CardDetail, CardDetailProps } from "../components/card/card-detail";
import { useIntegratedData } from "../utils/useIntegratedData";
import { useSearchHistory } from "../utils/useSearchHistory";
import { useShowSearchPanel } from "../utils/useShowSearchPanel";
import { Loading } from "../components/loading/loading";
import { ResultSection } from "../components/result/result";
import { NoData } from "../components/no-data/no-data";
import { Footer } from "../components/footer/footer";
import { Modal } from "../components/modal/modal";
import { SearchPanel } from "../components/search-panel/search-panel";

/**
 *  Server Side Code
 */
interface RestaurantPageProps {
  defaultRestaurants: IntegratedData[];
  defaultHotels: IntegratedData[];
}

export const getStaticProps: GetStaticProps<RestaurantPageProps> = async () => {
  // Default Restaurant
  const defaultRestaurants = (
    await getIntegratedData({
      types: ["restaurant"],
      number: 10,
      needPicture: true,
      needValidLocation: true,
      orderBy: "shuffle",
    })
  ).data;

  // Default Activities
  const defaultHotels = (
    await getIntegratedData({
      types: ["hotel"],
      number: 10,
      needPicture: true,
      needValidLocation: true,
      orderBy: "shuffle",
    })
  ).data;

  return {
    props: {
      defaultHotels,
      defaultRestaurants,
    },
    revalidate: 60, // 60 sec
  };
};

/**
 *  Restaurant Context
 */
export interface RestaurantContext {
  category: CategoryRestaurant;
  setCategory: Dispatch<SetStateAction<CategoryRestaurant>>;
  city: CityValue;
  setCity: Dispatch<SetStateAction<CityValue>>;
  searchText: string;
  setSearchText: Dispatch<SetStateAction<string>>;
}

const RestaurantCtx = createContext<RestaurantContext | null>(null);

function useRestaurantContext() {
  const value = useContext(RestaurantCtx);
  if (!value) {
    throw new Error(
      `useRestaurantContext() must be used within restaurant page`
    );
  }
  return value;
}

/**
 *  Restaurant Mobile Filter
 */

const MobileFilter = () => {
  const { category, setCategory, city, setCity } = useRestaurantContext();

  return (
    <div className={sharedStyle.mobileFilterContainer}>
      <CategoryRestaurantSelectbox
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
    useRestaurantContext();

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
        <CategoryRestaurantSelectbox
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
  defaultRestaurants: IntegratedData[];
  defaultHotels: IntegratedData[];
  onClickCard: (data: IntegratedData) => void;
}

const WelcomeSection: FC<WelcomeSectionProps> = ({
  defaultHotels,
  defaultRestaurants,
  onClickCard,
}) => (
  <>
    <MainTitle type="rectangle">熱門美食</MainTitle>
    <MainCardVerticalArea>
      {defaultRestaurants.map((data) => (
        <CardVertical
          key={data.id}
          img={data.picture[0]?.url}
          title={data.name}
          location={data.location}
          imageButtonText="美食詳情"
          onClick={() => onClickCard(data)}
        />
      ))}
    </MainCardVerticalArea>
    <MainTitle type="rectangle">熱門住宿</MainTitle>
    <MainCardVerticalArea>
      {defaultHotels.map((data) => (
        <CardVertical
          key={data.id}
          img={data.picture[0]?.url}
          title={data.name}
          location={data.location}
          imageButtonText="住宿詳情"
          onClick={() => onClickCard(data)}
        />
      ))}
    </MainCardVerticalArea>
  </>
);

/**
 *  Restaurant Page
 */
const Restaurant: NextPage<RestaurantPageProps> = ({
  defaultHotels,
  defaultRestaurants,
}) => {
  const headerRef = useRef<HeaderType>(null);
  const mainSectionRef = useRef<MainSectionType>(null);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<CategoryRestaurant>("");
  const [city, setCity] = useState<CityValue>("");
  const [detailCardData, setDetailCardData] = useState<CardDetailProps | null>(
    null
  );
  const { data, dataState, dataTitle, dataTotal, queryData, loadMore } =
    useIntegratedData();
  const { searchHistory, saveSearchHistory, clearSearchHistory } =
    useSearchHistory();
  const { showSearchPanel, setShowSearchPanel } = useShowSearchPanel();

  const context: RestaurantContext = {
    city,
    setCity,
    category,
    setCategory,
    searchText,
    setSearchText,
  };

  const handleSearch = async () => {
    const searchTerm = searchText.trim();
    const haveSearchTerm = searchTerm.length > 0;
    if (!haveSearchTerm && category === "") return;

    if (haveSearchTerm) {
      saveSearchHistory(searchTerm);
    }

    queryData({
      types: category === "" ? ["restaurant", "hotel"] : [category],
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
          defaultHotels={defaultHotels}
          defaultRestaurants={defaultRestaurants}
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
            onClickCard={handleClickCard}
            headerRef={headerRef}
            mainSectionRef={mainSectionRef}
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
    <RestaurantCtx.Provider value={context}>
      <Header mobileFilterContent={<MobileFilter />} />
      <Banner bgSrc={bannerImgSrc} filterContent={<TabletFiler />} />
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
    </RestaurantCtx.Provider>
  );
};

export default Restaurant;
