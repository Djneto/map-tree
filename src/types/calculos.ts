import { DadoGeografico } from "./dadoGeografico";

export type ResultadoCalculoDistancia = {
  id: string;
  tipoCalculo: "menor" | "raio";
  raioKm?: number;
  origem: DadoGeografico;
  destinos: Array<{
    destino: DadoGeografico;
    distanciaKm: number;
    rotaKm?: number;
    tempoMin?: number;
  }>;
};

export type ResultadoCalculoRota = {
  id: string;
  tipoCalculo: "menor" | "raio";
  origem: DadoGeografico;
  destino: DadoGeografico;
  distanciaKm: number;
  rota: {
    duracaoMinutos: number;
    coordenadas: [number, number][];
  };
};

export type GrupoResultadoRota = {
  id: string;
  tipoCalculo: "menor" | "raio";
  raioKm?: number;
  rotas: ResultadoCalculoRota[];
};

export type ListaRegistros = {
  registrosDistancia: ResultadoCalculoDistancia[];
  registrosRota: GrupoResultadoRota[];
};
