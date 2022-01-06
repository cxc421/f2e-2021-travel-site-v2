import type { NextPage } from "next";
import sharedStyle from "../styles/shared.module.scss";
import { Button } from "../components/button/button";
import { Header } from "../components/header/header";
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
} from "react";
import { City, CitySelectbox } from "../components/selectbox/city-selectbox";
import { Searchbox } from "../components/searchbox/searchbox";
import { GpsButton } from "../components/button/gps-button";
import { SearchButton } from "../components/button/search-button";

/**
 *  Restaurant Context
 */
export interface RestaurantContext {
  category: CategoryRestaurant;
  setCategory: Dispatch<SetStateAction<CategoryRestaurant>>;
  city: City;
  setCity: Dispatch<SetStateAction<City>>;
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
 *  Restaurant Page
 */
const Restaurant: NextPage = () => {
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<CategoryRestaurant>("");
  const [city, setCity] = useState<City>("");

  const context: RestaurantContext = {
    city,
    setCity,
    category,
    setCategory,
    searchText,
    setSearchText,
  };

  return (
    <RestaurantCtx.Provider value={context}>
      <Header mobileFilterContent={<MobileFilter />} />
      <Banner bgSrc={bannerImgSrc} filterContent={<TabletFiler />} />
      <h1>Restaurant</h1>
    </RestaurantCtx.Provider>
  );
};

export default Restaurant;
