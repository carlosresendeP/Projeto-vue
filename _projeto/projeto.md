
# SOFTPAR - DESAFIO DE PROGRAMACAO

Você imagina, a gente {desenvolve}.

---

## SUMÁRIO

1. Quem é a Softpar?
2. Desafio  
   2.1 Objetivo do Desafio  
   2.2 Dúvidas e Premissas  
   2.3 MVP (Precisa estar funcionando)  
3. Como organizar sua execução  
   3.1 Etapas do Desafio  
   3.2 Regras de Execução  
4. Diferenciais (Pontos Extras)  
5. Entrega  
6. Material de Apoio  
7. Agradecimento Final  

---

## 1. Quem é a Softpar?

A Softpar é uma software house especializada no desenvolvimento de sistemas web e aplicativos sob medida para empresas que precisam de organização, clareza de processos e tecnologia aplicada de forma prática ao dia a dia.

Trabalhamos diretamente com clientes reais, demandas reais e prazos reais. Nosso foco não é apenas programar, mas entender o problema, estruturar a solução e entregar com qualidade.

Aqui valorizamos profissionais que:

- Pensam antes de executar  
- Sabem trabalhar em equipe  
- Sabem documentar o que fazem  
- Conseguem transformar problemas em soluções organizadas  

Este desafio foi criado para simular exatamente esse ambiente.

Mais do que avaliar sua capacidade técnica, queremos entender como você pensa, como se organiza e como executa.

### Trajetória recente

Em 2025, a Softpar foi equipe vencedora do Hackathon Show Rural Digital, realizado durante o Show Rural Coopavel em Cascavel, um dos maiores eventos de tecnologia e inovação do agronegócio da América Latina.

Essa conquista reforça aquilo que já praticamos diariamente: "resolver problemas reais com tecnologia aplicada, organização e pensamento estruturado".

A empresa está em forte crescimento, ampliando equipe, projetos e responsabilidades. Buscamos pessoas que queiram crescer junto, assumir desafios e participar ativamente dessa evolução.

Este desafio nasce desse contexto real de crescimento, organização e necessidade de profissionais preparados para atuar em projetos reais desde o primeiro dia.

Além disso, a Softpar é liderada por Ali do Amaral, criador do Eleva One Experience, um evento de tecnologia, inovação e negócios que conecta empresários, desenvolvedores e líderes para discutir soluções práticas e transformação digital no mundo real.

Conheça mais sobre a Softpar, nossos projetos, eventos e iniciativas:

- Instagram: @softpar.dev  
- Instagram: @elevaoneexperience  

---

## 2. Desafio

**PROGRAMADOR(A) JÚNIOR**

Na Softpar, saber programar é obrigatório. O diferencial é saber pensar, perguntar, executar com cuidado e seguir orientação.

Este desafio simula uma situação real de trabalho dentro da empresa e foi dimensionado para ser concluído dentro do prazo considerando apenas o MVP obrigatório.

Após receber este desafio, você deverá responder ao e-mail confirmando o aceite. A partir desse momento, você terá até **72 horas (3 dias corridos)** para enviar a entrega.

### 2.1 Objetivo do Desafio

Desenvolver um sistema simples para registrar clientes e demandas e controlar o fluxo de execução em um Kanban.

O sistema terá:

- Cadastro de Clientes  
- Cadastro de Demandas  
- Kanban de demandas  
- Relatório mensal por cliente  

**Stack Obrigatória**

- Backend: Laravel  
- Frontend: Vue 3 (Composition API) + Quasar  
- Banco: Postgres  

### 2.2 Dúvidas e Premissas

Antes de começar, crie no README a seção **Dúvidas e Premissas**.

Liste:

- Dúvidas que você teve ao ler o desafio  
- Decisões/premissas que adotou para seguir  

Não existe resposta certa ou errada. Existe clareza de pensamento.

### 2.3 MVP (Precisa estar funcionando)

#### 1) Cadastro de Clientes

Campos obrigatórios:

- id  
- nome  
- email  
- avisar_por_email (sim/não)  
- whatsapp  
- avisar_por_whatsapp (sim/não)  
- observação  

#### 2) Cadastro de Demandas

Campos obrigatórios:

- data_cadastro (automática)  
- cliente (relacionamento)  
- titulo  
- prioridade  
- setor  
- responsavel  
- quem_deve_testar  
- descricao_detalhada  
- anexos/midias  
- cobrada_do_cliente  
- tempo_estimado  
- tempo_gasto  
- status  
- flag_retornou  

#### 3) Kanban das Demandas

Backlog → Autorização → Fila → Em desenvolvimento → Teste → Deploy → Concluído

#### 4) Relatório Mensal por Cliente

Exibição em tela com:

- Demandas do mês  
- Status  
- Cobrança  
- Tempo estimado  
- Tempo gasto  
- Feedback  

---

## 3. Como organizar sua execução

1. Planejamento e modelagem do banco  
2. Construção da interface  
3. Implementação das regras e API  

### 3.1 Etapas do Desafio

**Etapa 1 — MER**  
Modelo Entidade-Relacionamento e explicações

**Etapa 2 — Frontend**  
Clientes, Demandas, Kanban, Relatório

**Etapa 3 — Backend**  
Endpoints REST conforme especificado

### 3.2 Regras de Execução

- Mínimo 6 commits  
- Código organizado  
- Seguir o escopo do MVP  

---

## 4. Diferenciais (Pontos Extras)

- Upload real de anexos  
- Drag-and-drop no Kanban  
- Histórico de movimentações  
- Log de horas  
- Exportação CSV/PDF  
- Autenticação  
- Notificações simuladas  

---

## 5. Entrega

Enviar e-mail contendo:

- Link do repositório GitHub  
- Vídeo explicativo (até 10 minutos)  
- README completo  

---

## 6. Material de Apoio

- Laravel Documentation  
- Vue.js Guide  
- Quasar Framework  
- Laracasts  
- Vue Mastery  

---

## 7. Agradecimento Final

Estamos ansiosos para conhecer o seu trabalho. 🚀

**EQUIPE SOFTPAR**
