import React, { useState } from "react";
import { List, Button, Input, Space, Tooltip, ColorPicker } from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import DatasetUploaderModal from "./DataSetUploaderModal";
import { useConjuntos } from "@/contexts/ConjuntosContext";

const Conjuntos: React.FC = () => {
  const [modalAberto, setModalAberto] = useState(false);

  const {
    conjuntos,
    criarConjunto,
    atualizarCor,
    atualizarNome,
    removerConjunto,
  } = useConjuntos();

  return (
    <>
      <div style={{ marginBottom: 16 }}>
        <Space style={{ width: "100%" }} direction="vertical">
          <Button
            icon={<UploadOutlined />}
            block
            onClick={() => setModalAberto(true)}
          >
            Importar Dataset
          </Button>
          <Button
            type="dashed"
            icon={<PlusOutlined />}
            onClick={() => criarConjunto()}
            block
          >
            Criar Conjunto
          </Button>
        </Space>
      </div>

      <DatasetUploaderModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
      />

      <List
        dataSource={conjuntos}
        style={{ width: "100%" }}
        renderItem={(item) => (
          <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                width: "100%",
                gap: 8,
              }}
            >
              <ColorPicker
                value={item.cor}
                onChange={(color) => atualizarCor(item.id, color.toHexString())}
                showText={false}
              />
              <Input
                value={item.nome}
                onChange={(e) => atualizarNome(item.id, e.target.value)}
                style={{ flex: 1 }}
              />
              <Tooltip title="Remover conjunto">
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => removerConjunto(item.id)}
                />
              </Tooltip>
            </div>
          </List.Item>
        )}
      />
    </>
  );
};

export default Conjuntos;
