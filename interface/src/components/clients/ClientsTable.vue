<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useClientsStore } from '../../stores/clients.store'
import type { QTableColumn } from 'quasar'

const clientsStore = useClientsStore()
const { items, loading } = storeToRefs(clientsStore)

const columns: QTableColumn[] = [
  { name: 'nome', label: 'Nome', field: 'nome', align: 'left', sortable: true },
  { name: 'email', label: 'Email', field: 'email', align: 'left' },
  { name: 'whatsapp', label: 'WhatsApp', field: 'whatsapp', align: 'left' },
{name: 'observacao', label: 'Observação', field: 'observacao', align: 'left'},
  { name: 'avisos', label: 'Avisos', field: 'id', align: 'center' },
  { name: 'actions', label: 'Ações', field: 'id', align: 'right' }
]
</script>

<template>
  <q-table
    :rows="items"
    :columns="columns"
    row-key="id"
    flat bordered
    :loading="loading"
  >
    <template v-slot:body-cell-avisos="props">
      <q-td :props="props">
        <q-icon name="email" :color="props.row.avisar_por_email ? 'green' : 'grey'" size="xs" />
        <q-icon name="brand_whatsapp" :color="props.row.avisar_por_whatsapp ? 'green' : 'grey'" size="xs" class="q-ml-xs" />
      </q-td>
    </template>

    <template v-slot:body-cell-actions="props">
      <q-td :props="props">
        <q-btn flat round dense icon="delete" color="negative" @click="clientsStore.removeClient(props.row.id)" />
      </q-td>
    </template>
  </q-table>
</template>