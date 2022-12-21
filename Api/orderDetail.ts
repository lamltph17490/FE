import axiosClient from "./config";

export const getAllOrderDetail = () => {
    return axiosClient.get("/orderDetail");
};

export const removeOrderDetail = (id: string) => {
    return axiosClient.delete(`/orderDetail/${id}`);
};

export const addOrderDetail = (product: any) => {
    return axiosClient.post("/orderDetail", product);
};

export const getOrderDetail = (id: string) => {
    return axiosClient.get(`/orderDetail/${id}`);
};

export const updateOrderDetail = (product: any) => {
    return axiosClient.put(`/orderDetail/${product._id}`, product);
};