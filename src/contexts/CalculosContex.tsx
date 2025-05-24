import React, { createContext, useContext, useState, ReactNode } from "react";
import { message } from "antd";
import { v4 as uuidv4 } from "uuid";
import { calcularDistancia } from "@/services/api/calculo.service";
import { calcularRota } from "@/services/api/rota.service";
import { useConjuntos } from "./ConjuntosContext";
import {
  ListaRegistros,
  ResultadoCalculoDistancia,
  ResultadoCalculoRota,
} from "@/types/calculos";

type CalculosContextType = {
  resultados: ListaRegistros;
  tipoOperacao: string;
  setTipoOperacao: React.Dispatch<React.SetStateAction<"distancia" | "rota">>;
  tipoDistancia: string;
  setTipoDistancia: React.Dispatch<React.SetStateAction<"menor" | "raio">>;
  origemId: string | undefined;
  setOrigemId: React.Dispatch<React.SetStateAction<string | undefined>>;
  destinoId: string | undefined;
  setDestinoId: React.Dispatch<React.SetStateAction<string | undefined>>;
  raioKm: number;
  setRaioKm: React.Dispatch<React.SetStateAction<number>>;
  calcular: () => Promise<void>;
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
  const [resultados, setResultados] = useState<ListaRegistros>({
    registrosDistancia: [],
    registrosRota: [],
  });
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
        };

        setResultados((prev) => ({
          ...prev,
          registrosDistancia: [...prev.registrosDistancia, resultadoComId],
        }));
      } else {
        const resultadoComIds: ResultadoCalculoRota[] = (
          resultadoBruto as ResultadoCalculoRota[]
        ).map((item) => ({
          ...item,
          id: uuidv4(),
          tipoCalculo: tipoDistancia,
        }));

        setResultados((prev) => ({
          ...prev,
          registrosRota: [...prev.registrosRota, ...resultadoComIds],
        }));
      }

      message.success("Cálculo finalizado com sucesso!");
    } catch (error: unknown) {
      console.error(error);
      message.error(
        "Erro: " + ((error as Error).message || "Erro desconhecido")
      );
    }
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
