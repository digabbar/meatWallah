import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
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
        placeholder="Search product..."
        className="me-2 w-75"
        aria-label="Search"
        ref={searchInputRef}
      />
    </Form>
  );
};

export default SearchForm;
