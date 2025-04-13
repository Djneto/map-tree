"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import MapDrawer from "./MapDrawer";
import FloatingActions from "./FloatingActions";
import { DeploymentUnitOutlined } from "@ant-design/icons";

import { ConjuntosProvider } from "@/contexts/ConjuntosContext";
import { ActionProvider } from "@/contexts/ActionContext";
import { useTheme } from "@/contexts/ThemeContext";

const FullScreenMap = dynamic(() => import("./FullScreenMap"), {
  ssr: false,
});

export default function AppWrapper() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false);

  const { theme } = useTheme(); // 👈 pega o tema atual

  useEffect(() => {
    setHasMounted(true);
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (!hasMounted) return null;

  if (isLoading) {
    const isDark = theme === "dark";

    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: isDark ? "#1f1f1f" : "#FFFFFF",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DeploymentUnitOutlined
            style={{ fontSize: 32, color: isDark ? "#40a9ff" : "#1890ff" }}
          />
          <span
            style={{
              fontSize: 24,
              fontWeight: 600,
              color: isDark ? "#e6f7ff" : "#1890ff",
            }}
          >
            Map-Tree
          </span>
        </div>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <ConjuntosProvider>
      <ActionProvider>
        <FullScreenMap />
        <MapDrawer open={drawerOpen} setOpen={setDrawerOpen} />
        <FloatingActions
          drawerOpen={drawerOpen}
          setDrawerOpen={setDrawerOpen}
        />
      </ActionProvider>
    </ConjuntosProvider>
  );
}
