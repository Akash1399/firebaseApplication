//? Importing React hooks
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
//? Importing Styling
import { Form, Button } from "react-bootstrap";
//? Importing Custom hook and local files
import { useFirebase } from "../firebase/config";

//! Main Component starts here
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const firebase = useFirebase();
  useEffect(() => {
    console.log(!firebase.isLoggedIn);
    if (!firebase.isLoggedIn) {
      Navigate("/");
    } else {
      Navigate("/home");
    }
  }, [firebase.isLoggedIn, Navigate]);
  console.log(firebase.isLoggedIn);
  return (
    <div className="container mw-40 mx-auto mt-5">
      <Form
        onSubmit={async (e) => {
          e.preventDefault();
          const res = await firebase.signInWithEmailAndPass(email, password);
          console.log(res);
        }}
      >
        <h1>Sign In Form</h1>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
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
          SignIn
        </Button>
      </Form>
      <h2 className="mt-5 mb-5">Or</h2>
      <Button variant="danger" onClick={firebase.signInWithGoogle}>
        Sign in with Google
      </Button>

      <h6>
        Don't have an account ?
        <Button variant="link" onClick={() => Navigate("/register")}>
          Create a account
        </Button>
      </h6>
    </div>
  );
}

export default Login;
