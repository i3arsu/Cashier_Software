import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";

export default function NavBar() {
  // TODO: remove redundancy
  const [show1, setShow1] = useState(false);
  const showDropdown1 = (e: any) => {
    setShow1(!show1);
  };
  const hideDropdown1 = (e: any) => {
    setShow1(false);
  };

  const [show2, setShow2] = useState(false);
  const showDropdown2 = (e: any) => {
    setShow2(!show2);
  };
  const hideDropdown2 = (e: any) => {
    setShow2(false);
  };

  const [show3, setShow3] = useState(false);
  const showDropdown3 = (e: any) => {
    setShow3(!show3);
  };
  const hideDropdown3 = (e: any) => {
    setShow3(false);
  };

  return (
    <div>
      <Navbar bg="light">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Cashier App</Navbar.Brand>
          </LinkContainer>
          <Nav className="me-auto">
            <NavDropdown
              title="Register"
              id="collasible-nav-dropdown"
              show={show1}
              onMouseEnter={showDropdown1}
              onMouseLeave={hideDropdown1}
            >
              <LinkContainer to="/register">
                <NavDropdown.Item>Personal Register</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item>Receipts</NavDropdown.Item>
              <NavDropdown.Item>Stock</NavDropdown.Item>
              <NavDropdown.Item>Order New Stock</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Managment"
              id="collasible-nav-dropdown"
              show={show2}
              onMouseEnter={showDropdown2}
              onMouseLeave={hideDropdown2}
            >
              <LinkContainer to="/stats">
                <NavDropdown.Item>Stats</NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item>Add User</NavDropdown.Item>
              <NavDropdown.Item>Manage User</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title="Username"
              id="collasible-nav-dropdown"
              show={show3}
              onMouseEnter={showDropdown3}
              onMouseLeave={hideDropdown3}
            >
              <NavDropdown.Item>Settings</NavDropdown.Item>
              <LinkContainer to="/login">
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
}
