import { createSlice } from "@reduxjs/toolkit";
export const ProductSlice = createSlice({
  name: "Product",
  initialState: {
    products: [],
    product: {},
    loading: false,
    error: null,
    productsCount: 0,
    resPerPage: 0,
    filteredProductsCount: 0,
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
      state.resPerPage = action.payload.resPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    all_Products_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
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

export const productAction = ProductSlice.actions;
export default ProductSlice.reducer;
