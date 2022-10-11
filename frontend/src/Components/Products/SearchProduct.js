import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./SearchProduct.module.css";
function SearchProduct() {
  let navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const searchHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  const inputChangeHandler = (event) => {
    setKeyword(event.target.value);
  };
  return (
    <div className={classes.searchContainer}>
      <Form onSubmit={searchHandler}>
        <Form.Control
          type="Text"
          onChange={inputChangeHandler}
          placeholder="Enter Product name"
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchProduct;
