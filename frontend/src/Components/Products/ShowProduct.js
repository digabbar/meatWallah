import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetails } from "../../Slice/ProductDetailsSlice";
import { useParams } from "react-router-dom";
import Loader from "../UI/Loader";
import { Fragment, useEffect } from "react";
import DisplayProduct from "./ShowProductComp./DisplayProduct";
import ReviewContainer from "./ShowProductComp./ReviewContainer";

function ShowProduct() {
  const params = useParams();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector(
    (state) => state.productDetail
  );
  useEffect(() => {
    dispatch(getProductDetails(params.id));
  }, [dispatch, params.id, error]);
  console.log(products);
  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && !error && (
        <Row xs={1} md={2} className="g-3">
          <DisplayProduct />
          <ReviewContainer />
        </Row>
      )}
    </Fragment>
  );
}

export default ShowProduct;
