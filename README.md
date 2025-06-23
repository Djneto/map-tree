# Map-Tree

:globe_with_meridians: **Versão online disponível em [map-tree.vercel.app](https://map-tree.vercel.app)**

**Map-Tree** é uma aplicação web educacional para visualização, organização e análise de dados geográficos em mapas interativos. Desenvolvida com Next.js, React, TypeScript e Leaflet, ela permite importar conjuntos de dados, visualizar pontos no mapa, calcular distâncias e rotas, e explorar conceitos de geolocalização de forma prática e intuitiva.

---

## Funcionalidades Principais

- **Visualização Interativa de Mapas:** Exiba pontos geográficos em um mapa dinâmico, com suporte a temas claro/escuro.
- **Importação de Dados via CSV:** Importe conjuntos de dados geográficos (latitude/longitude) facilmente, com assistente visual para seleção de colunas.
- **Organização em Conjuntos:** Crie, edite, renomeie, colore e remova conjuntos de pontos para diferentes categorias ou grupos de dados.
- **Cálculo de Distâncias e Rotas:** Calcule a menor distância ou rota entre conjuntos, ou dentro de um raio específico, utilizando algoritmos eficientes (KD-Tree).
- **Gestão Visual e Interativa:** Adicione, selecione ou remova pontos diretamente no mapa, com ações rápidas e atalhos.
- **Interface Moderna:** UI baseada em Ant Design, responsiva e amigável.
- **100% Local:** Todo processamento e visualização são feitos no navegador, sem necessidade de backend externo.

---

## Fluxo de Uso

1. **Inicie a aplicação localmente** (veja instruções abaixo).
2. **Importe um arquivo CSV** com colunas de latitude e longitude, ou crie conjuntos manualmente.
3. **Organize seus conjuntos:** Dê nomes, escolha cores e edite conforme necessário.
4. **Visualize os pontos no mapa:** Cada conjunto aparece com sua cor, e você pode clicar para ver detalhes.
5. **Adicione ou remova pontos manualmente:** Use as ações rápidas para inserir ou excluir pontos diretamente no mapa.
6. **Calcule distâncias ou rotas:**
   - Escolha conjuntos de origem e destino.
   - Selecione o tipo de cálculo: menor distância, menor rota, ou dentro de um raio.
   - Visualize os resultados no mapa e na lista lateral.
7. **Alterne entre tema claro e escuro** conforme sua preferência.

---

## Exemplo de CSV Aceito

```csv
id,latitude,longitude
1,-15.793889,-47.882778
2,-15.794000,-47.882900
3,-15.795000,-47.883000
```
- O assistente de importação permite escolher quais colunas representam latitude, longitude e (opcionalmente) o identificador.

---

## Instalação e Execução Local

### Pré-requisitos

- Node.js (versão LTS recomendada)
- npm ou yarn

### Passos

1. **Clone o repositório:**
   ```bash
   git clone [URL_DO_REPOSITORIO]
   cd map-tree
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o servidor de desenvolvimento:**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. **Acesse no navegador:**  
   [http://localhost:3000](http://localhost:3000)

---

## Estrutura do Projeto

```
map-tree/
├── public/                    # Arquivos estáticos (ícones, imagens)
├── src/
│   ├── app/                   # Páginas e layout principal (Next.js App Router)
│   ├── components/            # Componentes de UI (mapa, drawer, listas, etc.)
│   ├── contexts/              # Contextos React para estado global
│   ├── services/              # Lógica de cálculo e manipulação de dados
│   ├── styles/                # Estilos globais e temas
│   ├── types/                 # Tipos TypeScript
│   └── utils/                 # Funções utilitárias
├── package.json               # Dependências e scripts
├── tsconfig.json              # Configuração TypeScript
└── README.md                  # Este arquivo
```

---

## Detalhamento das Funcionalidades

### 1. Importação de Dados
- Importe arquivos CSV com dados geográficos.
- Assistente visual para mapear colunas de latitude, longitude e ID.
- Visualize e edite os dados antes de adicionar ao mapa.

### 2. Organização em Conjuntos
- Crie conjuntos manualmente ou via importação.
- Personalize nome e cor de cada conjunto.
- Remova conjuntos facilmente.

### 3. Visualização e Interação no Mapa
- Pontos exibidos com ícones coloridos por conjunto.
- Clique em pontos para ver detalhes ou remover.
- Adicione novos pontos clicando no mapa (com conjunto selecionado).

### 4. Cálculo de Distâncias e Rotas
- Selecione conjuntos de origem e destino.
- Escolha entre menor distância, menor rota ou dentro de um raio.
- Resultados exibidos como linhas no mapa e listados na interface.
- Algoritmos eficientes para manipulação de grandes volumes de dados.

### 5. Interface e Usabilidade
- Drawer lateral para navegação entre conjuntos e cálculos.
- Ações rápidas flutuantes para seleção de conjunto, modo de ação e tema.
- Suporte a tema claro/escuro.

---

## Observações

- **Projeto educacional:** O foco é o aprendizado de conceitos de geolocalização, manipulação de dados e desenvolvimento web moderno.

---

## Licença

Este projeto está licenciado conforme descrito no arquivo [LICENSE](LICENSE).
