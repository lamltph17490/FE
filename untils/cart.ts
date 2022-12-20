import { message } from "antd";
import Swal from "sweetalert2";

export const setLocalStorage = (key: any, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
};
let cart: any = [];
// eslint-disable-next-line consistent-return
export const getLocalStorage = (key: string) => {
    if (localStorage.getItem(key)) {
        return JSON.parse(localStorage.getItem(key) || "{}");
    }
};


 const getCart = ()=>{
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return cart = JSON.parse(localStorage.getItem('cart') as string)
        }
        return cart = []
    }
}
// eslint-disable-next-line import/prefer-default-export
export const addToCart = (newItem: any, next: any) => {

    getCart()
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
        existItem.quantity += newItem.quantity;
        if(existItem.quantity > existItem.size?.amount){
             existItem.quantity = existItem.size?.amount
             return Swal.fire({
                icon: 'warning',
                title: "Số lượng sản phẩm trong giỏ hàng của bạn không được thêm quá số lượng kho ",
              })
              
        }
        // eslint-disable-next-line no-plusplus
        
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
export const sumTotal = (price:any,quantity:any)=>{
    return price * quantity
}
export const increaseItemInCart = (id: any, next: () => void) => {
    getCart()
    cart.find((item:any) => item?.randomid === id).quantity++;
    localStorage.setItem('cart', JSON.stringify(cart))
    next();
}
export const decreaseItemInCart = (id: any, next: () => void) => {
    getCart()
    const currenProduct = cart.find((product:any) => (product?.randomid === id));
 
    
    currenProduct.quantity--;
    // nếu sản phẩm giảm nhỏ hơn 1 thì xóa
    if (currenProduct.quantity < 1) {
        const confirm = window.confirm('Bạn có muốn xóa sản phẩm này không?');
        if (confirm) {
            cart = cart.filter((item:any) => item.randomid !== currenProduct.randomid);
        } else {
            currenProduct.quantity = 1
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart))
    next();
}
export const removeItemInCart = (newItem: any, next: () => void) => {
    getCart()
    cart = cart.filter((item:any)=>item.randomid !== newItem.randomid);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(newItem);
    
    
    next();
}