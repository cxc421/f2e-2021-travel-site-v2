import { axiosInstance } from "../axios-config";
import { UnsplashPicture } from "./picture-types";
type CurrentPicture = {
  collectionKey: string;
  picture: UnsplashPicture;
};

export async function getCurrentPicture(): Promise<CurrentPicture> {
  const response = await axiosInstance.get("/api/picture/current");
  return response.data;
}
