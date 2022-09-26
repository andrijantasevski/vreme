import Image from 'next/image';
import { SplideSlide } from '@splidejs/react-splide';
import dayjs from 'dayjs';
import "dayjs/locale/mk"

type Next24Hours = {
    hourOfDay: number,
    temp: number,
    icon: string
}

export default function Next24HoursSingle({ hourOfDay, temp, icon }: Next24Hours) {
    return (
        <SplideSlide>
            <div className="flex flex-col items-center justify-center py-4 px-4 bg-[#1D1D48] rounded-xl">
                <p className="text-gray-50">{dayjs.unix(hourOfDay).locale("mk").format("HH:00")}</p>
                <Image src={`/icons/animated-icons/${icon}.svg`} width="60" height="60" />
                <p className="text-gray-50 text-lg">{Math.floor(temp)}<span className="text-[#ECA914]">°C</span></p>
            </div>
        </SplideSlide>
    )
}