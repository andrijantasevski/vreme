import Image from "next/image"
import dayjs from "dayjs"
import "dayjs/locale/mk"

type ForecastSingleDay = {
    dayOfWeek: number,
    minTemp: number,
    maxTemp: number,
    icon: string
}

export default function ForecastSingleDay({ dayOfWeek, minTemp, maxTemp, icon }: ForecastSingleDay) {

    return (
        <div className="bg-[#1D1D48] flex justify-between items-center px-6 py-4 rounded-xl">
            <div>
                <p className="text-white text-xl capitalize mb-1">{dayjs.unix(dayOfWeek).locale("mk").format("dddd")}</p>
                <p className="text-gray-50 text-lg">{Math.floor(minTemp)}<span className="text-[#ECA914]">°C</span> / {Math.floor(maxTemp)}<span className="text-[#ECA914]">°C</span></p>
            </div>

            <Image src={`/icons/animated-icons/${icon}.svg`} height="60" width="60" />
        </div>
    )
}