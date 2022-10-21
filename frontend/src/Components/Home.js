import React, { Fragment, useEffect, useState } from "react";
import Heading from "./UI/Heading";
import AllProducts from "./products/AllProducts";
import { getProduct } from "./actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageChange from "./products/PageChange";
import Loader from "./UI/Loader";
const Home = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    products,
    loading,
    error,
    productsCount,
    resPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProduct(currentPage, keyword));
  }, [dispatch, error, currentPage, keyword]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <Fragment>
      {products.length > 0 && <Heading name="Latest products" />}
      <AllProducts />

      {resPerPage <= count && (
        <PageChange
          currentPage={currentPage}
          resPerPage={resPerPage}
          count={count}
          onCurrentPage={setCurrentPageNo}
        />
      )}
    </Fragment>
  );
};

export default Home;
