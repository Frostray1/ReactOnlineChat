
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBQdMH5YAD1tvB3_4-puFZz9RhqvKyUnao",
  authDomain: "reactrealtimechat-89423.firebaseapp.com",
  projectId: "reactrealtimechat-89423",
  storageBucket: "reactrealtimechat-89423.appspot.com",
  messagingSenderId: "101900970971",
  appId: "1:101900970971:web:03581c72d07ab0690595fe",
  measurementId: "G-LX82H2S9QW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()