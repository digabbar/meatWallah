import React, { Fragment, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { register, clearError } from "../actions/userActions";
import { useAlert } from "react-alert";
import Loader from "../UI/Loader";
import Heading from "../UI/Heading";
const Register = () => {
  const nameInputRef = useRef();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearError("auth"));
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  const submitHandler = (event) => {
    event.preventDefault();
    const name = nameInputRef.current.value.trim();
    const email = emailInputRef.current.value.trim();
    const password = passwordInputRef.current.value.trim();
    dispatch(register({ name, email, password }));
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Heading name="register" />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            ref={nameInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            ref={passwordInputRef}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Register
        </Button>
        <div className="text-center">
          <Button variant="link" size="lg" type="button">
            <Link to={`/login`}>Already have an Account ?</Link>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Register;
