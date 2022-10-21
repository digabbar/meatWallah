import classes from "./CartItem.module.css";
import {
  incrementQuantity,
  decrementQuantity,
  removeItem,
} from "../slice/cartSlice";
import { useDispatch } from "react-redux";

function CartItem({ id, image, title, price, quantity = 0 }) {
  const dispatch = useDispatch();
  const minusHandler = () => {
    dispatch(decrementQuantity(id));
  };
  const plusHandler = () => {
    dispatch(incrementQuantity(id));
  };

  return (
    <div className={classes.cartItem}>
      <img className={classes.cartItem__image} src={image} alt="item" />
      <div className={classes.cartItem__info}>
        <p className={classes.cartItem__title}>{title}</p>
        <p className={classes.cartItem__price}>
          <small>&#8377; </small>
          <strong>{price}</strong>
        </p>
        <div className={classes.cartItem__incrDec}>
          <button onClick={minusHandler}>-</button>
          <p>{quantity}</p>
          <button onClick={plusHandler}>+</button>
        </div>
        <button
          className={classes.cartItem__removeButton}
          onClick={() => dispatch(removeItem(id))}
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
