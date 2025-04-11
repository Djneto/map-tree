import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";
import "./globals.css";
import { AntdThemeProvider } from "./providers/AntdThemeProvider";
import { ThemeProvider } from "@/contexts/ThemeContext";
import AntdCompat from "../antd-compat";

export const metadata = {
  title: "map-tree",
  description: "Exemplo com React Leaflet + Ant Design",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AntdCompat />
        <ThemeProvider>
          <AntdThemeProvider>{children}</AntdThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
