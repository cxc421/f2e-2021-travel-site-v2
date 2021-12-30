import axios, { AxiosInstance } from "axios";
import jsSHA from "jssha";

const getAuthorizationHeader = function (appID: string, appKey: string) {
  const UTCString = new Date().toUTCString();
  const shaObj = new jsSHA("SHA-1", "TEXT");
  shaObj.setHMACKey(appKey, "TEXT");
  shaObj.update("x-date: " + UTCString);
  const HMAC = shaObj.getHMAC("B64");
  const Authorization = `hmac username="${appID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  return {
    Authorization: Authorization,
    "X-Date": UTCString,
    "Accept-Encoding": "gzip",
  };
};

export type ActivityFilter = {
  $top: number;
  $skip?: number;
};

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

export default class TdxApi {
  private axiosInstance: AxiosInstance;
  constructor(appID: string, appKey: string) {
    this.axiosInstance = axios.create({
      baseURL: "https://ptx.transportdata.tw/MOTC",
      headers: getAuthorizationHeader(appID, appKey),
    });
  }

  getActivity(
    filter: ActivityFilter,
    needPicture = false
  ): Promise<Activity[]> {
    return new Promise((resolve, reject) => {
      const query = ($skip: number, $top: number) =>
        this.axiosInstance.get("/v2/Tourism/Activity", {
          params: {
            $top,
            $skip,
            $format: "JSON",
            $orderby: "EndTime",
            $filter: `date(EndTime) ge ${new Date().toISOString()}`,
          },
        });

      if (!needPicture) {
        query(filter.$skip || 0, filter.$top)
          .then((res) => {
            resolve(res.data);
          })
          .catch((error) => {
            reject(error);
          });
      } else {
        let activityList: Activity[] = [];
        let loopCount = 0;

        const loop = async ($skip = 0) => {
          const queryNum = 20;
          loopCount++;

          try {
            const data = (await query($skip, queryNum)).data as Activity[];
            const dataHavePicture = data.filter(
              (activity) =>
                activity.Picture.PictureUrl1 &&
                activity.Picture.PictureDescription1
            );
            activityList = activityList.concat(
              dataHavePicture.slice(0, filter.$top - activityList.length)
            );
            if (activityList.length < filter.$top && data.length >= queryNum) {
              loop($skip + queryNum);
            } else {
              console.log({ loopCount });
              resolve(activityList);
            }
          } catch (error) {
            console.log({ loopCount });
            reject(error);
          }
        };

        loop(filter.$skip);
      }
    });
  }
}
