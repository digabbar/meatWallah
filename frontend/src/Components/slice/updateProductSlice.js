import { createSlice } from "@reduxjs/toolkit";
export const updateProductSlice = createSlice({
  name: "UpdateProduct",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    update_product_req: (state, action) => {
      state.loading = true;
    },
    update_product_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    update_product_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    update_product_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const updateProductAction = updateProductSlice.actions;
export default updateProductSlice.reducer;
