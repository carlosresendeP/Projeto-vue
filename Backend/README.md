# Backend do Sistema de Gestão (Laravel API)

Este é o backend da aplicação, desenvolvido em **Laravel 12**, servindo como uma API RESTful para o frontend Vue.js. Ele gerencia clientes, demandas (Kanban) e relatórios.

## 🚀 Tecnologias Utilizadas

- **PHP** >= 8.2
- **Laravel** 12.x
- **PostgreSQL** (Banco de dados principal)
- **Composer** (Gerenciador de dependências)

## 📋 Pré-requisitos

Certifique-se de ter instalado em sua máquina:

- [PHP 8.2+](https://www.php.net/downloads)
- [Composer](https://getcomposer.org/)
- [PostgreSQL](https://www.postgresql.org/) (ou outro banco configurado no `.env`)

## 🛠️ Instalação e Configuração

Siga os passos abaixo para rodar o projeto localmente:

1.  **Clone o repositório** (se ainda não o fez) e entre na pasta `Backend`:

    ```bash
    cd Backend
    ```

2.  **Instale as dependências do PHP**:

    ```bash
    composer install
    ```

3.  **Configure o arquivo de ambiente**:
    Faça uma cópia do arquivo de exemplo `.env.example` para `.env`:

    ```bash
    cp .env.example .env
    # Ou no Windows: copy .env.example .env
    ```

4.  **Gere a chave da aplicação**:

    ```bash
    php artisan key:generate
    ```

5.  **Configure o Banco de Dados**:
    Abra o arquivo `.env` e configure as credenciais do seu banco de dados PostgreSQL:

    ```env
    DB_CONNECTION=pgsql
    DB_HOST=127.0.0.1
    DB_PORT=5432
    DB_DATABASE=nome_do_seu_banco
    DB_USERNAME=seu_usuario
    DB_PASSWORD=sua_senha
    ```

    _Certifique-se de criar o banco de dados vazio no seu SGBD antes do próximo passo._

6.  **Rode as Migrations** (Criação das tabelas):

    ```bash
    php artisan migrate
    ```

7.  **Popule o Banco com Dados Iniciais (Opcional)**:
    Se quiser criar usuários ou dados de teste configurados no `DatabaseSeeder`:

    ```bash
    php artisan db:seed
    ```

8.  **Inicie o Servidor Local**:
    ```bash
    php artisan serve
    ```
    O backend estará rodando em: `http://localhost:8000`

## 📂 Estrutura do Projeto

As pastas principais que você precisa conhecer:

- **`app/Http/Controllers`**: Onde fica a lógica das requisições.
    - `ClientController.php`: Gerencia o CRUD de Clientes.
    - `DemandController.php`: Gerencia as Demandas do Kanban.
    - `ReportController.php`: Gera relatórios de desempenho.
    - `Api/`: Controllers específicos para respostas JSON.
- **`app/Models`**: Modelos que representam as tabelas do banco (Eloquent ORM).
    - `Client`, `Demand`.
- **`routes/api.php`**: Definição de todas as rotas da API.
- **`database/migrations`**: Histórico de alterações no esquema do banco de dados.

## 🔌 Documentação da API

Abaixo estão as principais rotas disponíveis. Todas as respostas são em **JSON**.

### 🏥 Health Check

- `GET /health`: Verifica se a API está online.

### 👥 Clientes (`/api/clients`)

- `GET /api/clients`: Lista todos os clientes.
- `POST /api/clients`: Cria um novo cliente.
- `GET /api/clients/{id}`: Exibe detalhes de um cliente.
- `PUT /api/clients/{id}`: Atualiza um cliente.
- `DELETE /api/clients/{id}`: Remove um cliente.

### 📋 Demandas (`/api/demands`)

- `GET /api/demands`: Lista todas as demandas.
- `POST /api/demands`: Cria uma nova demanda.
- `GET /api/demands/{id}`: Exibe detalhes.
- `PUT /api/demands/{id}`: Atualiza dados da demanda.
- `DELETE /api/demands/{id}`: Exclui uma demanda.

#### 🔥 Kanban Action

- `PATCH /api/demands/{demand}/status`: Rota específica para arrastar cards no Kanban.
    - **Body**: `{ "status": "Em Progresso" }` (Exemplo)

### 📊 Relatórios (`/api/reports`)

- `GET /api/reports/clients/{client}`: Retorna dados mensais consolidados de um cliente específico.

## 💡 Comandos Úteis

```bash
# Criar um novo Model com Migration e Controller API
php artisan make:model NomeDoModel -mcr --api

# Rodar testes (se houver)
php artisan test

# Limpar cache de configuração
php artisan config:clear
```

---

Desenvolvido para estudo e portfólio.
