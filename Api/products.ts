import axiosClient from "./config";

export const getProduct = () => {
    fetch('http://localhost:5000/products')
        .then((response) => response.json())
        .then((data) => console.log(data));
}

export const filterProduct = ( data: any) => {
    return axiosClient.post(`/product-filter`, data);
};
  
