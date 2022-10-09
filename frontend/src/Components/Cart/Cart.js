import Card from "../UI/Card";
import classes from "./Cart.module.css";
import CartItem from "./CartItem";
import Modal from "../UI/Modal";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";
import { toggleCart } from "../../Slice/uiSlice";

const Cart = (props) => {
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(toggleCart());
  };
  return (
    <Modal>
      <Card className={classes.cart}>
        <h2>Your Shopping Cart</h2>
        <ul>
          <CartItem
            item={{ title: "Test Item", quantity: 3, total: 18, price: 6 }}
          />
        </ul>
        <Button variant="dark" size="lg" onClick={toggleCartHandler}>
          <p>Close</p>
        </Button>
      </Card>
    </Modal>
  );
};

export default Cart;
