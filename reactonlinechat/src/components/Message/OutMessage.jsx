import React from "react";
import styles from "./OutMessage.module.scss";
const OutMessage = () => {
  return (
    <div className={styles.OutMessage}>
      <div className={styles.textMessage}>
        <p>
          Lorem, ipsum dolor sit amet asdas
          
        </p>{" "}
      </div>
      <img src="/image/avatar.jpeg" alt="avatar" />
    </div>
  );
};

export default OutMessage;
