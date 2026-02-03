import { defineStore } from "pinia";
import type { Client } from "../types/client";
import { createClient, deleteClient, getClients, updateClient } from "../services/clients.services";
import { ref } from "vue";

export const useClientsStore = defineStore('clients',()=>{

    // O que é q tenho guardado?
    const items = ref<Client[]>([]) 
    const loading = ref(false)

    //Pega todos os clientes
    async function fetchClients() {
        loading.value = true
        try {
            const response = await getClients()
            items.value = response
        } catch (error) {
            console.error("Erro ao buscar clientes:", error);
        } finally {
            loading.value = false
        }
    }

    // Adiciona um cliente
    async function addClient(payload: Client) {
        try {
            await createClient(payload);
            await fetchClients(); // Sincroniza a lista
        } catch (error) {
            console.error("Erro ao adicionar cliente:", error);
        }
    }

    // Edita um cliente
    async function editClient(id: number, payload: Client) {
        try {
            await updateClient(id, payload);
            await fetchClients();
        } catch (error) {
            console.error("Erro ao editar cliente:", error);
        }
    }

    // Remove um cliente
    async function removeClient(id: number) {
        try {
            await deleteClient(id);
            await fetchClients();
        } catch (error) {
            console.error("Erro ao remover cliente:", error);
        }
    }

    return {
        items,
        loading,
        fetchClients,
        addClient,
        editClient,
        removeClient
    };
})