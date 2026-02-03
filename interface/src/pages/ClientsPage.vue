<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useClientsStore } from '../stores/clients.store'
import ClientsTable from '../components/clients/ClientsTable.vue'
import ClientsForm from '../components/clients/ClientsForm.vue'

const clientsStore = useClientsStore()
const showDialog = ref(false)

onMounted(() => {
  clientsStore.fetchClients()
})
</script>

<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <h5 class="q-my-none">Gestão de Clientes</h5>
      <q-btn label="Adicionar Cliente" color="primary" icon="add" @click="showDialog = true" />
    </div>

    <ClientsTable />

    <ClientsForm v-model="showDialog" />
  </q-page>
</template>