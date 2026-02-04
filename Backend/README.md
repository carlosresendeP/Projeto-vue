# Backend - Softpar Gestão

API REST desenvolvida em **Laravel 12** para gerenciar o sistema de demandas.

---

## Pré-requisitos

Antes de rodar o backend, certifique-se de ter instalado na sua máquina:

- **PHP 8.2+** - [Download](https://www.php.net/downloads)
- **Composer** - [Download](https://getcomposer.org/)
- **Node.js e NPM** - [Download](https://nodejs.org/)
- **PostgreSQL** - Local ou Supabase

### Verificando se está tudo instalado

Execute os seguintes comandos para verificar se as ferramentas estão corretamente instaladas:

```bash
php -v
composer -v
node -v
npm -v
```

### Configurando PHP para PostgreSQL

É necessário habilitar a extensão PostgreSQL no PHP. Edite o arquivo `php.ini`:

1. Localize o arquivo `php.ini` (use `php --ini` para encontrá-lo)
2. Procure pela linha `;extension=pdo_pgsql` e remova o `;` (descomente)
3. Procure pela linha `;extension=pgsql` e remova o `;` (descomente)
4. Salve o arquivo e reinicie o terminal

### Documentação Oficial do Laravel

Para mais informações sobre instalação e configuração do Laravel:

- [Documentação Laravel 12.x](https://laravel.com/docs/12.x/installation)

---

## 📜 Histórico de Criação

Este projeto foi iniciado utilizando o instalador padrão do Laravel via Composer:

```bash
composer create-project laravel/laravel Backend
```

---

## 🚀 Como Rodar (Instalação Completa)

### 1. Instalar Dependências

Se você clonou o repositório, instale as dependências:

```bash
cd Backend
composer install
```

### 2. (Opcional) Se o Laravel estiver Globalmente Instalado

Caso você queira criar um novo projeto do zero com o Laravel instalado globalmente:

```bash
laravel new Backend
```

### 3. Configurar Ambiente (.env)

Copie o arquivo de exemplo:

```bash
cp .env.example .env
# Ou no Windows: copy .env.example .env
```

Edite o arquivo `.env` e configure as credenciais do banco de dados PostgreSQL:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nome_do_seu_banco
DB_USERNAME=seu_usuario
DB_PASSWORD=sua_senha
```

**Importante**: Certifique-se de que o banco de dados existe no PostgreSQL antes de continuar.

### 4. Gerar Chave da Aplicação

```bash
php artisan key:generate
```

### 5. Criar as Migrations

Se você estiver criando o projeto do zero, crie as migrations para as tabelas:

```bash
php artisan make:migration create_clients_table
php artisan make:migration create_demands_table
```

Depois, configure os schemas das tabelas nos arquivos gerados em `database/migrations/`.

**Observação**: Se você clonou o repositório, as migrations já existem e você pode pular este passo.

### 6. Criar os Models

Crie os models para as entidades:

```bash
php artisan make:model Client
php artisan make:model Demand
```

Configure os campos `$fillable` e relacionamentos necessários em cada Model.

### 7. Rodar Migrations (Criar Tabelas no Banco)

Execute as migrations para criar as tabelas no banco de dados:

```bash
php artisan migrate
```

Isso criará as tabelas `clients` e `demands` no PostgreSQL.

### 8. Criar os Controllers

Crie os controllers para gerenciar as requisições:

```bash
php artisan make:controller Api/ClientController --api
php artisan make:controller Api/DemandController --api
php artisan make:controller Api/ReportController
```

### 9. Configurar as Rotas

Edite o arquivo `routes/api.php` e defina as rotas para os recursos:

```php
Route::apiResource('clients', ClientController::class);
Route::apiResource('demands', DemandController::class);
Route::patch('demands/{demand}/status', [DemandController::class, 'updateStatus']);
Route::get('reports/clients/{client}', [ReportController::class, 'monthlyReport']);
```

### 10. Iniciar Servidor

```bash
php artisan serve
```

A API estará acessível em: `http://127.0.0.1:8000`

---

## 🔌 Endpoints Principais

### Clientes

- **GET /api/clients** - Listar todos os clientes
- **POST /api/clients** - Cadastrar novo cliente
- **GET /api/clients/{id}** - Detalhes de um cliente
- **PUT /api/clients/{id}** - Atualizar cliente
- **DELETE /api/clients/{id}** - Remover cliente

### Demandas

- **GET /api/demands** - Listar todas as demandas
- **POST /api/demands** - Cadastrar nova demanda
- **PUT /api/demands/{id}** - Atualizar demanda
- **PATCH /api/demands/{id}/status** - Atualizar apenas o status (Kanban)
- **DELETE /api/demands/{id}** - Remover demanda

### Relatórios

- **GET /api/reports/clients/{id}?month=YYYY-MM** - Retorna dados consolidados do mês

### Sistema

- **GET /health** - Verifica status da API

---

## 📚 Estrutura de Pastas

- **app/Http/Controllers/Api/** - Controladores da API
- **app/Models/** - Modelos Eloquent (Client, Demand)
- **database/migrations/** - Arquivos de migração do banco
- **routes/api.php** - Definição das rotas da API

---

## 🔧 Comandos Úteis

```bash
# Limpar cache
php artisan config:clear
php artisan cache:clear

# Verificar rotas
php artisan route:list

# Reverter migrations
php artisan migrate:rollback

# Recriar banco do zero
php artisan migrate:fresh
```

---

**Observação**: Certifique-se de que o PostgreSQL esteja rodando antes de executar `php artisan serve`.
