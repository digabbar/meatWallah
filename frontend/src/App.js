import { Routes, Route } from "react-router-dom";
import Header from "./Components/layout/Header";
import Footer from "./Components/layout/Footer";
import Home from "./Components/Home";
import classes from "./App.module.css";
import ShowProduct from "./Components/Products/ShowProduct";
import { Fragment } from "react";
import Cart from "./Components/Cart/Cart";
import { useSelector } from "react-redux";

function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  return (
    <Fragment>
      {showCart && <Cart></Cart>}
      <div className={classes.App}>
        <Header />
        <main className={classes.main}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products/:id" element={<ShowProduct />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Fragment>
  );
}

export default App;
