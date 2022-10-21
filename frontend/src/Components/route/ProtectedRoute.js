import { useNavigate } from "react-router-dom";
import { React, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadUser } from "../actions/userActions";
import Loader from "../UI/Loader";
const ProtectedRoute = ({ children, isAdmin }) => {
  const navigate = useNavigate();
  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user) {
      dispatch(loadUser());
    }
  }, [dispatch, user, isAuthenticated, loading]);
  if (loading) return <Loader />;
  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return navigate("/");
    }
    return children;
  } else {
    return navigate("/login");
  }
};
export default ProtectedRoute;
