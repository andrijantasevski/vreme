import Image from "next/image";
import { SplideSlide } from "@splidejs/react-splide";
import dayjs from "dayjs";
import "dayjs/locale/mk";

interface Props {
  hourOfDay: number;
  temp: number;
  icon: string;
}

const Next24HoursSingle: React.FC<Props> = ({ hourOfDay, temp, icon }) => {
  return (
    <SplideSlide>
      <div className="flex flex-col items-center justify-center py-4 px-4 bg-primary-light rounded-xl">
        <p className="text-gray-50">
          {dayjs.unix(hourOfDay).locale("mk").format("HH:00")}
        </p>
        <Image
          src={`/icons/animated-icons/${icon}.svg`}
          width="60"
          height="60"
          alt="Icon"
        />
        <p className="text-gray-50 text-lg">
          {Math.floor(temp)}
          <span className="text-contrast">°C</span>
        </p>
      </div>
    </SplideSlide>
  );
};

export default Next24HoursSingle;
