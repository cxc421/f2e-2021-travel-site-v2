import axios, { AxiosRequestHeaders } from "axios";
import jsSHA from "jssha";

const APP_ID = process.env.NEXT_PUBLIC_APP_ID || "";
const APP_KEY = process.env.NEXT_PUBLIC_APP_KEY || "";

const getAuthorizationHeader = function (
  appID: string,
  appKey: string
): AxiosRequestHeaders {
  const UTCString = new Date().toUTCString();
  const shaObj = new jsSHA("SHA-1", "TEXT");
  shaObj.setHMACKey(appKey, "TEXT");
  shaObj.update("x-date: " + UTCString);
  const HMAC = shaObj.getHMAC("B64");
  const Authorization = `hmac username="${appID}", algorithm="hmac-sha1", headers="x-date", signature="${HMAC}"`;

  const isBrowser = typeof window !== "undefined";

  return isBrowser
    ? {
        Authorization: Authorization,
        "X-Date": UTCString,
      }
    : {
        Authorization: Authorization,
        "X-Date": UTCString,
        "Accept-Encoding": "gzip",
      };
};

export const axiosInstance = axios.create({
  baseURL: "https://ptx.transportdata.tw/MOTC",
  headers: getAuthorizationHeader(APP_ID, APP_KEY),
});
