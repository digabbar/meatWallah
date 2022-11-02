import React, { Fragment, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { allUsers, clearError } from "../actions/userActions";
import { useAlert } from "react-alert";
import Loader from "../UI/Loader";
const AllUser = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { users, error, loading } = useSelector((state) => state.allUser);
  console.log(users);

  useEffect(() => {
    dispatch(allUsers());
    if (error) {
      alert.error(error);
      dispatch(clearError("allUser"));
    }
  }, [dispatch, alert, error]);
  if (loading) {
    return <Loader />;
  }
  return (
    <Fragment>
      {users.map((user) => {
        return (
          <Card className="text-center mb-3 border-0 " key={user._id}>
            <Card.Header className="text-muted">{user._id}</Card.Header>
            <Card.Body>
              <Card.Title>{user.email}</Card.Title>
              <Card.Text className="text-muted">{user.createdAt}</Card.Text>
              <Button
                variant="primary"
                as={Link}
                to={`/admin/users/${user._id}`}
              >
                see_details
              </Button>
            </Card.Body>
          </Card>
        );
      })}
    </Fragment>
  );
};

export default AllUser;
