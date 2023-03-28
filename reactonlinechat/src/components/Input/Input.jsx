import React from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./Input.module.scss";
import { BsPaperclip } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
const Input = () => {
  return (
    <Row className={styles.inputWindow}>
        <Col xs={1} className={styles.addFile}> <BsPaperclip/></Col>
        <Col ><input className={styles.inputChat} type="text" placeholder="Write the message"/></Col>
        <Col xs={1}className={styles.sendButton}><button><IoSendSharp/></button></Col>
    </Row>
  );
};

export default Input;
