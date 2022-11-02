import { createSlice } from "@reduxjs/toolkit";
export const deleteOrderSlice = createSlice({
  name: "DeleteProduct",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    delete_order_req: (state, action) => {
      state.loading = true;
    },
    delete_order_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    delete_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    delete_order_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const deleteOrderAction = deleteOrderSlice.actions;
export default deleteOrderSlice.reducer;
