import React from "react";
import classes from "./NavBar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../Slice/uiSlice";
import { logout } from "../../Slice/userSlice";
import { useAlert } from "react-alert";
function NavBar() {
  const alert = useAlert();
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  console.log(isAuthenticated);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(toggleCart());
  };
  const logoutHandler = () => {
    console.log("logout ");
    dispatch(logout());
    alert.success("logout Successfully");
  };
  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg="dark"
      variant="dark"
      className={classes.navBar}
    >
      <Container>
        <Navbar.Brand href="#home">meatWallah</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse
          id="responsive-navbar-nav"
          className={classes.navCollapse}
        >
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Products
            </Nav.Link>

            <NavDropdown
              title={user ? user.name : "User"}
              id="collasible-nav-dropdown"
            >
              <NavDropdown.Item href="#action/3.1">profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">myorder</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Admin" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">
                Create new Product
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">All Users</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">All Orders</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>
            <Nav.Link onClick={toggleCartHandler}>
              Cart <span>({totalQuantity})</span>
            </Nav.Link>
            {!isAuthenticated && (
              <Nav.Link eventKey={1} as={Link} to="/login">
                Login
              </Nav.Link>
            )}

            {isAuthenticated && (
              <Nav.Link eventKey={1} as={Link} onClick={logoutHandler}>
                Logout
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
