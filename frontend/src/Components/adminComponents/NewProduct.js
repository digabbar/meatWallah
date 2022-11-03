import React, { useRef, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { newProduct, clearError } from "../actions/productActions";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";
import { newProductAction } from "../slice/createNewProductSlice";
import { useNavigate } from "react-router-dom";
import Loader from "../UI/Loader";
const NewProduct = () => {
  const nameInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  const categoryInputRef = useRef();
  const stockInputRef = useRef();
  const sellerInputRef = useRef();
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const alert = useAlert();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, success } = useSelector((state) => state.newProduct);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError("newProduct"));
    }

    if (success) {
      alert.success("Product created successfully");
      dispatch(newProductAction.new_product_reset());
      navigate("/");
    }
  }, [dispatch, alert, error, success, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("name", nameInputRef.current.value);
    formData.set("price", priceInputRef.current.value);
    formData.set("description", descriptionInputRef.current.value);
    formData.set("category", categoryInputRef.current.value);
    formData.set("stock", stockInputRef.current.value);
    formData.set("seller", sellerInputRef.current.value);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(newProduct(formData));
  };
  const imageChangeHandler = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImages((oldArray) => [...oldArray, reader.result]);
          setImagesPreview((oldArray) => [...oldArray, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  if (loading) {
    return <Loader />;
  }

  return (
    <Form onSubmit={submitHandler}>
      <FloatingLabel
        controlId="floatingName"
        label="Product Name"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Product Name"
          ref={nameInputRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingPrice"
        label="Product Price"
        className="mb-3"
      >
        <Form.Control
          type="number"
          placeholder="Enter Product Price"
          ref={priceInputRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingDescription"
        label="Product Description"
        className="mb-3"
      >
        <Form.Control
          type="text"
          placeholder="Enter Description"
          ref={descriptionInputRef}
          required
        />
      </FloatingLabel>
      <div>
        <Form.Group className="mb-3" controlId="formBasicimage">
          <Form.Label>Choose Images</Form.Label>
          <Form.Control
            type="file"
            placeholder="Select Image"
            onChange={imageChangeHandler}
            required
          />
        </Form.Group>
        {imagesPreview.map((img) => (
          <img
            src={img}
            key={img}
            alt="Images Preview"
            className="mt-2 mr-2 mb-2"
            width="55"
            height="52"
          />
        ))}
      </div>

      <FloatingLabel controlId="floatingSeller" label="Seller" className="mb-3">
        <Form.Control
          type="text"
          placeholder="Enter Product Seller"
          ref={sellerInputRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingStock" label="Stock" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Product Stock"
          ref={stockInputRef}
          required
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingcategory"
        label="Category"
        className="mb-3"
      >
        <Form.Select
          aria-label="Default select example"
          ref={categoryInputRef}
          required
        >
          <option>Please Select</option>
          <option value="Chicken">Chickens</option>
          <option value="Mutton">Mutton</option>
          <option value="Egg">Egg</option>
          <option value="Fish">Fish</option>
        </Form.Select>
      </FloatingLabel>
      <div className="text-end">
        <Button variant="success" type="submit" className="mt-5">
          Add Product
        </Button>
      </div>
    </Form>
  );
};

export default NewProduct;
