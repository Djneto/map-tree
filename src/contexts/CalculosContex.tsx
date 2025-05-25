import React, { createContext, useContext, useState, ReactNode } from "react";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { calcularDistancia } from "@/services/api/calculo.service";
import { calcularRota } from "@/services/api/rota.service";
import { useConjuntos } from "./ConjuntosContext";
import {
  GrupoResultadoRota,
  ListaRegistros,
  ResultadoCalculoDistancia,
  ResultadoCalculoRota,
} from "@/types/calculos";

type RegistroComTipoERaio =
  | { tipo: "distancia"; registro: ResultadoCalculoDistancia; raioKm?: number }
  | { tipo: "rota"; registro: GrupoResultadoRota; raioKm?: number };

type CalculosContextType = {
  resultados: ListaRegistros;
  tipoOperacao: "distancia" | "rota";
  setTipoOperacao: React.Dispatch<React.SetStateAction<"distancia" | "rota">>;
  tipoDistancia: "menor" | "raio";
  setTipoDistancia: React.Dispatch<React.SetStateAction<"menor" | "raio">>;
  origemId: string | undefined;
  setOrigemId: React.Dispatch<React.SetStateAction<string | undefined>>;
  destinoId: string | undefined;
  setDestinoId: React.Dispatch<React.SetStateAction<string | undefined>>;
  raioKm: number;
  setRaioKm: React.Dispatch<React.SetStateAction<number>>;
  calcular: () => Promise<void>;
  registrosVisualizados: string[];
  visualizarRegistro: (id: string) => void;
  removerRegistro: (id: string) => void;
  obterRegistroPorId: (id: string) => RegistroComTipoERaio | undefined;
};

const CalculosContext = createContext<CalculosContextType | undefined>(
  undefined
);

export const CalculosProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [tipoOperacao, setTipoOperacao] = useState<"distancia" | "rota">(
    "distancia"
  );
  const [tipoDistancia, setTipoDistancia] = useState<"menor" | "raio">("menor");
  const [origemId, setOrigemId] = useState<string | undefined>();
  const [destinoId, setDestinoId] = useState<string | undefined>();
  const [raioKm, setRaioKm] = useState<number>(1);
  const [registrosVisualizados, setRegistrosVisualizados] = useState<string[]>(
    []
  );
  const [resultados, setResultados] = useState<ListaRegistros>({
    registrosDistancia: [],
    registrosRota: [],
  });
  const [registroSelecionadoId, setRegistroSelecionadoId] = useState<
    string | undefined
  >();

  const { conjuntos } = useConjuntos();

  const calcular = async () => {
    if (!origemId || !destinoId) {
      message.warning("Selecione um conjunto de origem e destino.");
      return;
    }

    if (tipoDistancia === "raio" && (!raioKm || raioKm <= 0)) {
      message.warning("Informe um valor válido para o raio.");
      return;
    }

    const origem = conjuntos.find((c) => c.id === origemId);
    const destino = conjuntos.find((c) => c.id === destinoId);

    if (!origem || !destino) {
      message.error("Conjuntos não encontrados.");
      return;
    }

    const payload = {
      origem,
      destino,
      tipo: tipoDistancia,
      raioKm: tipoDistancia === "raio" ? raioKm : undefined,
    };

    try {
      message.loading(
        tipoOperacao === "rota"
          ? "Calculando rotas..."
          : "Calculando distâncias...",
        1.5
      );

      const resultadoBruto =
        tipoOperacao === "rota"
          ? await calcularRota(payload)
          : await calcularDistancia(payload);

      if (tipoOperacao === "distancia") {
        const resultadoComId: ResultadoCalculoDistancia = {
          ...resultadoBruto,
          id: uuidv4(),
          tipoCalculo: tipoDistancia,
          raioKm: tipoDistancia === "raio" ? raioKm : undefined,
        };

        setResultados((prev) => ({
          ...prev,
          registrosDistancia: [...prev.registrosDistancia, resultadoComId],
        }));

        setRegistrosVisualizados((prev) => [...prev, resultadoComId.id]);
      } else {
        const resultadoComIds: ResultadoCalculoRota[] = (
          resultadoBruto as ResultadoCalculoRota[]
        ).map((item) => ({
          ...item,
          id: uuidv4(),
          tipoCalculo: tipoDistancia,
        }));

        const grupoDeRotas: GrupoResultadoRota = {
          id: uuidv4(),
          tipoCalculo: tipoDistancia,
          raioKm: tipoDistancia === "raio" ? raioKm : undefined,
          rotas: resultadoComIds,
        };

        setResultados((prev) => ({
          ...prev,
          registrosRota: [...prev.registrosRota, grupoDeRotas],
        }));

        setRegistrosVisualizados((prev) => [...prev, grupoDeRotas.id]);
      }

      message.success("Cálculo finalizado com sucesso!");
    } catch (error: unknown) {
      console.error(error);
      message.error(
        "Erro: " + ((error as Error).message || "Erro desconhecido")
      );
    }
  };

  const visualizarRegistro = (id: string) => {
    setRegistrosVisualizados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const removerRegistro = (id: string) => {
    setResultados((prev) => ({
      registrosDistancia: prev.registrosDistancia.filter((r) => r.id !== id),
      registrosRota: prev.registrosRota.filter((g) => g.id !== id),
    }));

    setRegistrosVisualizados((prev) => prev.filter((vid) => vid !== id));

    if (registroSelecionadoId === id) {
      setRegistroSelecionadoId(undefined);
    }
  };

  const obterRegistroPorId = (id: string): RegistroComTipoERaio | undefined => {
    const registroDistancia = resultados.registrosDistancia.find(
      (r) => r.id === id
    );
    if (registroDistancia) {
      return {
        tipo: "distancia",
        registro: registroDistancia,
        ...(registroDistancia.raioKm && { raioKm: registroDistancia.raioKm }),
      };
    }

    const grupoRota = resultados.registrosRota.find((g) => g.id === id);
    if (grupoRota) {
      return {
        tipo: "rota",
        registro: grupoRota,
        ...(grupoRota.raioKm && { raioKm: grupoRota.raioKm }),
      };
    }

    return undefined;
  };

  return (
    <CalculosContext.Provider
      value={{
        resultados,
        calcular,
        tipoOperacao,
        setTipoOperacao,
        tipoDistancia,
        setTipoDistancia,
        origemId,
        setOrigemId,
        destinoId,
        setDestinoId,
        raioKm,
        setRaioKm,
        registrosVisualizados,
        visualizarRegistro,
        removerRegistro,
        obterRegistroPorId,
      }}
    >
      {children}
    </CalculosContext.Provider>
  );
};

export const useCalculos = () => {
  const context = useContext(CalculosContext);
  if (!context) {
    throw new Error("useCalculos deve ser usado dentro de um CalculosProvider");
  }
  return context;
};
