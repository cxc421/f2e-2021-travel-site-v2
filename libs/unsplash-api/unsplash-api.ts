import { createApi } from "unsplash-js";
import { Weather } from "../types";

const unsplash = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY!,
});

const unsplashCollectionIdMap = {
  "taiwan-day-clear": "J2PRB5VTHZU",
  "taiwan-day-rain": "UIoy0H5lXr4",
  "taiwan-twilight-clear": "mf0Pe7k452o",
  "taiwan-twilight-rain": "D4fPGEIYxGc",
  "taiwan-night-clear": "-njIzSGb__A",
  "taiwan-night-rain": "kreMLdmLcyg",
};

const getTimeText = (hour: number) => {
  if (hour >= 8 && hour <= 17) {
    return "day";
  }
  if (hour >= 20 || hour <= 5) {
    return "night";
  }
  return "twilight";
};

export const getImageByWheatherAndTime = (weather: Weather, hour: number) =>
  new Promise((resolve, reject) => {
    const collectionKey: keyof typeof unsplashCollectionIdMap = `taiwan-${getTimeText(
      hour
    )}-${weather}`;
    const collectionId = unsplashCollectionIdMap[collectionKey];
    console.log({ collectionId });

    if (!collectionId) {
      reject(`Cannot find collectionId by collectionKey=${collectionKey}`);
      return;
    }

    unsplash.photos
      .getRandom({
        count: 1,
        collectionIds: [collectionId],
      })
      .then((result) => {
        if (result.type === "success") {
          const { response } = result as any;
          const data = response[0];

          resolve({
            url_small: data.urls.small,
            url_regular: data.urls.regular,
          });
        } else {
          reject(result.errors[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  });
