import { Conjunto } from "@/types/conjunto";

interface CalculoPayload {
  origem: Conjunto;
  destino: Conjunto;
  tipo: "menor" | "raio";
  raioKm?: number;
}

export async function calcularDistancia(payload: CalculoPayload) {
  const res = await fetch("/api/calculos/distancia", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erro no cálculo de distância");
  }

  return data.resultados;
}
