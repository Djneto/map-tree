"use client";

import { ConfigProvider, theme as antdTheme } from "antd";

const { darkAlgorithm } = antdTheme;

export function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        algorithm: darkAlgorithm,
        token: {
          fontFamily: `'Inter', sans-serif`,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
