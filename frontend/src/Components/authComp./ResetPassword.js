import React, { useRef, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import { resetPassword, clearError } from "../actions/userActions";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
const ResetPassword = () => {
  const params = useParams();
  const navigate = useNavigate();
  const passwordInputRef = useRef();
  const confirmPasswordInputRef = useRef();

  console.log(params);

  const alert = useAlert();
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.forget);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError("forget"));
    }

    if (success) {
      alert.success("Password updated successfully");
      navigate("/login");
    }
  }, [dispatch, alert, error, success, navigate]);
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      resetPassword(params.token, {
        password: passwordInputRef.current.value.trim(),
        confirmPassword: confirmPasswordInputRef.current.value.trim(),
      })
    );
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Current Password"
          ref={passwordInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>Confirm Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter New Password"
          ref={confirmPasswordInputRef}
        />
      </Form.Group>
      <div className="text-end">
        <Button variant="primary" size="lg" type="submit" className="mx-3">
          Reset
        </Button>
      </div>
    </Form>
  );
};

export default ResetPassword;
