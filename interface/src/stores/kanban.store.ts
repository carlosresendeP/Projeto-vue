import { defineStore, storeToRefs } from "pinia"
import type {DemandStatus } from "../types/demand"
import { useDemandsStore } from "./demands.store"

export const useKanbanStore = defineStore('kanban', () => {
    //importa o store de demandas
    const demandsStore = useDemandsStore()
    //pega os itens do store de demandas
    const {items} = storeToRefs(demandsStore)

    //filtra as demandas por status
    const getByStatus = (status: DemandStatus)=>items.value.filter(demand => demand.status === status)

    return {
        getByStatus
    }
    
})