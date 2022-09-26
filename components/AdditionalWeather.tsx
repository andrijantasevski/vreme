import AdditionalWeatherSingle from "./AdditionalWeatherSingle"
import dayjs from "dayjs"
import "dayjs/locale/mk"

export default function AdditionalWeather({ weather, forecast }: any) {
    return (
        <section>
            <h2 className="text-gray-50 text-3xl mb-4">Додатни податоци</h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <AdditionalWeatherSingle weatherCondition="Изгрејсонце" numberWeatherCondition={dayjs.unix(weather.sys.sunrise).format("HH:mm")} iconWeatherCondition="/icons/animated-icons/sunrise.svg" />
                <AdditionalWeatherSingle weatherCondition="Зајдисонце" numberWeatherCondition={dayjs.unix(weather.sys.sunset).format("HH:mm")} iconWeatherCondition="/icons/animated-icons/sunset.svg" />
                <AdditionalWeatherSingle weatherCondition="УВ индекс" numberWeatherCondition={Math.ceil(forecast.current.uvi)} iconWeatherCondition={`${forecast.current.uvi === 0 ? "/icons/animated-icons/uv-index.svg" : "/icons/animated-icons/uv-index-" + forecast.current.uvi + ".svg"}`} />
                <AdditionalWeatherSingle weatherCondition="Ветер" numberWeatherCondition={Math.ceil(weather.wind.speed)} unitWeatherCondition={"m/s"} iconWeatherCondition="/icons/animated-icons/windsock.svg" />
                <AdditionalWeatherSingle weatherCondition="Влажност" numberWeatherCondition={weather.main.humidity} unitWeatherCondition={"%"} iconWeatherCondition="/icons/animated-icons/humidity.svg" />
            </div>
        </section>
    )
}