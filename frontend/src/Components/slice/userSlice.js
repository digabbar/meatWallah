import { createSlice } from "@reduxjs/toolkit";
export const userSlice = createSlice({
  name: "User",
  initialState: {
    loading: false,
    isUpdated: null,
  },
  reducers: {
    update_profile_req: (state, action) => {
      state.loading = true;
    },
    update_profile_success: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    update_profile_reset: (state, action) => {
      state.isUpdated = false;
    },
    update_profile_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    update_password_req: (state, action) => {
      state.loading = true;
    },
    update_password_success: (state, action) => {
      state.loading = false;
      state.isUpdated = action.payload;
    },
    update_password_reset: (state, action) => {
      state.isUpdated = false;
    },
    update_password_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice.reducer;
