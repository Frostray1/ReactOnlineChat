import React from 'react'
import styles from "./InMessage.module.scss";
const InMessage = () => {
  return (
    <div className={styles.inMessage}>
      <img src="/image/avatar.jpeg" alt="avatar" />
      <div className={styles.textMessage}><p>Lorem, ipsum dolor sit amet  consectetur adipisicing elit. Enim, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium tenetur corrupti, dolores dolore nihil maiores expedita quibusdam odit veniam libero!</p> </div>
    </div>
  )
}

export default InMessage