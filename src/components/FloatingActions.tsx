"use client";

import { Segmented, Button, Tooltip } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
  MenuOutlined,
  SunOutlined,
  MoonOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { useTheme } from "@/contexts/ThemeContext";

type FloatingActionsProps = {
  drawerOpen: boolean;
  setDrawerOpen: (open: boolean) => void;
};

export default function FloatingActions({
  drawerOpen,
  setDrawerOpen,
}: FloatingActionsProps) {
  const [action, setAction] = useState<string | number>("add");
  const { theme, toggleTheme } = useTheme();

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

      <Segmented
        value={action}
        onChange={setAction}
        size={"middle"}
        options={[
          {
            value: "add",
            icon: <PlusOutlined />,
          },
          {
            value: "remove",
            icon: <DeleteOutlined />,
          },
          {
            value: "upload",
            icon: <UploadOutlined />,
          },
        ]}
      />

      <Tooltip title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}>
        <Button
          type="text"
          onClick={toggleTheme}
          icon={theme == "dark" ? <SunOutlined /> : <MoonOutlined />}
          style={{ fontSize: "18px" }}
        />
      </Tooltip>
    </div>
  );
}
