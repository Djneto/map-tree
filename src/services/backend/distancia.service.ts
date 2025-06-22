import { haversine } from "@/utils/geoUtils";
import { Conjunto } from "@/types/conjunto";
import { DadoGeografico } from "@/types/dadoGeografico";

// Interface do resultado de cálculo de distâncias
interface Resultado {
  origem: DadoGeografico;
  destinos: Array<{
    destino: DadoGeografico;
    distanciaKm: number;
  }>;
}

// ========================= KD-Tree =========================
// Implementação de KD-Tree para 2D (latitude, longitude)
// Cada nó armazena um ponto geográfico e referências para subárvores esquerda/direita
class KDNode {
  point: DadoGeografico; // Ponto armazenado neste nó
  left: KDNode | null; // Subárvore à esquerda
  right: KDNode | null; // Subárvore à direita
  axis: number; // Eixo de divisão: 0 = latitude, 1 = longitude
  constructor(point: DadoGeografico, axis: number) {
    this.point = point;
    this.left = null;
    this.right = null;
    this.axis = axis;
  }
}

// Estrutura principal da KD-Tree
class KDTree {
  root: KDNode | null;
  constructor(points: DadoGeografico[]) {
    // Constrói a árvore recursivamente a partir dos pontos
    this.root = this.buildTree(points, 0);
  }

  // Função recursiva para construir a árvore
  private buildTree(points: DadoGeografico[], depth: number): KDNode | null {
    if (points.length === 0) return null;
    const axis = depth % 2; // Alterna entre latitude (0) e longitude (1)
    // Ordena os pontos pelo eixo atual
    const sorted = points.slice().sort((a, b) => {
      const aVal =
        axis === 0 ? parseFloat(a.latitude) : parseFloat(a.longitude);
      const bVal =
        axis === 0 ? parseFloat(b.latitude) : parseFloat(b.longitude);
      return aVal - bVal;
    });
    const median = Math.floor(sorted.length / 2);
    // Nó atual é o ponto mediano
    const node = new KDNode(sorted[median], axis);
    // Recursivamente constrói subárvores esquerda e direita
    node.left = this.buildTree(sorted.slice(0, median), depth + 1);
    node.right = this.buildTree(sorted.slice(median + 1), depth + 1);
    return node;
  }

  // Busca do vizinho mais próximo de um ponto
  nearest(point: DadoGeografico): [DadoGeografico, number] | null {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let best: any = null;
    // Função recursiva de busca
    function search(node: KDNode | null, depth: number) {
      if (!node) return;
      const axis = node.axis;
      // Valor do ponto no eixo atual
      const nodeVal =
        axis === 0
          ? parseFloat(node.point.latitude)
          : parseFloat(node.point.longitude);
      const pointVal =
        axis === 0 ? parseFloat(point.latitude) : parseFloat(point.longitude);
      // Calcula a distância geodésica entre o ponto de busca e o nó atual
      const dist = haversine(point, node.point);
      // Atualiza o melhor ponto encontrado, se necessário
      if (!best || dist < best.dist) {
        best = { point: node.point, dist };
      }
      const diff = pointVal - nodeVal;
      // Decide qual subárvore explorar primeiro
      const [first, second] =
        diff < 0 ? [node.left, node.right] : [node.right, node.left];
      search(first, depth + 1);
      // Explora a outra subárvore se pode haver um ponto mais próximo
      if (Math.abs(diff) < (best ? best.dist : Infinity)) {
        search(second, depth + 1);
      }
    }
    search(this.root, 0);
    return best ? [best.point, best.dist] : null;
  }

  // Busca todos os pontos dentro de um raio (em km) a partir de um ponto
  withinRadius(
    point: DadoGeografico,
    raioKm: number
  ): Array<[DadoGeografico, number]> {
    const result: Array<[DadoGeografico, number]> = [];
    // Função recursiva de busca
    function search(node: KDNode | null, depth: number) {
      if (!node) return;
      const axis = node.axis;
      const nodeVal =
        axis === 0
          ? parseFloat(node.point.latitude)
          : parseFloat(node.point.longitude);
      const pointVal =
        axis === 0 ? parseFloat(point.latitude) : parseFloat(point.longitude);
      const dist = haversine(point, node.point);
      // Adiciona o ponto se estiver dentro do raio
      if (dist <= raioKm) {
        result.push([node.point, dist]);
      }
      const diff = pointVal - nodeVal;
      // Explora subárvores conforme a distância ao plano de divisão
      if (diff < 0) {
        search(node.left, depth + 1);
        if (Math.abs(diff) <= raioKm) search(node.right, depth + 1);
      } else {
        search(node.right, depth + 1);
        if (Math.abs(diff) <= raioKm) search(node.left, depth + 1);
      }
    }
    search(this.root, 0);
    return result;
  }
}
// ========================= Fim KD-Tree =========================

// Função principal para calcular distâncias entre conjuntos de pontos
export function calcularDistancias(
  origem: Conjunto,
  destino: Conjunto,
  tipo: "menor" | "raio",
  raioKm?: number
): Resultado[] {
  // Constrói a KD-Tree com os pontos do conjunto de destino
  const tree = new KDTree(destino.dados);

  // Para cada ponto de origem, busca o(s) destino(s) conforme o tipo de cálculo
  return origem.dados.map((pontoOrigem) => {
    if (tipo === "menor") {
      // Busca o ponto mais próximo no conjunto de destino
      const maisProximo = tree.nearest(pontoOrigem);
      if (!maisProximo) {
        return {
          origem: pontoOrigem,
          destinos: [],
        };
      }
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

    if (tipo === "raio" && raioKm !== undefined) {
      // Busca todos os pontos do conjunto de destino dentro do raio especificado
      const encontrados = tree.withinRadius(pontoOrigem, raioKm);
      return {
        origem: pontoOrigem,
        destinos: encontrados.map(([ponto, dist]) => ({
          destino: ponto,
          distanciaKm: dist,
        })),
      };
    }

    // Caso não seja nenhum dos tipos, retorna vazio
    return {
      origem: pontoOrigem,
      destinos: [],
    };
  });
}
