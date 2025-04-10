"use client";

import { Segmented } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { useState } from "react";

export default function FloatingActions() {
  const [action, setAction] = useState<string | number>("add");

  return (
    <div
      style={{
        position: "fixed",
        bottom: 30,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        background: "#1F1F1F",
        padding: "12px 16px",
        borderRadius: "8px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
      }}
    >
      <Segmented
        value={action}
        onChange={setAction}
        options={[
          {
            label: "Adicionar",
            value: "add",
            icon: <PlusOutlined />,
          },
          {
            label: "Remover",
            value: "remove",
            icon: <DeleteOutlined />,
          },
          {
            label: "Upload",
            value: "upload",
            icon: <UploadOutlined />,
          },
        ]}
      />
    </div>
  );
}
