import { Tvouche } from "../models/vouche";
import axiosClient from "./config";

export const getAll = (): Promise<Tvouche[]> => {
  return axiosClient.get("/sales");
};

export const remove = (id: string): Promise<Tvouche> => {
  return axiosClient.delete(`/sales/${id}`);
};

export const add = (sale: Tvouche): Promise<Tvouche> => {
  return axiosClient.post("/sales", sale);
};

export const get = (id: string): Promise<Tvouche> => {
  return axiosClient.get(`/sales/${id}`);
};
export const update = (sale: Tvouche): Promise<Tvouche> => {
  return axiosClient.put(`/sales/${sale._id}`, sale);
};

export const UseVoucher = (data: any) => {
  return axiosClient.post(`/use-voucher`, data);
};
