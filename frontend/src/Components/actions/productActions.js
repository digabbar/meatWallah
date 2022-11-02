import axios from "axios";
import { productAction } from "../slice/productSlice";
import { productDetailAction } from "../slice/productDetailSlice";
import { newReviewAction } from "../slice/newReviewSlice";
import { newProductAction } from "../slice/createNewProductSlice";
import { deleteProductAction } from "../slice/deleteProductSlice";
import { updateProductAction } from "../slice/updateProductSlice";
import { deleteReviewAction } from "../slice/deleteReviewSlice";

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
    dispatch(newReviewAction.new_review_success(data.success));
  } catch (e) {
    dispatch(newReviewAction.new_review_fail(e.response.data.message));
  }
};

export const newProduct = (productData) => async (dispatch) => {
  try {
    dispatch(newProductAction.new_product_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/v1/admin/products/new",
      productData,
      config
    );
    dispatch(newProductAction.new_product_success(data.success));
  } catch (e) {
    dispatch(newProductAction.new_product_fail(e.response.data.message));
  }
};
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductAction.delete_product_req());
    const { data } = await axios.delete(`/api/v1/admin/products/${id}`);
    dispatch(deleteProductAction.delete_product_success(data.success));
  } catch (e) {
    dispatch(deleteProductAction.delete_product_fail(e.response.data.message));
  }
};
export const updateProduct = (id, updatedData) => async (dispatch) => {
  try {
    dispatch(updateProductAction.update_product_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/v1/admin/products/${id}`,
      updatedData,
      config
    );
    dispatch(updateProductAction.update_product_success(data.success));
  } catch (e) {
    console.log(e.response.data.message);
    dispatch(updateProductAction.update_product_fail(e.response.data.message));
  }
};

export const deleteReview = (id, reviewId) => async (dispatch) => {
  try {
    dispatch(deleteReviewAction.delete_review_req());
    const { data } = await axios.delete(
      `/api/v1/admin/products/${id}/review/${reviewId}`
    );
    dispatch(deleteReviewAction.delete_review_success(data.success));
  } catch (e) {
    console.log(e);
    dispatch(deleteReviewAction.delete_review_fail(e.response.data.message));
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
  if (key === "newProduct") {
    dispatch(newProductAction.clear());
  }
  if (key === "deleteProduct") {
    dispatch(deleteProductAction.clear());
  }
  if (key === "updateProduct") {
    dispatch(updateProductAction.clear());
  }
  if (key === "deleteReview") {
    dispatch(deleteReviewAction.clear());
  }
};
