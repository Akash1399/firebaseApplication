//? Importing React hooks
import React, { useState, useEffect } from "react";
//?Importing Styling
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
//? Importing Custom hook and local files
import { useFirebase } from "../firebase/config";

//! Main Component starts here
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const firebase = useFirebase();

  return (
    <div className="container mw-40 mx-auto mt-5">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          await firebase.signUpWithEmailAndPassword(email, password);
        }}
      >
        <h1>Sign Up Form</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Create Account
        </Button>

        <h6>
          Already have an Account ?{" "}
          <Button variant="link" onClick={() => Navigate("/login")}>
            Sign In
          </Button>
        </h6>
      </Form>
    </div>
  );
}

export default Register;
