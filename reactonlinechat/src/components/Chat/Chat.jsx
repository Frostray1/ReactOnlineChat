import React, { useContext } from "react";
import styles from "./Chat.module.scss";
import { AiOutlineVideoCamera, AiOutlineUserAdd } from "react-icons/ai";
import { Col, Row } from "react-bootstrap";
import { BsThreeDots } from "react-icons/bs";
import Messages from "../Messages/Messages";
import Input from "../Input/Input";
import { ChatContext } from "../../context/ChatContext";
import InMessage from "../Message/Message";
const Chat = () => {

  const {data} = useContext(ChatContext)

  return (
    <div className={styles.chat}>
      <Row className={styles.headerChat}>
        <Col>
          <h5>{data.user.displayName}</h5>
        </Col>
        <Col className={styles.chatIcons}>
          <AiOutlineVideoCamera />
          <AiOutlineUserAdd />
          <BsThreeDots />
        </Col>
      </Row>
      {/* <Row className={styles.messageWindow}> */}
        <Row className={styles.messagesChat}>
          <Messages />
          

        </Row>
        <Row  className={styles.inputChat}>
          <Input />
        </Row>
       
        
      {/* </Row> */}
    </div>
  );
};

export default Chat;
