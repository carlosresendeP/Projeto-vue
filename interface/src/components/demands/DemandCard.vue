<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useDemandsStore } from "../../stores/demands.store";
import { useClientsStore } from "../../stores/clients.store";
import { date } from "quasar";
import { onMounted, ref } from "vue";
import type { Demand } from "../../types/demand";
import DemandEdit from "./DemandEdit.vue";

const demandsStore = useDemandsStore();
const clientsStore = useClientsStore();
const { items, loading } = storeToRefs(demandsStore);
const { items: clients } = storeToRefs(clientsStore);

const showEditDialog = ref(false);
const selectedDemand = ref<Demand | null>(null);

onMounted(() => {
  // Garante que temos a lista de clientes para exibir os nomes
  clientsStore.fetchClients();
});

const getClientName = (clientId: number) => {
  const client = clients.value.find((c) => Number(c.id) === Number(clientId));
  return client ? client.nome : "Cliente não informado";
};

// Cores para as prioridades conforme o seu JSON (Media, Alta, Baixa)
const priorityColor: Record<string, string> = {
  Baixa: "blue",
  Media: "orange",
  Alta: "red",
};

const openEditDialog = (demand: Demand) => {
  selectedDemand.value = demand;
  showEditDialog.value = true;
};

const confirmDelete = (id: number) => {
  // O removeDemand já sincroniza a lista automaticamente na Store
  demandsStore.removeDemand(id);
};
</script>

<template>
  <div class="row q-col-gutter-md">
    <div
      v-for="demand in items"
      :key="demand.id"
      class="col-12 col-md-4 col-sm-6"
    >
      <q-card bordered flat class="my-card shadow-1">
        <q-card-section>
          <div class="row justify-between items-start no-wrap">
            <div class="col">
              <div class="text-overline text-primary font-weight-bold">
                N° {{ demand.id }}
              </div>
              <div class="text-h6 q-mt-none">{{ demand.titulo }}</div>
              <div class="text-caption text-grey-9">
                <q-icon name="person" size="14px" />
                {{ getClientName(demand.client_id) }}
              </div>
            </div>
            <div class="column items-end">
              <q-badge
                :color="priorityColor[demand.prioridade] || 'grey'"
                :label="demand.prioridade"
                class="q-mb-xs"
              />
              <div class="row q-gutter-xs">
                <q-btn
                  flat
                  round
                  dense
                  icon="edit"
                  color="primary"
                  @click="openEditDialog(demand)"
                >
                  <q-tooltip>Editar Demanda</q-tooltip>
                </q-btn>
                <q-btn
                  flat
                  round
                  dense
                  icon="delete"
                  color="negative"
                  @click="confirmDelete(demand.id!)"
                >
                  <q-tooltip>Remover Demanda</q-tooltip>
                </q-btn>
              </div>
            </div>
          </div>
        </q-card-section>

        <q-separator inset />

        <q-card-section>
          <div class="row q-col-gutter-sm">
            <div class="col-12">
              <q-icon name="work_outline" /> <b>Setor:</b> {{ demand.setor }}
            </div>
            <div class="col-6">
              <q-icon name="engineering" /> <b>Responsável:</b>
              {{ demand.responsavel }}
            </div>
            <div class="col-6">
              <q-icon name="fact_check" /> <b>Testador:</b>
              {{ demand.quem_deve_testar }}
            </div>
          </div>
          <div class="q-mt-sm q-pa-sm bg-blue-grey-1 rounded-borders text-caption ">
            <q-icon name="description" /> <b class="text-primary">Descrição:</b>
            {{ demand.descricao_detalhada }}
          </div>

          <div
            v-if="demand.feedback"
            class="q-mt-sm q-pa-sm bg-blue-grey-1 rounded-borders text-caption"
          >
            <q-icon name="chat" /> <b class="text-secondary">Feedback:</b> {{ demand.feedback }}
          </div>
        </q-card-section>

        <q-card-section class="bg-grey-1">
          <div class="row justify-between items-center">
            <div class="column">
              <div class="text-caption">
                Est: <b>{{ demand.tempo_estimado }}h</b> | Gasto:
                <b>{{ demand.tempo_gasto || 0 }}h</b>
              </div>
              <div class="text-caption text-grey">
                {{ date.formatDate(demand.data_cadastro, "DD/MM/YYYY HH:mm") }}
              </div>
            </div>

            <div class="row items-center">
              <q-icon
                v-if="demand.cobrada_do_cliente"
                name="monetization_on"
                color="green"
                class="q-mr-sm"
              >
                <q-tooltip>Demanda Cobrada</q-tooltip>
              </q-icon>
              <q-badge
                outline
                color="secondary"
                :label="demand.status.replace('_', ' ')"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>

    <div
      v-if="!loading && items.length === 0"
      class="col-12 text-center q-pa-xl text-grey"
    >
      <q-icon name="inventory_2" size="xl" />
      <p>Nenhuma demanda cadastrada para o período selecionado.</p>
    </div>

    <!-- Componente de Edição -->
    <DemandEdit v-model="showEditDialog" :demand="selectedDemand" />
  </div>
</template>

<style scoped>
.my-card {
  transition: all 0.3s;
  min-height: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.my-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1) !important;
}
</style>
