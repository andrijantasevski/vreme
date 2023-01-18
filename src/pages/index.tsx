import type { NextPage } from "next";
import Head from "next/head";

import {
  Navbar,
  Searchbar,
  Overview,
  Next24Hours,
  Forecast7Days,
  AdditionalWeather,
  AirQuality,
  Footer,
  LoadingSkeleton,
} from "../components/";

import { useState } from "react";
import getWeatherData, {
  CurrentWeather,
  Forecast,
} from "../utils/getWeatherData";

const Home: NextPage = () => {
  const [weather, setWeather] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [aqi, setAqi] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchWeather(
    getCoordinates: (
      cityQuery?: string
    ) => Promise<{ latitude: number; longitude: number }>,
    cityQuery?: string
  ) {
    setIsLoading(true);

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
          <Searchbar fetchWeather={fetchWeather} />
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
