import { message } from "antd";
import Swal from "sweetalert2";

export const setLocalStorage = (key: any, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};
// eslint-disable-next-line consistent-return
export const getLocalStorage = (key: string) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key) || "{}");
    }
};

// eslint-disable-next-line import/prefer-default-export
export const addToCart = (newItem: any, next: any) => {

    let cart: any = [];
    if (localStorage.getItem("cart")) {
        cart = getLocalStorage("cart");
    }
    const existItem = cart.find((item: any) => item.id._id === newItem.id._id && item.color?._id ===newItem.color._id && item.size?._id ===newItem.size._id);
    if (!existItem) {
        cart.push(newItem);
        Swal.fire({
            icon: 'success',
            title: "Thêm vào giỏ hàng thành công ",
            timer:1500,
            showConfirmButton: false,
          })
    } else {
        if(existItem.quantity>=newItem.size?.amount){
            return Swal.fire({
                icon: 'warning',
                title: "Không được thêm quá số lượng kho ",
              })
        }
        // eslint-disable-next-line no-plusplus
        existItem.quantity += newItem.quantity;
        Swal.fire({
            icon: 'success',
            title: "Sản phẩm này đã có trong giỏ, tăng số lượng thêm " + newItem.quantity,
            timer:1400,
            showConfirmButton: false,
          })
    }
    setLocalStorage("cart", cart);
    next();
};