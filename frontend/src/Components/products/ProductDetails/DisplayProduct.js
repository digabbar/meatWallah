import React, { Fragment } from "react";

import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import AddToCartForm from "../AddToCartForm";
const DisplayProduct = (props) => {
  if (!Object.keys(props.product).length) {
    return;
  }

  return (
    <Fragment>
      <Col>
        <Card>
          <Card.Img variant="top" src={props.product.images[0].url} />
          <Card.Body>
            <Card.Title>{props.product.name}</Card.Title>
            <div className="">
              <p
                className="starability-result"
                data-rating={props.product.ratings}
              >
                Rated: {props.product.ratings} stars
              </p>
            </div>
            <span>{props.product.numOfReviews} reviews</span>

            <p></p>
            <Card.Text>{props.product.description}</Card.Text>
            <h1>&#8377; {props.product.price}</h1>
            <p></p>
            <AddToCartForm product={props.product} />
          </Card.Body>
        </Card>
      </Col>
    </Fragment>
  );
};

export default DisplayProduct;
