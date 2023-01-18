import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useForm, SubmitHandler } from "react-hook-form";
import { CurrentWeather, Forecast } from "../utils/getWeatherData";

type Inputs = {
  cityQuery: string;
};

interface Props {
  fetchWeather: (cityQuery: string) => void;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Inputs>();
  const [searchNav, setSearchNav] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    fetchWeather(data.cityQuery);
    setSearchNav(false);
    invalidateQueries();
    reset();
  };

  return (
    <header className="relative">
      <nav className="pt-4 flex justify-between items-center">
        <Link
          href="/"
          onClick={resetApp}
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
            onClick={() => setSearchNav((prevSearch) => !prevSearch)}
            className="bg-[#ECA914] px-3 py-2 rounded-lg h-full text-xl cursor-pointer"
          >
            <MagnifyingGlassIcon className="w-6 h-6 text-[#101039]" />
          </button>
        )}
      </nav>
      {searchNav && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="absolute w-full py-2 pr-2 right-0 border-2 mt-4 flex bg-gray-50 rounded-lg"
        >
          <input
            {...register("cityQuery", {
              required: true,
              pattern: /^[A-Za-z-\s]*$/,
            })}
            className="w-full rounded-lg bg-transparent border-0 focus:ring-0"
            type="search"
            placeholder="Внесете град"
          />
          <button className="bg-[#ECA914] text-[#101039] px-3 py-2 rounded-lg">
            Барајте
          </button>
        </form>
      )}
    </header>
  );
};

export default Navbar;
