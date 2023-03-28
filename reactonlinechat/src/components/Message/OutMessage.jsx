import React from 'react'
import styles from "./OutMessage.module.scss";
const OutMessage = () => {
  return (
    <div className={styles.OutMessage}>
      
      <div className={styles.textMessage}><p>Lorem, ipsum dolor sit amet  consectetur adipisicing elit. Enim, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium tenetur corrupti, dolores dolore nihil maiores expedita quibusdam odit veniam libero!</p> </div>
      <img src="/image/avatar.jpeg" alt="avatar" />
    </div>
  )
}

export default OutMessage