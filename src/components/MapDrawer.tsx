"use client";

import { Drawer, Button, Space, Segmented, Tooltip } from "antd";
import {
  CloseOutlined,
  AppstoreOutlined,
  InboxOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Conjuntos from "./Conjuntos";

type MapDrawerProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function MapDrawer({ open, setOpen }: MapDrawerProps) {
  const [abaAtiva, setAbaAtiva] = useState<string>("conjuntos");

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
          <Conjuntos />
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
