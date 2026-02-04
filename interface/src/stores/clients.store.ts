import { defineStore } from "pinia";
import { ref } from "vue";
import { Notify } from "quasar";
import type { Client } from "../types/client";
import {
  createClient,
  deleteClient,
  getClients,
  updateClient,
} from "../services/clients.services";

export const useClientsStore = defineStore("clients", () => {
  // O que é q tenho guardado?
  const items = ref<Client[]>([]);
  const loading = ref(false);

  //Pega todos os clientes
  async function fetchClients() {
    loading.value = true;
    try {
      const response = await getClients();
      items.value = response;
    } catch (error) {
      console.error("Erro ao buscar clientes:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao carregar clientes",
        position: "top",
      });
    } finally {
      loading.value = false;
    }
  }

  // Adiciona um cliente
  async function addClient(payload: Client): Promise<boolean> {
    loading.value = true;
    try {
      await createClient(payload);
      await fetchClients(); // Sincroniza a lista
      Notify.create({
        type: "positive",
        message: "Cliente criado com sucesso!",
        position: "top",
      });
      return true;
    } catch (error) {
      console.error("Erro ao adicionar cliente:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao criar cliente",
        position: "top",
      });
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Edita um cliente
  async function editClient(id: number, payload: Client): Promise<boolean> {
    loading.value = true;
    try {
      await updateClient(id, payload);
      await fetchClients();
      Notify.create({
        type: "positive",
        message: "Cliente atualizado com sucesso!",
        position: "top",
      });
      return true;
    } catch (error) {
      console.error("Erro ao editar cliente:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao atualizar cliente",
        position: "top",
      });
      return false;
    } finally {
      loading.value = false;
    }
  }

  // Remove um cliente
  async function removeClient(id: number): Promise<boolean> {
    loading.value = true;
    try {
      await deleteClient(id);
      await fetchClients();
      Notify.create({
        type: "positive",
        message: "Cliente removido com sucesso!",
        position: "top",
      });
      return true;
    } catch (error) {
      console.error("Erro ao remover cliente:", error);
      Notify.create({
        type: "negative",
        message: "Erro ao remover cliente",
        position: "top",
      });
      return false;
    } finally {
      loading.value = false;
    }
  }

  return {
    items,
    loading,
    fetchClients,
    addClient,
    editClient,
    removeClient,
  };
});
