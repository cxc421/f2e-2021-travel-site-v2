import { IntegratedData } from "../libs/types";
import { UnsplashPicture } from "../libs/picture-api/picture-types";
import { clearTimeout } from "timers";

export interface AttractionsData {
  defaultActivities: IntegratedData[];
  defaultRestaurants: IntegratedData[];
  bannerUrl: null | UnsplashPicture;
}

let data: AttractionsData | null = null;

export const fetchAttractionsData = async (): Promise<AttractionsData> => {
  // ToDo

  return {
    defaultActivities: [],
    defaultRestaurants: [],
    bannerUrl: null,
  };
};

export const preFetchAttractionData = () => {
  let alreadyPrefected = false;
  return () => {
    if (alreadyPrefected) return;
    if (data !== null) return;
    alreadyPrefected = true;

    fetchAttractionsData()
      .then((result) => {
        data = result;
      })
      .catch((err) => {
        console.error(err);
      });
  };
};

export const getAttractionsData = (): Promise<AttractionsData> =>
  new Promise((resolve, reject) => {
    let checkKey: NodeJS.Timeout;
    let errorKey: NodeJS.Timeout;

    const cleanAllTimer = () => {
      clearTimeout(checkKey);
      clearTimeout(errorKey);
    };

    const check = () => {
      if (data !== null) {
        cleanAllTimer();
        return resolve(data);
      }
      preFetchAttractionData();
      checkKey = setTimeout(check, 100);
    };

    errorKey = setTimeout(() => {
      cleanAllTimer();
      reject(`getAttractionsData() failed! time-out!`);
    }, 120000);
  });
