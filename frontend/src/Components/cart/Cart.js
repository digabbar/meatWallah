import React, { Fragment } from "react";
import classes from "./Cart.module.css";
import Total from "./Total";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function Cart() {
  const { cart } = useSelector((state) => state.cart);

  return (
    <Fragment>
      <div className={classes.cart}>
        <div className={classes.cart__left}>
          <div>
            <h3>Shopping Cart</h3>
            {cart?.map((item) => (
              <CartItem
                key={item.product}
                id={item.product}
                image={item.image}
                title={item.name}
                price={item.price}
                quantity={item.quantity}
              />
            ))}
          </div>
        </div>

        <div className={classes.cart__right}>
          <Total />
        </div>
      </div>
      <div className="text-end" size="lg" varient="primary">
        <Button
          className={classes.checkoutButton}
          as={Link}
          variant="success"
          to="/shipping"
        >
          Checkout
        </Button>
      </div>
    </Fragment>
  );
}

export default Cart;
