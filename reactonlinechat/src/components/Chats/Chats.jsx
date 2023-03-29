import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import styles from "./Chats.module.scss";

const Chats = () => {

  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };


  return (
    <>
    {Object.entries(chats)?.map(chat=>(

   
     <div className={styles.userMessage} key={chat[0]}>
      <img className={styles.avatarMessage} src={chat[1].userInfo.photoURL} alt="" />
      <div>
        <h4>{chat[1].userInfo.displayName}</h4>
        <p>{chat[1].userInfo.lastMessage?.text}</p>
      </div>
    </div>
    ))}
    </>
   
  );
};

export default Chats;
