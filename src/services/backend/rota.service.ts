import { DadoGeografico } from "@/types/dadoGeografico";

const API_KEY = process.env.NEXT_PUBLIC_ORS_API_KEY!;

export async function buscarRota(
  origem: DadoGeografico,
  destino: DadoGeografico
) {
  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origem.longitude},${origem.latitude}&end=${destino.longitude},${destino.latitude}`;

  const res = await fetch(url, {
    method: "GET",
    headers: {
      Accept:
        "application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8",
    },
  });

  if (!res.ok) {
    console.error("Erro ao buscar rota:", await res.text());
    throw new Error("Erro ao consultar rota com OpenRouteService");
  }

  const data = await res.json();
  return {
    duracaoMinutos: data.features[0].properties.summary.duration / 60,
    coordenadas: data.features[0].geometry.coordinates, // [lon, lat] em sequência
  };
}
