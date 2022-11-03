import React, { Fragment, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Heading from "../UI/Heading";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../actions/userActions";
import { useAlert } from "react-alert";
import Loader from "../UI/Loader";
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

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
    dispatch(
      login(
        emailInputRef.current.value.trim(),
        passwordInputRef.current.value.trim()
      )
    );
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Heading name="Login" />
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            ref={emailInputRef}
            required
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
            required
          />
        </Form.Group>
        <div className="text-end">
          <Button variant="link" size="lg" type="button">
            <Link to={`/password/forget`}>Forget Password</Link>
          </Button>
        </div>
        <Button variant="success" size="lg" type="submit" className="d-block">
          Login
        </Button>
        <div className="text-center">
          <Button variant="link" size="lg" type="button">
            <Link to={`/register`}>New User ?</Link>
          </Button>
        </div>
      </Form>
    </Fragment>
  );
};

export default Login;
