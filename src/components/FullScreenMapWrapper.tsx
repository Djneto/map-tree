"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Spin } from "antd";
import MapDrawer from "./MapDrawer";
import FloatingActions from "./FloatingActions";
import { DeploymentUnitOutlined } from "@ant-design/icons";

const FullScreenMap = dynamic(() => import("./FullScreenMap"), {
  ssr: false,
});

export default function FullScreenMapWrapper() {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMounted, setHasMounted] = useState(false); //evita renderização antes do client

  useEffect(() => {
    setHasMounted(true);
    const timeout = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  if (!hasMounted) return null; //impede renderização no SSR

  if (isLoading) {
    return (
      <div
        style={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#FFFFFF",
          gap: 16,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <DeploymentUnitOutlined style={{ fontSize: 32, color: "#1890ff" }} />
          <span style={{ fontSize: 24, fontWeight: 600, color: "#1890ff" }}>
            Map-Tree
          </span>
        </div>
        <Spin size="large"></Spin>
      </div>
    );
  }

  return (
    <>
      <FullScreenMap />
      <MapDrawer open={drawerOpen} setOpen={setDrawerOpen} />
      <FloatingActions drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />
    </>
  );
}
