import React, { Fragment, useEffect, useState } from "react";
import MetaData from "./layout/MetaData";
import AllProducts from "./Products/AllProducts";
import { getProduct } from "../Slice/ProductSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Pagination from "react-js-pagination";
import Loader from "./UI/Loader";
import Heading from "./UI/Heading";

import { useParams } from "react-router-dom";
const Home = () => {
  const params = useParams();
  const keyword = params.keyword;
  const [currentPage, setCurrentPage] = useState(1);
  const {
    loading,
    error,
    productsCount,
    resPerPage,
    products,
    filteredProductsCount,
  } = useSelector((state) => state.product);
  const dispatch = useDispatch();
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
  return (
    <Fragment>
      {loading && <Loader />}
      {!loading && !error && (
        <div>
          <MetaData title="buy Best Product Online" />
          {products.length > 0 && keyword && <Heading name={keyword} />}
          {!keyword && <Heading name="Latest Products" />}
          <AllProducts />
          {resPerPage <= count && (
            <div className="d-flex justify-content-center mt-5">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resPerPage}
                totalItemsCount={count}
                onChange={setCurrentPageNo}
                nextPageText={">"}
                prevPageText={"<"}
                itemClass="page-item"
                linkClass="page-link"
              />
            </div>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default Home;
