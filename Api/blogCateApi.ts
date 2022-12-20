

import { TblogCate } from "../models/blogCates";
import axiosClient from "./config";

export const getAll = (): Promise<TblogCate[]> => {
    return axiosClient.get("/categorynews");
};

export const remove = (id: string): Promise<TblogCate> => {
    return axiosClient.delete(`/categorynews/${id}`);
};

export const add = (cateNew: TblogCate): Promise<TblogCate> => {
    return axiosClient.post("/categorynews", cateNew);
};

export const get = (id: string): Promise<TblogCate> => {
    return axiosClient.get(`/categorynews/${id}`);
};

export const update = (cateNew: TblogCate): Promise<TblogCate> => {
    return axiosClient.put(`/categorynews/${cateNew._id}`, cateNew);
};

