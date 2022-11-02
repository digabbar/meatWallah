import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import classes from "./EachProduct.module.css";
import AddToCartForm from "./AddToCartForm";
import { useDispatch } from "react-redux";
import { deleteProduct } from "../actions/productActions";
import { useSelector } from "react-redux";
function EachProduct(props) {
  const dispatch = useDispatch();
  const deleteProductHandler = () => {
    dispatch(deleteProduct(props.product._id));
  };
  const { user } = useSelector((state) => state.auth);
  return (
    <Card>
      <Card.Img variant="top" src={props.product.images[0].url} />
      <Card.Body>
        <Card.Title>{props.product.name}</Card.Title>
        <Card.Text>{props.product.description}</Card.Text>
        <div className="">
          <p className="starability-result" data-rating={props.product.ratings}>
            Rated: {props.product.ratings} stars
          </p>
        </div>
        <span>{props.product.numOfReviews} reviews</span>
        <p></p>
        <p></p>
        <p className={classes.stock}>
          Status:{" "}
          <span
            className={`${
              props.product.stock > 0 ? "text-success" : "text-danger"
            }`}
          >
            {props.product.stock > 0 ? "In Stock" : "Out of Stock"}
          </span>
        </p>

        <h1>&#8377; {props.product.price}</h1>
        <p></p>
        <AddToCartForm product={props.product} />
        <Button variant="link" size="lg" type="button">
          <Link to={`/products/${props.product._id}`}>View Details</Link>
        </Button>
        {user && user.role === "admin" && (
          <div className="border">
            <Button variant="link" type="button" onClick={deleteProductHandler}>
              Delete Product
            </Button>
            <Button
              variant="link"
              type="button"
              as={Link}
              to={`/admin/product/${props.product._id}/update`}
            >
              Update Product
            </Button>
          </div>
        )}
      </Card.Body>
    </Card>
  );
}

export default EachProduct;
