import React, { Fragment } from "react";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Heading from "../UI/Heading";
import Loader from "../UI/Loader";
import classes from "./Profile.module.css";
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  if (loading) {
    return <Loader />;
  }
  return (
    <Fragment>
      <Heading name="My Profile" />
      <Card className="text-center border-0 ">
        <Card.Body>
          <Card.Text className={classes.name}>{user.name}</Card.Text>
          <Card.Text className={classes.email}>{user.email}</Card.Text>
          <span
            className={`${classes.verified} ${
              user.isVerified ? "text-success" : "text-danger"
            }`}
          >
            {user.isVerified ? "verified" : "not verified"}
          </span>
          <div className="text-end mt-5">
            <ButtonGroup className="mb-2">
              <Button
                variant="danger"
                as={Link}
                to="/password/update"
                className="mx-3"
              >
                Change Password
              </Button>
              <Button variant="primary" as={Link} to="/me/update">
                Update profile
              </Button>
              <Button variant="success" className="mx-3">
                Verify email
              </Button>
            </ButtonGroup>
          </div>
        </Card.Body>
        <Card.Footer className={`text-muted ${classes.doj}`}>
          {String(user.createdAt).substring(0, 10)}
        </Card.Footer>
      </Card>
    </Fragment>
  );
};

export default Profile;
