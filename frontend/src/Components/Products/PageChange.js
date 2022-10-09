import React from "react";
import Pagination from "react-bootstrap/Pagination";
import classes from "./PageChange.module.css";
const PageChange = () => {
  return (
    <Pagination size="lg" className={classes.pagination}>
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Item>{2}</Pagination.Item>
      <Pagination.Item>{3}</Pagination.Item>
      <Pagination.Item>{4}</Pagination.Item>
      <Pagination.Item>{5}</Pagination.Item>
    </Pagination>
  );
};
export default PageChange;
