import { ProductColor, ProductSize, Tprd } from "./prd";

export interface OrderDetail     {
  "_id": string,
  "orderId": string,
  "productId": string,
  "size": ProductSize,
  "color": ProductColor,
  "quantity": number,
  "createdAt": string,
  "updatedAt": string,
  "product": Tprd,
  "id": string
}


export interface Order {
  "_id": string,
  "userId": string,
  "customerName": string,
  "address": string,
  "phone": string,
  "email": string,
  "totalPrice": number,
  "message": string,
  "status": 4,
  "date": string,
  "createdAt": string,
  "updatedAt": string,
  "orderDetails": Array<OrderDetail>,
  "id": string,
  paid: boolean
}
