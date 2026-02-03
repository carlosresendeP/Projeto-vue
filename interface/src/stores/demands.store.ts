import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Demand, DemandStatus } from '../types/demand'
import { 
  createDemand, 
  deleteDemand, 
  getDemands, 
  updateDemand, 
  updateDemandStatus 
} from '../services/demands.services'

export const useDemandsStore = defineStore('demands', () => {
  const items = ref<Demand[]>([])
  const loading = ref(false)


  // Pega todas as demandas e atualiza o estado local
  async function fetchDemands() {
    loading.value = true
    try {
      items.value = await getDemands()
    } catch (error) {
      console.error("Erro ao buscar demandas:", error)
    } finally {
      loading.value = false
    }
  }

  // Adiciona uma nova demanda e sincroniza a lista
  async function addDemand(payload: Demand) {
    try {
      await createDemand(payload)
      await fetchDemands()
    } catch (error) {
      console.error("Erro ao adicionar demanda:", error)
    }
  }

  // Edita campos específicos de uma demanda (Partial)
  async function editDemand(id: number, payload: Partial<Demand>) {
    try {
      await updateDemand(id, payload)
      await fetchDemands()
    } catch (error) {
      console.error("Erro ao editar demanda:", error)
    }
  }

  // Altera o status da demanda conforme os estágios do Kanban
  async function changeStatus(id: number, status: DemandStatus) {
    try {
      await updateDemandStatus(id, status)
      await fetchDemands()
    } catch (error) {
      console.error("Erro ao mudar status:", error)
    }
  }

  // Remove permanentemente uma demanda
  async function removeDemand(id: number) {
    try {
      await deleteDemand(id)
      await fetchDemands()
    } catch (error) {
      console.error("Erro ao remover demanda:", error)
    }
  }

  return {
    items,
    loading,
    fetchDemands,
    addDemand,
    editDemand,
    changeStatus,
    removeDemand
  }
})