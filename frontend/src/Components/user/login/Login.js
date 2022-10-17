import React, { Fragment, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, clearError } from "../../../Slice/userSlice";
import { useAlert } from "react-alert";
import Loader from "../../UI/Loader";
import MetaData from "../../layout/MetaData";
import LoginForm from "./LoginForm";
const Login = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );
  const loginHandler = (email, password) => {
    console.log(email);
    console.log(password);
    dispatch(login(email.trim(), password.trim()));
    alert.success("Login Successfully");
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
          <MetaData title="Login" />
          <LoginForm onLogin={loginHandler} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default Login;
