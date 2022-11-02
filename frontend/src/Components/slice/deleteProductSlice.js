import { createSlice } from "@reduxjs/toolkit";
export const deleteProductSlice = createSlice({
  name: "DeleteProduct",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    delete_product_req: (state, action) => {
      state.loading = true;
    },
    delete_product_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    delete_product_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    delete_product_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const deleteProductAction = deleteProductSlice.actions;
export default deleteProductSlice.reducer;
