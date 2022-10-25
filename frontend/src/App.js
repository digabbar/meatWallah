import React, { useEffect, Fragment } from "react";
import classes from "./App.module.css";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/layout/header/Header";
import Footer from "./Components/layout/footer/Footer";
import Home from "./Components/Home";
import ProductDetail from "./Components/products/ProductDetails/ProductDetail";
import Login from "./Components/authComp./Login";
import Register from "./Components/authComp./Register";
import { loadUser } from "./Components/actions/userActions";
import { useDispatch } from "react-redux";
import Profile from "./Components/profile/Profile";
import UpdateProfile from "./Components/profile/UpdateProfile";
import ProtectedRoute from "./Components/route/ProtectedRoute";
import UpdatePassword from "./Components/profile/UpdatePassword";
import ForgetPassword from "./Components/authComp./ForgetPassword";
import ResetPassword from "./Components/authComp./ResetPassword";
import Cart from "./Components/cart/Cart";
import Shipping from "./Components/checkout/shipping/Shipping";
import ConfirmOrder from "./Components/checkout/confirmOrder/ConfirmOrder";
import OrderCreateSuccess from "./Components/checkout/OrderCreateSuccess";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);
  return (
    <Fragment>
      <div className={classes.App}>
        <Header />
        <main className={classes.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route
              path="/shipping"
              element={
                <ProtectedRoute isAdmin={false}>
                  <Shipping />
                </ProtectedRoute>
              }
            />
            <Route
              path="/confirm"
              element={
                <ProtectedRoute isAdmin={false}>
                  <ConfirmOrder />
                </ProtectedRoute>
              }
            />
            <Route
              path="/success"
              element={
                <ProtectedRoute isAdmin={false}>
                  <OrderCreateSuccess />
                </ProtectedRoute>
              }
            />

            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/password/forget" element={<ForgetPassword />} />
            <Route path="/password/reset/:token" element={<ResetPassword />} />
            <Route
              path="/me"
              element={
                <ProtectedRoute isAdmin={false}>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/me/update"
              element={
                <ProtectedRoute isAdmin={false}>
                  <UpdateProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/password/update"
              element={
                <ProtectedRoute isAdmin={false}>
                  <UpdatePassword />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
