import { useState, useRef } from "react";
import { CityValue } from "../components/selectbox/city-selectbox";
import { IntegratedData, IntegratedDataFilter } from "../libs/types";
import { getIntegratedData } from "../libs/integrated-api/integrated-api";
import { getGpsLocation } from "./getGpsLocation";

export type DataState = "idle" | "success" | "loading" | "error";

export type QueryDataParams = {
  types: IntegratedDataFilter["types"];
  positionBy: "city" | "gps";
  city?: CityValue;
  searchText?: string;
};

export function useIntegratedData() {
  const [dataState, setDataState] = useState<DataState>("idle");
  const [dataTitle, setDataTitle] = useState("");
  const [data, setData] = useState<IntegratedData[]>([]);
  const [dataTotal, setDataTotal] = useState(0);
  const [prevDataFilter, setPrevDataFilter] =
    useState<IntegratedDataFilter | null>(null);
  const isBusyRef = useRef(false);

  const filterToTitle = (filter: IntegratedDataFilter) => {
    const displayLocationText = filter.position
      ? "附近"
      : filter.city
      ? `${filter.city}`
      : "台灣";
    const displaySearchText = filter.searchTerm
      ? `含有 "${filter.searchTerm}"`
      : "";
    const displayCategoryText = filter.types
      .map((type) => {
        switch (type) {
          case "activity":
            return "活動";
          case "scenicSpot":
            return "景點";
          case "hotel":
            return "住宿";
          case "restaurant":
            return "美食";
        }
      })
      .join("與");
    const title = `${displayLocationText}${displaySearchText}的${displayCategoryText}`;
    return title;
  };

  const queryData = async (queryParams: QueryDataParams, amount = 200) => {
    setDataState("loading");
    try {
      const filter: IntegratedDataFilter = {
        types: queryParams.types,
        startIdx: 0,
        endIdx: amount - 1,
      };
      const searchTerm = queryParams.searchText?.trim();
      if (searchTerm && searchTerm.length > 0) {
        filter.searchTerm = searchTerm;
      }
      if (queryParams.positionBy === "city") {
        filter.city = queryParams.city;
      } else {
        filter.position = await getGpsLocation();
        filter.maxDisKm = 15;
        filter.orderBy = "distance";
      }

      const response = await getIntegratedData(filter);
      setData(response.data);
      setDataTotal(response.total);
      setDataTitle(filterToTitle(filter));
      setPrevDataFilter(filter);
      setDataState("success");
    } catch {
      setDataState("error");
    }
  };

  const loadMore = async (amount = 100) => {
    if (!prevDataFilter) {
      console.error(`[loadMore]: Not prev query filter exist`);
      return;
    }
    if (isBusyRef.current) {
      console.log(`[loadMore]: isBusy, neglect`);
      return;
    }
    if (data.length === dataTotal) {
      console.log(`[loadMore]: already complete, neglect`);
      return;
    }

    isBusyRef.current = true;
    try {
      const response = await getIntegratedData({
        ...prevDataFilter,
        startIdx: data.length,
        endIdx: data.length + amount - 1,
      });
      setData(data.concat(response.data));
      setDataTotal(response.total);
    } catch (err) {
      console.error(err);
    } finally {
      isBusyRef.current = false;
    }
  };

  return {
    dataState,
    dataTitle,
    data,
    dataTotal,
    queryData,
    loadMore,
  };
}
