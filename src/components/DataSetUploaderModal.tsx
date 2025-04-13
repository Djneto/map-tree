import React, { useState } from "react";
import {
  Modal,
  Steps,
  Upload,
  message,
  Select,
  Button,
  Table,
  Radio,
  Form,
  Typography,
  Divider,
} from "antd";
import { InboxOutlined, FileTextOutlined } from "@ant-design/icons";
import Papa from "papaparse";

import useMessage from "antd/es/message/useMessage";

import { useConjuntos } from "@/contexts/ConjuntosContext";
import { DadoGeografico } from "@/types/dadoGeografico";

const { Step } = Steps;
const { Option } = Select;

interface Props {
  open: boolean;
  onClose: () => void;
}

const DatasetUploaderModal: React.FC<Props> = ({ open, onClose }) => {
  const [stepAtual, setStepAtual] = useState(0);
  const [csvData, setCsvData] = useState<any[]>([]);
  const [colunas, setColunas] = useState<string[]>([]);
  const [colLatitude, setColLatitude] = useState<string | undefined>();
  const [colLongitude, setColLongitude] = useState<string | undefined>();
  const [usarIdPersonalizado, setUsarIdPersonalizado] = useState(false);
  const [colunaId, setColunaId] = useState<string | undefined>();
  const [nomeArquivo, setNomeArquivo] = useState<string>("");
  const [tamanhoArquivo, setTamanhoArquivo] = useState<string | null>(null);

  const [messageApi, contextHolder] = useMessage();

  const { criarConjunto } = useConjuntos();

  const handleArquivo = (file: File) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: any) => {
        const data = results.data as any[];
        setCsvData(data);
        setColunas(Object.keys(data[0]));
        messageApi.success("CSV carregado com sucesso!");
      },
      error: () => message.error("Erro ao ler o CSV."),
    });

    setNomeArquivo(file.name);
    const tamanhoMB = (file.size / (1024 * 1024)).toFixed(2);
    setTamanhoArquivo(`${tamanhoMB} MB`);

    return false; // impede upload automático
  };

  const finalizar = () => {
    if (!colLatitude || !colLongitude) {
      return message.error("Selecione colunas para latitude e longitude.");
    }

    const dadosCompletos: Array<DadoGeografico> = csvData.map(
      (item, index) => ({
        id: usarIdPersonalizado && colunaId ? item[colunaId] : `auto-${index}`,
        latitude: item[colLatitude],
        longitude: item[colLongitude],
      })
    );

    onClose();
    setStepAtual(0);
    setCsvData([]);
    criarConjunto(dadosCompletos, nomeArquivo);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Importar Dataset"
        open={open}
        onCancel={onClose}
        footer={null}
        width={700}
      >
        <Steps current={stepAtual} style={{ marginBottom: 24 }}>
          <Step title="" />
          <Step title="" />
          <Step title="" />
        </Steps>

        {stepAtual === 0 && (
          <div style={{ padding: 24 }}>
            {!csvData?.length ? (
              <Upload.Dragger
                beforeUpload={handleArquivo}
                accept=".csv"
                showUploadList={false}
                multiple={false}
                style={{ padding: 24, borderRadius: 8 }}
              >
                <p style={{ fontSize: 18, marginBottom: 8 }}>
                  <InboxOutlined style={{ fontSize: 48, color: "#1890ff" }} />
                </p>
                <p style={{ fontWeight: "bold", fontSize: 16 }}>
                  Clique ou arraste um arquivo CSV para esta área
                </p>
                <p style={{ color: "#888" }}>
                  O arquivo deve conter pelo menos colunas com latitude e
                  longitude. <br />
                  Tamanho máximo recomendado: 5MB.
                </p>
                <Button type="primary" style={{ marginTop: 16 }}>
                  Selecionar Arquivo CSV
                </Button>
              </Upload.Dragger>
            ) : (
              <div style={{ textAlign: "center" }}>
                <FileTextOutlined style={{ fontSize: 48, color: "#1890ff" }} />
                <Typography.Title level={5} style={{ marginTop: 16 }}>
                  {nomeArquivo}
                </Typography.Title>
                <Typography.Text type="secondary">
                  {tamanhoArquivo} • CSV
                </Typography.Text>

                <div style={{ marginTop: 24 }}>
                  <Button
                    danger
                    onClick={() => {
                      setCsvData([]);
                      setColunas([]);
                      setColLatitude(undefined);
                      setColLongitude(undefined);
                      setColunaId(undefined);
                      setNomeArquivo("");
                      setTamanhoArquivo(null);
                      setUsarIdPersonalizado(false);
                    }}
                  >
                    Remover arquivo
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => setStepAtual(1)}
                    style={{ marginLeft: 8 }}
                  >
                    Próximo
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {stepAtual === 1 && (
          <Form layout="vertical" style={{ width: "100%", padding: 24 }}>
            <Typography.Title level={4}>
              Configurar colunas do dataset
            </Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 24 }}>
              Selecione abaixo quais colunas do arquivo CSV representam as
              coordenadas geográficas e se você deseja usar uma coluna como
              identificador único.
            </Typography.Paragraph>

            <Form.Item label="Coluna de Latitude">
              <Select
                value={colLatitude}
                onChange={setColLatitude}
                placeholder="Selecione a coluna de latitude"
              >
                {colunas.map((col) => (
                  <Option key={col} value={col}>
                    {col}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="Coluna de Longitude">
              <Select
                value={colLongitude}
                onChange={setColLongitude}
                placeholder="Selecione a coluna de longitude"
              >
                {colunas.map((col) => (
                  <Option key={col} value={col}>
                    {col}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Divider />

            <Form.Item label="Identificador dos dados">
              <Radio.Group
                value={usarIdPersonalizado}
                onChange={(e) => setUsarIdPersonalizado(e.target.value)}
              >
                <Radio value={false}>Gerar ID automaticamente</Radio>
                <Radio value={true}>Usar coluna existente como ID</Radio>
              </Radio.Group>
            </Form.Item>

            {usarIdPersonalizado && (
              <Form.Item label="Coluna para o ID">
                <Select
                  value={colunaId}
                  onChange={setColunaId}
                  placeholder="Selecione a coluna que será usada como ID"
                >
                  {colunas.map((col) => (
                    <Option key={col} value={col}>
                      {col}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            )}

            <Form.Item style={{ textAlign: "right", marginTop: 24 }}>
              <Button
                onClick={() => setStepAtual(0)}
                style={{ marginRight: 8 }}
              >
                Voltar
              </Button>
              <Button
                type="primary"
                onClick={() => setStepAtual(2)}
                disabled={
                  !colLatitude ||
                  !colLongitude ||
                  (usarIdPersonalizado && !colunaId)
                }
              >
                Próximo
              </Button>
            </Form.Item>
          </Form>
        )}

        {stepAtual === 2 && (
          <div style={{ padding: 24 }}>
            <Typography.Title level={4}>Revisar dados</Typography.Title>
            <Typography.Paragraph type="secondary" style={{ marginBottom: 16 }}>
              Confira abaixo um preview das primeiras linhas do seu dataset
              antes de criar o conjunto. Certifique-se de que as colunas de
              latitude, longitude e ID (se aplicável) estão corretas.
            </Typography.Paragraph>

            <Table
              columns={[
                { title: "ID", dataIndex: "id", key: "id" },
                { title: "Latitude", dataIndex: colLatitude, key: "lat" },
                { title: "Longitude", dataIndex: colLongitude, key: "lng" },
              ]}
              dataSource={csvData.slice(0, 5).map((item, index) => ({
                ...item,
                id: usarIdPersonalizado ? item[colunaId] : `auto-${index}`,
              }))}
              rowKey="id"
              pagination={false}
              bordered
              size="middle"
            />

            <div style={{ textAlign: "right", marginTop: 24 }}>
              <Button
                onClick={() => setStepAtual(1)}
                style={{ marginRight: 8 }}
              >
                Voltar
              </Button>
              <Button type="primary" onClick={finalizar}>
                Criar Conjunto
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default DatasetUploaderModal;
