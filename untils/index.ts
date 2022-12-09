import axios from "axios";

export const uploadImage = (image: any): any => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "uiqccvxh");

    return axios.post("https://api.cloudinary.com/v1_1/dcjtdlsw7/image/upload", formData);
};
export const formatDate = (dateString: any) => {
    const date = new Date(dateString);

    const formatDate = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const hours = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours();
    const minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? `0${date.getSeconds()}` : date.getSeconds();

    return `${formatDate}/${month}/${date.getFullYear()} ${hours}:${minutes}:${seconds}`;
};

export const thousandFormat = (value: number): string => {
    return Intl.NumberFormat('vi-VN', { currency: 'VND' }).format(value);
}
export const parserThousandFormat = (value: string): number => {
    return Number(value.replaceAll('.', ''))
}

export const findStringDuplicates = (arr: Array<string>) => arr.filter((item, index) => arr.indexOf(item) != index)
