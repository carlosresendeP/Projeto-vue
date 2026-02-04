<script setup lang="ts">
// Lista de navegação para manter o código limpo
const menuItems = [
  { label: 'Clientes', icon: 'people', to: '/clients' },
  { label: 'Demandas', icon: 'assignment', to: '/demands' },
  { label: 'Kanban', icon: 'dashboard', to: '/kanban' },
  { label: 'Relatórios', icon: 'bar_chart', to: '/reports' }
]
</script>

<template>
  <q-list>
    <q-item-label header>Menu Principal</q-item-label>

    <q-item 
      v-for="item in menuItems" 
      :key="item.to" 
      clickable 
      v-ripple 
      :to="item.to"
      exact
      active-class="text-primary bg-blue-1"
    >
      <q-item-section avatar>
        <q-icon :name="item.icon" />
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ item.label }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>