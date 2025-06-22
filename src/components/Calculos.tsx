import React from "react";
import { Typography, Select, Button, InputNumber, Radio, Space } from "antd";
import {
  AimOutlined,
  PlayCircleOutlined,
  NodeExpandOutlined,
  PartitionOutlined,
  HarmonyOSOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useConjuntos } from "@/contexts/ConjuntosContext";

import { useCalculos } from "@/contexts/CalculosContex";
import ListaRegistros from "./ListaRegistros";

const { Text } = Typography;
const { Option } = Select;

const Calculos: React.FC = () => {
  const { conjuntos } = useConjuntos();

  const {
    resultados,
    calcular,
    tipoOperacao,
    setTipoOperacao,
    tipoDistancia,
    setTipoDistancia,
    origemId,
    setOrigemId,
    destinoId,
    setDestinoId,
    raioKm,
    setRaioKm,
    registrosVisualizados,
    visualizarRegistro,
    removerRegistro,
  } = useCalculos();

  // useEffect(() => {
  //   console.log(resultados);
  // }, [resultados]);

  // useEffect(() => {
  //   console.log(registrosVisualizados);
  // }, [registrosVisualizados]);

  const handleCalcular = async () => {
    await calcular();
  };

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        <div>
          <Text strong>
            <PartitionOutlined /> Tipo de Cálculo:
          </Text>
          <Radio.Group
            value={tipoOperacao}
            onChange={(e) => setTipoOperacao(e.target.value)}
            style={{ marginTop: 8, display: "flex", width: "100%" }}
          >
            <Radio.Button
              value="distancia"
              style={{ flex: 1, textAlign: "center" }}
            >
              Distância
            </Radio.Button>
            <Radio.Button value="rota" style={{ flex: 1, textAlign: "center" }}>
              Rota
            </Radio.Button>
          </Radio.Group>
        </div>

        <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: 0,
              paddingRight: 8,
            }}
          >
            <HarmonyOSOutlined style={{ fontSize: 18 }} />
            <MoreOutlined
              style={{ fontSize: 18, marginTop: 5, marginBottom: 5 }}
            />
            <AimOutlined style={{ fontSize: 18 }} />
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              flex: 1,
              gap: 16,
            }}
          >
            <Select
              placeholder="Selecione o conjunto de origem"
              style={{ width: "100%" }}
              value={origemId}
              onChange={setOrigemId}
              allowClear
            >
              {conjuntos.map((conj) => (
                <Option key={conj.id} value={conj.id}>
                  {conj.nome}
                </Option>
              ))}
            </Select>

            <Select
              placeholder="Selecione o conjunto de destino"
              style={{ width: "100%" }}
              value={destinoId}
              onChange={setDestinoId}
              allowClear
            >
              {conjuntos.map((conj) => (
                <Option key={conj.id} value={conj.id}>
                  {conj.nome}
                </Option>
              ))}
            </Select>
          </div>
        </div>

        {(tipoOperacao === "distancia" || tipoOperacao === "rota") && (
          <div>
            <Text strong>
              <NodeExpandOutlined />{" "}
              {tipoOperacao === "distancia"
                ? "Tipo de Distância:"
                : "Tipo de Rota:"}
            </Text>
            <Radio.Group
              value={tipoDistancia}
              onChange={(e) => setTipoDistancia(e.target.value)}
              style={{ marginTop: 8, display: "flex", width: "100%" }}
            >
              <Radio.Button
                value="menor"
                style={{ flex: 1, textAlign: "center" }}
              >
                {tipoOperacao === "distancia"
                  ? "Menor Distância"
                  : "Menor Rota"}
              </Radio.Button>
              <Radio.Button
                value="raio"
                style={{ flex: 1, textAlign: "center" }}
              >
                Dentro de Raio
              </Radio.Button>
            </Radio.Group>

            <div style={{ height: 30, marginTop: 12 }}>
              {tipoDistancia === "raio" && (
                <InputNumber
                  min={0.1}
                  step={0.1}
                  addonAfter="km"
                  value={raioKm}
                  onChange={(value) => setRaioKm(value || 1)}
                  style={{ width: "100%" }}
                />
              )}
            </div>
          </div>
        )}

        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          block
          onClick={handleCalcular}
        >
          Calcular
        </Button>
        {(resultados.registrosDistancia.length > 0 ||
          resultados.registrosRota.length > 0) && (
          <div style={{ marginTop: 10 }}>
            <Text strong>Registros de Cálculo:</Text>

            {resultados.registrosDistancia.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <ListaRegistros
                  registros={resultados.registrosDistancia}
                  registrosVisualizados={registrosVisualizados}
                  tipo="distancia"
                  onVisualizar={visualizarRegistro}
                  onRemover={removerRegistro}
                />
              </div>
            )}

            {resultados.registrosRota.length > 0 && (
              <div style={{ marginTop: 12 }}>
                <ListaRegistros
                  registros={resultados.registrosRota}
                  registrosVisualizados={registrosVisualizados}
                  tipo="rota"
                  onVisualizar={visualizarRegistro}
                  onRemover={removerRegistro}
                />
              </div>
            )}
          </div>
        )}
      </Space>
    </div>
  );
};

export default Calculos;
