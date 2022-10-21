import React, { Fragment, useEffect } from "react";
import Row from "react-bootstrap/Row";
import DisplayProduct from "./DisplayProduct";
import ReviewContainer from "./ReviewContainer";
import { getProductDetails } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../../UI/Loader";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id]);
  const { product, loading } = useSelector((state) => state.productDetail);
  if (loading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Row xs={1} md={2} className="g-4">
        <DisplayProduct product={product} />
        <ReviewContainer product={product} />
      </Row>
    </Fragment>
  );
};

export default ProductDetail;
