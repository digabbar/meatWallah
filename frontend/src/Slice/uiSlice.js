import { createSlice } from "@reduxjs/toolkit";

const uiInitialState = { showCart: false };
export const uiSlice = createSlice({
  name: "UI",
  initialState: uiInitialState,
  reducers: {
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
  },
});

export default uiSlice.reducer;
export const { toggleCart } = uiSlice.actions;
