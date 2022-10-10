import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../Slice/CartSlice";
import { useAlert } from "react-alert";
function AddToCartForm(props) {
  const alert = useAlert();
  const dispatch = useDispatch();
  const quantityInfoRef = useRef();
  const addToCartSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      addItemToCart({
        id: props.product._id,
        title: props.product.name,
        price: props.product.price,
        quantity: parseInt(quantityInfoRef.current.value),
      })
    );
    alert.success("Item is added to your cart");
  };
  return (
    <Form onSubmit={addToCartSubmitHandler}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor={`Quantity${props.product._id}`}>
          Quantity
        </Form.Label>
        <Form.Select id={`Quantity${props.product._id}`} ref={quantityInfoRef}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Select>
      </Form.Group>
      <Button variant="dark" size="lg" type="submit">
        Add to Cart
      </Button>
    </Form>
  );
}

export default AddToCartForm;
