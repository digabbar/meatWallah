import axios from "axios";
import { productAction } from "../slice/productSlice";
import { productDetailAction } from "../slice/productDetailSlice";
import { newReviewAction } from "../slice/newReviewSlice";
export const getProduct =
  (currentPage = 1, keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(productAction.all_Products_req());

      const { data } = await axios.get(
        `/api/v1/products/?keyword=${keyword}&page=${currentPage}`
      );
      dispatch(productAction.all_Products_success(data));
    } catch (error) {
      dispatch(productAction.all_Products_fail(error.message));
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailAction.product_details_req());
    const { data } = await axios.get(`/api/v1/products/${id}`);
    dispatch(productDetailAction.product_details_success(data));
  } catch (error) {
    dispatch(productDetailAction.product_details_fail(error.message));
  }
};

export const newReview = (id, reviewData) => async (dispatch) => {
  try {
    dispatch(newReviewAction.new_review_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/products/${id}/review/new`,
      reviewData,
      config
    );
    console.log(data);
    dispatch(newReviewAction.new_review_success(data.success));
  } catch (e) {
    dispatch(newReviewAction.new_review_fail(e.response.data.message));
  }
};

export const clearError = (key) => async (dispatch) => {
  if (key === "products") {
    dispatch(productAction.clear());
  }
  if (key === "productDetail") {
    dispatch(productDetailAction.clear());
  }
  if (key === "createReview") {
    dispatch(newReviewAction.clear());
  }
};
