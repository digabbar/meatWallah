import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./AddToCartForm.module.css";
import { useDispatch } from "react-redux";
import { addToCart } from "../slice/cartSlice";
import { useAlert } from "react-alert";
function AddToCartForm(props) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const qtyInputRef = useRef();
  const addToCartSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      addToCart({
        product: props.product._id,
        name: props.product.name,
        image: props.product.images[0].url,
        price: props.product.price,
        quantity: parseInt(qtyInputRef.current.value),
        stock: props.product.stock,
      })
    );
    alert.success("Item is added to Cart");
  };
  const increaseQty = () => {
    let count = parseInt(qtyInputRef.current.value);
    if (count >= props.product.stock) return;
    count += 1;
    qtyInputRef.current.value = count;
  };

  const decreaseQty = () => {
    let count = parseInt(qtyInputRef.current.value);

    if (count <= 1) return;

    count -= 1;
    qtyInputRef.current.value = count;
  };

  return (
    <Form onSubmit={addToCartSubmitHandler}>
      <div className={classes.quantityContainer}>
        <Button variant="danger" type="button" onClick={decreaseQty}>
          -
        </Button>
        <input
          type="number"
          readOnly
          defaultValue="1"
          ref={qtyInputRef}
          required
        />
        <Button variant="primary" type="button" onClick={increaseQty}>
          +
        </Button>
      </div>
      <Button
        variant="dark"
        size="lg"
        type="submit"
        disabled={props.product.stock <= 0}
      >
        Add to Cart
      </Button>
    </Form>
  );
}

export default AddToCartForm;
