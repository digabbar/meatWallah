import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useSelector } from "react-redux";

function ReviewContainer(props) {
  const product = useSelector((state) => state.productDetail.products);
  if (!Object.keys(product).length) {
    console.log("jha");
    return;
  }
  return (
    <Col>
      <div className="ReviewContainer">
        <h1>Leave a Review</h1>
        <p></p>
        <p></p>
        <Form className="mb-5">
          <fieldset className="starability-heartbeat">
            <input
              type="radio"
              id="no-rate"
              className="input-no-rate"
              name="review[rating]"
              value="1"
              checked
              aria-label="No rating."
            />
            <input
              type="radio"
              id="first-rate1"
              name="review[rating]"
              value="1"
            />
            <label htmlFor="first-rate1" title="Terrible">
              1 star
            </label>
            <input
              type="radio"
              id="first-rate2"
              name="review[rating]"
              value="2"
            />
            <label htmlFor="first-rate2" title="Not good">
              2 stars
            </label>
            <input
              type="radio"
              id="first-rate3"
              name="review[rating]"
              value="3"
            />
            <label htmlFor="first-rate3" title="Average">
              3 stars
            </label>
            <input
              type="radio"
              id="first-rate4"
              name="review[rating]"
              value="4"
            />
            <label htmlFor="first-rate4" title="Very good">
              4 stars
            </label>
            <input
              type="radio"
              id="first-rate5"
              name="review[rating]"
              value="5"
            />
            <label htmlFor="first-rate5" title="Amazing">
              5 stars
            </label>
          </fieldset>

          <FloatingLabel controlId="floatingTextarea2" label="Review">
            <Form.Control
              as="textarea"
              placeholder="Leave a comment here"
              style={{ height: "100px" }}
            />
          </FloatingLabel>
          <p></p>
          <p></p>
          <Button variant="success" type="submit">
            Submit
          </Button>
        </Form>

        <h1>All Reviews</h1>
        <div className="allReview">
          {product &&
            product.reviews.map((review) => {
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
                  <Button variant="link" size="lg">
                    delete Review
                  </Button>
                </Card>
              );
            })}
        </div>
      </div>
    </Col>
  );
}

export default ReviewContainer;
