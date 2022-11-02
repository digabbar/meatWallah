import React, { Fragment, useRef } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useSelector, useDispatch } from "react-redux";
import Alert from "react-bootstrap/Alert";
import { newReview } from "../../actions/productActions";
import { useParams } from "react-router-dom";
import { deleteReview } from "../../actions/productActions";
const ReviewContainer = (props) => {
  const ratingInputRef = useRef();
  const reviewInputRef = useRef();
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const params = useParams();

  if (!Object.keys(props.product).length) {
    return;
  }
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      newReview(props.product._id, {
        rating: +ratingInputRef.current.value.trim(),
        comment: reviewInputRef.current.value.trim(),
      })
    );
  };
  const deleteReviewHandler = (reviewId) => {
    dispatch(deleteReview(params.id, reviewId));
  };
  return (
    <Fragment>
      <Col>
        <div className="ReviewContainer">
          {isAuthenticated && <h1>Leave a Review</h1>}

          {isAuthenticated ? (
            <Form className="mb-5 " onSubmit={submitHandler}>
              <Form.Group className="mb-3" controlId="formBasicRange">
                <Form.Label>Rate :</Form.Label>
                <Form.Control
                  type="range"
                  min="0"
                  max="5"
                  step="1"
                  size="lg"
                  ref={ratingInputRef}
                  className="form-range border-0"
                />
              </Form.Group>

              <FloatingLabel controlId="floatingTextarea2" label="Review">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                  ref={reviewInputRef}
                />
              </FloatingLabel>
              <p></p>
              <p></p>
              <Button variant="success" type="submit">
                Submit
              </Button>
            </Form>
          ) : (
            <Alert variant="danger">
              Please Login to drop a Review{"  "}
              <Alert.Link href="/login">Login</Alert.Link>
            </Alert>
          )}

          <h1 className="mb-5">All Reviews</h1>
          <div className="allReview">
            {props.product &&
              props.product.reviews.map((review) => {
                return (
                  <Card className="p-2" key={review._id}>
                    <Card.Title>{review.name}</Card.Title>
                    <div>
                      <p
                        className="starability-result"
                        data-rating={review.rating}
                      >
                        Rated: {review.rating} stars
                      </p>
                    </div>
                    <Card.Body>{review.comment}</Card.Body>
                    {user && user.role === "admin" && (
                      <Button
                        variant="link"
                        size="lg"
                        onClick={() => deleteReviewHandler(review._id)}
                      >
                        delete Review
                      </Button>
                    )}
                  </Card>
                );
              })}
          </div>
        </div>
      </Col>
    </Fragment>
  );
};

export default ReviewContainer;
