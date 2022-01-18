import { City } from "./../../../constants/cities";
import { axiosInstance } from "../axios-config";
import { Coordinate } from "../../types";

export type Restaurant = {
  RestaurantID: string;
  RestaurantName: string;
  Description: string;
  Address: string;
  // ZipCode: string;
  Phone: string;
  OpenTime: string;
  WebsiteUrl: string;
  Picture: {
    PictureUrl1: string;
    PictureDescription1: string;
    PictureUrl2: string;
    PictureDescription2: string;
    PictureUrl3: string;
    PictureDescription3: string;
  };
  Position: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  // Class: string;
  // MapUrl: string;
  // ParkingInfo: string;
  City: string;
  SrcUpdateTime: string;
  UpdateTime: string;
};

export type RestaurantFilter = {
  city: City | "";
  $top?: number;
  $skip?: number;
  needImage?: boolean;
  needCity?: boolean;
  orderById?: boolean;
  keywords?: string;
  position?: Coordinate;
  positionDistance?: number;
};

export async function getRestaurant(
  filter: RestaurantFilter
): Promise<Restaurant[]> {
  const url = filter.city
    ? `/v2/Tourism/Restaurant/${filter.city}`
    : "/v2/Tourism/Restaurant";

  const keywordFilter =
    filter.keywords && filter.keywords.length > 0
      ? filter.keywords
          .split(" ")
          .map((keyword) => `contains(Description,'${keyword}')`)
          .join(" or ")
      : undefined;

  const $filter = [
    filter.needCity ? `City ne null` : "",
    filter.needImage
      ? `Picture/PictureUrl1 ne null and Picture/PictureDescription1 ne null`
      : "",
    keywordFilter ? `(${keywordFilter})` : "",
  ]
    .filter((expression) => expression.length)
    .join(" and ");

  console.log({ $filter });

  const response = await axiosInstance.get(url, {
    params: {
      $top: filter.$top,
      $skip: filter.$skip,
      $select:
        "RestaurantID,RestaurantName,Description,Address,Phone,OpenTime,WebsiteUrl,Picture,Position,City",
      $format: "JSON",
      $filter: $filter || undefined,
      $orderby: filter.orderById ? "RestaurantID" : undefined,
      $spatialFilter: filter.position
        ? `nearby(${filter.position.latitude}, ${filter.position.longitude}, ${
            filter.positionDistance || 10000
          })`
        : undefined,
    },
  });

  return response.data;
}
