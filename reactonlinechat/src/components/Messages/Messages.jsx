import React from 'react'
import InMessage from '../Message/InMessage';
import OutMessage from '../Message/OutMessage';
import styles from "./Messages.module.scss";
const Messages = () => {
  return (
    <div className={styles.messages}>
       <InMessage/>
       <InMessage/>
       <OutMessage/>
    </div>
  )
}

export default Messages