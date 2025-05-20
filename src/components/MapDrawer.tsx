"use client";

import { Drawer, Button, Space, Segmented } from "antd";
import {
  CloseOutlined,
  ShareAltOutlined,
  InboxOutlined,
  DeploymentUnitOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import Conjuntos from "./Conjuntos";
import Calculos from "./Calculos";

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
            <Button
              type="text"
              icon={<CloseOutlined />}
              onClick={() => setOpen(false)}
            />
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
                <ShareAltOutlined />
                Cálculos
              </Space>
            ),
            value: "calculos",
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

      {abaAtiva === "calculos" && (
        <>
          <p style={{ marginBottom: 12, color: "#555" }}>
            Utilize esta aba para calcular distâncias e rotas entre os conjuntos
            exibidos no mapa.
          </p>
          <Calculos />
        </>
      )}
    </Drawer>
  );
}
