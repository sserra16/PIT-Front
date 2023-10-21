import { Evento } from "../../types/evento";
import { api } from "../api";
import { AxiosError } from "axios";

export const buscarEventos = async (): Promise<Evento[]> => {
  const result = await api.get("/eventos").catch((e: AxiosError) => {
    throw new Error("Erro ao buscar eventos:" + e.message);
  });

  const eventos: Evento[] = result.data;

  return eventos;
};

export const buscarMeusEventos = async (id: number): Promise<Evento[]> => {
  const result = await api.get("/meus/" + id).catch((e: AxiosError) => {
    throw new Error("Erro ao buscar eventos:" + e.message);
  });

  const eventos: Evento[] = result.data;

  return eventos;
};
