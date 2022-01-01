/* eslint-disable @next/next/no-img-element */
import type {
  GetServerSideProps,
  GetStaticProps,
  InferGetServerSidePropsType,
  NextPage,
} from "next";
import { useRef, useState } from "react";
import cities from "../../constants/cities";
import { getActivity, Activity } from "../../libs/tdxApi/apis/activity";
import { Coordinate } from "../../libs/types";

interface TourismPageProps {
  defaultActivities: Activity[];
}

export const getServerSideProps: GetServerSideProps<TourismPageProps> =
  async () => {
    let defaultActivities: Activity[] = [];
    try {
      defaultActivities = await getActivity({
        $top: 4,
        city: "all",
        curDate: new Date(),
        needImage: true,
      });
    } catch (err) {
      console.error(err);
    }

    return {
      props: {
        defaultActivities,
      },
    };
  };

type Category = "all" | "tourism" | "activity";

const Tourism: NextPage<TourismPageProps> = ({ defaultActivities }) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchDate, setSearchDate] = useState<null | Date>(null);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState<Category>("all");
  const [city, setCity] = useState("all");
  const [coordiante, setCoordinate] = useState<null | Coordinate>(null);
  const [activityList, setActivityList] =
    useState<Activity[]>(defaultActivities);

  const handleClickLocationButton = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      setSearchDate(new Date());
      setCoordinate({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    });
  };

  console.log(defaultActivities);

  const handleClickSearchButton = () => {
    if (searchInputRef.current) {
      setSearchDate(new Date());
      setKeyword(searchInputRef.current.value);
      searchInputRef.current.value = "";
    }
  };

  const handleCategoryChange = (newCategory: Category) => {
    setSearchDate(new Date());
    setCategory(newCategory);
  };

  const handleCityChange = (newCity: string) => {
    setSearchDate(new Date());
    setCity(newCity);
  };

  return (
    <div>
      <h1>Tourism</h1>
      <hr />
      <section>
        <p>
          <input type="search" ref={searchInputRef} />
          <button onClick={handleClickSearchButton}>Search</button>
        </p>
        <p>
          <select
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value as Category)}
          >
            <option value="all">不分類別</option>
            <option value="tourism">景點</option>
            <option value="activity">活動</option>
          </select>
          <select
            value={city}
            onChange={(e) => handleCityChange(e.target.value)}
          >
            <option value="all">不分縣市</option>
            {cities.map((city) => (
              <option key={city.value} value={city.value}>
                {city.text}
              </option>
            ))}
          </select>
          <button onClick={handleClickLocationButton}>定位</button>
        </p>
      </section>
      <hr />
      <section>
        <h2>熱門景點:</h2>
        {activityList.map((activity) => (
          <div key={activity.ActivityID}>
            <h3>{activity.ActivityName}</h3>
            <img
              src={activity.Picture.PictureUrl1}
              alt={activity.Picture.PictureDescription1}
              height={150}
            />
            <p>{activity.Description}</p>
            <p>{activity.Location}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Tourism;
