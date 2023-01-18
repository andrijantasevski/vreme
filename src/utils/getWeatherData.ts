import { z } from "zod";

const currentWeatherSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  weather: z.array(
    z.object({
      id: z.number(),
      main: z.string(),
      description: z.string(),
      icon: z.string(),
    })
  ),
  base: z.string(),
  main: z.object({
    temp: z.number(),
    feels_like: z.number(),
    temp_min: z.number(),
    temp_max: z.number(),
    pressure: z.number(),
    humidity: z.number(),
  }),
  visibility: z.number(),
  wind: z.object({
    speed: z.number(),
    deg: z.number(),
  }),
  clouds: z.object({
    all: z.number(),
  }),
  dt: z.number(),
  sys: z.object({
    type: z.number().optional(),
    id: z.number().optional(),
    country: z.string(),
    sunrise: z.number(),
    sunset: z.number(),
  }),
  timezone: z.number(),
  id: z.number(),
  name: z.string(),
  cod: z.number(),
});

export type CurrentWeather = z.infer<typeof currentWeatherSchema>;

const forecastSchema = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: z.object({
    dt: z.number(),
    sunrise: z.number(),
    sunset: z.number(),
    temp: z.number(),
    feels_like: z.number(),
    pressure: z.number(),
    humidity: z.number(),
    dew_point: z.number(),
    uvi: z.number(),
    clouds: z.number(),
    visibility: z.number(),
    wind_speed: z.number(),
    wind_deg: z.number(),
    weather: z.array(
      z.object({
        id: z.number(),
        main: z.string(),
        description: z.string(),
        icon: z.string(),
      })
    ),
    rain: z
      .object({
        "1h": z.number(),
      })
      .optional(),
  }),
  hourly: z.array(
    z.object({
      dt: z.number(),
      temp: z.number(),
      feels_like: z.number(),
      pressure: z.number(),
      humidity: z.number(),
      dew_point: z.number(),
      uvi: z.number(),
      clouds: z.number(),
      visibility: z.number(),
      wind_speed: z.number(),
      wind_deg: z.number(),
      weather: z.array(
        z.object({
          id: z.number(),
          main: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      ),
      pop: z.number(),
      snow: z
        .object({
          "1h": z.number(),
        })
        .optional(),
      rain: z
        .object({
          "1h": z.number(),
        })
        .optional(),
    })
  ),
  daily: z.array(
    z.object({
      dt: z.number(),
      sunrise: z.number(),
      sunset: z.number(),
      moonrise: z.number(),
      moonset: z.number(),
      moon_phase: z.number(),
      temp: z.object({
        day: z.number(),
        min: z.number(),
        max: z.number(),
        night: z.number(),
        eve: z.number(),
        morn: z.number(),
      }),
      feels_like: z.object({
        day: z.number(),
        night: z.number(),
        eve: z.number(),
        morn: z.number(),
      }),
      pressure: z.number(),
      humidity: z.number(),
      dew_point: z.number(),
      wind_speed: z.number(),
      wind_deg: z.number(),
      wind_gust: z.number(),
      weather: z.array(
        z.object({
          id: z.number(),
          main: z.string(),
          description: z.string(),
          icon: z.string(),
        })
      ),
      clouds: z.number(),
      pop: z.number(),
      uvi: z.number(),
      rain: z.number().optional(),
      snow: z.number().optional(),
    })
  ),
});

export type Forecast = z.infer<typeof forecastSchema>;

const aqiSchema = z.object({
  coord: z.object({
    lon: z.number(),
    lat: z.number(),
  }),
  list: z.array(
    z.object({
      main: z.object({
        aqi: z.number(),
      }),
      components: z.object({
        co: z.number(),
        no: z.number(),
        no2: z.number(),
        o3: z.number(),
        so2: z.number(),
        pm2_5: z.number(),
        pm10: z.number(),
        nh3: z.number(),
      }),
    })
  ),
});

export type Aqi = z.infer<typeof aqiSchema>;

export default async function getWeatherData(
  latitude: number,
  longitude: number
) {
  const resCurrentWeather = await fetch(`
    https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=mk&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`);
  const dataCurrentWeather = await resCurrentWeather.json();
  const currentWeather = currentWeatherSchema.parse(dataCurrentWeather);

  const resForecast = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&lang=mk&exclude=minutely,alerts&units=metric&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const dataForecast = await resForecast.json();
  const forecast = forecastSchema.parse(dataForecast);

  const resAqi = await fetch(
    `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const dataAqi = await resAqi.json();
  const aqi = aqiSchema.parse(dataAqi);

  return {
    currentWeather,
    forecast,
    aqi,
  };
}
