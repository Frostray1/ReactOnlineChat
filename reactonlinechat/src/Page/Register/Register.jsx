import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Register.module.scss";
import { Button, Form } from "react-bootstrap";
// import mySvg from "../../image/svgexport-66.svg";
import { BsChatDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
const Register = () => {
  const [err, setErr] = useState(false);
  const handleSubmut = async (e) => {
    e.preventDefault();
    // console.log(e.target[2].value);
    const email = e.target[0].value;
    const password = e.target[1].value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        setErr(true)
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };


  return (
    <Container className={styles.container}>
      <Row className={styles.authWindow}>
        <Row className="m-0 p-0">
          <Row>
            <div className={styles.logo}>
              <BsChatDots />
              <h3>WiseConnect</h3>
            </div>
          </Row>
          <Form className={styles.formAuth} onSubmit={handleSubmut}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button  variant="primary" type="submit">
              Register
            </Button>
            {err && <span>Something went wrong</span>}
            <Link to="/auth"> Log in</Link>
            <Link to="/"> Home</Link>
          </Form>
        </Row>
      </Row>
    </Container>
  );
};

export default Register;
