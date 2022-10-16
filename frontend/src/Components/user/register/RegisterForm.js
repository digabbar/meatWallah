import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import classes from "./RegisterForm.module.css";
import Heading from "../../UI/Heading";
import React, { useRef } from "react";
function RegisterForm(props) {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const registerSubmitHandler = (event) => {
    event.preventDefault();

    props.onRegister(
      nameInputRef.current.value,
      emailInputRef.current.value,
      passwordInputRef.current.value
    );
  };
  return (
    <div className={classes.registerForm}>
      <Heading name="Register" />
      <Form onSubmit={registerSubmitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            ref={nameInputRef}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Register
        </Button>
        <div className="mt-3">
          <span>Already have an account? </span>
          <Link to="/login">login</Link>
        </div>
      </Form>
    </div>
  );
}

export default RegisterForm;
