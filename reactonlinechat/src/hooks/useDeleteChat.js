import {
  doc,
  getDoc,
  updateDoc,
  deleteField,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

async function readUsersChats(uid) {
  const docSnap = await getDoc(doc(db, "userChats", uid));
  if (docSnap.exists()) {
    const user = docSnap.data();

    return user;
  } else {
    console.log("No such document!");
  }
}

function UseDeleteChat(currentUserUid, friendUid) {
  let combinedId = "";
  const userRef = doc(db, "userChats", currentUserUid);
  const friendRef = doc(db, "userChats", friendUid);
  readUsersChats(currentUserUid)
    .then((chatsInfo) => {
      for (let i = 0; i < Object.entries(chatsInfo).length; i++) {
        if (currentUserUid + friendUid === Object.entries(chatsInfo)[i][0]) {
          combinedId = currentUserUid + friendUid;
        } else if (
          friendUid + currentUserUid ===
          Object.entries(chatsInfo)[i][0]
        ) {
          combinedId = friendUid + currentUserUid;
        }
      }
      console.log(combinedId);

      updateDoc(userRef, {
        [combinedId]: deleteField(),
      });
      updateDoc(friendRef, {
        [combinedId]: deleteField(),
      });
      deleteDoc(doc(db, "chats", combinedId));
    })
    .catch((error) => {
      console.log(error);
    });
}

export default UseDeleteChat;
