import { createSlice } from "@reduxjs/toolkit";
export const newReviewSlice = createSlice({
  name: "NewReview",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    new_review_req: (state, action) => {
      state.loading = true;
    },
    new_review_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    new_review_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    new_review_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const newReviewAction = newReviewSlice.actions;
export default newReviewSlice.reducer;
