import axiosClient from "./config";

export const getAllOrders = () => {
    return axiosClient.get("/order");
};

export const removeOrders = (id: string) => {
    return axiosClient.delete(`/order/${id}`);
};

export const addOrders = (product: any) => {
    return axiosClient.post("/order", product);
};

export const getOrders = (id: string) => {
    return axiosClient.get(`/order/${id}`);
};

export const updateOrders = (product: any) => {
    return axiosClient.put(`/order/${product._id}`, product);
};
export const getAllOrderDetail = () => {
    return axiosClient.get("/orderDetail");
};
export const createPayment = (payment: any) => {
    return axiosClient.post("/order/create_payment_url", payment);
}
export const vnpayReturn = (payment: any) => {
    return axiosClient.get("/order/vnpay_return", payment);
}
export const vnpayIpn = (payment: any) => {
    return axiosClient.get("/order/vnpay_ipn", payment);
}