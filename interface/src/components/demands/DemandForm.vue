<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { storeToRefs } from "pinia";
import { useDemandsStore } from "../../stores/demands.store";
import { useClientsStore } from "../../stores/clients.store";
import type { Demand } from "../../types/demand";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const demandsStore = useDemandsStore();
const clientsStore = useClientsStore();
const { items: clients } = storeToRefs(clientsStore);

// Computada para controlar o Dialog sem mutar a prop diretamente
const dialogVisible = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const initialForm: Omit<
  Demand,
  "id" | "data_cadastro" | "created_at" | "updated_at"
> = {
  client_id: 0,
  titulo: "",
  prioridade: "Media",
  setor: "",
  responsavel: "",
  quem_deve_testar: "",
  descricao_detalhada: "",
  anexos_midias: "",
  cobrada_do_cliente: false,
  tempo_estimado: 0,
  tempo_gasto: 0,
  status: "backlog",
  flag_retornou: false,
  feedback: "",
};

const form = ref({ ...initialForm });

onMounted(() => {
  clientsStore.fetchClients();
});

const save = async () => {
  // Garantimos que os IDs e tempos sejam números antes de enviar
  const payload = {
    ...form.value,
    client_id: Number(form.value.client_id),
    tempo_estimado: Number(form.value.tempo_estimado),
    tempo_gasto: Number(form.value.tempo_gasto),
  };
  await demandsStore.addDemand(payload as Demand);
  dialogVisible.value = false;
  form.value = { ...initialForm };
};
</script>

<template>
  <q-dialog v-model="dialogVisible" persistent >
    <q-card class="my-card" >
      <q-card-section class="bg-secondary text-white row items-center q-mb-md">
        <div class="text-h6">Configurar Demanda</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-gutter-y-md scroll my-card-section" >
        <div class="row q-col-gutter-md q-mb-md">
          <q-select
            v-model="form.client_id"
            :options="clients"
            option-value="id"
            option-label="nome"
            label="Cliente Relacionado *"
            emit-value
            map-options
            outlined
            dense
            class="col-12 col-md-4 "
          />
          <q-input
            v-model="form.titulo"
            label="Título da Demanda *"
            outlined
            dense
            class="col-12 col-md-8"
          />
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <q-input
            v-model="form.responsavel"
            label="Desenvolvedor Responsável *"
            outlined
            dense
            class="col-12 col-sm-6"
          />
          <q-input
            v-model="form.quem_deve_testar"
            label="Responsável pelo Teste (QA) *"
            outlined
            dense
            class="col-12 col-sm-6"
          />
        </div>

        <div class="row q-col-gutter-md q-mb-md">
          <q-select
            v-model="form.prioridade"
            :options="['Baixa', 'Media', 'Alta']"
            label="Prioridade *"
            outlined
            dense
            class="col-6"
          />
          <q-input
            v-model="form.setor"
            label="Setor Solicitante *"
            outlined
            dense
            class="col-6"
          />
        </div>

        <q-input
          v-model="form.descricao_detalhada"
          type="textarea"
          label="Descrição Detalhada *"
          outlined
          dense
        />
        <q-input
          v-model="form.feedback"
          type="textarea"
          label="Observações / Feedback"
          outlined
          dense
          color="orange"
          class="q-mb-md"
        />

        <div class="row q-col-gutter-md items-center q-mb-md">
          <q-input
            v-model.number="form.tempo_estimado"
            type="number"
            label="Tempo Estimado (h)"
            outlined
            dense
            class="col-4"
          />
          <q-input
            v-model.number="form.tempo_gasto"
            type="number"
            label="Tempo Real Gasto (h)"
            outlined
            dense
            class="col-4"
          />
          <div class="col-4 column q-gutter-xs">
            <q-checkbox
              v-model="form.cobrada_do_cliente"
              label="Faturar Demanda"
              dense
            />
            <q-checkbox
              v-model="form.flag_retornou"
              label="Retorno de Teste"
              dense
              color="negative"
            />
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions  class="q-pa-md">
        <q-btn flat label="Cancelar" color="grey-7" v-close-popup   />
        <q-btn
        class="button"
          label="Registrar Demanda"
          @click="save"
          :loading="demandsStore.loading"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<style>
.my-card {
  min-width: 65px;
  max-width: 90vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.my-card-section{
    overflow-y: hidden;
    width: 100%;
    height: 100%;
}
.button{
    background-color: #27e4bb;
    color: #ffff;
    font-weight: bold;
}

.button:hover{
    background-color: #006de9;

}

</style>
