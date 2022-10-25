import React, { useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { useNavigate, Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile, loadUser, clearError } from "../actions/userActions";
import { useAlert } from "react-alert";
import { userAction } from "../slice/userSlice";

const UpdateProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const alert = useAlert();
  const nameInputRef = useRef();
  const emailInputRef = useRef();

  const { user } = useSelector((state) => state.auth);
  const { error, isUpdated } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      nameInputRef.current.value = user.name;
      emailInputRef.current.value = user.email;
    }

    if (error) {
      alert.error(error);
      dispatch(clearError("user"));
    }

    if (isUpdated) {
      alert.success("User updated successfully");
      dispatch(loadUser());

      navigate("/me");
      dispatch(userAction.update_profile_reset());
    }
  }, [dispatch, alert, error, navigate, isUpdated, user]);

  const submitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateProfile({
        name: nameInputRef.current.value.trim(),
        email: emailInputRef.current.value.trim(),
      })
    );
  };
  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" ref={nameInputRef} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter Email"
          ref={emailInputRef}
        />
      </Form.Group>
      <div className="text-end">
        <Button variant="danger" size="lg" type="button" as={Link} to="/me">
          cancel
        </Button>
        <Button variant="primary" size="lg" type="submit" className="mx-3">
          Update profile
        </Button>
      </div>
    </Form>
  );
};

export default UpdateProfile;
