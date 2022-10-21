import { createSlice } from "@reduxjs/toolkit";
export const ProductDetailSlice = createSlice({
  name: "ProductDetail",
  initialState: {
    product: {},
    loading: false,
    error: null,
  },
  reducers: {
    product_details_req: (state, action) => {
      state.loading = true;
    },
    product_details_success: (state, action) => {
      state.loading = false;
      state.product = action.payload.singleProduct;
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

export const productDetailAction = ProductDetailSlice.actions;

export default ProductDetailSlice.reducer;
