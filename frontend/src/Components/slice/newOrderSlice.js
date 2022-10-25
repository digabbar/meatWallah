import { createSlice } from "@reduxjs/toolkit";
export const newOrderSlice = createSlice({
  name: "New Order",
  initialState: {
    loading: false,
    error: null,
    isOrderCreated: false,
  },
  reducers: {
    create_order_req: (state, action) => {
      state.loading = true;
    },
    create_order_success: (state, action) => {
      state.loading = false;
      state.isOrderCreated = action.payload.success;
    },
    create_order_reset: (state, action) => {
      state.isOrderCreated = false;
    },
    create_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isOrderCreated = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const newOrderAction = newOrderSlice.actions;
export default newOrderSlice.reducer;
