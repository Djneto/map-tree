"use client";

import {
  MapContainer,
  TileLayer,
  ZoomControl,
  Marker,
  Popup,
  useMapEvents,
  Polyline,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useTheme } from "@/contexts/ThemeContext";
import { useConjuntos } from "@/contexts/ConjuntosContext";
import L from "leaflet";
import { EnvironmentFilled } from "@ant-design/icons";
import ReactDOMServer from "react-dom/server";
import { useAction } from "@/contexts/ActionContext";
import { useCalculos } from "@/contexts/CalculosContex";
import { useEffect } from "react";

interface MapaClickListenerProps {
  onClick: (lat: number, lng: number) => void;
}

const FullScreenMap = () => {
  const { theme } = useTheme();
  const {
    conjuntos,
    adicionarDadoAoConjuntoSelecionado,
    removerDadoDoConjuntoSelecionado,
  } = useConjuntos();
  const { action } = useAction();
  const { resultados } = useCalculos();

  const lightTile = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const darkTile =
    "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";

  const gerarIcone = (cor: string) =>
    L.divIcon({
      className: "",
      html: ReactDOMServer.renderToString(
        <span
          style={{
            fontSize: "32px",
            color: cor,
            display: "inline-block",
          }}
        >
          <EnvironmentFilled style={{ fontSize: "32px" }} />
        </span>
      ),
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

  // const gerarPolylines = () => {
  //   try {
  //     return resultados.registrosRota.retorno.flatMap(
  //       (rotaLista, registroIndex) => {
  //         if (!Array.isArray(rotaLista)) {
  //           console.warn("rotaLista não é array no índice:", registroIndex);
  //           return [];
  //         }

  //         return rotaLista
  //           .map((item, index) => {
  //             if (!item.rota || !Array.isArray(item.rota.coordenadas)) {
  //               console.warn("rota ou coordenadas inválidas no índice:", index);
  //               return null;
  //             }

  //             const path: [number, number][] = item.rota.coordenadas
  //               .filter(
  //                 (coord): coord is [number, number] =>
  //                   Array.isArray(coord) && coord.length === 2
  //               )
  //               .map(([lng, lat]) => [lat, lng]); // inverte para [lat, lng]

  //             if (path.length === 0) {
  //               console.warn("path vazio no índice:", index);
  //               return null;
  //             }

  //             return (
  //               <Polyline
  //                 key={`polyline-${registroIndex}-${index}`}
  //                 positions={path}
  //                 color="#0F53FF"
  //                 weight={6}
  //                 opacity={0.7}
  //               />
  //             );
  //           })
  //           .filter(Boolean); // remove os nulls
  //       }
  //     );
  //   } catch (error) {
  //     console.error("Erro na gerarPolylines:", error);
  //     return [];
  //   }
  // };
  useEffect(() => {}, [resultados]);

  const MapaClickListener = ({ onClick }: MapaClickListenerProps) => {
    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        onClick(lat, lng);
      },
    });

    return null;
  };

  const handleMapaClick = (lat: number, lng: number) => {
    if (action === "add") {
      adicionarDadoAoConjuntoSelecionado(lat.toString(), lng.toString());
    }
    //console.log("Clicou em:", lat, lng);
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <MapContainer
        center={[-15.793889, -47.882778]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <MapaClickListener onClick={handleMapaClick} />
        <TileLayer
          url={theme === "dark" ? darkTile : lightTile}
          attribution={
            theme === "dark"
              ? '&copy; <a href="https://carto.com/">CARTO</a>'
              : '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          }
        />
        <ZoomControl position="topright" />
        {/* {gerarPolylines()} */}
        {conjuntos.map((conjunto) =>
          conjunto.dados.map((dado) => (
            <Marker
              key={dado.id}
              position={[parseFloat(dado.latitude), parseFloat(dado.longitude)]}
              icon={gerarIcone(conjunto.cor)}
              eventHandlers={{
                click: () => {
                  if (action === "remove") {
                    removerDadoDoConjuntoSelecionado(dado.id);
                  }
                },
              }}
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
