import React, { Fragment, useEffect } from "react";
import MetaData from "./layout/MetaData";
import AllProducts from "./Products/AllProducts";
import { getProduct } from "../Slice/ProductSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Loader from "./UI/Loader";
const Home = () => {
  const { loading, error } = useSelector((state) => state.product);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProduct());
  }, [dispatch, error]);

  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && !error && (
        <div>
          <MetaData title="buy Best Product Online" />
          <AllProducts />
        </div>
      )}
    </Fragment>
  );
};

export default Home;
