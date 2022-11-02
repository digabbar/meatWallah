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
import ListOrders from "./Components/order/ListOrders";
import OrderDetails from "./Components/order/OrderDetails";
import NewProduct from "./Components/adminComponents/NewProduct";
import UpdateProduct from "./Components/adminComponents/UpdateProduct";
import AllOrders from "./Components/adminComponents/AllOrders";
import AllUser from "./Components/adminComponents/AllUser";
import UserDetails from "./Components/adminComponents/UserDetails";

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

            <Route
              path="/orders/me"
              element={
                <ProtectedRoute isAdmin={false}>
                  <ListOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders/:id"
              element={
                <ProtectedRoute isAdmin={false}>
                  <OrderDetails />
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
            <Route
              path="/admin/product"
              element={
                <ProtectedRoute isAdmin={true}>
                  <NewProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/product/:id/update"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UpdateProduct />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/order"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AllOrders />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute isAdmin={true}>
                  <AllUser />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users/:id"
              element={
                <ProtectedRoute isAdmin={true}>
                  <UserDetails />
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
