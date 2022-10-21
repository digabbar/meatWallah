import React from "react";
import EachProduct from "./EachProduct";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useSelector } from "react-redux";
const AllProducts = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {products &&
        products.map((product) => (
          <Col key={product._id}>
            <EachProduct product={product} />
          </Col>
        ))}
    </Row>
  );
};

export default AllProducts;
