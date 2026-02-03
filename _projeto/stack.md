# Stack

- Frontend: Vue 3 (Composition API) + Quasar Framework + Primeicons
- Backend: Laravel
- Banco de Dados: PostgreSQL (Supabase)

# Arquitetura

- Frontend: SPA (Single Page Application)
- Backend: API REST
- Banco de Dados: Relacional postgresql

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
-3 Planejamento junto a IA (melhorias instalações corretamente)
-4 Criaçaõ do _projetos e seus arquivos
-5 Instalaçao do Vue3 com o vite na pasta interface
-6 Teste do vue3 e funcionamento
-7 Instalaçao do quasar na pasta interface
-8 Teste do quasar e funcionamento
-9 Instalação do primeIcons (opcional) icones
---
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
22- Criar as rotas
    (php artisan make:route api.php)
23- Testar as rotas
    (php artisan route:list)
**ok**
24- testar as rotas no postman para criar um cliente e uma demanda
    client **ok**
    demand **ok**
    banco de dados atualizado**ok**

25- adiconar updateStatus no controller de demandas
    teste /api/demands/1/status **ok**
    criar rota no api.php **ok**
    testar no postman **ok**
    http://127.0.0.1:8000/api/demands/1/status

26- criar controller de relatórios
    (php artisan make:controller Api/ReportController)
27- colocar na rota api.php
    e teste do relatorio mensal **ok**
    http://127.0.0.1:8000/api/reports/clients/1?month=2026-01 **ok** (todo relatório mensal está ok)

28 - falta do feedback
    criei um nova migration para adicionar o feedback na tabela de demandas
    (php artisan make:migration add_feedback_to_demands_table)
    adcionei o feedback no model Demand.php
    adcionei o feedback no updadeDemandRequest  e no storeDemandRequest
    Teste no postman para adicionar o feedback na demanda 1 com a rota http://127.0.0.1:8000/api/demands**ok**
    supabase recebeu o feedback **ok**
29-Ultimos testes no backend
    post, get, put, patch, delete **ok**
    testes de mudança de status **ok**
    testes de relatórios **ok**
    deleta no supabase **ok**

---
Frontend


    
