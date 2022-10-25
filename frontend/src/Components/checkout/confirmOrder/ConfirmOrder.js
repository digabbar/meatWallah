import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from "./ConfirmOrder.module.css";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import { newOrderAction } from "../../slice/newOrderSlice";
import Loader from "../../UI/Loader";
import CartItem from "../../cart/CartItem";
import CheckoutSteps from "../CheckoutSteps";
import { createOrder, clearError } from "../../actions/orderActions";
import { useAlert } from "react-alert";

const ConfirmOrder = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();
  const { cart, shippingInfo } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.auth.user);
  const { isOrderCreated, error, loading } = useSelector(
    (state) => state.newOrder
  );
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError("newOrder"));
    }
    if (isOrderCreated) {
      alert.success("order created successfully");
      navigate("/success");
      dispatch(newOrderAction.create_order_reset());
    }
  }, [alert, dispatch, error, navigate, isOrderCreated]);
  if (loading) {
    return <Loader />;
  }

  const itemsPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingPrice = itemsPrice > 500 ? 0 : 40;
  const taxPrice = Number(0.05 * itemsPrice.toFixed(2));
  const totalPrice = (itemsPrice + shippingPrice + taxPrice).toFixed(2);

  const paymentData = {
    amount: Math.round(totalPrice * 100),
  };
  const checkoutHandler = async () => {
    try {
      document.querySelector("#rzp-button1").disabled = true;
      const {
        data: { key },
      } = await axios.get("api/v1/getkey");
      const {
        data: { order },
      } = await axios.post("api/v1/payment/checkout", paymentData);

      const options = {
        key, // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "meatWallah",
        description: "Test Transaction",
        image:
          "https://images.unsplash.com/photo-1666556253835-9a780f3722fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
        order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        // callback_url: "http://localhost:4000/api/v1/payment/verification",
        handler: async (response) => {
          const verifyUrl = "http://localhost:4000/api/v1/payment/verification";
          const { data } = await axios.post(verifyUrl, response);
          console.log(data.payment);
          // create order
          // removing stock

          dispatch(
            createOrder({
              shippingPrice,
              totalPrice,
              taxPrice,
              itemsPrice,
              orderItems: cart,
              shippingInfo,
              payment: data.payment,
            })
          );
        },
        modal: {
          ondismiss: function () {
            document.querySelector("#rzp-button1").disabled = false;
          },
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: shippingInfo.phoneNo,
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razor = new window.Razorpay(options);
      razor.open();
      razor.on("payment.failed", function (response) {
        alert.error(response.error.reason);
      });
    } catch (error) {
      document.querySelector("#rzp-button1").disabled = false;
      // console.log(error.response.data.message);
      alert.error(error.response.data.message);
    }
  };
  return (
    <Fragment>
      <CheckoutSteps shipping confirmOrder />
      <Container>
        <Row className="g-0 mt-5">
          <Col xs={12} md={12} lg={8}>
            <div className={classes.shippingInfo}>
              <h3 className="mb-3 text-primary">Shipping Info </h3>
              <p className={classes.fullName}>
                <b>Name :</b>
                {` ${shippingInfo.firstName} ${shippingInfo.lastName}`}
              </p>
              <p>
                <b>Address :</b> {shippingInfo.address}
              </p>
              <p
                className={classes.cityState}
              >{`${shippingInfo.city},${shippingInfo.state}`}</p>
              <p>
                <b>Pincode :</b> {shippingInfo.pincode}
              </p>
              <p>
                <b>Mobile No :</b> {shippingInfo.phoneNo}
              </p>
            </div>
            <div className={classes.cartInfo}>
              <h3 className="mb-3 text-primary">Your Cart Item</h3>
              {cart.map((item) => (
                <CartItem
                  key={item.product}
                  name={item.name}
                  product={item.product}
                  image={item.image}
                  price={item.price}
                  quantity={item.quantity}
                />
              ))}
            </div>
          </Col>
          <Col xs={12} md={12} lg={4}>
            <div className={classes.priceInfo}>
              <h3 className="mb-3 text-primary">Order Summary</h3>
              <p>
                Items Price <b>{itemsPrice.toFixed(2)}</b>
              </p>
              <p>
                Shipping Price <b>{shippingPrice.toFixed(2)}</b>
              </p>
              <p>
                Tax (0.05 %) <b>{taxPrice.toFixed(2)}</b>
              </p>
              <p>
                <strong>Total </strong>
                <b>{totalPrice}</b>
              </p>
              <div className="text-end mt-5">
                <Button
                  variant="success"
                  size="lg"
                  id="rzp-button1"
                  onClick={checkoutHandler}
                >
                  Pay - {totalPrice}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default ConfirmOrder;
