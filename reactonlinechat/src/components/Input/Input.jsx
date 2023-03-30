import React, { useContext, useState } from "react";
import { Col, Row } from "react-bootstrap";
import styles from "./Input.module.scss";
import { BsPaperclip } from "react-icons/bs";
import { IoSendSharp } from "react-icons/io5";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import {v4 as uuid} from 'uuid';


const Input = () => {
  const [text,setText] = useState('')
  // const {img,setImg} = useState(null)

  const {currentUser} = useContext(AuthContext)
  const {data} = useContext(ChatContext)

  const handleSend = async () => {


    await updateDoc(doc(db,"chats", data.chatId),{
      messages:arrayUnion({
        id: uuid(),
        text,
        senderId:currentUser.uid,
        date: Timestamp.now(),
      })
    })

    await updateDoc(doc(db,'userChats', currentUser.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+'.date']: serverTimestamp(),
    });
    await updateDoc(doc(db,'userChats', data.user.uid),{
      [data.chatId+".lastMessage"]:{
        text
      },
      [data.chatId+'.date']: serverTimestamp(),
    })
    setText('')
  }

  return (
    <Row className={styles.inputWindow}>
        <Col xs={1} className={styles.addFile}> <BsPaperclip/></Col>
        <Col ><input className={styles.inputChat} type="text" placeholder="Write the message" onChange={e=>setText(e.target.value)} value={text}/></Col>
        <Col xs={1}className={styles.sendButton}><button onClick={handleSend}><IoSendSharp/></button></Col>
    </Row>
  );
};

export default Input;
