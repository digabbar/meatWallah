import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useParams, useNavigate } from "react-router-dom";
import {
  getProductDetails,
  updateProduct,
  clearError,
} from "../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { updateProductAction } from "../slice/updateProductSlice";
import { useAlert } from "react-alert";
import Loader from "../UI/Loader";
const UpdateProduct = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const alert = useAlert();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [seller, setSeller] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");

  const { loading, error, success } = useSelector(
    (state) => state.updateProduct
  );
  const {
    loading: productLoading,
    product,
    error: productError,
  } = useSelector((state) => state.productDetail);

  useEffect(() => {
    if (product && product._id !== params.id) {
      dispatch(getProductDetails(params.id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category);
      setSeller(product.seller);
      setStock(product.stock);
    }

    if (productError) {
      alert.error(error);
      dispatch(clearError("productDetail"));
    }
    if (error) {
      alert.error(error);
      dispatch(clearError("updateProduct"));
    }

    if (success) {
      alert.success("Product updated successfully");
      dispatch(updateProductAction.update_product_reset());
      navigate("/");
    }
  }, [
    dispatch,
    alert,
    error,
    success,
    navigate,
    params.id,
    product,
    productError,
  ]);

  const nameChangeHandler = (event) => {
    setName(event.target.value);
  };
  const priceChangeHandler = (event) => {
    setPrice(event.target.value);
  };
  const descriptionChangeHandler = (event) => {
    setDescription(event.target.value);
  };
  const sellerChangeHandler = (event) => {
    setSeller(event.target.value);
  };
  const stockChangeHandler = (event) => {
    setStock(event.target.value);
  };
  const categoryChangeHandler = (event) => {
    setCategory(event.target.value);
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

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("price", price);
    formData.set("description", description);
    formData.set("category", category);
    formData.set("stock", stock);
    formData.set("seller", seller);

    images.forEach((image) => {
      formData.append("images", image);
    });

    dispatch(updateProduct(params.id, formData));
  };
  if (loading || productLoading) {
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
          onChange={nameChangeHandler}
          value={name}
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
          onChange={priceChangeHandler}
          value={price}
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
          onChange={descriptionChangeHandler}
          value={description}
        />
      </FloatingLabel>
      <div>
        <Form.Group className="mb-3" controlId="formBasicimage">
          <Form.Label>Choose Images</Form.Label>
          <Form.Control
            type="file"
            placeholder="Select Image"
            onChange={imageChangeHandler}
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
          onChange={sellerChangeHandler}
          value={seller}
        />
      </FloatingLabel>
      <FloatingLabel controlId="floatingStock" label="Stock" className="mb-3">
        <Form.Control
          type="number"
          placeholder="Enter Product Stock"
          onChange={stockChangeHandler}
          value={stock}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId="floatingcategory"
        label="Category"
        className="mb-3"
      >
        <Form.Select
          aria-label="Default select example"
          onChange={categoryChangeHandler}
          value={category}
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

export default UpdateProduct;
