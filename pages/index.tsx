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

type CityQuery = {
  cityQuery: string;
};
const Home: NextPage = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [aqi, setAqi] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState(true);

  async function fetchWeather(cityQuery: CityQuery) {
    setIsLoading((prevLoading) => !prevLoading);
    setSearch((prevSearch) => !prevSearch);
    try {
      const resLocation = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const dataLocation = await resLocation.json();
      const [location] = dataLocation;
      const { lat, lon } = location;

      const resCurrentWeather = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&lang=mk&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
      const dataCurrentWeather = await resCurrentWeather.json();
      setWeather(dataCurrentWeather);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&lang=mk&exclude=minutely,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const dataForecast = await resForecast.json();
      setForecast(dataForecast);

      const resAqi = await fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      const dataAqi = await resAqi.json();
      setAqi(dataAqi.list[0].main.aqi);
    } catch (err) {
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
      (data) => {
        const { latitude, longitude } = data.coords;

        async function getWeather() {
          try {
            const resCurrentWeather = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=mk&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
            const dataCurrentWeather = await resCurrentWeather.json();
            setWeather(dataCurrentWeather);

            const resForecast = await fetch(
              `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=mk&exclude=minutely,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
            );
            const dataForecast = await resForecast.json();
            setForecast(dataForecast);

            const resAqi = await fetch(
              `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
            );
            const dataAqi = await resAqi.json();
            setAqi(dataAqi.list[0].main.aqi);
          } catch (err) {
            console.log(err);
          } finally {
            setIsLoading((prevLoading) => !prevLoading);
          }
        }

        getWeather();
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
          weather && forecast ? "gap-5" : "h-screen justify-between gap-3"
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
