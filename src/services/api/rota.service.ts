import { Conjunto } from "@/types/conjunto";

interface CalculoPayload {
  origem: Conjunto;
  destino: Conjunto;
  tipo: "menor" | "raio";
  raioKm?: number;
}

export async function calcularRota(payload: CalculoPayload) {
  const res = await fetch("/api/calculos/rota", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error || "Erro no cálculo de rota");
  }

  return data.resultados;
}
