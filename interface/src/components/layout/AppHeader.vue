<template>
  <q-toolbar >
    <q-btn flat round dense icon="menu" @click="$emit('toggle-menu')" />
    <q-toolbar-title>Softpar Gestão</q-toolbar-title>
  </q-toolbar>
</template>

<style scoped>
  .toolbar {
    background-color: #252525ff;
  }
</style>