"use client";

import { ConfigProvider, theme as antdTheme, App as AntdApp } from "antd";
import { useTheme } from "@/contexts/ThemeContext";

const { darkAlgorithm, defaultAlgorithm } = antdTheme;

export function AntdThemeProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();

  return (
    <ConfigProvider
      theme={{
        algorithm: theme === "dark" ? darkAlgorithm : defaultAlgorithm,
        token: {
          fontFamily: `'Inter', sans-serif`,
        },
      }}
    >
      <AntdApp>{children}</AntdApp>
    </ConfigProvider>
  );
}
