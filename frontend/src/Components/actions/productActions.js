import axios from "axios";
import { productAction } from "../slice/productSlice";
import { productDetailAction } from "../slice/productDetailSlice";

export const getProduct =
  (currentPage = 1, keyword = "") =>
  async (dispatch) => {
    try {
      dispatch(productAction.all_Products_req());

      const { data } = await axios.get(
        `/api/v1/products/?keyword=${keyword}&page=${currentPage}`
      );
      console.log(data);
      dispatch(productAction.all_Products_success(data));
    } catch (error) {
      console.log(error);
      dispatch(productAction.all_Products_fail(error.message));
    }
  };

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(productDetailAction.product_details_req());
    const { data } = await axios.get(`/api/v1/products/${id}`);
    console.log(data);
    dispatch(productDetailAction.product_details_success(data));
  } catch (error) {
    console.log(error);
    dispatch(productDetailAction.product_details_fail(error.message));
  }
};
export const clearError = (key) => async (dispatch) => {
  if (key === "products") {
    dispatch(productAction.clear());
  }
  if (key === "productDetail") {
    dispatch(productDetailAction.clear());
  }
};
