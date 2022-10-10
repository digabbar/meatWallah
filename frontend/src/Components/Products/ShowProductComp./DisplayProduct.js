import React from "react";
import AddToCartForm from "../AddToCartForm";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
function DisplayProduct(props) {
  const product = useSelector((state) => state.productDetail.products);
  if (!Object.keys(product).length) {
    console.log("soham");
    return;
  }
  return (
    <Col>
      <Card>
        <Card.Img variant="top" src={product.images[0].url} />
        <Card.Body>
          <Card.Title>{product.name}</Card.Title>
          <div className="">
            <p className="starability-result" data-rating={product.ratings}>
              Rated: {product.ratings} stars
            </p>
          </div>
          <span>{product.numOfReviews} reviews</span>

          <p></p>
          <Card.Text>{product.description}</Card.Text>
          <h1>&#8377; {product.price}</h1>
          <p></p>
          <AddToCartForm product={product} />

          <div className="mt-5">
            <Button variant="link" size="lg">
              Update Product
            </Button>
            <Button variant="link" size="lg">
              delete Product
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default DisplayProduct;
