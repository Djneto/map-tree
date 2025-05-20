import React, { useState } from "react";
import {
  Typography,
  Select,
  Button,
  message,
  InputNumber,
  Radio,
  Space,
} from "antd";
import {
  AimOutlined,
  PlayCircleOutlined,
  NodeExpandOutlined,
  PartitionOutlined,
  HarmonyOSOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import { useConjuntos } from "@/contexts/ConjuntosContext";

const { Text } = Typography;
const { Option } = Select;

const Calculos: React.FC = () => {
  const { conjuntos } = useConjuntos();

  const [tipoOperacao, setTipoOperacao] = useState<"distancia" | "rota">(
    "distancia"
  );
  const [tipoDistancia, setTipoDistancia] = useState<"menor" | "raio">("menor");

  const [origemId, setOrigemId] = useState<string>();
  const [destinoId, setDestinoId] = useState<string>();
  const [raioKm, setRaioKm] = useState<number>(1);

  const calcular = () => {
    if (!origemId || !destinoId) {
      message.warning("Selecione um conjunto de origem e destino.");
      return;
    }

    if (tipoDistancia === "raio" && (!raioKm || raioKm <= 0)) {
      message.warning("Informe um valor válido para o raio.");
      return;
    }

    const payload = {
      origem: origemId,
      destino: destinoId,
      tipoOperacao,
      tipoDistancia,
      raioKm: tipoDistancia === "raio" ? raioKm : undefined,
    };

    console.log("Parâmetros de cálculo:", payload);
    message.success("Cálculo iniciado!");
  };

  return (
    <div style={{ width: "100%" }}>
      <Space direction="vertical" size="large" style={{ width: "100%" }}>
        {/* Tipo de operação */}
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

        {/* Origem e Destino com layout visual */}
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

          {/* Coluna de selects */}
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

        {/* Opções de distância ou rota */}
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

        {/* <Divider /> */}

        <Button
          type="primary"
          icon={<PlayCircleOutlined />}
          block
          onClick={calcular}
        >
          Calcular
        </Button>
      </Space>
    </div>
  );
};

export default Calculos;
