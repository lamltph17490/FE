import { TprdColor } from "../models/prdColor";
import axiosClient from "./config";

export const getAll = (): Promise<TprdColor[]> => {
    return axiosClient.get("/prd_color");
};

export const remove = (id: string): Promise<TprdColor> => {
    return axiosClient.delete(`/prd_color/${id}`);
};

export const add = (color: TprdColor): Promise<TprdColor> => {
    return axiosClient.post("/prd_color", color);
};

export const get = (id: string): Promise<TprdColor> => {
    return axiosClient.get(`/prd_color/${id}`);
};

export const update = (color: TprdColor): Promise<TprdColor> => {
    return axiosClient.put(`/prd_color/${color._id}`, color);
};

