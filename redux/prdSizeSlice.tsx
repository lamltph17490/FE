import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TprdSize } from "../models/prdSize";

type prdSizeState = {
    prdSizes: TprdSize[];
    prdSize: TprdSize | {};
};

const initialState: prdSizeState = {
    prdSizes: [],
    prdSize: {},
};

export const getprdSizes = createAsyncThunk("PrdSize/getprdSizes",  () => {
    return [{ name: 'xl'}, { name: 'xxl'}]
});

const prdSizeSlice = createSlice({
    name: "PrdSize",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getprdSizes.fulfilled, (state, { payload }) => {
            state.prdSizes = payload || [];
        });
    },
});

export default prdSizeSlice.reducer;
