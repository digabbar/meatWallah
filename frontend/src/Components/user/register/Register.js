import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register, clearError } from "../../../Slice/userSlice";
import { useAlert } from "react-alert";
import Loader from "../../UI/Loader";
import MetaData from "../../layout/MetaData";

import RegisterForm from "./RegisterForm";

const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  console.log(isAuthenticated);

  const registerHandler = (name, email, password) => {
    console.log(name);
    console.log(email);
    console.log(password);

    dispatch(
      register({
        name: name.trim(),
        email: email.trim(),
        password: password.trim(),
      })
    );
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }

    if (error) {
      alert.error(error);
      dispatch(clearError());
    }
  }, [dispatch, alert, isAuthenticated, error, navigate]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Register" />
          <RegisterForm onRegister={registerHandler} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Register;
