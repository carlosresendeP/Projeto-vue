<script setup lang="ts">
</script>

<template>
  <div>
    <q-layout view="lHh lpr lFf" container style="height: 400px" class="">
      <q-header elevated>
        <q-toolbar class="toolbar">
          <q-btn flat round dense icon="menu" class="q-mr-sm menu" />
          <q-avatar>
            <i class="pi pi-box" style="font-size: 1rem"></i>
          </q-avatar>

          <q-toolbar-title>Sistema Demanda</q-toolbar-title>

          <button class="btn-user">
            Acessar
          </button>
        </q-toolbar>
      </q-header>
    </q-layout>
  </div>

</template>

<style scoped>
  .toolbar {
    background-color: #252525ff;
  }
  .menu{
    display: none;
  }
  .btn-user {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    color: #252525ff;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
  }

  .btn-user:hover {
    background-color: #147aff;
    color: #f5f5f5;
  }
</style>''
