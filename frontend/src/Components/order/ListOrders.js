import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
// import { classes } from "./ListOrders.module.css";
import Loader from "../UI/Loader";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { myOrders, clearError } from "../actions/orderActions";

const ListOrders = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { loading, error, orders } = useSelector((state) => state.myOrder);

  useEffect(() => {
    dispatch(myOrders());

    if (error) {
      alert.error(error);
      dispatch(clearError("myOrder"));
    }
  }, [dispatch, alert, error]);
  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      {orders &&
        orders.map((order) => {
          return (
            <Card className="mb-3" key={order._id}>
              <Card.Header className="text-muted">
                OrderId {order._id}
              </Card.Header>
              <Card.Body>
                <Card.Text>
                  {order.orderItems.map((item) => {
                    return <strong key={item._id}>{item.name} ,</strong>;
                  })}
                </Card.Text>
                <Card.Text>
                  <strong>&#8377; {order.totalPrice}</strong>
                </Card.Text>
                <Card.Text
                  className={
                    order.orderStatus === "delivered"
                      ? "text-success text-uppercase fs-4 "
                      : "text-danger text-uppercase fs-4"
                  }
                >
                  {order.orderStatus}
                </Card.Text>
                <div className="text-end">
                  <Button
                    variant="link"
                    as={Link}
                    to={`/orders/${order._id}`}
                    className="text-uppercase"
                  >
                    see details
                  </Button>
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </Fragment>
  );
};

export default ListOrders;
