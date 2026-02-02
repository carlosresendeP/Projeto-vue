# Duvidas do desafio

## 1. Banco de Dados

**Dúvida:** Vamos utilizar o Postgres. Somente essa informação? Docker ou Nuvem?
**Decisão:** Optei por utilizar o Postgres na nuvem com o Supabase para agilidade e facilidade de acesso.

## 2. Framework CSS

**Dúvida:** Vue 3 com Quasar. Poderia usar Tailwind?
**Decisão:** Optei por utilizar o padrão do Quasar (que possui seu próprio sistema de grid e utilitários) para seguir estritamente o solicitado

## 3. Autenticação vs MVP

**Ponto não claro:** A seção de Diferenciais lista "Autenticação", mas o MVP exige campos como "responsável" e "quem_deve_testar".
**Decisão:** Para o MVP, não haverá sistema de login complexo. Criaremos uma tabela de `users` (ou usaremos a padrão do Laravel) e seedaremos alguns usuários fictícios. No frontend, a seleção de "Responsável" será feita através de um select com esses usuários pré-cadastrados.

