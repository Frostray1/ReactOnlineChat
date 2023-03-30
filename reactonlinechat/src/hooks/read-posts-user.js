import {  getDoc } from "firebase/firestore";
import { doc, getFirestore } from "firebase/firestore";

class userData {
  constructor(userId, name, email, description) {
    this.userId = userId;
    this.username = name;
    this.email = email;
    this.description = description;
  }
  toString() {
    return (
      this.userId +
      ", " +
      this.username +
      ", " +
      this.email +
      ", " +
      this.description
    );
  }
}

// Firestore data converter
const userDataConverter = {
  toFirestore: (userData) => {
    return {
      userId: userData.userId,
      username: userData.username,
      email: userData.email,
      description: userData.description,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    return new userData(data.userId, data.username, data.email, data.description);
  },
};



async function readUserPosts(email, form) {
    const firestore = getFirestore();
  
    const db = doc(firestore, "usersPosts/" + email).withConverter(userDataConverter);
    const docSnap = await getDoc(db);
    // console.log(docSnap.data())
  
    if (docSnap.exists()) {
      const user = docSnap.data();
      return user;
      
    } else {
      console.log("No such document!");
    }
  }
export default readUserPosts