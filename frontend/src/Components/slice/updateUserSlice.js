import { createSlice } from "@reduxjs/toolkit";
export const updateUserSlice = createSlice({
  name: "UpdateUser",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    update_user_req: (state, action) => {
      state.loading = true;
    },
    update_user_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    update_user_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    update_user_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const updateUserAction = updateUserSlice.actions;
export default updateUserSlice.reducer;
