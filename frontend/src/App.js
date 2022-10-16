import { Fragment, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import Home from "./Components/Home";
import classes from "./App.module.css";
import ShowProduct from "./Components/Products/ShowProduct";
import Cart from "./Components/Cart/Cart";
import { useSelector, useDispatch } from "react-redux";
import SearchProduct from "./Components/Products/SearchProduct";
import Login from "./Components/user/login/Login";
import Register from "./Components/user/register/Register";
import { loadUser } from "./Slice/userSlice";

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  console.log("App is running");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

  return (
    <Fragment>
      {showCart && <Cart></Cart>}
      <div className={classes.App}>
        <Header />
        <SearchProduct />
        <main className={classes.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/search/:keyword" element={<Home />} />
            <Route path="/products/:id" element={<ShowProduct />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
