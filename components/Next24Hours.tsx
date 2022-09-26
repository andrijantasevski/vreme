import Next24HoursSingle from './Next24HoursSingle';
import { Splide } from '@splidejs/react-splide';
import Image from 'next/image';
import '@splidejs/react-splide/css';

export default function Forecast7Days({ forecast }: any) {
    const next24hours = forecast.hourly.slice(1, 25).map((hour: any) => <Next24HoursSingle key={hour.dt} hourOfDay={hour.dt} temp={hour.temp} icon={hour.weather[0].icon} />)
    return (
        <section className="">
            <h2 className="text-gray-50 text-3xl mb-4">Следните 24 часа</h2>
            <Splide options={{
                arrows: false,
                pagination: false,
                perPage: 3,
                gap: "2rem",
                drag: "free"
            }}>
                {next24hours}
            </Splide>
        </section>
    )
}