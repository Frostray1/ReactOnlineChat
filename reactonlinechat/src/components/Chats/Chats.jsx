import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { db } from "../../firebase";
import styles from "./Chats.module.scss";
import { TfiThemifyFavicon } from "react-icons/tfi";

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
    
    const updateChats = () => {
      const unsub1 = onSnapshot(doc(db, "users", currentUser.uid), (doc) => {
        // console.log(doc.data())
      });

      
    };



    currentUser.uid && getChats()&& updateChats();
  }, [currentUser.uid]);
 






  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <>
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => (
          <div
            className={styles.userMessage}
            key={chat[0]}
            onClick={() => handleSelect(chat[1].userInfo)}
          >
            {chat[1].userInfo.photoURL ? (
              <img
                className={styles.avatarMessage}
                src={chat[1].userInfo.photoURL}
                alt=""
              />
            ) : (
              <TfiThemifyFavicon />
            )}
            <div>
              <h4>{chat[1].userInfo.displayName}</h4>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
        ))}
    </>
  );
};

export default Chats;
