import axios from "axios";
import { newOrderAction } from "../slice/newOrderSlice";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    console.log(order);
    dispatch(newOrderAction.create_order_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/orders/new", order, config);
    console.log(data);
    dispatch(newOrderAction.create_order_success(data));
  } catch (error) {
    console.log(error);
    dispatch(newOrderAction.create_order_fail(error.response.data.message));
  }
};
export const clearError = (key) => async (dispatch) => {
  if (key === "newOrder") {
    dispatch(newOrderAction.clear());
  }
};
