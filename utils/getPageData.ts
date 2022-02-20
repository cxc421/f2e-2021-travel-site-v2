import { IntegratedData } from "../libs/types";
import { UnsplashPicture } from "../libs/picture-api/picture-types";
import { getCurrentPicture } from "../libs/picture-api/picture-api";
import { getIntegratedData } from "../libs/integrated-api/integrated-api";

export interface AttractionsData {
  defaultActivities: IntegratedData[];
  defaultRestaurants: IntegratedData[];
  bannerUrl: null | UnsplashPicture;
}

export const fetchAttractionsData = async (): Promise<AttractionsData> => {
  const [pictureResponse, activitiesResponse, restaurantsResponse] =
    await Promise.all([
      getCurrentPicture(),
      getIntegratedData({
        types: ["activity"],
        number: 4,
        smallestEndDate: new Date().toUTCString(),
        needPicture: true,
        needValidLocation: true,
        orderBy: "shuffle",
      }),
      getIntegratedData({
        types: ["restaurant"],
        number: 10,
        needPicture: true,
        searchTerm: "好吃 美味 用餐",
        searchProperty: "description",
        orderBy: "shuffle",
      }),
    ]);

  return {
    defaultActivities: activitiesResponse.data,
    defaultRestaurants: restaurantsResponse.data,
    bannerUrl: pictureResponse.picture,
  };
};

interface RestaurantsData {
  defaultRestaurants: IntegratedData[];
  defaultHotels: IntegratedData[];
}

export const fetchRestaurantData = async (): Promise<RestaurantsData> => {
  const [hotelsResponse, restaurantsResponse] = await Promise.all([
    getIntegratedData({
      types: ["hotel"],
      number: 10,
      needPicture: true,
      needValidLocation: true,
      orderBy: "shuffle",
    }),
    getIntegratedData({
      types: ["restaurant"],
      number: 10,
      needPicture: true,
      needValidLocation: true,
      orderBy: "shuffle",
    }),
  ]);

  return {
    defaultRestaurants: restaurantsResponse.data,
    defaultHotels: hotelsResponse.data,
  };
};

export const sleep = (time: number): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });
