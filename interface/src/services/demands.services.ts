//services/demands.services.ts
import api from "./api";
import type { Demand } from "../types/demand";

const RESOURCE = "/demands";

//pega todas as demandas
export const getDemands = async () => {
  const { data } = await api.get<Demand[]>(RESOURCE);
  return data;
};
//pega uma demanda por id
export const getDemandById = async (id: number) => {
  const { data } = await api.get<Demand>(`${RESOURCE}/${id}`);
  return data;
};
//cria uma demanda
export const createDemand = async (payload: Demand) => {
  const { data } = await api.post(RESOURCE, payload);
  return data;
};
//atualiza uma demanda (parcial)
export const updateDemand = async (id: number, payload: Partial<Demand>) => {
  const { data } = await api.patch(`${RESOURCE}/${id}`, payload);
  return data;
};
//deleta uma demanda
export const deleteDemand = async (id: number) => {
  await api.delete(`${RESOURCE}/${id}`);
};

export const updateDemandStatus = async (id: number, status: string) => {
  const { data } = await api.patch(`${RESOURCE}/${id}/status`, { status });
  return data;
};
