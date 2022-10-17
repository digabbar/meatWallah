import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSelector } from "react-redux";
import MetaData from "../../layout/MetaData";
import Loader from "../../UI/Loader";
import Heading from "../../UI/Heading";
const Profile = () => {
  const { user, loading } = useSelector((state) => state.auth);
  console.log(user);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="your profile" />
          <Heading name="my profile" />
          <Card>
            <Card.Header as="h5">{`Name :- ${user.name}`}</Card.Header>
            <Card.Body>
              <Card.Title>{`Email :- ${user.email}`}</Card.Title>
              <Card.Text>{`Joining Date :- ${user.createdAt}`}</Card.Text>
              <Button variant="primary" className="mx-3 ">
                Update Profile
              </Button>
              <Button variant="primary" className="mx-3 ">
                Reset Password
              </Button>
            </Card.Body>
          </Card>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Profile;
