# Map Tree

Uma aplicação web moderna construída com Next.js e TypeScript para visualizar e gerenciar dados de geolocalização em um mapa interativo.

## Funcionalidades

- Visualização interativa de mapas usando Leaflet  
- Gerenciamento e exibição de dados de árvores  
- Importação/exportação de dados via CSV  
- Interface moderna com componentes do Ant Design  
- Desenvolvimento com segurança de tipos usando TypeScript  
- Desenvolvimento rápido com Turbopack  

## Tecnologias Utilizadas

- **Framework**: Next.js 15.2.5  
- **Linguagem**: TypeScript  
- **Biblioteca de UI**: React 19  
- **Componentes de UI**: Ant Design 5  
- **Biblioteca de Mapas**: Leaflet + React-Leaflet  
- **Manipulação de Dados**: PapaParse  
- **Desenvolvimento**: Turbopack  

## Pré-requisitos

- Node.js (versão LTS recomendada)  
- Gerenciador de pacotes npm ou yarn  

## Primeiros Passos

1. **Clone o repositório**
   ```bash
   git clone [sua-url-do-repositorio]
   cd map-tree
   ```

2. **Instale as dependências**
   ```bash
   npm install
   # ou
   yarn install
   ```

3. **Execute o servidor de desenvolvimento**
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

4. Abra [http://localhost:3000](http://localhost:3000) no seu navegador para visualizar a aplicação.

## Scripts Disponíveis

- `npm run dev` – Inicia o servidor de desenvolvimento com Turbopack  
- `npm run build` – Gera a aplicação para produção  
- `npm run start` – Inicia o servidor em modo de produção  
- `npm run lint` – Executa o ESLint para verificação de qualidade do código  

## Estrutura do Projeto

```
map-tree/
├── public/            # Arquivos estáticos
├── src/               # Código-fonte
├── .gitignore         # Regras de arquivos ignorados pelo Git
├── eslint.config.mjs  # Configuração do ESLint
├── next.config.ts     # Configuração do Next.js
├── package.json       # Dependências do projeto
├── tsconfig.json      # Configuração do TypeScript
└── LICENSE            # Arquivo de licença
```

## Contribuindo

1. Faça um fork do repositório  
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/funcionalidade-incrivel`)  
3. Faça commit das suas alterações (`git commit -m 'Adiciona uma funcionalidade incrível'`)  
4. Faça push para a sua branch (`git push origin feature/funcionalidade-incrivel`)  
5. Abra um Pull Request  

## Licença

Este projeto está licenciado conforme descrito no arquivo [LICENSE](LICENSE).

## Suporte

Para suporte, abra uma issue no repositório GitHub ou entre em contato com os mantenedores.
