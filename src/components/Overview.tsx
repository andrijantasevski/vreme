import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/mk";
import { MapPinIcon } from "@heroicons/react/24/solid";
import { CurrentWeather } from "../utils/getWeatherData";

interface Props {
  weather: CurrentWeather;
}

const Overview: React.FC<Props> = ({ weather }) => {
  return (
    <div className="bg-primary-light flex flex-col justify-between gap-5 p-8 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-xl text-gray-50">Денес</p>
        <p className="text-lg text-gray-50 first-letter:capitalize">
          {dayjs().locale("mk").format("ddd, DD MMM")}
        </p>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <p className="text-6xl text-gray-50 mb-2">
            {Math.floor(weather.main.temp)}
            <span className="text-contrast">°C</span>
          </p>
          <p className="text-white capitalize">
            {weather.weather[0].description}
          </p>
        </div>

        <Image
          src={`/icons/animated-icons/${weather.weather[0].icon}.svg`}
          width="130"
          height="130"
          alt="ICON"
        />
      </div>

      <div className="flex gap-x-1 items-center">
        <MapPinIcon className="w-6 h-7 text-contrast" />
        <p className="text-white text-lg">{weather.name}</p>
      </div>
    </div>
  );
};

export default Overview;
