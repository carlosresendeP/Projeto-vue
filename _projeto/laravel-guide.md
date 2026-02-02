# Guia Laravel + PostgreSQL + Supabase

Este documento serve como um guia introdutório para o desenvolvimento backend utilizando Laravel, conectado a um banco de dados PostgreSQL hospedado no Supabase.

## 1. O que é o Laravel?

Laravel é um framework PHP robusto que segue o padrão de arquitetura **MVC** (Model-View-Controller). Ele facilita tarefas comuns como autenticação, roteamento, sessões e cache.

## 2. Estrutura de Pastas Principal

- **app/**: Onde reside a lógica principal da aplicação.
  - **Models/**: Classes que representam tabelas do banco de dados (Eloquent).
  - **Http/Controllers/**: Onde é processada a lógica das requisições.
- **routes/**: Definição das rotas (URLs) da aplicação (`api.php` para APIs, `web.php` para web).
- **database/**: Migrations e seeders.
- **config/**: Arquivos de configuração.
- **.env**: Variáveis de ambiente (senhas, conexões).

## 3. Conexão com Supabase (PostgreSQL)

O Supabase fornece um banco de dados PostgreSQL. No Laravel, a configuração é feita no arquivo `.env`.

### Configuração Exemplo (.env)

```ini
DB_CONNECTION=pgsql
DB_HOST=aws-0-sa-east-1.pooler.supabase.com
DB_PORT=6543
DB_DATABASE=postgres
DB_USERNAME=postgres.seu-usuario
DB_PASSWORD=sua-senha
```

_Nota: Use o **Transaction Mode** (porta 6543 geralmente) para melhor performance com funções serverless ou conexões frequentes._

## 4. Conceitos Chave

### MVC (Model - View - Controller)

1.  **Model**: Interage com o banco de dados.
2.  **View**: O que o usuário vê (geralmente retornado como JSON em APIs).
3.  **Controller**: Recebe a requisição, pede dados ao Model e retorna resposta (View/JSON).

### Rotas (Routes)

Definidas em `routes/api.php`.

```php
use App\Http\Controllers\ClienteController;

// Rota GET para listar clientes
Route::get('/clientes', [ClienteController::class, 'index']);
```

### Controllers

Onde a mágica acontece. Crie com: `php artisan make:controller ClienteController`.

```php
public function index() {
    return Cliente::all(); // Retorna todos os clientes do banco
}
```

### Models & Eloquent

O Eloquent é o ORM (Object-Relational Mapper) do Laravel. Ele permite interagir com o banco usando classes PHP.

```php
// Busca cliente com ID 1
$cliente = Cliente::find(1);

// Cria novo cliente
$cliente = new Cliente;
$cliente->nome = 'João';
$cliente->save();
```

### Migrations

É o controle de versão do seu banco de dados. Define a estrutura das tabelas.

```bash
php artisan make:migration create_clientes_table
```

No arquivo criado:

```php
public function up() {
    Schema::create('clientes', function (Blueprint $table) {
        $table->id();
        $table->string('nome');
        $table->timestamps();
    });
}
```

Rodar migration: `php artisan migrate`.

## 5. Comandos Úteis (Artisan)

- `php artisan serve`: Roda o servidor local.
- `php artisan make:model Nome`: Cria um Model.
- `php artisan make:controller NomeController`: Cria um Controller.
- `php artisan make:migration nome_da_migration`: Cria arquivo de migração.
- `php artisan migrate`: Executa s migrações pendentes.
- `php artisan route:list`: Lista todas as rotas registradas.

## 6. Boas Práticas e Regras

1.  **Nomes**:
    - Models: Singular, PascalCase (ex: `Cliente`, `Produto`).
    - Tabelas: Plural, snake_case (ex: `clientes`, `produtos`).
    - Controllers: PascalCase + Controller (ex: `ClienteController`).
2.  **API Resource**: Use Resources para formatar o JSON de retorno, evitando expor colunas sensíveis diretamente.
3.  **Validação**: Sempre valide dados de entrada no Controller ou usando FormRequests.

    ```php
    $request->validate([
        'email' => 'required|email|unique:users',
        'password' => 'required|min:8',
    ]);
    ```
