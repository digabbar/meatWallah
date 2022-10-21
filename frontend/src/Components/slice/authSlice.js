import { createSlice } from "@reduxjs/toolkit";
export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    loading: false,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    login_req: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    login_success: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    login_fail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    register_user_req: (state, action) => {
      state.loading = true;
    },
    register_user_success: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    register_user_fail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = action.payload;
    },
    load_user_req: (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    },
    load_user_success: (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    load_user_fail: (state, action) => {
      state.loading = false;
      state.isAuthenticated = false;
      state.user = null;
      state.error = null;
    },
    logout_success: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
      state.loading = false;
    },
    logout_fail: (state, action) => {
      state.error = action.payload;
    },

    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
