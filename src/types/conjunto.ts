import { DadoGeografico } from "./dadoGeografico";

export interface Conjunto {
  id: string;
  cor: string;
  nome: string;
  dados: Array<DadoGeografico>;
}
