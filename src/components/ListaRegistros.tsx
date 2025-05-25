import React from "react";
import { List, Button, Space, Typography } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  NodeIndexOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
import { useCalculos } from "@/contexts/CalculosContex";

const { Text } = Typography;

interface Registro {
  id: string;
  tipoCalculo?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface ListaProps {
  registros: Registro[];
  registrosVisualizados: string[];
  tipo: "distancia" | "rota";
  onVisualizar: (id: string) => void;
  onRemover: (id: string) => void;
}

const ListaRegistros: React.FC<ListaProps> = ({
  registros,
  registrosVisualizados,
  tipo,
  onVisualizar,
  onRemover,
}) => {
  const { obterRegistroPorId } = useCalculos();
  return (
    <List
      size="small"
      bordered
      dataSource={registros}
      locale={{ emptyText: "Nenhum registro encontrado" }}
      renderItem={(registro) => (
        <List.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              flexWrap: "wrap", // importante para evitar estouro
              gap: 8,
            }}
          >
            <Space align="center" style={{ minWidth: 0, flex: 1 }}>
              {tipo === "distancia" ? (
                <>
                  <ShareAltOutlined style={{ fontSize: 16 }} />
                  <Text code ellipsis style={{ maxWidth: "100%" }}>
                    {registro.tipoCalculo == "menor"
                      ? "Menores distâncias"
                      : "Menores distâncias até " +
                        obterRegistroPorId(registro.id)?.raioKm +
                        " km"}
                  </Text>
                </>
              ) : (
                <>
                  <NodeIndexOutlined style={{ fontSize: 16 }} />
                  <Text code ellipsis style={{ maxWidth: "100%" }}>
                    {registro.tipoCalculo == "menor"
                      ? "Menores rotas"
                      : "Menores rotas até " +
                        obterRegistroPorId(registro.id)?.raioKm +
                        " km"}
                  </Text>
                </>
              )}
            </Space>

            <Space size="small" wrap>
              <Button
                icon={
                  registrosVisualizados.includes(registro.id) ? (
                    <EyeOutlined />
                  ) : (
                    <EyeInvisibleOutlined />
                  )
                }
                size="small"
                onClick={() => onVisualizar(registro.id)}
              />
              <Button
                icon={<DeleteOutlined />}
                danger
                size="small"
                onClick={() => onRemover(registro.id)}
              />
            </Space>
          </div>
        </List.Item>
      )}
    />
  );
};

export default ListaRegistros;
