import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./SearchProduct.module.css";
function SearchProduct() {
  let navigate = useNavigate();
  const searchInputRef = useRef();
  const searchHandler = (event) => {
    event.preventDefault();
    const keyword = searchInputRef.current.value.trim();
    if (keyword) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className={classes.searchContainer}>
      <Form onSubmit={searchHandler}>
        <Form.Control
          type="Text"
          ref={searchInputRef}
          placeholder="What are you looking for"
        />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchProduct;
