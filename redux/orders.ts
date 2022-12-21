import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllOrderDetail, getAllOrders, updateOrders } from "../Api/orders";


const initialState: any = {
    orders: [],
    orderDetail: [],
};

export const getallorders = createAsyncThunk<any>("orders/getall", 
    async () => {
        const response = await getAllOrders();
        return response;
    });

export const getallorderdetail = createAsyncThunk<any>("orders/getallorderdetail", 
    async () => {
        const response = await getAllOrderDetail();
        return response;
    });
export const updateOrder = createAsyncThunk<any>("order/update", async (orders: any) => {
    const res = await updateOrders(orders);

    return res;
});
    
const Orders = createSlice({
    name: "orders",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getallorders.fulfilled, (state, { payload }) => {
            state.orders = payload;
        });
        builder.addCase(getallorderdetail.fulfilled, (state, { payload }) => {
            state.orderDetail = payload;
        });
        builder.addCase(updateOrder.fulfilled, (state, { payload }) => {
            state.orders = state.orders = state.orders.map((item:any) => (item._id === payload?._id ? payload : item)) ;
        });
    },
});

export default Orders.reducer;