import React, { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import readDocument from "../../hooks/read-data-user";
import styles from "./Message.module.scss";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const containerRef = useRef();


  const [avatar,setAvatar] = useState('')
  
  

  useEffect(() => {
    readDocument(currentUser.uid)
      .then((result) => {
        if (result) {
          setAvatar(result.photoURL)
          
        }
      })
      .catch((err) => {
        console.warn("Something went wrong!", err);
      });
  }, [currentUser.uid]);

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
              ? avatar
              : data.user.photoURL
          }
          alt=""
        />
        <div className={styles.textMessage}>
          <p>{message.text}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
