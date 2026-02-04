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
    <div
      class="column-header text-subtitle1 text-weight-bold q-pa-sm bg-primary text-white rounded-borders"
    >
      {{ label }}
      <q-badge color="white" text-color="primary" class="float-right q-mt-xs">
        {{ demands.length }}
      </q-badge>
    </div>

    <q-scroll-area
      class="full-height q-mt-sm"
      style="height: calc(100% - 50px)"
    >
      <draggable
        class="q-gutter-y-sm input-area"
        :list="demands"
        group="kanban"
        item-key="id"
        @change="onChange"
        :empty-insert-threshold="500"
      >
        <template #item="{ element }">
          <KanbanCard :demand="element" />
        </template>
      </draggable>

      <div
        v-if="demands.length === 0"
        class="text-center text-grey q-pa-md text-caption"
      >
        Arraste para cá
      </div>
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
.input-area {
  min-height: 50px; /* Garante área de drop mesmo vazia */
}
</style>
