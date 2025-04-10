"use client";

import {
  Drawer,
  Button,
  Input,
  List,
  Space,
  Tooltip,
  ColorPicker,
  Segmented,
} from "antd";
import {
  CloseOutlined,
  PlusOutlined,
  DeleteOutlined,
  AppstoreOutlined,
  InboxOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
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
  const base = ["Conjunto", "Grupo", "Camada"];
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

export default function MapDrawer() {
  const [open, setOpen] = useState(false);
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
    <>
      {/* Botão flutuante para abrir */}
      <div style={{ position: "absolute", top: 20, left: 20, zIndex: 1000 }}>
        <Button type="primary" onClick={() => setOpen(true)}>
          Menu
        </Button>
      </div>

      <Drawer
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>Map-Tree</span>
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setOpen(false)}
            />
          </div>
        }
        placement="left"
        mask={false}
        closable={false}
        open={open}
        width={320}
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
              value: "seleção",
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
            <div style={{ marginBottom: 16 }}>
              <Button
                type="dashed"
                icon={<PlusOutlined />}
                onClick={criarConjunto}
                block
              >
                Criar Conjunto
              </Button>
            </div>

            <List
              dataSource={conjuntos}
              renderItem={(item) => (
                <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
                  <Space style={{ width: "100%", alignItems: "center" }}>
                    <ColorPicker
                      value={item.cor}
                      onChange={(color) =>
                        atualizarCor(item.id, color.toHexString())
                      }
                      showText={false}
                    />
                    <Input
                      value={nomeEdicao[item.id]}
                      onChange={(e) => atualizarNome(item.id, e.target.value)}
                      style={{ flex: 1 }}
                    />
                    <Tooltip title="Remover conjunto">
                      <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => removerConjunto(item.id)}
                      />
                    </Tooltip>
                  </Space>
                </List.Item>
              )}
            />
          </>
        )}

        {abaAtiva === "config" && (
          <div>
            <p>Configurações do sistema (exemplo)</p>
            {/* Coloque seus inputs, switches ou qualquer outro conteúdo de configuração aqui */}
          </div>
        )}
      </Drawer>
    </>
  );
}
