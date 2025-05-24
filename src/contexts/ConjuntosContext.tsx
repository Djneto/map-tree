import React, { createContext, useContext, useState, ReactNode } from "react";
import { v4 as uuidv4 } from "uuid";
import { Conjunto } from "@/types/conjunto";
import { DadoGeografico } from "@/types/dadoGeografico";
import { namesRandom, namesSet } from "@/utils/SetBaseNames";

interface ConjuntosContextType {
  conjuntos: Conjunto[];
  conjuntoSelecionado: Conjunto | null;
  setConjuntoSelecionado: React.Dispatch<React.SetStateAction<Conjunto | null>>;
  criarConjunto: (dados?: DadoGeografico[], nome?: string) => void;
  atualizarCor: (id: string, cor: string) => void;
  atualizarNome: (id: string, nome: string) => void;
  removerConjunto: (id: string) => void;
  adicionarDadoAoConjuntoSelecionado: (
    latitude: string,
    longitude: string
  ) => void;
  removerDadoDoConjuntoSelecionado: (dadoId: string) => void;
}

const ConjuntosContext = createContext<ConjuntosContextType | undefined>(
  undefined
);

export const ConjuntosProvider = ({ children }: { children: ReactNode }) => {
  const [conjuntos, setConjuntos] = useState<Conjunto[]>([]);
  const [conjuntoSelecionado, setConjuntoSelecionado] =
    useState<Conjunto | null>(null);

  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215)
      .toString(16)
      .padStart(6, "0")}`;

  const gerarNomeAleatorio = () => {
    return (
      namesSet[Math.floor(Math.random() * namesSet.length)] +
      " " +
      namesRandom[Math.floor(Math.random() * namesRandom.length)]
    );
  };

  const criarConjunto = (dados?: DadoGeografico[], nome?: string) => {
    const novo: Conjunto = {
      id: uuidv4(),
      cor: getRandomColor(),
      nome: nome ?? gerarNomeAleatorio(),
      dados: dados ?? [],
    };
    setConjuntos((prev) => [...prev, novo]);
    //console.log(conjuntos);
  };

  const atualizarCor = (id: string, cor: string) => {
    setConjuntos((prev) => prev.map((c) => (c.id === id ? { ...c, cor } : c)));
  };

  const atualizarNome = (id: string, nome: string) => {
    setConjuntos((prev) => prev.map((c) => (c.id === id ? { ...c, nome } : c)));
  };

  const removerConjunto = (id: string) => {
    setConjuntos((prev) => prev.filter((c) => c.id !== id));
  };

  const adicionarDadoAoConjuntoSelecionado = (
    latitude: string,
    longitude: string
  ) => {
    if (!conjuntoSelecionado) return;

    const novoDado: DadoGeografico = {
      id: uuidv4(),
      latitude,
      longitude,
    };

    setConjuntos((prev) =>
      prev.map((conjunto) =>
        conjunto.id === conjuntoSelecionado.id
          ? { ...conjunto, dados: [...conjunto.dados, novoDado] }
          : conjunto
      )
    );
  };

  const removerDadoDoConjuntoSelecionado = (dadoId: string) => {
    if (!conjuntoSelecionado) return;

    setConjuntos((prev) =>
      prev.map((conjunto) =>
        conjunto.id === conjuntoSelecionado.id
          ? {
              ...conjunto,
              dados: conjunto.dados.filter((dado) => dado.id !== dadoId),
            }
          : conjunto
      )
    );
  };

  return (
    <ConjuntosContext.Provider
      value={{
        conjuntos,
        conjuntoSelecionado,
        setConjuntoSelecionado,
        criarConjunto,
        atualizarCor,
        atualizarNome,
        removerConjunto,
        adicionarDadoAoConjuntoSelecionado,
        removerDadoDoConjuntoSelecionado,
      }}
    >
      {children}
    </ConjuntosContext.Provider>
  );
};

export const useConjuntos = () => {
  const context = useContext(ConjuntosContext);
  if (!context) {
    throw new Error("useConjuntos deve ser usado dentro de ConjuntosProvider");
  }
  return context;
};
