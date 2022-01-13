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
  SrcUpdateTime: "2022-01-13T06:16:36.669Z";
  UpdateTime: "2022-01-13T06:16:36.669Z";
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

  const response = await axiosInstance.get(url, {
    params: {
      $top: filter.$top,
      $skip: filter.$skip,
      $format: "JSON",
      $filter: `${filter.needCity ? `City ne null` : ""} ${
        filter.needImage
          ? "and Picture/PictureUrl1 ne null and Picture/PictureDescription1 ne null"
          : ""
      }`,
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
