import classes from "./Total.module.css";
import { useSelector } from "react-redux";

function Total() {
  const { cart } = useSelector((state) => state.cart);

  const getTotal = () => {
    let totalQuantity = 0;
    let totalPrice = 0;
    cart.forEach((item) => {
      totalQuantity += item.quantity;
      totalPrice += item.price * item.quantity;
    });
    return { totalPrice, totalQuantity };
  };

  return (
    <div className={classes.total}>
      <h2>ORDER SUMMARY</h2>
      <div>
        <p className={classes.total__p}>
          ({getTotal().totalQuantity} items) :{" "}
          <strong>&#8377; {getTotal().totalPrice}</strong>
        </p>
      </div>
    </div>
  );
}

export default Total;
