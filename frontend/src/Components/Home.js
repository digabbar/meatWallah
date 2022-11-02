import React, { Fragment, useEffect, useState } from "react";
import Heading from "./UI/Heading";
import AllProducts from "./products/AllProducts";
import { clearError, getProduct } from "./actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import PageChange from "./products/PageChange";
import Loader from "./UI/Loader";
import { useAlert } from "react-alert";
import { deleteProductAction } from "./slice/deleteProductSlice";
const Home = () => {
  const alert = useAlert();
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
  const {
    loading: deleteLoading,
    error: deleteError,
    success: deleteSuccess,
  } = useSelector((state) => state.deleteProduct);

  useEffect(() => {
    dispatch(getProduct(currentPage, keyword));
    if (deleteError) {
      alert.error(deleteError);
      clearError("deleteProduct");
    }
    if (deleteSuccess) {
      alert.success("product is deleted successfully");
      dispatch(deleteProductAction.delete_product_reset());
    }
  }, [
    dispatch,
    error,
    currentPage,
    keyword,
    deleteError,
    alert,
    deleteSuccess,
  ]);

  const setCurrentPageNo = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  let count = productsCount;
  if (keyword) {
    count = filteredProductsCount;
  }

  if (loading || deleteLoading) {
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
