import { defineStore } from "pinia";
import { ref } from "vue";
import { Notify } from "quasar";
import type { Demand, DemandStatus } from "../types/demand";
import {
  createDemand,
  deleteDemand,
  getDemands,
  updateDemand,
  updateDemandStatus,
} from "../services/demands.services";

export const useDemandsStore = defineStore("demands", () => {
  const items = ref<Demand[]>([]);
  const loading = ref(false);

  // Pega todas as demandas e atualiza o estado local
  async function fetchDemands() {
    loading.value = true;
    try {
      items.value = await getDemands();
    } catch (error) {
      console.error("Erro ao buscar demandas:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao carregar demandas",
        position: "top",
      });
    } finally {
      loading.value = false;
    }
  }

  // Adiciona uma nova demanda e sincroniza a lista
  async function addDemand(payload: Demand): Promise<boolean> {
    loading.value = true;
    try {
      await createDemand(payload);
      await fetchDemands();
      Notify.create({
        type: "positive",
        message: "Demanda criada com sucesso!",
        position: "top",
      });
      return true;
    } catch (error) {
      console.error("Erro ao adicionar demanda:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao criar demanda",
        position: "top",
      });
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Edita campos específicos de uma demanda (Partial)
  async function editDemand(
    id: number,
    payload: Partial<Demand>,
  ): Promise<boolean> {
    loading.value = true;
    try {
      await updateDemand(id, payload);
      await fetchDemands();
      Notify.create({
        type: "positive",
        message: "Demanda atualizada com sucesso!",
        position: "top",
      });
      return true;
    } catch (error) {
      console.error("Erro ao editar demanda:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao atualizar demanda",
        position: "top",
      });
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Altera o status da demanda conforme os estágios do Kanban
  async function changeStatus(
    id: number,
    status: DemandStatus,
  ): Promise<boolean> {
    try {
      await updateDemandStatus(id, status);
      await fetchDemands();
      return true;
    } catch (error) {
      console.error("Erro ao mudar status:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao alterar status",
        position: "top",
      });
      return false;
    }
  }

  // Remove permanentemente uma demanda
  async function removeDemand(id: number): Promise<boolean> {
    try {
      await deleteDemand(id);
      await fetchDemands();
      Notify.create({
        type: "positive",
        message: "Demanda removida com sucesso!",
        position: "top",
      });
      return true;
    } catch (error) {
      console.error("Erro ao remover demanda:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao remover demanda",
        position: "top",
      });
      return false;
    }
  }

  return {
    items,
    loading,
    fetchDemands,
    addDemand,
    editDemand,
    changeStatus,
    removeDemand,
  };
});
