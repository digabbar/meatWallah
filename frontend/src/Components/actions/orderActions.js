import axios from "axios";
import { newOrderAction } from "../slice/newOrderSlice";
import { myOrderAction } from "../slice/myOrderSlice";
import { orderDetailAction } from "../slice/orderDetailSlice";

export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch(newOrderAction.create_order_req());
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/orders/new", order, config);
    dispatch(newOrderAction.create_order_success(data));
  } catch (error) {
    dispatch(newOrderAction.create_order_fail(error.response.data.message));
  }
};
export const myOrders = () => async (dispatch) => {
  try {
    dispatch(myOrderAction.my_order_req());
    const { data } = await axios.get("/api/v1/orders/me");
    dispatch(myOrderAction.my_order_success(data.order));
  } catch (error) {
    dispatch(myOrderAction.my_order_fail(error.response.data.message));
  }
};
export const orderDetail = (id) => async (dispatch) => {
  try {
    dispatch(orderDetailAction.order_detail_req());
    const { data } = await axios.get(`/api/v1/orders/${id}`);
    dispatch(orderDetailAction.order_detail_success(data.order));
  } catch (error) {
    dispatch(orderDetailAction.order_detail_fail(error.response.data.message));
  }
};

export const clearError = (key) => async (dispatch) => {
  if (key === "newOrder") {
    dispatch(newOrderAction.clear());
  }
  if (key === "orderDetail") {
    dispatch(orderDetailAction.clear());
  }
};
