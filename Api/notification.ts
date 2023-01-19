import axiosClient from "./config";

export const readedNotification = (id) => {
    return axiosClient.put(`/read-notification/${id}`)
}


export const getNotificationApi = (id) => {
    return axiosClient.get(`/get-notification/${id}`)
}