import React, { useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgetPassword, clearError } from "../actions/userActions";
const ForgetPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const emailInputRef = useRef();
  const { error, loading, message } = useSelector((state) => state.forget);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError("forget"));
    }

    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message]);
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      forgetPassword({
        email: emailInputRef.current.value.trim(),
      })
    );
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          ref={emailInputRef}
        />
      </Form.Group>
      <div className="text-end">
        <Button
          variant="primary"
          type="submit"
          disabled={loading ? true : false}
        >
          Forget
        </Button>
      </div>
    </Form>
  );
};

export default ForgetPassword;
