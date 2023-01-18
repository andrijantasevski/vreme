import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Searchbar from "../components/SearchBar";
import Overview from "../components/Overview";
import Next24Hours from "../components/Next24Hours";
import Forecast7Days from "../components/Forecast7Days";
import AdditionalWeather from "../components/AdditionalWeather";
import AirQuality from "../components/AirQuality";
import Footer from "../components/Footer";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { useState } from "react";
import getWeatherData, {
  CurrentWeather,
  Forecast,
} from "../utils/getWeatherData";
import getCoordinatesFromAPI from "../utils/getCoordinatesAPI";
import getCoordinatesFromBrowser from "../utils/getCoordinatesFromBrowser";

const Home: NextPage = () => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWeather(cityQuery: string) {
    setIsLoading(true);

    try {
      const { latitude, longitude } = await getCoordinatesFromAPI(cityQuery);

      const { aqi, currentWeather, forecast } = await getWeatherData(
        latitude,
        longitude
      );

      setWeather(currentWeather);
      setForecast(forecast);
      setAqi(aqi.list[0].main.aqi);
    } catch (err) {
      resetApp();
    } finally {
      setIsLoading(false);
    }
  }

  async function fetchLocationAndWeather() {
    setIsLoading(true);

    try {
      const { latitude, longitude } = await getCoordinatesFromBrowser();

      const { aqi, currentWeather, forecast } = await getWeatherData(
        latitude,
        longitude
      );

      setWeather(currentWeather);
      setForecast(forecast);
      setAqi(aqi.list[0].main.aqi);
    } catch (err) {
      resetApp();
    } finally {
      setIsLoading(false);
    }
  }

  function resetApp() {
    setWeather(null);
    setForecast(null);
    setAqi(null);
    setIsLoading(false);
  }

  function invalidateQueries() {
    setWeather(null);
    setForecast(null);
    setAqi(null);
  }

  return (
    <>
      <Head>
        <title>вреееме</title>
      </Head>
      <div
        className={`w-11/12 lg:w-6/12 xl:w-4/12 mx-auto flex flex-col ${
          weather && forecast && aqi
            ? "gap-5"
            : "h-screen justify-between gap-3"
        }`}
      >
        <Navbar
          fetchWeather={fetchWeather}
          weather={weather}
          forecast={forecast}
          resetApp={resetApp}
          invalidateQueries={invalidateQueries}
        />
        {!isLoading && !weather && !forecast && !aqi && (
          <Searchbar
            fetchWeather={fetchWeather}
            fetchLocationAndWeather={fetchLocationAndWeather}
          />
        )}
        {isLoading && <LoadingSkeleton />}
        {weather && forecast && aqi && <Overview weather={weather} />}
        {weather && forecast && aqi && <Next24Hours forecast={forecast} />}
        {weather && forecast && aqi && <Forecast7Days forecast={forecast} />}
        {weather && forecast && aqi && (
          <AdditionalWeather weather={weather} forecast={forecast} />
        )}
        {weather && forecast && aqi && <AirQuality aqi={aqi} />}
        <Footer />
      </div>
    </>
  );
};

export default Home;
