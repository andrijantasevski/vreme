import Image from "next/image";
import dayjs from "dayjs";
import "dayjs/locale/mk";

interface Props {
  dayOfWeek: number;
  minTemp: number;
  maxTemp: number;
  icon: string;
}

const ForecastSingleDay: React.FC<Props> = ({
  dayOfWeek,
  minTemp,
  maxTemp,
  icon,
}) => {
  return (
    <div className="bg-primary-light flex justify-between items-center px-6 py-4 rounded-xl">
      <div>
        <p className="text-white text-xl capitalize mb-1">
          {dayjs.unix(dayOfWeek).locale("mk").format("dddd")}
        </p>
        <p className="text-gray-50 text-lg">
          {Math.floor(minTemp)}
          <span className="text-contrast">°C</span> / {Math.floor(maxTemp)}
          <span className="text-contrast">°C</span>
        </p>
      </div>

      <Image
        src={`/icons/animated-icons/${icon}.svg`}
        height="60"
        width="60"
        alt="Weather"
      />
    </div>
  );
};

export default ForecastSingleDay;
