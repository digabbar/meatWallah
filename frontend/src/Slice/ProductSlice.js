import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
    loading: false,
    error: null,
    productsCount: 0,
  },
  reducers: {
    all_Products_req: (state, action) => {
      state.loading = true;
      state.products = [];
    },
    all_Products_success: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.count;
    },
    all_Products_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const getProduct = () => async (dispatch) => {
  try {
    dispatch(all_Products_req());
    const { data } = await axios.get("/api/v1/products");
    console.log(data);
    dispatch(all_Products_success(data));
  } catch (error) {
    console.log(error);
    dispatch(all_Products_fail(error.message));
  }
};
export const clearError = () => async (dispatch) => {
  dispatch(clear());
};

export const {
  all_Products_req,
  all_Products_success,
  all_Products_fail,
  clear,
} = ProductSlice.actions;
export default ProductSlice.reducer;
