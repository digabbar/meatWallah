import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const ProductDetailsSlice = createSlice({
  name: "ProductDetail",
  initialState: {
    products: {},
    loading: false,
    error: null,
  },
  reducers: {
    product_details_req: (state, action) => {
      state.loading = true;
    },
    product_details_success: (state, action) => {
      state.loading = false;
      state.products = action.payload.singleProduct;
    },
    product_details_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(product_details_req());
    const { data } = await axios.get(`/api/v1/products/${id}`);
    console.log(data);
    dispatch(product_details_success(data));
  } catch (error) {
    console.log(error);
    dispatch(product_details_fail(error.message));
  }
};

export const {
  product_details_req,
  product_details_success,
  product_details_fail,
  clear,
} = ProductDetailsSlice.actions;
export default ProductDetailsSlice.reducer;
