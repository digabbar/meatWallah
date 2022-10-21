import classes from "./Cart.module.css";
import Total from "./Total";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";

function Cart() {
  const { cart } = useSelector((state) => state.cart);

  return (
    <div className={classes.cart}>
      <div className={classes.cart__left}>
        <div>
          <h3>Shopping Cart</h3>
          {cart?.map((item) => (
            <CartItem
              key={item.id}
              id={item.id}
              image={item.image}
              title={item.title}
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
  );
}

export default Cart;
