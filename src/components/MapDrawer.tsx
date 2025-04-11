"use client";

import { Drawer, Button, Space, Segmented, Tooltip } from "antd";
import {
  CloseOutlined,
  AppstoreOutlined,
  InboxOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Conjuntos from "./Conjuntos";

const nomesAleatorios = [
  "Solar",
  "Lunar",
  "Estelar",
  "Árido",
  "Montanhoso",
  "Costeiro",
  "Florestal",
  "Urbano",
  "Rural",
  "Tropical",
  "Ártico",
  "Equatorial",
  "Desértico",
  "Gélido",
  "Pantaneiro",
  "Serrano",
  "Campestre",
  "Insular",
  "Subterrâneo",
  "Abissal",
  "Marítimo",
  "Continental",
  "Atlântico",
  "Pacífico",
  "Mediterrâneo",
  "Interiorano",
  "Frio",
  "Quente",
  "Seco",
  "Úmido",
  "Nebuloso",
  "Chuvoso",
  "Vulcânico",
  "Pedregoso",
  "Areoso",
  "Nevado",
  "Vento",
  "Tempestuoso",
  "Celeste",
  "Cósmico",
  "Galáctico",
  "Interplanetário",
  "Marciano",
  "Joviano",
  "Saturnino",
  "Uraniano",
  "Netuniano",
  "Estrelar",
  "Eclipse",
  "Aurora",
  "Poente",
  "Nascente",
  "Dourado",
  "Prateado",
  "Cristalino",
  "Esmeraldino",
  "Rubroso",
  "Safírico",
  "Turquesa",
  "Obsidiano",
  "Lago",
  "Rio",
  "Cachoeira",
  "Manancial",
  "Várzea",
  "Vale",
  "Encosta",
  "Planície",
  "Planalto",
  "Chapada",
  "Caverna",
  "Gruta",
  "Ilha",
  "Arquipélago",
  "Recife",
  "Manguezal",
  "Brejo",
  "Bosque",
  "Selvagem",
  "Silvestre",
  "Primaveril",
  "Outonal",
  "Invernal",
  "Estiagem",
  "Monçônico",
  "Alpino",
  "Ártico",
  "Antártico",
  "Oásis",
  "Cerrado",
  "Savânico",
  "Boreal",
  "Austral",
  "Setentrional",
  "Meridional",
  "Dorsal",
  "Mineral",
  "Fértil",
  "Estéril",
  "Bravio",
];

const gerarNomeAleatorio = () => {
  const base = [
    "Conjunto",
    "Grupo",
    "Camada",
    "Seção",
    "Bloco",
    "Rede",
    "Nó",
    "Núcleo",
    "Estrutura",
    "Módulo",
    "Zona",
    "Região",
    "Unidade",
    "Camada Lógica",
    "Cluster",
    "Malha",
    "Estrato",
    "Entidade",
    "Segmento",
    "Ponto",
  ];
  const nome =
    base[Math.floor(Math.random() * base.length)] +
    " " +
    nomesAleatorios[Math.floor(Math.random() * nomesAleatorios.length)];
  return nome;
};

const getRandomColor = () =>
  `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;

type Conjunto = {
  id: string;
  nome: string;
  cor: string;
};

type MapDrawerProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function MapDrawer({ open, setOpen }: MapDrawerProps) {
  const [conjuntos, setConjuntos] = useState<Conjunto[]>([]);
  const [nomeEdicao, setNomeEdicao] = useState<{ [id: string]: string }>({});
  const [abaAtiva, setAbaAtiva] = useState<string>("conjuntos");

  const criarConjunto = () => {
    const nomeGerado = gerarNomeAleatorio();
    const novo = {
      id: uuidv4(),
      nome: nomeGerado,
      cor: getRandomColor(),
    };
    setConjuntos([...conjuntos, novo]);
    setNomeEdicao({ ...nomeEdicao, [novo.id]: novo.nome });
  };

  const atualizarNome = (id: string, nome: string) => {
    setNomeEdicao((prev) => ({ ...prev, [id]: nome }));
    setConjuntos((prev) => prev.map((c) => (c.id === id ? { ...c, nome } : c)));
  };

  const atualizarCor = (id: string, cor: string) => {
    setConjuntos((prev) => prev.map((c) => (c.id === id ? { ...c, cor } : c)));
  };

  const removerConjunto = (id: string) => {
    setConjuntos((prev) => prev.filter((c) => c.id !== id));
    setNomeEdicao((prev) => {
      const atualizado = { ...prev };
      delete atualizado[id];
      return atualizado;
    });
  };

  return (
    <Drawer
      title={
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <DeploymentUnitOutlined style={{ fontSize: 20 }} />
              Map-Tree
            </span>
            <Tooltip title="Fechar painel">
              <Button
                type="text"
                icon={<CloseOutlined />}
                onClick={() => setOpen(false)}
              />
            </Tooltip>
          </div>
          <span style={{ fontSize: 12, color: "#888" }}>
            Calcule distâncias dinamicamente com KD-Tree
          </span>
        </div>
      }
      placement="left"
      mask={false}
      closable={false}
      open={open}
      width={410}
    >
      <Segmented
        block
        options={[
          {
            label: (
              <Space>
                <AppstoreOutlined />
                Seleção
              </Space>
            ),
            value: "selecaoo",
          },
          {
            label: (
              <Space>
                <InboxOutlined />
                Conjuntos
              </Space>
            ),
            value: "conjuntos",
          },
        ]}
        value={abaAtiva}
        onChange={(val) => setAbaAtiva(val as string)}
        style={{ marginBottom: 16 }}
      />

      {abaAtiva === "conjuntos" && (
        <>
          <p style={{ marginBottom: 12, color: "#555" }}>
            Crie, importe e edite conjuntos com nomes e cores personalizadas
            para organizar os elementos do mapa.
          </p>
          <Conjuntos
            conjuntos={conjuntos}
            nomeEdicao={nomeEdicao}
            criarConjunto={criarConjunto}
            atualizarCor={atualizarCor}
            atualizarNome={atualizarNome}
            removerConjunto={removerConjunto}
          />
        </>
      )}

      {abaAtiva === "selecaoo" && (
        <div>
          <p style={{ marginBottom: 12, color: "#555" }}>
            Use esta aba para visualizar ou interagir com elementos do mapa que
            fazem parte dos conjuntos criados.
          </p>
          <p>Seleção (em desenvolvimento)</p>
        </div>
      )}
    </Drawer>
  );
}
