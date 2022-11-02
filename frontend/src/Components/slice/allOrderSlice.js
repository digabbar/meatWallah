import { createSlice } from "@reduxjs/toolkit";
export const allOrderSlice = createSlice({
  name: "AllOrder",
  initialState: {
    orders: [],
    loading: false,
    error: null,
    total: null,
  },
  reducers: {
    all_order_req: (state, action) => {
      state.loading = true;
    },
    all_order_success: (state, action) => {
      state.orders = action.payload.order;
      state.loading = false;
      state.total = action.payload.totalAmount;
    },
    all_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const allOrderAction = allOrderSlice.actions;
export default allOrderSlice.reducer;
