import React, { useContext, useState } from "react";
import styles from "./Search.module.scss";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { TfiThemifyFavicon } from "react-icons/tfi";




const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
    
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
  
    } catch (err) {
      setErr(true);
      console.log(err);
    }
  };

  const handleSelect = async () => {
    const docRef = doc(db, "users", currentUser.uid);
    const docSnap = await getDoc(docRef);
    const currentUserName = docSnap.data();
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL ? user.photoURL : 'https://meetupss.com/upload/photos/2020/04/bwbv7D1LbEDrvyeoCikW_18_e712369129f8e2b3c8040dd2eead6f77_avatar_full.png',
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUserName.displayName,
            photoURL: currentUserName.photoURL ? currentUserName.photoURL : 'https://meetupss.com/upload/photos/2020/04/bwbv7D1LbEDrvyeoCikW_18_e712369129f8e2b3c8040dd2eead6f77_avatar_full.png' ,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser(null);
    setUsername("");
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input
          className={styles.searchInput}
          placeholder="Search"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          value={username}
        />
        
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className={styles.userChat}>
          <div className={styles.searchUser} onClick={handleSelect}>
          {user.photoURL ? (
              <img src={user.photoURL}  alt=""/>
            ) : (
              <TfiThemifyFavicon />
            )}
            <div>
              <h4>{user.displayName}</h4>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
