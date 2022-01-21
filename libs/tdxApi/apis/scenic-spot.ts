import { City } from "./../../../constants/cities";
import { axiosInstance } from "../axios-config";
import { Coordinate } from "../../types";

export type ScenicSpot = {
  ScenicSpotID: string;
  ScenicSpotName: string;
  DescriptionDetail: string;
  Description: string;
  Phone: string;
  Address: string;
  ZipCode: string;
  TravelInfo: string;
  OpenTime: string;
  Picture: {
    PictureUrl1?: string;
    PictureDescription1?: string;
    PictureUrl2?: string;
    PictureDescription2?: string;
    PictureUrl3?: string;
    PictureDescription3?: string;
  };
  MapUrl: string;
  Position: {
    PositionLon: 0;
    PositionLat: 0;
    GeoHash: string;
  };
  Class1: string;
  Class2: string;
  Class3: string;
  Level: string;
  WebsiteUrl: string;
  ParkingInfo: string;
  ParkingPosition: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  TicketInfo: string;
  Remarks: string;
  Keyword: string;
  City?: string;
  SrcUpdateTime: string;
  UpdateTime: string;
};

export type ScenicSpotFilter = {
  city: City | "";
  $top?: number;
  $skip?: number;
  needImage?: boolean;
  needCity?: boolean;
  orderById?: boolean;
  position?: Coordinate;
  positionDistance?: number;
};

export async function getScenicSpot(
  filter: ScenicSpotFilter
): Promise<ScenicSpot[]> {
  const url = filter.city
    ? `/v2/Tourism/ScenicSpot/${filter.city}`
    : "/v2/Tourism/ScenicSpot";

  const filterStr = [
    filter.needCity ? `City ne null` : undefined,
    filter.needImage
      ? "Picture/PictureUrl1 ne null and Picture/PictureDescription1 ne null"
      : undefined,
  ]
    .filter((item) => typeof item === "string")
    .join(" and ");

  const response = await axiosInstance.get(url, {
    params: {
      $top: filter.$top,
      $skip: filter.$skip,
      $format: "JSON",
      $filter: filterStr.length > 0 ? filterStr : undefined,
      $orderby: filter.orderById ? "ScenicSpotID" : undefined,
      $spatialFilter: filter.position
        ? `nearby(${filter.position.latitude}, ${filter.position.longitude}, ${
            filter.positionDistance || 10000
          })`
        : undefined,
    },
  });

  return response.data;
}
