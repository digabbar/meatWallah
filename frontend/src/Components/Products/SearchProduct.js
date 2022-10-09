import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import classes from "./SearchProduct.module.css";
function SearchProduct() {
  return (
    <div className={classes.searchContainer}>
      <Form>
        <Form.Control type="Text" placeholder="Search......." />
        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
    </div>
  );
}

export default SearchProduct;
