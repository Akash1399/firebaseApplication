import React, { useState, useEffect } from "react";
//? Importing Styling
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//? Importing custom hooks
import { useFirebase } from "../firebase/config";
function ListingPage() {
  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [coverPic, setCoverPic] = useState("");
  const Navigate = useNavigate();

  const firebase = useFirebase();
  useEffect(() => {
    if (!firebase.isLoggedIn) {
      Navigate("/");
    }
  }, [firebase.isLoggedIn]);
  return (
    <>
      <div className="container mw-40 mx-auto mt-5">
        <Form
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await firebase.handleCreateNewListing(
              name,
              isbnNumber,
              price,
              coverPic
            );
            console.log(res);
          }}
        >
          <h1>ADD BOOK</h1>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Book Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              placeholder="Enter Book Name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>ISBN</Form.Label>
            <Form.Control
              type="text"
              value={isbnNumber}
              placeholder="ISBN Number"
              onChange={(e) => setIsbnNumber(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              value={price}
              placeholder="Price"
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Cover Photo</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => setCoverPic(e.target.files[0])}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            SignIn
          </Button>
        </Form>
      </div>
    </>
  );
}

export default ListingPage;
