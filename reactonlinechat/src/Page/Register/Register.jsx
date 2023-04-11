import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "./Register.module.scss";
import { Button, Form } from "react-bootstrap";
// import mySvg from "../../image/svgexport-66.svg";
import { BsChatDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc, updateDoc } from "firebase/firestore";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    // console.log(displayName);
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        displayName,
        email,
        uid: res.user.uid,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");
    } catch {
      setErr(true);
    }
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
          <Form className={styles.formAuth} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Name" />
            </Form.Group>
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
            <Button variant="primary" type="submit">
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
