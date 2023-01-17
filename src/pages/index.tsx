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
import getCoordinates from "../utils/getCoordinatesAPI";

const Home: NextPage = () => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(true);

  async function fetchWeather(cityQuery: string) {
    setIsLoading((prevLoading) => !prevLoading);
    setSearch((prevSearch) => !prevSearch);

    function getPosition() {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(
          (data) => resolve(data.coords),
          reject
        );
      });
    }

    const position = await getPosition();

    console.log(position);

    try {
      const { latitude, longitude } = await getCoordinates(cityQuery);

      const { aqi, currentWeather, forecast } = await getWeatherData(
        latitude,
        longitude
      );

      setWeather(currentWeather);
      setForecast(forecast);
      setAqi(aqi.list[0].main.aqi);
    } catch (err) {
      console.log(err);
      if (err) {
        resetApp();
      }
    } finally {
      setIsLoading((prevLoading) => !prevLoading);
    }
  }

  function fetchLocationAndWeather() {
    setIsLoading((prevLoading) => !prevLoading);
    setSearch((prevSearch) => !prevSearch);

    navigator.geolocation.getCurrentPosition(
      async (data) => {
        const { latitude, longitude } = data.coords;

        try {
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
          setIsLoading((prevLoading) => !prevLoading);
        }
      },
      (err) => {
        if (err.message) {
          resetApp();
        }
      }
    );
  }

  function resetApp() {
    setWeather(null);
    setForecast(null);
    setAqi(null);
    setIsLoading(false);
    setSearch(true);
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
          setSearch={setSearch}
        />
        {search && (
          <Searchbar
            fetchWeather={fetchWeather}
            fetchLocationAndWeather={fetchLocationAndWeather}
          />
        )}
        {!search && !weather && !forecast && <LoadingSkeleton />}
        {weather && forecast && <Overview weather={weather} />}
        {weather && forecast && <Next24Hours forecast={forecast} />}
        {weather && forecast && <Forecast7Days forecast={forecast} />}
        {weather && forecast && (
          <AdditionalWeather weather={weather} forecast={forecast} />
        )}
        {weather && forecast && <AirQuality aqi={aqi} />}
        <Footer />
      </div>
    </>
  );
};

export default Home;
