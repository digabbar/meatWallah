import { createSlice } from "@reduxjs/toolkit";
export const allUserSlice = createSlice({
  name: "AllUser",
  initialState: {
    users: [],
    loading: false,
    error: null,
  },
  reducers: {
    all_user_req: (state, action) => {
      state.loading = true;
    },
    all_user_success: (state, action) => {
      state.users = action.payload;
      state.loading = false;
    },
    all_user_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const allUserAction = allUserSlice.actions;
export default allUserSlice.reducer;
