import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAeWXPtK64tIuwe4eaLVLTtBM6diUSbs54",
  authDomain: "chat-app-df5e2.firebaseapp.com",
  databaseURL: "https://chat-app-df5e2-default-rtdb.firebaseio.com",
  projectId: "chat-app-df5e2",
  storageBucket: "chat-app-df5e2.appspot.com",
  messagingSenderId: "96852704576",
  appId: "1:96852704576:web:f9a72d54866d39f9dccea5",
  measurementId: "G-9CR769CQ6Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
