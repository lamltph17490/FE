import axios from "axios";

const axiosClient = axios.create({

    baseURL: "http://localhost:8000/api/",
    headers: {
        "Content-Type": "application/json",
    },
})

export const axiosServer = axios.create({
    baseURL: "http://localhost:8000/api/",

    headers: {
        "Content-Type": "application/json",
    },
});

axiosServer.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    },
);

// Add a request interceptor
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
        config.headers = {
            Authorization: `Bearer ${token}`,
        };
    }
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        // Logout when 401
        if ([401].includes(error.response?.status)) {
            document.location.href = '/login'
        }
        return Promise.reject(error);
    },
);

export default axiosClient;
