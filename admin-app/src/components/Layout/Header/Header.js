import React from "react";
import {
  Navbar,
  Nav
} from "react-bootstrap";
import { NavLink, Link } from "react-router-dom";

const Header = (props) => {
  return (
    <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
      <Link to="/" className="navbar-brand">Ymon - admin</Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
        </Nav>
        <Nav>
          <li className="nav-item">
            <NavLink to="signin" className="nav-link">SignIn</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="signup" className="nav-link">SignUp</NavLink>
          </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
