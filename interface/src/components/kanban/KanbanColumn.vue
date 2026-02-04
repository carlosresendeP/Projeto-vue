<script setup lang="ts">
import { computed } from "vue";
import type { Demand, DemandStatus } from "../../types/demand";
import KanbanCard from "./KanbanCard.vue";
import draggable from "vuedraggable";
import { useDemandsStore } from "../../stores/demands.store";

const props = defineProps<{
  label: string;
  demands: Demand[];
  colStatus: DemandStatus;
}>();

const demandsStore = useDemandsStore();

const list = computed({
  get: () => props.demands,
  set: () => {},
});

const onChange = (event: any) => {
  if (event.added) {
    const demand = event.added.element;
    demandsStore.changeStatus(demand.id, props.colStatus);
  }
};
</script>

<template>
  <div class="column-container">
    <div class="column-header text-subtitle1 text-weight-bold q-pa-sm bg-primary text-white rounded-borders">
      {{ label }}
      <q-badge color="white" text-color="primary" class="float-right q-mt-xs">
        {{ demands.length }}
      </q-badge>
    </div>

    <q-scroll-area class="flex-grow q-mt-sm card" style="height: 100%">
      <draggable
        class="q-gutter-y-sm input-area"
        :list="demands"
        group="kanban"
        item-key="id"
        :animation="250"
        :swap-threshold="0.7"
        :empty-insert-threshold="50"
        ghost-class="ghost"
        @change="onChange"
      >
        <template #item="{ element }">
          <KanbanCard :demand="element" />
        </template>

        <template #footer>
          <div
            v-if="demands.length === 0"
            class="text-center text-grey q-pa-md text-caption full-width"
            style="pointer-events: none;" 
          >
            Arraste para cá
          </div>
        </template>
      </draggable>
    </q-scroll-area>
  </div>
</template>

<style scoped>
.column-container {
  min-width: 280px;
  max-width: 280px;
  background: #ebedef;
  border-radius: 8px;
  padding: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
}


/* O segredo está aqui: min-height 100% ou um valor alto no container interno */
.input-area {
  min-height: calc(100vh - 200px); /* Garante que a área de drop cubra quase toda a coluna */
  padding-bottom: 100px; /* Margem extra no final para facilitar o drop */
}

.ghost {
  opacity: 0.4;
  background: #c8ebfb !important;
  border: 2px dashed #1976D2;
}
</style>