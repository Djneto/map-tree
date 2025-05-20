import axios from "axios";

const ORS_API_KEY = process.env.NEXT_PUBLIC_ORS_API_KEY;

export async function getRouteBetweenPoints(
  start: [number, number],
  end: [number, number]
) {
  try {
    const response = await axios.post(
      "https://api.openrouteservice.org/v2/directions/driving-car/geojson",
      {
        coordinates: [start, end],
      },
      {
        headers: {
          Authorization: ORS_API_KEY!,
          "Content-Type": "application/json",
        },
      }
    );

    const coordinates = response.data.features[0].geometry.coordinates.map(
      ([lng, lat]: [number, number]) => [lat, lng]
    );

    return coordinates;
  } catch (error) {
    console.error("Erro ao buscar rota:", error);
    return [];
  }
}
