import "antd/dist/reset.css";
import "./globals.css";
import { AntdThemeProvider } from "./providers/AntdThemeProvider";

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
        <AntdThemeProvider>{children}</AntdThemeProvider>
      </body>
    </html>
  );
}
