import { createSlice } from "@reduxjs/toolkit";
export const deleteUserSlice = createSlice({
  name: "DeleteUser",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    delete_user_req: (state, action) => {
      state.loading = true;
    },
    delete_user_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    delete_user_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    delete_user_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const deleteUserAction = deleteUserSlice.actions;
export default deleteUserSlice.reducer;
