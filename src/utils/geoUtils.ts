import { DadoGeografico } from "@/types/dadoGeografico";

export function haversine(a: DadoGeografico, b: DadoGeografico): number {
  const toRad = (val: number) => (val * Math.PI) / 180;
  const R = 6371;
  const lat1 = parseFloat(a.latitude);
  const lon1 = parseFloat(a.longitude);
  const lat2 = parseFloat(b.latitude);
  const lon2 = parseFloat(b.longitude);

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const rlat1 = toRad(lat1);
  const rlat2 = toRad(lat2);

  const aCalc =
    Math.sin(dLat / 2) ** 2 +
    Math.sin(dLon / 2) ** 2 * Math.cos(rlat1) * Math.cos(rlat2);
  const c = 2 * Math.atan2(Math.sqrt(aCalc), Math.sqrt(1 - aCalc));

  return R * c;
}
