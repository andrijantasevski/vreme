import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CurrentWeather, Forecast } from "../utils/getWeatherData";
import SearchDropdown from "./SearchDropdown";

interface Props {
  fetchWeather: (
    getCoordinates: (
      cityQuery?: string
    ) => Promise<{ latitude: number; longitude: number }>,
    cityQuery: string
  ) => void;
  weather: CurrentWeather | null;
  forecast: Forecast | null;
  resetApp: () => void;
  invalidateQueries: () => void;
}

const Navbar: React.FC<Props> = ({
  fetchWeather,
  forecast,
  weather,
  invalidateQueries,
  resetApp,
}) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen((prevSearch) => !prevSearch);
  };

  const goHome = () => {
    resetApp();
    setIsSearchOpen(false);
  };

  return (
    <header className="relative">
      <nav className="pt-4 flex justify-between items-center">
        <Link
          href="/"
          onClick={goHome}
          className="inline-flex gap-x-2 items-center"
        >
          <Image
            alt="Logo image"
            src="/icons/animated-icons/01d.svg"
            width="50"
            height="50"
          ></Image>
          <p className="inline-block text-gray-50 text-2xl">вреееме</p>
        </Link>

        {weather && forecast && (
          <button
            onClick={toggleSearch}
            className="bg-contrast px-3 py-2 rounded-lg h-full text-xl cursor-pointer"
            aria-label={
              isSearchOpen ? "Затвори барање на град" : "Отвори барање на град"
            }
            title={
              isSearchOpen ? "Затвори барање на град" : "Отвори барање на град"
            }
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-primary" />
          </button>
        )}
      </nav>
      {isSearchOpen && (
        <SearchDropdown
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
          fetchWeather={fetchWeather}
          invalidateQueries={invalidateQueries}
        />
      )}
    </header>
  );
};

export default Navbar;
