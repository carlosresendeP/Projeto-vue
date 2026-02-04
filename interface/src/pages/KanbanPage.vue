<script setup lang="ts">
import { onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDemandsStore } from "../stores/demands.store";
import { useKanbanStore } from "../stores/kanban.store";
import type { DemandStatus } from "../types/demand";
import KanbanColumn from "../components/kanban/KanbanColumn.vue";

const demandsStore = useDemandsStore();
const kanbanStore = useKanbanStore();
const { loading } = storeToRefs(demandsStore);

// Lista de colunas na ordem exigida pelo desafio
const columns: { label: string; value: DemandStatus }[] = [
  { label: "Backlog", value: "backlog" },
  { label: "Autorização", value: "autorizacao" },
  { label: "Fila", value: "fila" },
  { label: "Em Desenvolvimento", value: "em_desenvolvimento" },
  { label: "Teste", value: "teste" },
  { label: "Deploy", value: "deploy" },
  { label: "Concluído", value: "concluido" },
];

onMounted(() => {
  demandsStore.fetchDemands();
});
</script>

<template>
  <q-page padding class="bg-grey-2">
    <div class="row items-center q-mb-lg">
      <h5 class="q-my-none">Quadro Kanban</h5>
      <q-spinner v-if="loading" color="primary" class="q-ml-md" />
    </div>

    <!-- Container scroll horizontal para as colunas -->
    <div
      class="row no-wrap q-gutter-md scroll"
      style="
        height: calc(100vh - 150px);
        padding-bottom: 20px;
        overflow-y: hidden;
      "
    >
      <KanbanColumn
        v-for="col in columns"
        :key="col.value"
        :label="col.label"
        :colStatus="col.value"
        :demands="kanbanStore.getByStatus(col.value)"
      />
    </div>
  </q-page>
</template>
