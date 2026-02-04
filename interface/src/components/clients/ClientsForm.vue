<script setup lang="ts">
import { ref } from "vue";
import { useClientsStore } from "../../stores/clients.store";
import { useQuasar } from "quasar"; // Importante para o feedback visual
import type { Client } from "../../types/client";
import type { QForm } from "quasar";

const props = defineProps<{ modelValue: boolean }>();
const emit = defineEmits(["update:modelValue"]);

const $q = useQuasar(); // Instância do Quasar para o Notify
const clientsStore = useClientsStore();
const formRef = ref<QForm | null>(null);

const initialForm: Omit<Client, "id" | "created_at" | "updated_at"> = {
  nome: "",
  email: "",
  avisar_por_email: false,
  whatsapp: "",
  avisar_por_whatsapp: false,
  observacao: "",
};

const form = ref({ ...initialForm });

// Suas regras de validação (Perfeitas!)
const rules = {
  required: (val: string) => (val && val.length > 0) || "Campo obrigatório",
  nome: (val: string) =>
    (val && val.length >= 3) || "O nome deve ter pelo menos 3 caracteres",
  email: (val: string) =>
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(val) ||
    "Email inválido",
  whatsapp: (val: string) =>
    (val && val.length === 11) || "Telefone incompleto (DDD + 9 dígitos)",
};

const save = async () => {
  // 1. Validação de Front-end
  const success = await formRef.value?.validate();
  if (!success) return;

  try {
    // 2. Chamada da Store envolta em try/catch
    const res = await clientsStore.addClient(form.value as Client);

    if (res) {
      $q.notify({
        type: "positive",
        message: "Cliente cadastrado com sucesso!",
        position: "top-right",
      });
      
      emit("update:modelValue", false);
      form.value = { ...initialForm };
    }
  } catch (error) {
    // 3. Tratamento de erro (API fora, erro de banco, etc)
    console.error("Erro ao cadastrar cliente:", error);
    
    $q.notify({
      type: "negative",
      message: "Erro ao conectar com o servidor. Tente novamente.",
      position: "top-right",
    });
  }
};
</script>

<template>
  <q-dialog
    :model-value="modelValue"
    @update:model-value="(val) => emit('update:modelValue', val)"
    persistent
  >
    <q-card style="min-width: 400px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Cadastrar Cliente</div>
      </q-card-section>

      <q-form ref="formRef" @submit="save">
        <q-card-section class="q-gutter-md">
          <q-input
            v-model="form.nome"
            label="Nome Completo *"
            :rules="[rules.required, rules.nome]"
            dense
            outlined
            lazy-rules
          />
          <q-input
            v-model="form.email"
            label="Email *"
            :rules="[rules.required, rules.email]"
            dense
            outlined
            lazy-rules
          />
          <q-input
            v-model="form.whatsapp"
            label="WhatsApp *"
            :rules="[rules.required, rules.whatsapp]"
            dense
            outlined
            mask="(##) #####-####"
            unmasked-value
            lazy-rules
          />

          <div class="row q-gutter-sm">
            <q-checkbox
              v-model="form.avisar_por_email"
              label="Avisar por Email"
            />
            <q-checkbox
              v-model="form.avisar_por_whatsapp"
              label="Avisar por WhatsApp"
            />
          </div>

          <q-input
            v-model="form.observacao"
            type="textarea"
            label="Observação"
            dense
            outlined
          />
        </q-card-section>

        <q-card-actions align="right" class="q-pb-md q-pr-md">
          <q-btn flat label="Cancelar" v-close-popup :disable="clientsStore.loading" />
          <q-btn
            label="Salvar"
            color="primary"
            type="submit"
            :loading="clientsStore.loading"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>