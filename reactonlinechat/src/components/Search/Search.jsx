import React, { useContext, useState } from "react";
import styles from "./Search.module.scss";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
        
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
      console.log(err)
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = () =>{
    
  }

  return (
    <div className={styles.search}>
      <div className={styles.searchForm}>
        <input
          className={styles.searchInput}
          placeholder="Search"
          type="text"
          onChange={(e) => setUserName(e.target.value)}
          onKeyDown={handleKey}
        />
      </div>
      {err && <span>User not found</span>}
      {user && <div className={styles.userChat}>
        <div className={styles.searchUser} onClick={handleSelect}>
          <img src="/image/avatar.jpeg" alt="" />
          <div>
            <h4>{user.displayName}</h4>
          </div>
        </div>
      </div>}
    </div>
  );
};

export default Search;
