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
import L, { LatLngTuple } from "leaflet";
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
  const { resultados, registrosVisualizados, obterRegistroPorId } =
    useCalculos();

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

  const gerarPolylines = () => {
    return registrosVisualizados.flatMap((id) => {
      const retorno = obterRegistroPorId(id);
      if (retorno?.tipo === "rota") {
        return retorno.registro.rotas.map((rota) => {
          const pontos = rota.rota.coordenadas.map(
            ([lng, lat]) => [lat, lng] as LatLngTuple
          );
          return (
            <Polyline
              key={rota.id}
              positions={pontos}
              color="blue"
              weight={4}
              opacity={1}
            />
          );
        });
      }
      if (retorno?.tipo === "distancia") {
        const keys = Object.keys(retorno.registro).filter(
          (k) => !isNaN(Number(k))
        );

        return keys.flatMap((key, index) => {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const origem = (retorno.registro as any)[key].origem;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const destinos = (retorno.registro as any)[key].destinos;

          const origemCoord: LatLngTuple = [
            parseFloat(origem.latitude),
            parseFloat(origem.longitude),
          ];

          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return destinos.map(
            (
              dest: { destino: { latitude: string; longitude: string } },
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              i: any
            ) => {
              const destinoCoord: LatLngTuple = [
                parseFloat(dest.destino.latitude),
                parseFloat(dest.destino.longitude),
              ];

              return (
                <Polyline
                  key={`${retorno.registro.id}-${index}-${i}`}
                  positions={[origemCoord, destinoCoord]}
                  color="red"
                  weight={4}
                  opacity={1}
                />
              );
            }
          );
        });
      }
      return []; // caso não seja tipo "rota", não renderiza nada
    });
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
        {gerarPolylines()}
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
