import axios from "axios";

const isBrowser = typeof window !== "undefined";

export const axiosInstance = axios.create({
  baseURL: "https://motc-server-220124.herokuapp.com/",
  // baseURL: "http://127.0.0.1:5000",
  headers: isBrowser ? {} : { "Accept-Encoding": "gzip" },
});
