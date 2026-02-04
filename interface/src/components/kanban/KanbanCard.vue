<script setup lang="ts">
import type { Demand, DemandStatus } from "../../types/demand";
import { useDemandsStore } from "../../stores/demands.store";

const props = defineProps<{
  demand: Demand;
}>();

const demandsStore = useDemandsStore();

// Lista de opções para mover o card
const statusOptions: { label: string; value: DemandStatus }[] = [
  { label: "Backlog", value: "backlog" },
  { label: "Autorização", value: "autorizacao" },
  { label: "Fila", value: "fila" },
  { label: "Em Desenvolvimento", value: "em_desenvolvimento" },
  { label: "Teste", value: "teste" },
  { label: "Deploy", value: "deploy" },
  { label: "Concluído", value: "concluido" },
];

const updateStatus = async (newStatus: DemandStatus) => {
  if (props.demand.id) {
    await demandsStore.changeStatus(props.demand.id, newStatus);
  }
};
</script>

<template>
  <q-card flat bordered class="kanban-card cursor-pointer">
    <q-card-section class="q-pa-sm">
      <div class="text-weight-bold">{{ demand.titulo }}</div>

      <div class="row items-center justify-between no-wrap q-mt-xs">
        <div class="text-caption text-grey-8">Setor: {{ demand.setor }}</div>
        <q-badge
          v-if="demand.prioridade"
          :color="
            demand.prioridade === 'Alta'
              ? 'red'
              : demand.prioridade === 'Media'
                ? 'orange'
                : 'blue'
          "
          :label="demand.prioridade"
          size="xs"
        />
      </div>

      <q-select
        :model-value="demand.status"
        :options="statusOptions"
        label="Mover para"
        dense
        outlined
        emit-value
        map-options
        class="q-mt-sm"
        @update:model-value="(val: any) => updateStatus(val)"
      />
    </q-card-section>
  </q-card>
</template>

<style scoped>
.kanban-card {
  transition: transform 0.2s;
  background: white;
}
.kanban-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
</style>
