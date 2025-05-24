import "@ant-design/v5-patch-for-react-19";
import "antd/dist/reset.css";
import "../styles/globals.css";
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
      <body>
        <ThemeProvider>
          <AntdThemeProvider>
            <AntdCompat />
            {children}
          </AntdThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
