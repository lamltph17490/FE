import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { add, get, getAll, remove, update } from "../Api/blogCateApi";
import { TblogCate } from "../models/blogCates";

type BlogCateState = {
  blogCates: TblogCate[];
  blogCate: TblogCate | {};
};

const initialState: BlogCateState = {
  blogCates: [],
  blogCate: {},
};

export const getBlogCates = createAsyncThunk("BlogCate/getBlogCates", async () => {
  const response = await getAll();

  return response;
});

export const deleteBlogCate = createAsyncThunk("BlogCate/deleteBlogCate", async (id: string) => {
  const res = await remove(id);

  return res;
});

export const addBlogCate = createAsyncThunk("BlogCate/addBlogCate", async (Blog: any) => {
  const res = await add(Blog);

  return res;
});

export const getBlogCate = createAsyncThunk("BlogCate/getBlogCate", async (id: any) => {
  const res = await get(id);

  return res;
});

export const updateBlogCate = createAsyncThunk("BlogCate/updateBlogCate", async (Blog: any) => {
  const res = await update(Blog);

  return res;
});

const BlogSlice = createSlice({
  name: "Blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getBlogCates.fulfilled, (state, { payload }) => {
      state.blogCates = payload || [];
    });

    builder.addCase(deleteBlogCate.fulfilled, (state, { payload }) => {
      state.blogCates = state.blogCates.filter((item) => item._id !== payload?._id);
    });

    builder.addCase(addBlogCate.fulfilled, (state, { payload }) => {
      state.blogCates.push(payload as TblogCate);
    });

    // builder.addCase(getBlogCate.fulfilled, (state, { payload }) => {
    //     state.blogCate = payload as TblogCate;
    // });

    builder.addCase(updateBlogCate.fulfilled, (state, { payload }) => {
      state.blogCates = state.blogCates = state.blogCates.map((item) =>
        item._id === payload?._id ? payload : item,
      ) as TblogCate[];
    });
  },
});

export default BlogSlice.reducer;
