import React, { useState } from "react";
import {
  List,
  Button,
  Input,
  Space,
  Tooltip,
  ColorPicker,
  message,
} from "antd";
import {
  PlusOutlined,
  DeleteOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import DatasetUploaderModal from "./DataSetUploaderModal";

interface Conjunto {
  id: string;
  cor: string;
}

interface Props {
  conjuntos: Conjunto[];
  nomeEdicao: Record<string, string>;
  criarConjunto: () => void;
  atualizarCor: (id: string, cor: string) => void;
  atualizarNome: (id: string, nome: string) => void;
  removerConjunto: (id: string) => void;
  onUploadDataset?: (file: File) => void;
}

const Conjuntos: React.FC<Props> = ({
  conjuntos,
  nomeEdicao,
  criarConjunto,
  atualizarCor,
  atualizarNome,
  removerConjunto,
  onUploadDataset,
}) => {
  const beforeUpload = (file: File) => {
    if (onUploadDataset) {
      onUploadDataset(file);
    } else {
      message.info(`Arquivo "${file.name}" carregado (simulado).`);
    }
    return false;
  };
  const [modalAberto, setModalAberto] = useState(false);

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
            onClick={criarConjunto}
            block
          >
            Criar Conjunto
          </Button>
        </Space>
      </div>
      <DatasetUploaderModal
        open={modalAberto}
        onClose={() => setModalAberto(false)}
        onFinalizarUpload={(dadosProcessados) => {
          // TODO:  criar um novo conjunto com os dados do CSV
          console.log("Dados prontos para uso:", dadosProcessados);
        }}
      />
      <List
        dataSource={conjuntos}
        renderItem={(item) => (
          <List.Item style={{ paddingLeft: 0, paddingRight: 0 }}>
            <Space style={{ width: "100%", alignItems: "center" }}>
              <ColorPicker
                value={item.cor}
                onChange={(color) => atualizarCor(item.id, color.toHexString())}
                showText={false}
              />
              <Input
                value={nomeEdicao[item.id]}
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
            </Space>
          </List.Item>
        )}
      />
    </>
  );
};

export default Conjuntos;
