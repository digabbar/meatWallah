import React, { Fragment } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import PageChange from "../Products/PageChange";
import Heading from "../UI/Heading";
import SearchProduct from "../Products/SearchProduct";
import AddToCartForm from "./AddToCartForm";
function AllProducts() {
  const products = useSelector((state) => state.product.products);
  console.log(products);

  return (
    <Fragment>
      <SearchProduct />
      <Heading name="Latest Products" />
      <Row xs={1} md={2} lg={3} className="g-4">
        {products &&
          products.map((product) => (
            <Col key={product._id}>
              <Card>
                <Card.Img variant="top" src={product.images[0].url} />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <div className="">
                    <p
                      className="starability-result"
                      data-rating={product.ratings}
                    >
                      Rated: {product.ratings} stars
                    </p>
                  </div>
                  <span>{product.numOfReviews} reviews</span>

                  <p></p>
                  <h1>&#8377; {product.price}</h1>
                  <p></p>
                  <AddToCartForm product={product} />
                  <Button variant="link" size="lg" type="button">
                    <Link to={`/products/${product._id}`}>View Details</Link>
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
      </Row>
      <PageChange />
    </Fragment>
  );
}

export default AllProducts;
