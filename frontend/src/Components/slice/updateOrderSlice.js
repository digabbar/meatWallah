import { createSlice } from "@reduxjs/toolkit";
export const updateOrderSlice = createSlice({
  name: "UpdateOrder",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    update_order_req: (state, action) => {
      state.loading = true;
    },
    update_order_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    update_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    update_order_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const updateOrderAction = updateOrderSlice.actions;
export default updateOrderSlice.reducer;
