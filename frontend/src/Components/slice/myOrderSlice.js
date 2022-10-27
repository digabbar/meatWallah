import { createSlice } from "@reduxjs/toolkit";
export const myOrderSlice = createSlice({
  name: "MyOrder",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    my_order_req: (state, action) => {
      state.loading = true;
    },
    my_order_success: (state, action) => {
      state.orders = action.payload;
      state.loading = false;
    },
    my_order_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const myOrderAction = myOrderSlice.actions;
export default myOrderSlice.reducer;
