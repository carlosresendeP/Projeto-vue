<script setup lang="ts">
import type { QTableColumn } from "quasar";
import { formatStatus } from "../../utils/fomatStatus";

defineProps<{
  rows: any[];
}>();

const columns: QTableColumn[] = [
  {
    name: "cliente",
    label: "Cliente",
    field: "nome_cliente",
    align: "left",
    sortable: true,
  },
  {
    name: "titulo",
    label: "Demanda",
    field: "titulo",
    align: "left",
    sortable: true,
  },
  {
    name: "responsavel",
    label: "Responsável",
    field: "responsavel",
    align: "left",
  },
  { name: "status", label: "Status", field: "status", align: "left" },
  {
    name: "tempo",
    label: "Tempo (Gasto/Est.)",
    field: (row) => `${row.tempo_gasto || 0}h / ${row.tempo_estimado || 0}h`,
    align: "right",
  },
];
</script>

<template>
  <div>
    <q-table
      :rows="rows"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :pagination="{ rowsPerPage: 10 }"
    >
      <template v-slot:body-cell-status="props">
        <q-td :props="props">
          <q-badge :label="formatStatus(props.row.status)" color="secondary" />
        </q-td>
      </template>

      <template v-slot:body-cell-tempo="props">
        <q-td :props="props">
          <span
            :class="
              Number(props.row.tempo_gasto) > Number(props.row.tempo_estimado)
                ? 'text-negative text-bold'
                : 'text-grey-8'
            "
          >
            {{ props.row.tempo_gasto }}h
          </span>
          / {{ props.row.tempo_estimado }}h
        </q-td>
      </template>
    </q-table>

    <div v-if="rows.length === 0" class="text-center q-pa-xl text-grey">
      <q-icon name="description" size="xl" />
      <div class="q-mt-md">
        Nenhuma demanda encontrada para os filtros aplicados.
      </div>
    </div>
  </div>
</template>
