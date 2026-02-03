<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDemandsStore } from '../stores/demands.store'
import DemandCard from '../components/demands/DemandCard.vue'
import DemandForm from '../components/demands/DemandForm.vue'

const demandsStore = useDemandsStore()
const showDialog = ref(false)

onMounted(() => {
  demandsStore.fetchDemands()
})
</script>

<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <h5 class="q-my-none">Gestão de Demandas</h5>
      <q-btn label="Nova Demanda" color="secondary" icon="add" @click="showDialog = true" />
    </div>

    <DemandCard />
    <DemandForm v-model="showDialog" />
  </q-page>
</template>