import { kdTree } from "kd-tree-javascript";
import { haversine } from "@/utils/geoUtils";
import { Conjunto } from "@/types/conjunto";
import { DadoGeografico } from "@/types/dadoGeografico";

interface Resultado {
  origem: DadoGeografico;
  destinos: Array<{
    destino: DadoGeografico;
    distanciaKm: number;
  }>;
}

export function calcularDistancias(
  origem: Conjunto,
  destino: Conjunto,
  tipo: "menor" | "raio",
  raioKm?: number
): Resultado[] {
  const tree = new kdTree(destino.dados, haversine, ["latitude", "longitude"]);

  return origem.dados.map((pontoOrigem) => {
    if (tipo === "menor") {
      const [maisProximo] = tree.nearest(pontoOrigem, 1);
      return {
        origem: pontoOrigem,
        destinos: [
          {
            destino: maisProximo[0],
            distanciaKm: maisProximo[1],
          },
        ],
      };
    }

    if (tipo === "raio") {
      const encontrados = tree.nearest(
        pontoOrigem,
        destino.dados.length,
        raioKm
      );
      return {
        origem: pontoOrigem,
        destinos: encontrados.map(([ponto, dist]) => ({
          destino: ponto,
          distanciaKm: dist,
        })),
      };
    }

    return {
      origem: pontoOrigem,
      destinos: [],
    };
  });
}
