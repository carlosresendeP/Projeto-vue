<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { storeToRefs } from "pinia";
import { useDemandsStore } from "../stores/demands.store";
import { useClientsStore } from "../stores/clients.store";
import ReportsTable from "../components/reports/ReportsTable.vue";
import ReportsCard from "../components/reports/ReportsCard.vue";

const demandsStore = useDemandsStore();
const clientsStore = useClientsStore();

const { items: demands } = storeToRefs(demandsStore);
const { items: clients } = storeToRefs(clientsStore);

const selectedClient = ref<number | null>(null);

// Inicializa com a data atual para o input date
const getCurrentDate = () => {
  const date = new Date();
  return date.toISOString().split("T")[0]; // Retorna YYYY-MM-DD
};
const selectedMonth = ref(getCurrentDate());

onMounted(async () => {
  await Promise.all([clientsStore.fetchClients(), demandsStore.fetchDemands()]);
});

const clientMap = computed(() => {
  const map: Record<number, string> = {};
  clients.value.forEach((c) => {
    map[Number(c.id)] = c.nome;
  });
  return map;
});

const filteredDemands = computed(() => {
  return demands.value.filter((d) => {
    // Comparação numérica segura para evitar erro de string vs number
    const matchClient = selectedClient.value
      ? Number(d.client_id) === Number(selectedClient.value)
      : true;

    let matchMonth = false;
    if (selectedMonth.value && d.data_cadastro) {
      const selectedYYYYMM = selectedMonth.value.substring(0, 7);
      const demandYYYYMM = d.data_cadastro.substring(0, 7);
      matchMonth = demandYYYYMM === selectedYYYYMM;
    }

    return matchClient && matchMonth;
  });
});

const tableRows = computed(() => {
  return filteredDemands.value.map((d) => ({
    ...d,
    nome_cliente: clientMap.value[Number(d.client_id)] || "Não encontrado",
  }));
});

// Cálculos de totais para o relatório
const totalGasto = computed(() =>
  filteredDemands.value.reduce((acc, d) => acc + Number(d.tempo_gasto || 0), 0),
);
const totalEstimado = computed(() =>
  filteredDemands.value.reduce(
    (acc, d) => acc + Number(d.tempo_estimado || 0),
    0,
  ),
);
</script>

<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Relatório de Demandas</div>

    <div class="row q-col-gutter-sm q-mb-lg">
      <div class="col-12 col-sm-4">
        <q-select
          v-model="selectedClient"
          :options="clients"
          option-label="nome"
          option-value="id"
          label="Filtrar por Cliente"
          emit-value
          map-options
          outlined
          dense
          clearable
        />
      </div>
      <div class="col-12 col-sm-4">
        <q-input
          v-model="selectedMonth"
          type="date"
          label="Mês de Referência"
          outlined
          dense
        />
      </div>
    </div>

    <div class="row q-col-gutter-md q-mb-md" v-if="tableRows.length > 0">
      <div class="col-12 col-sm-6">
        <ReportsCard
          title="Total de Horas Gastas"
          :value="`${totalGasto}h`"
          cardClass="bg-primary text-white"
        />
      </div>
      <div class="col-12 col-sm-6">
        <ReportsCard
          title="Tempo Estimado Total"
          :value="`${totalEstimado}h`"
          cardClass="bg-grey-2"
          textClass="text-primary"
        />
      </div>
    </div>

    <!-- Tabela isolada no componente -->
    <ReportsTable :rows="tableRows" />
  </q-page>
</template>
