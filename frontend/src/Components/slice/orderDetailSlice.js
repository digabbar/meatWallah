import { createSlice } from "@reduxjs/toolkit";
export const orderDetailSlice = createSlice({
  name: "OrderDetail",
  initialState: {
    order: {},
    loading: false,
    error: null,
  },
  reducers: {
    order_detail_req: (state, action) => {
      state.loading = true;
    },
    order_detail_success: (state, action) => {
      state.order = action.payload;
      state.loading = false;
    },
    order_detail_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const orderDetailAction = orderDetailSlice.actions;
export default orderDetailSlice.reducer;
