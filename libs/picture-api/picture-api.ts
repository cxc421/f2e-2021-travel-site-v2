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

type PictureWithId = {
  id: string;
  picture: UnsplashPicture;
};

export async function getPictureById(id: string): Promise<PictureWithId> {
  const response = await axiosInstance.get("/api/picture", {
    params: { id },
  });
  return response.data;
}
