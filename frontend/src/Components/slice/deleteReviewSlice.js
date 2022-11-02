import { createSlice } from "@reduxjs/toolkit";
export const deleteReviewSlice = createSlice({
  name: "DeleteReview",
  initialState: {
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    delete_review_req: (state, action) => {
      state.loading = true;
    },
    delete_review_success: (state, action) => {
      state.loading = false;
      state.success = action.payload;
    },
    delete_review_fail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    delete_review_reset: (state, action) => {
      state.success = false;
    },
    clear: (state, action) => {
      state.error = null;
    },
  },
});

export const deleteReviewAction = deleteReviewSlice.actions;
export default deleteReviewSlice.reducer;
