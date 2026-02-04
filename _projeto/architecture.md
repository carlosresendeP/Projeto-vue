# Arquitetura do Projeto

Este documento de arquitetura descreve como o sistema será estruturado para atender ao MVP do desafio.

## 1. Visão Geral da Stack

O sistema funcionará no modelo **SPA (Single Page Application)** consumindo uma **API REST**.

- **Frontend (Cliente):** Vue 3 + Quasar Framework (Interface e Lógica de Cliente).
- **Backend (Servidor):** Laravel (API Rest, Regras de Negócio, Acesso a Dados).
- **Banco de Dados:** PostgreSQL (Supabase).

---

## 2. Estrutura do Frontend (Vue 3 + Quasar)

O frontend será responsável por toda a interação com o usuário, gerenciamento de estado da tela e consumo da API.

### Organização de Pastas (Sugestão)

- `src/pages`: Telas principais (Clientes, Kanban, Relatórios).
- `src/components`: Componentes reutilizáveis (Card de Demanda, Formulários).
- `src/layouts`: Layout principal da aplicação (Menu lateral, Header).

### Fluxo de Componentes

1. **Layout Principal (MainLayout)**
   - Header (Logo, Usuário "Logado").
   - Drawer Lateral (Menu: Dashboard/Kanban, Clientes, Relatórios).
   - `router-view`: Onde as páginas são carregadas.

2. **Páginas Chave**
   - **Kanban (`/kanban`):**
     - Componente Pai: Gerencia as colunas.
     - Componentes Filhos: `KanbanColumn`, `DemandaCard`.
     - Funcionalidade: Drag & Drop (Quasar `v-draggable` ou biblioteca externa se necessário) ou botões de ação para mover cards.
   - **Clientes (`/clients`):**
     - Lista de clientes (Tabela Quasar).
     - Modal/Drawer de Cadastro/Edição.
   - **Relatórios (`/reports`):**
     - Filtros (Mês/Cliente).
     - Exibição de Resumo (Cards de métricas).

### Comunicação com API

- Utilização do **Axios** configurado globalmente (`src/services/api.ts`).
- Padrão **Repository/Service** simplificado via Composables:
  - Ex: `useDemandas` exporta `fetchDemandas`, `createDemanda`, `updateStatus`, `deleteDemanda`.

---

## 3. Estrutura do Backend (Laravel)

O backend servirá exclusivamente como uma API JSON.

### Rotas (`routes/api.php`)

- `GET /clients`
- `POST /clients`
- `GET /demands` (com filtros)
- `POST /demands`
- `PATCH /demands/{id}` (para atualizar status/coluna)
- `GET /reports/client/{id}` (dados consolidados)

### Camadas

1. **Controllers:** Recebem a requisição, validam (FormRequests) e chamam o Model. Retornam `JsonResource`.
2. **FormRequests:** Validação robusta dos dados de entrada (ex: `StoreDemandaRequest`).
3. **Models:** Definem relações e escopos.
   - `User` (para Responsável/Quem Testa).
   - `Client` (Cliente).
   - `Demanda` (Ticket/Task).
4. **Resources:** Formatam a resposta JSON para o frontend (para não expor colunas internas do banco).

---

## 4. Banco de Dados (MER Resumido)

### Tabela: `clients`

Armazena as empresas/clientes.

- `id` (PK)
- `nome`
- `email`
- `whatsapp`
- `preferencia_notificacao` (json ou colunas booleanas: `notify_email`, `notify_whatsapp`)

### Tabela: `users` (Simplificada para MVP)

Utilizada para popular os selects de "Responsável" e "Quem deve testar".

- `id` (PK)
- `name`
- `email`
- `role` (ex: 'dev', 'qa', 'manager') - _Opcional_

### Tabela: `demands`

A entidade principal do Kanban.

- `id` (PK)
- `client_id` (FK -> clients)
- `responsavel_id` (FK -> users)
- `testador_id` (FK -> users, nullable)
- `titulo`
- `descricao`
- `prioridade` (Baixa, Média, Alta)
- `status` (Backlog, Autorizacao, Fila, EmDesenvolvimento, Teste, Deploy, Concluido)
- `anexos` (text/json - links para MVP)
- `flag_retornou` (boolean, default false)
- `tempo_estimado` (integer, minutos)
- `tempo_gasto` (integer, minutos)
- `feedback` (text)
- `timestamps` (created_at, updated_at)

---

## 5. Fluxo de Trabalho (Exemplo: Mover Card)

1. **Frontend:** Usuário arrasta card de "Desenvolvimento" para "Teste".
2. **Frontend:** Dispara requisição `PATCH /api/demands/{id}` com `{ status: 'Teste' }`.
3. **Backend:**
   - Controller recebe Request.
   - Valida se a transição é permitida (opcional).
   - Atualiza `status` no banco.
   - Se a transição fosse inversa (Teste -> Dev), o Backend setaria `flag_retornou = true`.
4. **Backend:** Retorna 200 OK com o objeto atualizado.
5. **Frontend:** Atualiza a UI para refletir a mudança (reatividade).



## Contrato da API (o que o frontend vai consumir)
Clientes
GET    /api/clients
POST   /api/clients
PUT    /api/clients/{id}

Demandas
GET    /api/demands
POST   /api/demands
PATCH  /api/demands/{id}
PATCH  /api/demands/{id}/status

Relatório
GET /api/reports/client/{id}?month=YYYY-MM



frontend
telas 
 clientes
 Demandas
 kanban
 relatorios