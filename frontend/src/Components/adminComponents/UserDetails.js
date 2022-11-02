import React, { useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { deleteUser, userDetail, clearError } from "../actions/userActions";
import Loader from "../UI/Loader";
import { useSelector, useDispatch } from "react-redux";
import classes from "./UserDetails.module.css";
import { updateUser } from "../actions/userActions";
import { updateUserAction } from "../slice/updateUserSlice";
import { deleteUserAction } from "../slice/deleteUserSlice";
const UserDetails = () => {
  const navigate = useNavigate();
  const roleInputRef = useRef();
  const dispatch = useDispatch();
  const alert = useAlert();
  const params = useParams();
  const { user, loading, error } = useSelector((state) => state.userDetail);
  const {
    success,
    loading: updateLoading,
    error: updateError,
  } = useSelector((state) => state.updateUser);
  const {
    success: deleteUserSuccess,
    loading: deleteUserLoading,
    error: deleteUserError,
  } = useSelector((state) => state.deleteUser);
  useEffect(() => {
    dispatch(userDetail(params.id));
    if (deleteUserSuccess) {
      alert.success("user deleted Successfully");
      dispatch(deleteUserAction.delete_user_reset());
      navigate("/");
    }
    if (deleteUserError) {
      alert.error(deleteUserError);
      dispatch(clearError("deleteUser"));
    }
    if (success) {
      alert.success("user Updated Successfully");
      dispatch(updateUserAction.update_user_reset());
      navigate("/");
    }
    if (updateError) {
      alert.error(updateError);
      dispatch(clearError("updateUser"));
    }
    if (error) {
      alert.error(error);
      dispatch(clearError("userDetail"));
    }
  }, [
    dispatch,
    alert,
    error,
    params.id,
    success,
    updateError,
    navigate,
    deleteUserError,
    deleteUserSuccess,
  ]);
  if (loading || updateLoading || deleteUserLoading) {
    return <Loader />;
  }
  if (!Object.keys(user).length) {
    return;
  }
  const roleSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(
      updateUser(user._id, {
        role: roleInputRef.current.value,
      })
    );
  };
  const deleteUserHandler = () => {
    dispatch(deleteUser(params.id));
  };
  return (
    <Card className="text-center">
      <Card.Header className="text-muted">{user._id}</Card.Header>
      <Card.Body>
        <Card.Title>{user.email}</Card.Title>
        <Card.Text>
          {user.name.toUpperCase()} (<b>{user.role.toUpperCase()}</b>)
        </Card.Text>
        <div className={classes.userAction}>
          <form onSubmit={roleSubmitHandler}>
            <div>
              <Form.Select
                aria-label="Default select example"
                ref={roleInputRef}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Select>
            </div>
            <div>
              <Button variant="secondary" className="mx-2" type="submit">
                Update User
              </Button>
            </div>
          </form>
          <div className="text-start">
            <Button variant="warning" onClick={deleteUserHandler}>
              Delete User
            </Button>
          </div>
        </div>
      </Card.Body>

      <Card.Footer className="text-muted">
        {user.createdAt.toString().substring(0, 10)}
      </Card.Footer>
    </Card>
  );
};

export default UserDetails;
