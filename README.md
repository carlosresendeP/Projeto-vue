# Sistema de Gestão Softpar - Desafio Técnico

## 📋 Descrição do Projeto

Este projeto é a entrega do desafio técnico para a vaga de Programador(a) Júnior na Softpar. Trata-se de um **sistema web completo para gestão de clientes e demandas**, apresentando:

- Cadastro e gerenciamento de Clientes
- Cadastro e gerenciamento de Demandas
- Kanban visual para acompanhamento do fluxo de trabalho
- Relatórios mensais de desempenho por cliente

### Arquitetura

O sistema foi desenvolvido seguindo a arquitetura **SPA (Single Page Application)**:

- **Backend**: API RESTful construída com **Laravel 12** e **PostgreSQL**.
- **Frontend**: Interface construída com **Vue 3 (Composition API)**, **Quasar Framework** e **Pinia**.

---

## Passo a Passo que eu fiz no projeto
**[PASSO A PASSO](./_projeto/stack.md)** - Guia basico do passo a passo q fiz no projeto

##  Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas na sua máquina:

- **PHP 8.2+** - [Download](https://www.php.net/downloads)
- **Composer** - [Download](https://getcomposer.org/)
- **Node.js e NPM** - [Download](https://nodejs.org/)
- **PostgreSQL** - Local ou Supabase ([Criar conta gratuita](https://supabase.com/))

### Verificando Instalação

Execute os comandos abaixo no terminal para verificar se as ferramentas estão instaladas corretamente:

```bash
php -v
composer -v
node -v
npm -v
```

Se todos os comandos retornarem as versões instaladas, pode prosseguir. Caso contrário, instale as ferramentas faltantes usando os links acima.

---

## 🚀 Passo a Passo para Rodar o Backend

### 1. Acessar a Pasta do Backend

```bash
cd Backend
```

### 2. Instalar Dependências

```bash
composer install
```

### 3. Configurar o Arquivo .env

Duplique o arquivo `.env.example` e renomeie para `.env`:

```bash
cp .env.example .env
# Ou no Windows: copy .env.example .env
```

### 4. Configurar o Banco de Dados

Edite o arquivo `.env` e configure as credenciais do PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nome_do_seu_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

**Importante**: Certifique-se de que o banco de dados já existe no PostgreSQL antes de prosseguir.

### 5. Gerar Chave da Aplicação

```bash
php artisan key:generate
```

### 6. Rodar as Migrations

Este comando criará as tabelas `clients` e `demands` no banco de dados:

```bash
php artisan migrate
```

### 7. Iniciar o Servidor

```bash
php artisan serve
```

✅ A API estará disponível em: `http://127.0.0.1:8000`

---

## 🎨 Passo a Passo para Rodar o Frontend

### 1. Acessar a Pasta da Interface

Abra um **novo terminal** e execute:

```bash
cd interface
```

### 2. Instalar Dependências

```bash
npm install
```

### 3. Configurar Variável de Ambiente (Opcional)

O frontend já está configurado para acessar `http://127.0.0.1:8000/api`. Caso precise alterar, crie um arquivo `.env` na pasta `interface`:

```env
VITE_API_URL=http://127.0.0.1:8000/api
```

### 4. Iniciar o Servidor de Desenvolvimento

```bash
npm run dev
```

✅ Acesse a aplicação no navegador em: `http://localhost:5173`

---

## Configuração do Banco de Dados

### Estrutura de Migrations

O projeto possui duas migrations principais:

1. **`create_clients_table`** - Tabela de clientes
2. **`create_demands_table`** - Tabela de demandas

As migrations já estão configuradas no repositório. Ao executar `php artisan migrate`, as seguintes tabelas serão criadas:

### Tabela: `clients`

| Campo               | Tipo    | Descrição               |
| ------------------- | ------- | ----------------------- |
| id                  | bigint  | ID único                |
| nome                | string  | Nome do cliente         |
| email               | string  | E-mail do cliente       |
| avisar_por_email    | boolean | Notificar por e-mail?   |
| whatsapp            | string  | Número do WhatsApp      |
| avisar_por_whatsapp | boolean | Notificar por WhatsApp? |
| observacao          | text    | Observações adicionais  |

### Tabela: `demands`

| Campo               | Tipo      | Descrição                      |
| ------------------- | --------- | ------------------------------ |
| id                  | bigint    | ID único                       |
| data_cadastro       | timestamp | Data de criação (automática)   |
| client_id           | bigint    | Relacionamento com cliente     |
| titulo              | string    | Título da demanda              |
| prioridade          | string    | Baixa, Média, Alta, Urgente    |
| setor               | string    | Setor responsável              |
| responsavel         | string    | Nome do responsável            |
| quem_deve_testar    | string    | Testador responsável           |
| descricao_detalhada | text      | Descrição completa             |
| anexos_midias       | string    | Caminho para anexos (opcional) |
| cobrada_do_cliente  | boolean   | Foi cobrada?                   |
| tempo_estimado      | integer   | Tempo estimado (horas)         |
| tempo_gasto         | integer   | Tempo real gasto (horas)       |
| status              | string    | Status no Kanban               |
| flag_retornou       | boolean   | Retornou do cliente?           |
| feedback            | text      | Feedback do cliente (opcional) |

---

## 🔌 Lista de Endpoints Disponíveis

### Clientes

| Método | Endpoint            | Descrição                  |
| ------ | ------------------- | -------------------------- |
| GET    | `/api/clients`      | Listar todos os clientes   |
| POST   | `/api/clients`      | Cadastrar novo cliente     |
| GET    | `/api/clients/{id}` | Detalhes de um cliente     |
| PUT    | `/api/clients/{id}` | Atualizar dados do cliente |
| DELETE | `/api/clients/{id}` | Remover cliente            |

### Demandas

| Método | Endpoint                   | Descrição                  |
| ------ | -------------------------- | -------------------------- |
| GET    | `/api/demands`             | Listar todas as demandas   |
| POST   | `/api/demands`             | Cadastrar nova demanda     |
| GET    | `/api/demands/{id}`        | Detalhes de uma demanda    |
| PUT    | `/api/demands/{id}`        | Atualizar dados da demanda |
| PATCH  | `/api/demands/{id}/status` | Atualizar apenas o status  |
| DELETE | `/api/demands/{id}`        | Remover demanda            |

### Relatórios

| Método | Endpoint                                  | Descrição                             |
| ------ | ----------------------------------------- | ------------------------------------- |
| GET    | `/api/reports/clients/{id}?month=YYYY-MM` | Dados consolidados do mês por cliente |

### Sistema

| Método | Endpoint  | Descrição           |
| ------ | --------- | ------------------- |
| GET    | `/health` | Health Check da API |

---

## ❓ Dúvidas e Premissas

### Dúvidas Levantadas Durante o Desenvolvimento

1. **Banco de Dados**: O desafio cita PostgreSQL, mas não especifica se local ou nuvem.
   - **Decisão**: Utilizei Postgres na nuvem (Supabase) pela facilidade de configuração, mas o projeto funciona perfeitamente em PostgreSQL local.

2. **Responsável pela Demanda**: Deve ser um usuário autenticado do sistema?
   - **Premissa**: Como não foi solicitado sistema de autenticação nem CRUD de usuários, mantive o campo "Responsável" como texto livre (String), permitindo inserir qualquer nome.

3. **Formato do Relatório**: O desafio pede "Relatório Mensal" sem especificar o formato de saída.
   - **Decisão**: Desenvolvi um Dashboard interativo em tela com cards de totalizadores e tabela filtrável, proporcionando uma experiência mais rica que um PDF estático.

4. **Upload de Anexos**: O campo "anexos/mídias" deve ter upload real de arquivos? Era um diferencial opcional.
   - **Premissa**: Mantive como campo de texto (String) no MVP, armazenando apenas o caminho ou URL, pois upload real foi listado como diferencial opcional.

### Premissas Adotadas

- **Kanban Rígido**: As colunas seguem estritamente o fluxo definido no desafio (Backlog → Autorização → Fila → Em desenvolvimento → Teste → Deploy → Concluído).
- **Data Automática**: A data de cadastro da demanda é preenchida automaticamente pelo backend via `timestamps`.
- **Framework CSS**: Utilizei exclusivamente os componentes do Quasar Framework para manter consistência visual.
- **Validação de Campos**: Campos obrigatórios são validados tanto no frontend quanto no backend.

---

## ✅ Checklist do MVP

Funcionalidades obrigatórias implementadas:

- [x] **Cadastro de Clientes** - CRUD completo funcionando
- [x] **Cadastro de Demandas** - CRUD completo funcionando
- [x] **Kanban de Demandas** - Visualização por colunas de status
- [x] **Fluxo de Status Completo** - Backlog → Concluído
- [x] **Relatório Mensal por Cliente** - Dashboard com filtros
- [x] **Stack Obrigatória** - Laravel 12, Vue 3, PostgreSQL
- [x] **API RESTful** - Todos os endpoints documentados
- [x] **Integração Frontend/Backend** - Comunicação via Axios

---

##  Diferenciais Implementados

Além do escopo obrigatório do MVP, foram implementadas as seguintes funcionalidades extras:

###  Drag-and-Drop no Kanban

Funcionalidade que permite **arrastar e soltar** os cards de demandas entre as colunas do Kanban. Ao soltar um card em uma nova coluna, o status da demanda é atualizado automaticamente no backend via requisição PATCH.

**Tecnologia**: Implementado com a biblioteca `vuedraggable@next`, integrada ao Pinia Store para reatividade em tempo real.

**Benefício**: Melhora significativamente a experiência do usuário (UX), tornando a gestão do Kanban mais intuitiva e ágil.

---

## 📚 Documentação Adicional

Para informações mais detalhadas sobre cada parte do sistema:

- **[Backend README](./Backend/README.md)** - Detalhes da API, estrutura de pastas e comandos úteis
- **[Frontend README](./interface/README.md)** - Arquitetura do Vue, componentes e troubleshooting
- **[PASSO A PASSO](./_projeto/stack.md)** - Guia basico do passo a passo q fiz no projeto

---

Desenvolvido por Carlos para o Desafio Softpar 🚀
