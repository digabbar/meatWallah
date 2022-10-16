import React, { useRef } from "react";
import { Link } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Heading from "../../UI/Heading";
import classes from "./LoginForm.module.css";
function LoginForm(props) {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const formSubmitHandler = (event) => {
    event.preventDefault();

    props.onLogin(emailInputRef.current.value, passwordInputRef.current.value);
  };
  return (
    <div className={classes.loginForm}>
      <Heading name="Login" />
      <Form onSubmit={formSubmitHandler}>
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
        <Link to="/password/forget" className="mb-4 d-block">
          Forget Password ?
        </Link>

        <Button variant="primary" type="submit">
          Login
        </Button>

        <Link to="/register" className="mt-3 d-block ">
          New User ?
        </Link>
      </Form>
    </div>
  );
}

export default LoginForm;
