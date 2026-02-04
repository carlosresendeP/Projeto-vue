# Interface - Softpar Gestão

Frontend desenvolvido em **Vue 3 (Composition API)** e **Quasar Framework** para o sistema de gestão de demandas.

---

## Pré-requisitos

Antes de rodar o frontend, certifique-se de ter instalado na sua máquina:

- **Node.js 18+** - [Download](https://nodejs.org/)
- **NPM** (vem junto com o Node.js)

### Verificando se está tudo instalado

Execute os seguintes comandos para verificar:

```bash
node -v
npm -v
```

Se ambos retornarem as versões, você está pronto para continuar.

### Documentação Oficial

- [Vue 3 Documentation](https://vuejs.org/)
- [Vite Documentation](https://vitejs.dev/)
- [Quasar Framework](https://quasar.dev/)

---

## 📜 Histórico de Criação

Este projeto foi iniciado utilizando **Vite** com template Vue + TypeScript:

```bash
npm create vite@latest interface -- --template vue-ts
```

Posteriormente foram adicionados:

- **Quasar Framework** para componentes UI
- **Pinia** para gerenciamento de estado
- **Vue Router** para navegação
- **Axios** para requisições HTTP
- **Vuedraggable** para Drag-and-Drop no Kanban

---

## 🚀 Como Rodar (Instalação Completa)

### 1. Instalar Dependências

Se você clonou o repositório, instale as dependências:

```bash
cd interface
npm install
```

### 2. (Opcional) Criando um Projeto Vue do Zero com Vite

Caso você queira criar um novo projeto do zero:

```bash
npm create vite@latest interface -- --template vue-ts
cd interface
npm install
```

### 3. Instalar Quasar Framework

Adicione o Quasar ao projeto:

```bash
npm install quasar @quasar/extras
```

### 4. Configurar Quasar no `main.ts`

Edite o arquivo `src/main.ts` e configure o Quasar:

```typescript
import { createApp } from "vue";
import App from "./App.vue";
import { Quasar } from "quasar";
import "@quasar/extras/material-icons/material-icons.css";
import "quasar/dist/quasar.css";

const app = createApp(App);
app.use(Quasar, { plugins: {} });
app.mount("#app");
```

### 5. Instalar Vue Router

```bash
npm install vue-router@4
```

Crie o arquivo `src/router/index.ts` e configure as rotas para as páginas principais (Clientes, Demandas, Kanban, Relatórios).

### 6. Instalar Pinia (State Management)

```bash
npm install pinia
```

Configure no `main.ts`:

```typescript
import { createPinia } from "pinia";
app.use(createPinia());
```

### 7. Instalar Axios

```bash
npm install axios
```

Crie o arquivo `src/services/api.ts` para centralizar as chamadas à API.

### 8. Instalar Vuedraggable (Drag-and-Drop)

```bash
npm install vuedraggable@next
```

### 9. Criar Estrutura de Pastas

Organize o projeto seguindo a estrutura:

```
src/
├── components/       # Componentes reutilizáveis
│   ├── clients/
│   ├── demands/
│   ├── kanban/
│   ├── reports/
│   └── layout/
├── pages/           # Páginas principais (rotas)
│   ├── ClientsPage.vue
│   ├── DemandsPage.vue
│   ├── KanbanPage.vue
│   └── ReportsPage.vue
├── layouts/         # Layouts (MainLayout com Header/Sidebar/Footer)
├── router/          # Configuração de rotas
├── stores/          # Stores Pinia (clients, demands, kanban)
├── services/        # Serviços de API (axios)
├── types/           # Interfaces TypeScript
└── utils/           # Funções utilitárias
```

### 10. Configurar Variável de Ambiente

Crie o arquivo `.env` na raiz da pasta `interface`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

No código, acesse via: `import.meta.env.VITE_API_URL`

### 11. Criar Stores (Pinia)

Crie os stores para gerenciar o estado:

```bash
# Estrutura dos arquivos
src/stores/clients.store.ts
src/stores/demands.store.ts
src/stores/kanban.store.ts
```

Cada store deve conter métodos para `fetch`, `add`, `edit` e `remove` dos respectivos recursos.

### 12. Criar Services (API)

Crie os arquivos de serviço para comunicação com o backend:

```bash
src/services/clients.services.ts
src/services/demands.services.ts
src/services/reports.services.ts
```

### 13. Criar Types (TypeScript)

Defina as interfaces:

```bash
src/types/client.ts
src/types/demand.ts
```

### 14. Criar Componentes e Páginas

Desenvolva os componentes seguindo a modularização:

- **ClientsTable.vue**, **ClientsForm.vue**
- **DemandCard.vue**, **DemandForm.vue**, **DemandEdit.vue**
- **KanbanColumn.vue**, **KanbanCard.vue**
- **ReportsTable.vue**, **ReportsCard.vue**

### 15. Iniciar Servidor de Desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em: `http://localhost:5173`

---

## 🏗 Arquitetura e Decisões

### Tecnologias Utilizadas

- **Vue 3 (Composition API)**: `<script setup>` para código mais limpo
- **TypeScript**: Tipagem segura e autocomplete
- **Quasar Framework**: Componentes UI prontos (Tables, Cards, Dialogs)
- **Pinia**: Gerenciamento de estado global
- **Vue Router**: Navegação entre páginas
- **Axios**: Requisições HTTP
- **Vuedraggable**: Drag-and-Drop no Kanban

### Estrutura de Dados

O frontend consome a API do backend nos seguintes endpoints:

- `GET /api/clients` - Lista de clientes
- `GET /api/demands` - Lista de demandas
- `PATCH /api/demands/{id}/status` - Atualiza status (Kanban)
- `GET /api/reports/clients/{id}?month=YYYY-MM` - Relatório mensal

---

## ✅ Funcionalidades Implementadas

### Clientes

- [x] Listagem em tabela (ClientsTable.vue)
- [x] Cadastro/Edição via modal (ClientsForm.vue)
- [x] Exclusão com confirmação

### Demandas

- [x] Listagem em cards (DemandCard.vue)
- [x] Cadastro via modal (DemandForm.vue)
- [x] Edição via modal (DemandEdit.vue)
- [x] Exclusão

### Kanban

- [x] Visualização em colunas por status
- [x] Drag-and-Drop entre colunas (vuedraggable)
- [x] Atualização automática de status

### Relatórios

- [x] Dashboard com cards de totalizadores
- [x] Tabela filtrável por Cliente e Mês
- [x] Indicadores visuais (tempo excedido em vermelho)

---

## 🔧 Scripts Disponíveis

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Linting (se configurado)
npm run lint
```

---

## 📚 Componentes Principais

### Layout

- **MainLayout.vue** - Estrutura base (Header, Sidebar, Footer)
- **AppHeader.vue** - Barra superior com menu toggle
- **AppSidebar.vue** - Menu lateral de navegação
- **AppFooter.vue** - Rodapé

### Páginas

- **ClientsPage.vue** - Gerenciamento de clientes
- **DemandsPage.vue** - Gerenciamento de demandas
- **KanbanPage.vue** - Board Kanban
- **ReportsPage.vue** - Relatórios e dashboard

---

## 🎨 Customização

### Cores do Quasar

Para alterar as cores do tema, edite `quasar.config.js` ou configure via CSS variables.

### Ícones

O projeto usa **Material Icons** (padrão do Quasar). Para usar outros conjuntos:

```bash
npm install @quasar/extras
```

---

## 🐛 Troubleshooting

**Problema**: Erro ao conectar com a API  
**Solução**: Verifique se o backend está rodando em `http://127.0.0.1:8000` e se o `.env` está configurado corretamente.

**Problema**: Componentes do Quasar não aparecem  
**Solução**: Certifique-se de que o Quasar está configurado no `main.ts` e que os imports de CSS estão corretos.

---

Desenvolvido por Carlos para o Desafio Softpar.
