import { NextRequest, NextResponse } from "next/server";
import { calcularDistancias } from "@/services/backend/distancia.service";
import { Conjunto } from "@/types/conjunto";
import { buscarRota } from "@/services/backend/rota.service";

export async function POST(req: NextRequest) {
  try {
    const { origem, destino, tipo, raioKm } = (await req.json()) as {
      origem: Conjunto;
      destino: Conjunto;
      tipo: "menor" | "raio";
      raioKm?: number;
    };

    const resultadosDistancia = calcularDistancias(
      origem,
      destino,
      tipo,
      raioKm
    );

    const rotasCompletas = await Promise.all(
      resultadosDistancia.flatMap(async (item) => {
        const origem = item.origem;

        // Caso tipo "menor", pega apenas o mais próximo
        if (tipo === "menor") {
          const destinoMaisProximo = item.destinos[0]?.destino;
          if (!destinoMaisProximo) return [];

          const rota = await buscarRota(origem, destinoMaisProximo);
          return [
            {
              origem,
              destino: destinoMaisProximo,
              distanciaKm: item.destinos[0].distanciaKm,
              rota,
            },
          ];
        }

        // Caso tipo "raio", retorna todas as rotas dentro do raio
        return await Promise.all(
          item.destinos.map(async ({ destino, distanciaKm }) => {
            const rota = await buscarRota(origem, destino);
            return {
              origem,
              destino,
              distanciaKm,
              rota,
            };
          })
        );
      })
    );

    return NextResponse.json({
      resultados: rotasCompletas.flat().filter(Boolean),
    });
  } catch (error) {
    console.error("[API - Rota] Erro:", error);
    return NextResponse.json(
      { error: "Erro ao calcular rotas" },
      { status: 500 }
    );
  }
}
