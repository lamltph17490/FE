

import { NewsCate, TblogCate } from "../models/blogCates";
import axiosClient, { axiosServer } from "./config";

export const getAll = (): Promise<TblogCate[]> => {
    return axiosServer.get("/categorynews");
};

export const remove = (id: string): Promise<TblogCate> => {
    return axiosClient.delete(`/categorynews/${id}`);
};

export const add = (cateNew: TblogCate): Promise<TblogCate> => {
    return axiosClient.post("/categorynews", cateNew);
};

export const get = (id?: string): Promise<NewsCate> => {
    return axiosServer.get(`/categoryNews/${id}`);
  };

export const update = (cateNew: TblogCate): Promise<TblogCate> => {
    return axiosClient.put(`/categorynews/${cateNew._id}`, cateNew);
};

