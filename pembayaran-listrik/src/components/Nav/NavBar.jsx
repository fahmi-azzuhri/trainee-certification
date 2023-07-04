import React from "react";
import { Button, Container, Form, Nav, Navbar } from "react-bootstrap";
import { BiLogIn } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, NavLink } from "react-router-dom"; // Import Link and NavLink components for navigation
import { Search } from "react-flaticons";
import { logout } from "../../redux/actions/auth";
import logo from "../../images/logo.png";

const NavBar = ({ setActivePage }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const handleSetActivePage = (page) => {
    setActivePage(page);
  };

  return (
    <Navbar bg="white" expand="lg md ">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="" height={70} />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll>
            <Form className="navbar-serach" role="search">
              <Form.Control
                type="search"
                placeholder="Cari di sini..."
                aria-label="Search"
              />
              <Button
                className="icon-search bg-transparent border-0 text-black-50"
                type="submit">
                <Search className="" />
              </Button>
            </Form>
          </Nav>
          {isLoggedIn ? (
            <>
              <div className="d-flex align-items-center">
                {/* Navigation links/icons for logged-in user */}
                <Nav.Link as={NavLink} to="/users" activeClassName="active">
                  <span className="me-4">Data User</span>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/tarif" activeClassName="active">
                  <span className="me-4">Tarif Listrik</span>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/pelanggan" activeClassName="active">
                  <span className="me-4">Pelanggan</span>
                </Nav.Link>
                <Nav.Link as={NavLink} to="/tagihan" activeClassName="active">
                  <span className="me-4">Tagihan</span>
                </Nav.Link>
                <Button
                  className="btn-primary-default border-0"
                  onClick={handleLogout}>
                  <BiLogIn /> Logout
                </Button>
              </div>
            </>
          ) : (
            <Button
              className="btn-primary-default border-0"
              onClick={() => navigate("/login")}>
              <BiLogIn /> Masuk
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
