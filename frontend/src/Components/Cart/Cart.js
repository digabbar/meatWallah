import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../Slice/uiSlice";
import CloseButton from "react-bootstrap/CloseButton";
import { Fragment } from "react";
const Cart = (props) => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cart);
  console.log(cartData);
  const toggleCartHandler = () => {
    dispatch(toggleCart());
  };
  let initialValue = 0;
  const totalPrice = cartData.items.reduce(
    (previousValue, currentValue) => previousValue + currentValue.totalPrice,
    initialValue
  );
  return (
    <Modal>
      <Card className={classes.cart}>
        <div className={classes.closeButtonContainer}>
          <Button
            as={CloseButton}
            variant="danger"
            size="lg"
            onClick={toggleCartHandler}
          ></Button>
        </div>
        {cartData.items.length > 0 && <h2>Your Shopping Cart</h2>}
        {cartData.items.length === 0 && <h3>Cart is Empty</h3>}
        <ul>
          {cartData.items.map((eachItem) => {
            return (
              <CartItem
                key={eachItem.id}
                item={{
                  id: eachItem.id,
                  title: eachItem.name,
                  quantity: eachItem.quantity,
                  total: eachItem.totalPrice,
                  price: eachItem.price,
                }}
              />
            );
          })}
        </ul>
        {cartData.items.length !== 0 && (
          <Fragment>
            <div className={classes.cartPriceContainer}>
              <h3>{`Cart Price -> ${totalPrice.toFixed(2)}`}</h3>
            </div>
            <div className={classes.cartOrderButton}>
              <Button variant="success" size="lg">
                Checkout
              </Button>
            </div>
          </Fragment>
        )}
      </Card>
    </Modal>
  );
};

export default Cart;
