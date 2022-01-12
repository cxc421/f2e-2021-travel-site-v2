import { City } from "./../../../constants/cities";
import { axiosInstance } from "../axiosConfig";
import { Coordinate } from "../../types";

export type Activity = {
  ActivityID: string;
  ActivityName: string;
  Description: string;
  Particpation: string;
  Location: string;
  Address: string;
  Phone: string;
  Organizer: string;
  StartTime: string;
  EndTime: string;
  Cycle: string;
  NonCycle: string;
  WebsiteUrl: string;
  Picture: {
    PictureUrl1?: string;
    PictureDescription1?: string;
    PictureUrl2?: string;
    PictureDescription2?: string;
    PictureUrl3?: string;
    PictureDescription3?: string;
  };
  Position: {
    PositionLon: number;
    PositionLat: number;
    GeoHash: string;
  };
  Class1: string;
  Class2: string;
  MapUrl: string;
  TravelInfo: string;
  ParkingInfo: string;
  Charge?: string;
  Remarks: string;
  City: string;
  SrcUpdateTime: string;
  UpdateTime: string;
};

export type ActivityFilter = {
  city: City | "";
  curDate: Date;
  $top?: number;
  $skip?: number;
  needImage?: boolean;
  needLocation?: boolean;
  position?: Coordinate;
  positionDistance?: number;
};

export async function getActivity(filter: ActivityFilter): Promise<Activity[]> {
  const url = filter.city
    ? `/v2/Tourism/Activity/${filter.city}`
    : "/v2/Tourism/Activity";

  const response = await axiosInstance.get(url, {
    params: {
      $top: filter.$top,
      $skip: filter.$skip,
      $format: "JSON",
      $orderby: "EndTime",
      $filter: `date(EndTime) ge ${filter.curDate.toISOString()} ${
        filter.needLocation ? `and Location ne 'to see the official site'` : ""
      } ${
        filter.needImage
          ? " and Picture/PictureUrl1 ne null and Picture/PictureDescription1 ne null"
          : ""
      }`,
      $spatialFilter: filter.position
        ? `nearby(${filter.position.latitude}, ${filter.position.longitude}, ${
            filter.positionDistance || 10000
          })`
        : undefined,
    },
  });
  return response.data;
}
