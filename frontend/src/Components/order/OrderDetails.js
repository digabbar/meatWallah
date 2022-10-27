import React, { useEffect, Fragment } from "react";
import { useParams } from "react-router-dom";
import classes from "./OrderDetails.module.css";
import Loader from "../UI/Loader";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { orderDetail, clearError } from "../actions/orderActions";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
const OrderDetails = () => {
  const params = useParams();
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, order } = useSelector((state) => state.orderDetail);

  useEffect(() => {
    dispatch(orderDetail(params.id));

    if (error) {
      alert.error(error);
      dispatch(clearError("orderDetail"));
    }
  }, [dispatch, alert, error, params.id]);
  if (loading) {
    return <Loader />;
  }
  if (!Object.keys(order).length) {
    return;
  }
  console.log(order);
  return (
    <Fragment>
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
            <div className={classes.cartContainer}>
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
