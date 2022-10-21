import React, { useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
function AddToCartForm(props) {
  const quantityInfoRef = useRef();
  const addToCartSubmitHandler = (event) => {
    event.preventDefault();
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
