interface Props {
  aqi: number;
}

const AirQuality: React.FC<Props> = ({ aqi }) => {
  let aqiProgress;

  switch (aqi) {
    case 1:
      aqiProgress = "w-1/5 bg-green-600";
      break;
    case 2:
      aqiProgress = "w-2/5 bg-yellow-500";
      break;
    case 3:
      aqiProgress = "w-3/5 bg-yellow-500";
      break;
    case 4:
      aqiProgress = "w-4/5 bg-red-600";
      break;
    case 5:
      aqiProgress = "w-5/5 bg-red-600";
      break;
  }

  return (
    <section className="bg-primary-light p-6 rounded-xl grid grid-cols-1 gap-y-5">
      <h2 className="text-gray-50 text-3xl">Квалитет на воздухот</h2>
      <p className="text-gray-50 text-4xl">
        {aqi} <span className="text-contrast">AQI</span>
      </p>
      <div className="bg-[#23214B] p-4 rounded-xl">
        <div className="flex justify-between items-center mb-2">
          <p className="text-white text-lg">Добро</p>
          <p className="text-white text-lg">Лошо</p>
          <p className="text-white text-lg">Опасно</p>
        </div>
        <div className="bg-gray-50 h-2 rounded-xl">
          <div className={`h-2 rounded-xl ${aqiProgress}`}></div>
        </div>
      </div>
    </section>
  );
};

export default AirQuality;
