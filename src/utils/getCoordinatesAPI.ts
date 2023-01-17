import { z } from "zod";

const currentCoordinatesSchema = z.array(
  z.object({
    lat: z.number(),
    lon: z.number(),
    name: z.string(),
    country: z.string(),
  })
);

export type CurrentCoordinates = z.infer<typeof currentCoordinatesSchema>;

export default async function getCoordinates(cityQuery: string) {
  const resLocation = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${cityQuery}&appid=${process.env.NEXT_PUBLIC_API_KEY}`
  );
  const dataLocation: CurrentCoordinates = await resLocation.json();
  const currentCoordinates = currentCoordinatesSchema.parse(dataLocation);
  const { lat: latitude, lon: longitude } = currentCoordinates[0];

  return {
    latitude,
    longitude,
  };
}
