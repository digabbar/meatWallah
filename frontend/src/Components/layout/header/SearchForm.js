import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
const SearchForm = () => {
  const navigate = useNavigate();
  const searchInputRef = useRef();
  const submitHandler = (event) => {
    event.preventDefault();
    const keyword = searchInputRef.current.value.trim();
    if (keyword) {
      navigate(`/search/${keyword}`);
    } else {
      navigate("/");
    }
  };
  return (
    <Form className="d-flex mx-5" onSubmit={submitHandler}>
      <Form.Control
        type="search"
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        ref={searchInputRef}
      />
      <Button variant="outline-success" type="submit">
        Search
      </Button>
    </Form>
  );
};

export default SearchForm;
