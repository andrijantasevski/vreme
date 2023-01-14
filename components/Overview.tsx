import Image from "next/image"
import dayjs from "dayjs";
import "dayjs/locale/mk"
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function Overview({ weather }: any) {
    return (
        <div className="bg-[#1D1D48] flex flex-col justify-between gap-5 p-8 rounded-lg">
            <div className="flex justify-between items-center">
                <p className="text-xl text-gray-50">Денес</p>
                <p className="text-lg text-gray-50 first-letter:capitalize">{dayjs().locale("mk").format("ddd, DD MMM")}</p>
            </div>

            <div className="flex justify-between items-center">
                <div>
                    <p className="text-6xl text-gray-50 mb-2">{Math.floor(weather.main.temp)}<span className="text-[#ECA914]">°C</span></p>
                    <p className="text-white capitalize">{weather.weather[0].description}</p>
                </div>

                <Image src={`/icons/animated-icons/${weather.weather[0].icon}.svg`} width="130" height="130" alt="ICON" />
            </div>

            <div className="flex gap-x-1 items-center">
                <MapPinIcon className="w-6 h-7 text-[#ECA914]" />
                <p className="text-white text-lg">{weather.name}</p>
            </div>
        </div>
    )
}