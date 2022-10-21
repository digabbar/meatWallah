import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword, loadUser, clearError } from "../actions/userActions";
import { Link } from "react-router-dom";
import { userAction } from "../slice/userSlice";
const UpdatePassword = () => {
  const currentPasswordInputRef = useRef();
  const newPasswordInputRef = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const { error, isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearError("user"));
    }
    if (isUpdated) {
      alert.success("password update successfully");
      dispatch(loadUser());
      navigate("/me");
      dispatch(userAction.update_password_reset());
    }
  }, [dispatch, alert, error, navigate, isUpdated]);
  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updatePassword({
        oldpassword: currentPasswordInputRef.current.value.trim(),
        password: newPasswordInputRef.current.value.trim(),
      })
    );
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Current Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter Current Password"
          ref={currentPasswordInputRef}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword1">
        <Form.Label>New Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Enter New Password"
          ref={newPasswordInputRef}
        />
      </Form.Group>
      <div className="text-end">
        <Button variant="danger" size="lg" type="button" as={Link} to="/me">
          cancel
        </Button>
        <Button variant="primary" size="lg" type="submit" className="mx-3">
          Update password
        </Button>
      </div>
    </Form>
  );
};

export default UpdatePassword;
