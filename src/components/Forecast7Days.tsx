import { Forecast } from "../utils/getWeatherData";
import ForecastSingleDay from "./ForecastSingleDay";

interface Props {
  forecast: Forecast;
}

const Forecast7Days: React.FC<Props> = ({ forecast }) => {
  const forecast7Days = forecast.daily
    .slice(1)
    .map((day) => (
      <ForecastSingleDay
        key={day.dt}
        dayOfWeek={day.dt}
        minTemp={day.temp.min}
        maxTemp={day.temp.max}
        icon={day.weather[0].icon}
      />
    ));

  return (
    <section className="grid grid-cols-1 gap-y-4">
      <h2 className="text-gray-50 text-3xl">Следните 7 дена</h2>
      {forecast7Days}
    </section>
  );
};

export default Forecast7Days;
