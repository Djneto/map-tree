"use client";

import { MapContainer, TileLayer, useMap, ZoomControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const FullScreenMap = () => {
  return (
    <MapContainer
      center={[-15.793889, -47.882778]} // Ex: Brasília
      zoom={5}
      style={{ height: "100vh", width: "100vw" }}
      zoomControl={false} // Desativa o controle de zoom padrão (canto superior esquerdo)
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <ZoomControl position="topright" />{" "}
      {/* ← Muda para o canto inferior direito */}
    </MapContainer>
  );
};

export default FullScreenMap;
