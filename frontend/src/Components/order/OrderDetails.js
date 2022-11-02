import React, { useEffect, Fragment, useRef } from "react";
import { useParams } from "react-router-dom";
import classes from "./OrderDetails.module.css";
import Loader from "../UI/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteOrder,
  updateOrder,
  orderDetail,
  clearError,
} from "../actions/orderActions";
import { updateOrderAction } from "../slice/updateOrderSlice";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { deleteOrderAction } from "../slice/deleteOrderSlice";

const OrderDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();
  const updateOrderInputRef = useRef();

  const { loading, error, order } = useSelector((state) => state.orderDetail);
  const {
    success,
    error: updateError,
    loading: updateLoading,
  } = useSelector((state) => state.updateOrder);
  const {
    success: deleteSuccess,
    error: deleteError,
    loading: deleteLoading,
  } = useSelector((state) => state.deleteOrder);
  const { user } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(orderDetail(params.id));
    if (deleteSuccess) {
      alert.success("order deleted Successfully");
      dispatch(deleteOrderAction.delete_order_reset());
      navigate("/admin/order");
    }
    if (deleteError) {
      alert.error(deleteError);
      dispatch(clearError("deleteOrder"));
    }
    if (success) {
      alert.success("Order Update Successfully");
      dispatch(updateOrderAction.update_order_reset());
      navigate("/admin/order");
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError("updateOrder"));
    }

    if (error) {
      alert.error(error);
      dispatch(clearError("orderDetail"));
    }
  }, [
    dispatch,
    alert,
    error,
    params.id,
    success,
    updateError,
    navigate,
    deleteError,
    deleteSuccess,
  ]);
  if (loading || updateLoading || deleteLoading) {
    return <Loader />;
  }
  if (!Object.keys(order).length) {
    return;
  }
  const orderStatusHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateOrder(order._id, { status: updateOrderInputRef.current.value })
    );
  };
  const deleteOrderHandler = () => {
    dispatch(deleteOrder(order._id));
  };
  return (
    <Fragment>
      {user.role === "admin" && (
        <div className={classes.updateOrder}>
          <div className={classes.deleteOrder}>
            <Button variant="danger" onClick={deleteOrderHandler}>
              Delete Order
            </Button>
          </div>
          <Form onSubmit={orderStatusHandler}>
            <div>
              <Form.Select
                aria-label="Default select example"
                ref={updateOrderInputRef}
              >
                <option value="shipped">Shipped</option>
                <option value="processing">Processing</option>
                <option value="delivered">Delivered</option>
              </Form.Select>
            </div>

            <div className="mx-2">
              <Button variant="primary" type="submit">
                Update Status
              </Button>
            </div>
          </Form>
        </div>
      )}
      <h3 className=" text-muted ">OrderID {order._id} </h3>
      <span className="text-muted ">
        {String(order.createdAt).substring(0, 10)}
      </span>
      <h3 className="mb-3 text-primary text-decoration-underline mb-5 mt-3">
        Shipping Info{" "}
      </h3>
      <div className={classes.shippingInfo}>
        <p>
          <b>Name :</b>
          {` ${order.shippingInfo.firstName.toUpperCase()} ${order.shippingInfo.lastName.toUpperCase()}`}
        </p>
        <p>
          <b>Address :</b> {order.shippingInfo.address}
        </p>
        <p className="text-uppercase">{`${order.shippingInfo.city},${order.shippingInfo.state}`}</p>
        <p>
          <b>Pincode :</b> {order.shippingInfo.pincode}
        </p>
        <p>
          <b>Mobile No :</b> {order.shippingInfo.phoneNo}
        </p>
        <p>
          <b>
            Order Status :{" "}
            <span
              className={
                order.orderStatus === "delivered"
                  ? "text-success text-uppercase"
                  : "text-danger text-uppercase"
              }
            >
              {order.orderStatus}
            </span>
          </b>
        </p>
      </div>
      <h3 className="mb-3 text-primary text-decoration-underline mb-5 mt-3">
        Payment Info{" "}
      </h3>
      <div className={classes.paymentInfo}>
        <p>
          <b>Payment Id : </b>
          {order.payment.payment_id}
        </p>
        <p>
          <b>
            Status :{" "}
            <span
              className={
                order.payment.paymentStatus === "Success"
                  ? "text-success text-uppercase"
                  : "text-danger text-uppercase"
              }
            >
              {order.payment.paymentStatus}
            </span>
          </b>
        </p>
      </div>
      <h3 className="mb-3 text-primary text-decoration-underline mb-5 mt-3">
        Order Items{" "}
      </h3>
      <div className={classes.orderItems}>
        {order.orderItems.map((item) => {
          return (
            <div className={classes.cartContainer} key={item._id}>
              <div className={classes.imageContainer}>
                <img src={item.image} alt="cartimage" />
              </div>
              <div className={classes.cartDescription}>
                <Button
                  variant="link"
                  as={Link}
                  to={`/products/${item.product}`}
                >
                  {item.product}
                </Button>
                <h3>{item.name}</h3>
                <p>&#8377; {item.price}</p>
                <p>
                  <b>Quantity : </b> {item.quantity}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      <h3 className="mb-3 text-primary text-decoration-underline mb-5 mt-3">
        Order Summary
      </h3>
      <div className={classes.priceInfo}>
        <p>
          Items Price <b>{order.itemsPrice.toFixed(2)}</b>
        </p>
        <p>
          Shipping Price <b>{order.shippingPrice.toFixed(2)}</b>
        </p>
        <p>
          Tax (0.05 %) <b>{order.taxPrice.toFixed(2)}</b>
        </p>
        <p>
          <strong>Total </strong>
          <b>{order.totalPrice}</b>
        </p>
      </div>
    </Fragment>
  );
};

export default OrderDetails;
