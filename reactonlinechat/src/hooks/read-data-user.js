import {  getDoc } from "firebase/firestore";
import { doc, getFirestore } from "firebase/firestore";

class userData {
    constructor(uid, displayName, email,photoURL) {
      this.uid = uid;
      this.displayName = displayName;
      this.email = email;
      this.photoURL=photoURL
    }
    toString() {
      return (
        this.uid +
        ", " +
        this.displayName +
        ", " +
        this.email +
        ", " +
        this.photoURL
      );
    }
  }
  
  // Firestore data converter
  const userDataConverter = {
    toFirestore: (userData) => {
      return {
        uid: userData.uid,
        displayName: userData.displayName,
        email: userData.email,
       
        photoURL: userData.photoURL,
      };
    },
    fromFirestore: (snapshot, options) => {
      const data = snapshot.data(options);
      return new userData(data.uid, data.displayName, data.email, data.photoURL);
    },
  };
  
  async function readDocument(uid, form) {
    const firestore = getFirestore();
  
    const db = doc(firestore, "users/" + uid).withConverter(userDataConverter);
    const docSnap = await getDoc(db);
    // console.log(docSnap.data())
  
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user;
      // form.setFieldsValue(docSnap.data())
    } else {
      // console.log("No such document!");
    }
  }
export default readDocument