# 📒 Agenda — Express + MongoDB

API REST e interface web para gerenciamento de contatos, com operações completas de CRUD.

## 🧩 Funcionalidades

- Cadastro, listagem, edição e exclusão de contatos
- API REST com **Express.js**
- Persistência de dados com **MongoDB + Mongoose**
- Interface web renderizada com **EJS**
- Build do frontend com **Webpack**

## 🏗️ Arquitetura

    ├── frontend/         # Interface web (EJS + assets)
    ├── src/              # Lógica da aplicação
    ├── routes.js         # Definição das rotas da API
    ├── server.js         # Ponto de entrada do servidor
    └── webpack.config.js

## 🚀 Como rodar

### Pré-requisitos

- Node.js >= 18
- MongoDB rodando localmente ou URI de conexão

### Instalação

    npm install

### Rodar em desenvolvimento

    node server.js

## 🛠️ Tecnologias

- **Node.js + Express** — servidor e roteamento
- **MongoDB + Mongoose** — banco de dados e modelagem
- **EJS** — template engine para renderização server-side
- **Webpack** — bundler do frontend
