import { createSlice } from "@reduxjs/toolkit";
export const userDetailSlice = createSlice({
  name: "UserDetail",
  initialState: {
    user: {},
    loading: false,
    error: null,
  },
  reducers: {
    user_details_req: (state, action) => {
      state.loading = true;
    },
    user_details_success: (state, action) => {
      state.user = action.payload;
      state.loading = false;
    },
    user_details_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const userDetailAction = userDetailSlice.actions;
export default userDetailSlice.reducer;
