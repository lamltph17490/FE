import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, get, getAll, remove, update } from "../Api/prdApi";
import { filterProduct } from "../Api/products";
import { Tprd } from "../models/prd";

type ProductState = {
    products: Tprd[];
    product: Tprd | {};
    page: any,
    productsFilter: any
};

const initialState: ProductState = {
    products: [],
    productsFilter: [],
    product: {},
    page: 1,
};

export const getProducts = createAsyncThunk("Product/getProducts", async () => {
    const response = await getAll();

    return response;
});

export const deleteProduct = createAsyncThunk("Product/deleteProduct", async (id: string) => {
    const res = await remove(id);

    return res;
});




export const addProduct = createAsyncThunk("Product/addProduct", async (product: any) => {
    const res = await add(product);

    return res;
});

export const getProduct = createAsyncThunk("Product/getProduct", async (id: any) => {
    const res = await get(id);

    return res;
});

export const updateProduct = createAsyncThunk("Product/updateProduct", async (product: any) => {
    const res = await update(product);

    return res;
});

const ProductSlice = createSlice({
    name: "Product",
    initialState,
    reducers: { 
         filterProductS(state, {payload}) {
            state.products = payload || [];
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getProducts.fulfilled, (state, { payload }) => {
            state.products = payload || [];
        });

        // builder.addCase(filterProductS.fulfilled, (state, { payload }) => {
        //     console.log(payload);
            
        //     state.products = payload || [];
        // });

        builder.addCase(deleteProduct.fulfilled, (state, { payload }) => {
            state.products = state.products.filter((item) => item._id !== payload?._id);
        });

        builder.addCase(addProduct.fulfilled, (state, { payload }) => {
            state.products.push(payload as Tprd);
        });

        builder.addCase(getProduct.fulfilled, (state, { payload }) => {
            state.product = payload as Tprd;
        });

        builder.addCase(updateProduct.fulfilled, (state, { payload }) => {
            state.products = state.products = state.products.map((item) => (item._id === payload?._id ? payload : item)) as Tprd[];
        });
    },
});
export const { filterProductS } = ProductSlice.actions;
export default ProductSlice.reducer;