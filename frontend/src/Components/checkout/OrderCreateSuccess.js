import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
const OrderCreateSuccess = () => {
  return (
    <Fragment>
      <h1 className="text-center text-capitalize">
        Your Order has been placed successfully
      </h1>

      <div className="text-center">
        <Button variant="link" as={Link} size="lg" to="/orders/me">
          Go to Orders
        </Button>
      </div>
    </Fragment>
  );
};

export default OrderCreateSuccess;
