//clients.services.ts

import api from "./api"
import type { Client } from '../types/client'

const RESOURCE = '/clients'

//pega todos os clientes
export const getClients = async()=>{
    const {data} = await api.get<Client[]>(RESOURCE)
    console.log(data)
    return data
}
//pega um cliente por id
export const getClientById = async(id: number)=>{
    const {data} = await api.get<Client>(`${RESOURCE}/${id}`)
    return data
}
//cria um cliente
export const createClient = async (payload: Client) => {
  const { data } = await api.post(RESOURCE, payload)
  return data
}
//atualiza um cliente
export const updateClient = async (id: number, payload: Client) => {
  const { data } = await api.put(`${RESOURCE}/${id}`, payload)
  return data
}
//deleta um cliente
export const deleteClient = async (id: number) => {
  await api.delete(`${RESOURCE}/${id}`)
}
