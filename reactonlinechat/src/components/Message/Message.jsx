import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import styles from "./Message.module.scss";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const containerRef = useRef();

  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div ref={containerRef}>
      <div
        className={`${message.senderId === currentUser.uid ? styles.outMessage : styles.inMessage}`}
      >
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="avatar"
        />
        <div className={styles.textMessage}>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
