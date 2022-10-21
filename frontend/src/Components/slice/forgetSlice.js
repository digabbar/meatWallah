import { createSlice } from "@reduxjs/toolkit";
export const forgetSlice = createSlice({
  name: "Forget",
  initialState: {
    error: null,
    message: null,
    loading: false,
    success: null,
  },
  reducers: {
    forget_password_req: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    forget_password_success: (state, action) => {
      state.message = action.payload.message;
      state.loading = false;
      state.success = action.payload.success;
    },
    forget_password_fail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    new_password_req: (state, action) => {
      state.error = null;
      state.loading = true;
    },
    new_password_success: (state, action) => {
      state.success = action.payload.success;
      state.loading = false;
      state.message = action.payload.message;
    },
    new_password_fail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const forgetAction = forgetSlice.actions;
export default forgetSlice.reducer;
