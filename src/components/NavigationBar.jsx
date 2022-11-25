import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";
import { useFirebase } from "../firebase/config";
function NavigationBar() {
  const firebase = useFirebase();
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand to="#home">Navbar</Navbar.Brand>
          <div className="me-auto" style={{ display: "flex", gap: "3rem" }}>
            <Link
              type="link"
              to="/"
              className="btn btn-outline-dark"
              style={{ backgroundColor: "gray" }}
            >
              Home
            </Link>
            <Link
              to="/book/listPage"
              className="btn btn-outline-dark"
              style={{ backgroundColor: "gray" }}
            >
              Add Listing
            </Link>
          </div>
        </Container>
        <Button onClick={() => firebase.logOut()}>LOGOUT</Button>
      </Navbar>
    </>
  );
}

export default NavigationBar;
