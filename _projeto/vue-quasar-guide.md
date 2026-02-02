# Guia Vue 3 + Quasar Framework

Este documento serve como referência rápida para o desenvolvimento frontend utilizando Vue 3 (Composition API) e o framework de UI Quasar.

## 1. O que é o Vue 3?

Vue.js é um framework JavaScript progressivo para construção de interfaces de usuário.

- **Composition API**: Nova forma de organizar lógica no Vue 3, geralmente usando `<script setup>`.
- **Reatividade**: O Vue rastreia mudanças em variáveis e atualiza a tela automaticamente.

## 2. O que é o Quasar?

Quasar é um framework baseado em Vue que fornece dezenas de componentes prontos (botões, tabelas, menus) seguindo padrões de Material Design, além de facilitar builds para SPA, PWA, Mobile e Desktop.

## 3. Estrutura de um Componente Vue (`.vue`)

Um arquivo `.vue` tem 3 partes principais:

```html
<template>
  <!-- HTML e Componentes Quasar -->
  <q-page class="q-pa-md">
    <div class="text-h4">Olá, {{ nome }}</div>
    <q-btn label="Clique aqui" @click="acao" />
  </q-page>
</template>

<script setup>
  import { ref } from "vue";

  // Estado reativo
  const nome = ref("Mundo");

  // Função
  function acao() {
    nome.value = "Vue 3!";
  }
</script>

<style scoped>
  /* CSS específico deste componente */
</style>
```

## 4. Conceitos Fundamentais Vue

### Reatividade (`ref`)

Para variáveis primitivas (string, number, boolean) que mudam:

```js
const contador = ref(0);
// No script, use contador.value para ler/alterar
contador.value++;
// No template, use apenas {{ contador }}
```

### Reatividade (`reactive`)

Para objetos/arrays complexos:

```js
const formulario = reactive({
  nome: "",
  idade: null,
});
// formulario.nome = 'Teste'
```

### Diretivas Comuns

- `v-if`: Renderização condicional.
- `v-for`: Laços de repetição.
- `v-model`: Ligação bidirecional (two-way binding), muito usado em inputs.
- `@click` (ou `v-on:click`): Eventos.

```html
<div v-for="item in lista" :key="item.id">{{ item.nome }}</div>
```

## 5. Componentes Quasar (Guia Rápido)

Todos começam com `q-`.

### Layout

- `q-layout`: Container principal.
- `q-header`, `q-drawer`, `q-page-container`: Partes da estrutura.
- `q-page`: Onde vai o conteúdo da rota.

### Inputs e Botões

```html
<q-input v-model="texto" label="Digite seu nome" outlined />
<q-btn color="primary" label="Salvar" icon="save" />
```

### Design / Utilitários CSS

O Quasar tem classes utilitárias para margens, preenchimento, cores e tipografia.

- `q-pa-md`: Padding all medium.
- `q-mt-lg`: Margin top large.
- `text-h1` a `text-subtitle2`: Tipografia.
- `row`, `col`, `col-4`: Sistema de Grid Flexbox.

Exemplo de Grid:

```html
<div class="row q-col-gutter-md">
  <div class="col-12 col-md-6">
    <!-- Ocupa 100% no mobile, 50% no desktop -->
    <q-card>...</q-card>
  </div>
  <div class="col-12 col-md-6">...</div>
</div>
```

## 6. Ciclo de Vida (Hooks)

- `onMounted()`: Executado quando o componente é montado na tela. Ideal para buscar dados iniciais da API.

```js
import { onMounted } from "vue";

onMounted(() => {
  console.log("Componente carregado!");
});
```

## 7. Regras e Dicas

1.  **`<script setup>`**: Sempre prefira usar a sintaxe `<script setup>` no Vue 3. É mais limpa e moderna.
2.  **Importação**: Não precisa registrar componentes do Quasar manualmente se o projeto estiver configurado corretamente (auto-import).
3.  **Ícones**: O Quasar geralmente usa Material Icons. Ex: `icon="home"`, `icon="delete"`.
4.  **Cores**: Use a paleta do tema (`primary`, `secondary`, `accent`, `positive`, `negative`, `warning`, `info`). Ex: `bg-primary`, `text-white`.

## 8. Onde aprender mais

- [Documentação Vue 3](https://vuejs.org/)
- [Documentação Quasar](https://quasar.dev/)
