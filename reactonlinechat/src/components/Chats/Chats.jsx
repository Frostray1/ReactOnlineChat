import React from "react";
import styles from "./Chats.module.scss";

const Chats = () => {
  return (
    <div className={styles.userMessage}>
      <img className={styles.avatarMessage} src="/image/avatar.jpeg" alt="" />
      <div>
        <h4>Name Surname</h4>
        <p>hello</p>
      </div>
    </div>
  );
};

export default Chats;
