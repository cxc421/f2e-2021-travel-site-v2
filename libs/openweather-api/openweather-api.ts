import axios from "axios";
import { Weather } from "../types";

export const getCurrentWeather = async (): Promise<Weather> => {
  const city = `Taipei`;
  const appid = process.env.OPENWEATHER_API_KEY;
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${appid}`
    );
    const MainWeather = response.data.weather[0].main;
    // console.log({ MainWeather });
    if (
      MainWeather === "Thunderstorm" ||
      MainWeather === "Drizzle" ||
      MainWeather === "Rain"
    ) {
      return "rain";
    } else {
      return "clear";
    }
  } catch (err) {
    console.error(err);
    return "clear";
  }
};
