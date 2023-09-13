import { Navbar, Offcanvas, Nav, Container, Image } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";

import { useAppSelector } from "../../hooks/useAppStore";

const Header = () => {
  const auth = useAppSelector((state) => state.auth);

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <Image src="https://via.placeholder.com/25" roundedCircle />

            <span className="ms-2">React Firebase Auth</span>
          </Navbar.Brand>

          <Navbar.Offcanvas>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav className="justify-content-start flex-grow-1">
                <Nav.Link as={NavLink} to="/">
                  Home
                </Nav.Link>
                {auth.user ? (
                  <>
                    <Nav.Link as={NavLink} to="/dashboard">
                      Dashboard
                    </Nav.Link>
                  </>
                ) : null}
              </Nav>

              <Nav className="justify-content-end flex-grow-1">
                {auth.user ? (
                  <>
                    <Nav.Link as={NavLink} to="/profile">
                      Profile
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/sign-out">
                      Sign Out
                    </Nav.Link>
                  </>
                ) : (
                  <>
                    <Nav.Link as={NavLink} to="/sign-in">
                      Sign In
                    </Nav.Link>
                    <Nav.Link as={NavLink} to="/sign-up">
                      Sign Up
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
