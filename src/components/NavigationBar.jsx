import React, { useEffect } from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useFirebase } from "../firebase/config";
function NavigationBar() {
  const firebase = useFirebase();
  const Navigate = useNavigate();
  // useEffect(() => {
  //   if (!firebase.isLoggedIn) {
  //     Navigate("/login");
  //   }
  // }, [firebase.isLoggedIn, Navigate]);
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/book/listPage">Add Listing</Nav.Link>
            {/* <Nav.Link href="">Pricing</Nav.Link> */}
          </Nav>
        </Container>
        <Button onClick={() => firebase.logOut()}>LOGOUT</Button>
      </Navbar>
    </>
  );
}

export default NavigationBar;
