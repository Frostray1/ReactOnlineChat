import { doc, onSnapshot } from 'firebase/firestore';
import React, { useContext, useEffect, useState } from 'react'
import { ChatContext } from '../../context/ChatContext';
import { db } from '../../firebase';
import Message from '../Message/Message';


import styles from "./Messages.module.scss";


const Messages = () => {
  const [messages,setMessages] = useState([])
  const {data} = useContext(ChatContext)


  useEffect(()=>{
    const unSub = onSnapshot(doc(db,'chats',data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages)
      // console.log(data.chatId)
    })

    return ()=>{
      unSub()
    }
  },[data.chatId])

  return (
    <div className={styles.messages}>
      {messages.map(m=>(
        <Message message={m} key={m.id}/>
       
      ))}
        {/* <InMessage/> */}
        {/* <OutMessage/> <OutMessage/> <OutMessage/> <OutMessage/> <OutMessage/> <OutMessage/> <OutMessage/> <OutMessage/> <OutMessage/> <OutMessage/> */}

       
    </div>
  )
}

export default Messages