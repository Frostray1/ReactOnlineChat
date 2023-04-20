import {
  doc,
  setDoc,
  getFirestore,
  onSnapshot,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";

async function readUsersChats(uid) {
  const docSnap = await getDoc(doc(db, "userChats", uid));
  if (docSnap.exists()) {
    const user = docSnap.data();
    // console.log(user)
    return user;
  } else {
    console.log("No such document!");
  }
}

function UpdateUserDataInChats(uid) {
  // console.log(uid);
  const combinedId = [];

  const unsub = onSnapshot(doc(db, "users", uid), (documen) => {
    const infoCurrrentUser = documen.data();
    
    readUsersChats(uid)
      .then((chatsInfo) => {
        
        for (let i = 0; i < Object.entries(chatsInfo).length; i++) {
          combinedId[i] = Object.entries(chatsInfo)[i][0];
        }
        // console.log(combinedId);
        let uidUsersInChats = [];
        for (let i = 0; i < Object.entries(chatsInfo).length; i++) {
          const startIndex = combinedId[i].indexOf(uid);
         
          if (startIndex > 0) {
            uidUsersInChats[i] = combinedId[i].substring(0, startIndex);
          } else {
            const endIndex = combinedId[i].indexOf(uid) + uid.length;
            uidUsersInChats[i] = combinedId[i].substring(endIndex);
          }
        }
        // console.log(uidUsersInChats);
        
       
          for (let i = 0; i < Object.entries(chatsInfo).length; i++) {
            const docRef = doc(db, "userChats", uidUsersInChats[i]);
           
            const fieldName = combinedId[i] + ".userInfo.displayName";
            
            const currentDisplayName = infoCurrrentUser.displayName;
            const fieldPhotoUrl = combinedId[i] + ".userInfo.photoURL";
            const currentPhotoUrl = infoCurrrentUser.photoURL;
            // console.log(uidUsersInChats[i]);
            const updateData = {
              [fieldName]: currentDisplayName,
              [fieldPhotoUrl]: currentPhotoUrl,
            };
            // console.log(updateData);
            updateDoc(docRef, updateData);
          }
    
      })
      .catch((error) => {
        console.log(error);
      });
  });
}

export default UpdateUserDataInChats;
