import Image from "next/image";

interface Props {
  weatherCondition: string;
  numberWeatherCondition: number | string;
  unitWeatherCondition?: string;
  iconWeatherCondition: string;
}
const AdditionalWeatherSingle: React.FC<Props> = ({
  weatherCondition,
  numberWeatherCondition,
  unitWeatherCondition,
  iconWeatherCondition,
}) => {
  return (
    <div className="bg-primary-light p-4 rounded-xl">
      <div className="flex justify-between items-center">
        <Image
          src={iconWeatherCondition}
          width="50"
          height="50"
          alt={weatherCondition}
        />
        <p className="text-gray-50 text-lg">{weatherCondition}</p>
      </div>

      <p className="text-right text-gray-50 text-3xl">
        {numberWeatherCondition}{" "}
        <span className="text-contrast">{unitWeatherCondition}</span>
      </p>
    </div>
  );
};

export default AdditionalWeatherSingle;
