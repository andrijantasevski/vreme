import Image from "next/image";

export default function AdditionalWeatherSingle({
  weatherCondition,
  numberWeatherCondition,
  unitWeatherCondition,
  iconWeatherCondition,
}: any) {
  return (
    <div className="bg-[#1D1D48] p-4 rounded-xl">
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
        <span className="text-[#ECA914]">{unitWeatherCondition}</span>
      </p>
    </div>
  );
}
