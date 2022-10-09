import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";

function ShowProduct() {
  return (
    <Row xs={1} md={2} className="g-3">
      <Col>
        <Card>
          <Card.Img
            variant="top"
            src="https://i.pinimg.com/originals/69/af/7e/69af7e1e83d8fa1f5dcc7f16a8e93c19.png"
          />
          <Card.Body>
            <Card.Title>Mutton (500 gram)</Card.Title>
            <div className="">
              <p className="starability-result" data-rating="2">
                Rated: 2 stars
              </p>
            </div>
            <span>12 reviews</span>

            <p></p>
            <Card.Text>
              This is a longer card with supporting text below as a natural
              lead-in to additional content. This content is a little bit
              longer.Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              Libero error maxime minima aut, placeat sed blanditiis nobis non
              esse consequuntur a dolores fugit debitis eius ipsum aperiam,
              eveniet, vero commodi! Commodi fugit rerum laboriosam, provident,
              amet aliquid tempore autem maxime quos, iure laborum soluta rem
            </Card.Text>
            <h1>&#8377; 350</h1>
            <p></p>
            <Form>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="Quantity">Quantity</Form.Label>
                <Form.Select id="Quantity">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Select>
              </Form.Group>
              <Button variant="dark" size="lg" type="submit">
                Add to Cart
              </Button>
            </Form>
            <div className="mt-5">
              <Button variant="link" size="lg">
                Update Product
              </Button>
              <Button variant="link" size="lg">
                delete Product
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Col>
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
            <Card className="p-2">
              <Card.Title>Soham</Card.Title>
              <div>
                <p className="starability-result" data-rating="2">
                  Rated: 2 stars
                </p>
              </div>
              <Card.Body>This is some text within a card body.</Card.Body>
              <Button variant="link" size="lg">
                delete Review
              </Button>
            </Card>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export default ShowProduct;
