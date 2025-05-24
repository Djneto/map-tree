import { NextRequest, NextResponse } from "next/server";
import { calcularDistancias } from "@/services/backend/distancia.service";
import { Conjunto } from "@/types/conjunto";

export async function POST(req: NextRequest) {
  try {
    const { origem, destino, tipo, raioKm } = (await req.json()) as {
      origem: Conjunto;
      destino: Conjunto;
      tipo: "menor" | "raio";
      raioKm?: number;
    };

    const resultados = calcularDistancias(origem, destino, tipo, raioKm);
    return NextResponse.json({ resultados });
  } catch (error) {
    console.error("[API - Distância] Erro:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}
