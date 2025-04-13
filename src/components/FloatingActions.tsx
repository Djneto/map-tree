"use client";

import {
  PlusOutlined,
  DeleteOutlined,
  AimOutlined,
  MenuOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Button, Segmented, Select } from "antd";
import { useTheme } from "@/contexts/ThemeContext";
import { useConjuntos } from "@/contexts/ConjuntosContext"; // ou onde quer que esteja

import "../styles/globals.css";
import { Conjunto } from "@/types/conjunto";

type FloatingActionsProps = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

export default function FloatingActions({
  drawerOpen,
  setDrawerOpen,
}: FloatingActionsProps) {
  const [action, setAction] = useState<string | number>("select");
  const [conjuntoSelecionado, setConjuntoSelecionado] =
    useState<Conjunto | null>(null);
  const { theme, toggleTheme } = useTheme();
  const { conjuntos } = useConjuntos();

  useEffect(() => {
    console.log(conjuntoSelecionado);
  });

  useEffect(() => {
    // Verifica se o conjunto selecionado ainda existe
    if (
      conjuntoSelecionado &&
      !conjuntos.find((c) => c.id === conjuntoSelecionado.id)
    ) {
      setConjuntoSelecionado(null);
      setAction("select");
    }
  }, [conjuntos]);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: theme === "dark" ? "#1F1F1F" : "#fff",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        display: "flex",
        alignItems: "center",
        gap: "12px",
      }}
    >
      <Button
        type="primary"
        icon={<MenuOutlined />}
        size="middle"
        onClick={() => setDrawerOpen(!drawerOpen)}
      />

      <Select
        placeholder="Selecionar conjunto"
        style={{ width: 180 }}
        value={conjuntoSelecionado ? conjuntoSelecionado.nome : null}
        onChange={(id) => {
          const conjunto = conjuntos.find((c) => c.id === id);
          if (conjunto) setConjuntoSelecionado(conjunto);
        }}
        options={conjuntos.map((c: Conjunto) => ({
          label: c.nome,
          value: c.id,
        }))}
      />
      <Segmented
        value={action}
        onChange={setAction}
        size="middle"
        options={[
          {
            value: "select",
            icon: <AimOutlined />,
          },
          {
            value: "add",
            icon: <PlusOutlined />,
            disabled: conjuntoSelecionado ? false : true,
          },
          {
            value: "remove",
            icon: <DeleteOutlined />,
            disabled: conjuntoSelecionado ? false : true,
          },
        ]}
        className={`custom-segmented ${action === "remove" ? "danger" : ""}`}
      />
      <Button
        type="text"
        onClick={toggleTheme}
        icon={theme == "dark" ? <SunOutlined /> : <MoonOutlined />}
        style={{ fontSize: "18px" }}
      />
    </div>
  );
}
