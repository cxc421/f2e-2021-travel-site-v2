import { Coordinate } from "../libs/types";

export const getGpsLocation = (): Promise<Coordinate> =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        reject(error.message);
      },
      { enableHighAccuracy: true }
    );
  });
