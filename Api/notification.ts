import axiosClient from "./config";

export const readedNotification = (id: any) => {
  return axiosClient.put(`/read-notification/${id}`);
};

export const getNotificationApi = (id: any) => {
  return axiosClient.get(`/get-notification/${id}`);
};
