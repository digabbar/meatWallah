import React from "react";
import classes from "./NavBar.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { toggleCart } from "../../Slice/uiSlice";
function NavBar() {
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const toggleCartHandler = () => {
    dispatch(toggleCart());
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
            <Nav.Link href="#features">Products</Nav.Link>

            <NavDropdown title="User" id="collasible-nav-dropdown">
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
            <Nav.Link href="#deets">Login</Nav.Link>
            <Nav.Link eventKey={2} href="#memes">
              Register
            </Nav.Link>
            <Nav.Link eventKey={3} href="#memes">
              Logout
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
