
import { doc, setDoc, getFirestore } from "firebase/firestore";


function writeUserData(uid, valuesInput) {
 
    const firestore = getFirestore();
    // console.log("valuesinput ",valuesInput)
    const db = doc(firestore, 'users/'+ uid)
    const usersData = {
      uid: uid,
      displayName: valuesInput.displayName,
      // urlAvatar: urlImage,
     
    }
    // console.log("-----",usersData)
    setDoc(db, usersData, { merge: true });

    
  
  }

  export default writeUserData