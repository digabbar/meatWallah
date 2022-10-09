import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { addItemToCart, removeItemFromCart } from "../../Slice/CartSlice";
const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, quantity, total, price } = props.item;
  const removeItemHandler = () => {
    dispatch(removeItemFromCart(id));
  };
  const addItemHandler = () => {
    dispatch(
      addItemToCart({
        id,
        title,
        quantity: 1,
        price,
      })
    );
  };
  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          &#8377; {total.toFixed(2)}{" "}
          <span className={classes.itemprice}>
            (&#8377; {price.toFixed(2)}/item)
          </span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={removeItemHandler}>-</button>
          <button onClick={addItemHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
