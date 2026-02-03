<script setup lang="ts">
import { ref } from 'vue'
import { useClientsStore } from '../../stores/clients.store'
import type { Client } from '../../types/client'

// Controlamos a visibilidade externamente
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(['update:modelValue'])

const clientsStore = useClientsStore()

const initialForm: Omit<Client, 'id' | 'created_at' | 'updated_at'> = {
  nome: '',
  email: '',
  avisar_por_email: false,
  whatsapp: '',
  avisar_por_whatsapp: false,
  observacao: ''
}

const form = ref({ ...initialForm })

const save = async () => {
  await clientsStore.addClient(form.value as Client)
  emit('update:modelValue', false)
  form.value = { ...initialForm }
}
</script>

<template>
  <q-dialog :model-value="modelValue" @update:model-value="val => emit('update:modelValue', val)" persistent>
    <q-card style="min-width: 400px">
      <q-card-section class="bg-primary text-white">
        <div class="text-h6">Cadastrar Cliente</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input v-model="form.nome" label="Nome Completo *" dense outlined />
        <q-input v-model="form.email" label="Email *" dense outlined />
        <q-input v-model="form.whatsapp" label="WhatsApp *" dense outlined />
        
        <div class="row q-gutter-sm">
          <q-checkbox v-model="form.avisar_por_email" label="Avisar por Email" />
          <q-checkbox v-model="form.avisar_por_whatsapp" label="Avisar por WhatsApp" />
        </div>

        <q-input v-model="form.observacao" type="textarea" label="Observação" dense outlined />
      </q-card-section>

      <q-card-actions align="right" class="q-pb-md q-pr-md">
        <q-btn flat label="Cancelar" v-close-popup />
        <q-btn label="Salvar" color="primary" @click="save" :loading="clientsStore.loading" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>