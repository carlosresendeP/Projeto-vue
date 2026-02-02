# Stack

- Frontend: Vue 3 (Composition API) + Quasar Framework + Primeicons
- Backend: Laravel
- Banco de Dados: PostgreSQL (Supabase)

# Arquitetura

- Frontend: SPA (Single Page Application)
- Backend: API REST
- Banco de Dados: Relacional

# Fluxo

1. Usuário acessa o frontend
2. Frontend faz requisições para a API
3. API faz requisições para o banco de dados
4. Banco de dados retorna os dados para a API
5. API retorna os dados para o frontend
6. Frontend exibe os dados para o usuário


Os status das demandas foram definidos como valores controlados em formato string, seguindo a ordem do fluxo do Kanban, evitando o uso de enums no banco para manter simplicidade e clareza no MVP.

# anotações dos passos

-1 planejamento -fluxo e agentes
-2 Como iriei fazer o projeto
-3 Planejamento junto ao chatGpt (melhorias instalãoes corretamentes)
-4 Criaçaõ do _projetos e seus arquivos
-5 Instalaçao do Vue3 com o vite na pasta interface
-6 Teste do vue3 e funcionamento
-7 Instalaçao do quasar na pasta interface
-8 Teste do quasar e funcionamento
-9 Instalação do primeIcons (opcional) icones
-Backend
-10 Instalação do laravel na pasta backend
-11 Teste do laravel e funcionamento
-supabase
-12 Criação do projeto no supabase
-13 Configuração do supabase no laravel
-14 Teste do supabase no laravel
-15 Teste de funconamento da rota no /health **ok**
-16 Criação da migration para a tabela de clientes
    (php artisan make:migration create_clients_table)
    (php artisan make:migration create_demands_table)
-17 rodar as migrations
    (php artisan migrate)
**ok**
-18 confirmar criação das tabelas no supabase  **ok**

19- Criar os models
    (php artisan make:model Client)
    (php artisan make:model Demand)
**ok**
20 - criar os Requests
    (php artisan make:request StoreClientRequest)
    (php artisan make:request UpdateClientRequest)
    (php artisan make:request StoreDemandRequest)
    (php artisan make:request UpdateDemandRequest)    
**ok**
21- Criar os controllers
    (php artisan make:controller Api/ClientController)
    (php artisan make:controller Api/DemandController)    
**ok**    