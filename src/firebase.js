import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD8Adl_Z4hbi6RZlqeBhohn45FyAyQ0D4k",
  authDomain: "chat-app-7748f.firebaseapp.com",
  projectId: "chat-app-7748f",
  storageBucket: "chat-app-7748f.appspot.com",
  messagingSenderId: "424549383539",
  appId: "1:424549383539:web:b9678fc92cceda77e99906",
  measurementId: "G-VL11KYBY7Q",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
