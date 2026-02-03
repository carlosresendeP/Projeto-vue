# Frontend – Sistema de Clientes e Demandas

Este projeto corresponde ao **Frontend** do desafio técnico proposto pela **Softpar**, desenvolvido com **Vue 3 (Composition API)** e **Quasar Framework**.

O objetivo do sistema é permitir o cadastro de clientes e demandas, visualização em Kanban e geração de relatório mensal por cliente, consumindo uma API REST já existente.

---

## 🧠 Visão Geral do Projeto

O frontend foi estruturado priorizando:

* Organização de código
* Separação clara de responsabilidades
* Facilidade de manutenção
* Clareza para leitura por outros desenvolvedores

A aplicação é composta por **4 telas principais**, conforme escopo do MVP:

* Clientes
* Demandas
* Kanban
* Relatório

---

## 📁 Organização do Frontend

A estrutura de pastas foi pensada para refletir boas práticas em projetos Vue 3 com Quasar:

* **pages/**
  Representam as telas da aplicação. Cada página corresponde a uma rota.

* **layouts/**
  Definem a estrutura visual base da aplicação (header, menu lateral e área de conteúdo).

* **components/**
  Componentes reutilizáveis, organizados por domínio (clients, demands, kanban, reports).

* **router/**
  Responsável pela definição das rotas e navegação entre as telas.

* **services/**
  Camada responsável pela comunicação com a API backend (HTTP / Axios).

* **stores/**
  Centraliza o estado da aplicação (dados de clientes, demandas e kanban).

* **types/**
  Definição de tipagens dos dados recebidos/enviados à API.

Essa organização facilita a escalabilidade do projeto e torna mais clara a separação entre interface, regras de apresentação e integração com o backend.

---

## 🧭 Telas do Sistema

### Clientes

Tela responsável pelo cadastro e listagem de clientes, seguindo os campos definidos no escopo do MVP.

### Demandas

Tela para cadastro e listagem de demandas, incluindo prioridade, setor, responsável, status e demais informações.

### Kanban

Visualização das demandas em colunas de acordo com o status:

Backlog → Autorização → Fila → Em desenvolvimento → Teste → Deploy → Concluído

A movimentação entre os status atualiza o backend.

### Relatório

Tela de relatório mensal por cliente, exibindo demandas do período selecionado, status, tempo estimado, tempo gasto e se a demanda foi cobrada.

---

## 🔗 Integração com o Backend

O frontend consome uma API REST desenvolvida em Laravel, utilizando os seguintes endpoints principais:

* Clientes

  * GET /clients
  * POST /clients
  * PUT /clients/{id}

* Demandas

  * GET /demands
  * POST /demands
  * PATCH /demands/{id}
  * PATCH /demands/{id}/status

* Relatório

  * GET /reports/client/{id}?month=YYYY-MM

A comunicação com a API é centralizada na pasta **services/**.

---

## ▶️ Como rodar o Frontend

### Pré-requisitos

* vue 3
* NPM ou Yarn

### Passos

```bash
npm install
npm run dev
```

A aplicação estará disponível em:

```
http://localhost:5173
```

---

## ❓ Dúvidas e Premissas

* O frontend não realiza envio real de e-mails ou WhatsApp, apenas armazena as informações conforme solicitado no MVP.
* Upload real de arquivos não foi considerado obrigatório no MVP, sendo tratado apenas como campo de texto.
* O Kanban foi tratado como uma visualização das demandas, e não como uma entidade separada.
* O layout prioriza clareza e usabilidade, sem foco inicial em identidade visual avançada.

---

## ✅ Checklist do MVP

* [x] Estrutura base do projeto
* [x] Organização profissional de pastas
* [x] Rotas para Clientes, Demandas, Kanban e Relatório
* [ ] Cadastro de clientes
* [ ] Cadastro de demandas
* [ ] Kanban funcional
* [ ] Relatório mensal por cliente

---

## 🚀 Considerações Finais

Este frontend foi estruturado seguindo boas práticas e focado na clareza do código, facilitando manutenção, leitura e evolução futura do sistema, conforme o contexto de projetos reais da Softpar.
