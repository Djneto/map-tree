"use client";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@/contexts/ThemeContext";
import { useConjuntos } from "@/contexts/ConjuntosContext";
import L from "leaflet";
import { EnvironmentFilled } from "@ant-design/icons";
import ReactDOMServer from "react-dom/server";

const FullScreenMap = () => {
  const { theme } = useTheme();
  const { conjuntos } = useConjuntos();

  const lightTile = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTile =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const gerarIcone = (cor: string) =>
    L.divIcon({
      className: "", // Zera a classe pra evitar interferência
      html: ReactDOMServer.renderToString(
        <span
          style={{
            fontSize: "32px",
            color: cor,
            display: "inline-block",
            transform: "translate(-50%, -100%)", // centraliza a âncora
          }}
        >
          <EnvironmentFilled style={{ fontSize: "32px" }} />
        </span>
      ),
      iconSize: [24, 24],
      iconAnchor: [12, 24],
      popupAnchor: [-12, -65],
    });

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <MapContainer
        center={[-15.793889, -47.882778]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer
          url={theme === "dark" ? darkTile : lightTile}
          attribution={
            theme === "dark"
              ? '&copy; <a href="https://carto.com/">CARTO</a>'
              : '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          }
        />
        <ZoomControl position="topright" />

        {conjuntos.map((conjunto) =>
          conjunto.dados.map((dado) => (
            <Marker
              key={dado.id}
              position={[parseFloat(dado.latitude), parseFloat(dado.longitude)]}
              icon={gerarIcone(conjunto.cor)}
            >
              <Popup>
                <strong>{conjunto.nome}</strong>
                <br />
                Latitude: {dado.latitude}
                <br />
                Longitude: {dado.longitude}
              </Popup>
            </Marker>
          ))
        )}
      </MapContainer>
    </div>
  );
};

export default FullScreenMap;
