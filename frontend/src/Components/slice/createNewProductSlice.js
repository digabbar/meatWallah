import { createSlice } from "@reduxjs/toolkit";
export const newProductSlice = createSlice({
  name: "NewProduct",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    new_product_req: (state, action) => {
      state.loading = true;
    },
    new_product_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    new_product_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    new_product_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const newProductAction = newProductSlice.actions;
export default newProductSlice.reducer;
