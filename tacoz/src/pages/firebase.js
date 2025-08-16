// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDitN_NTcW_K9wTSRIO4aozT6Phpi0MODQ",
  authDomain: "hello-tacozz.firebaseapp.com",
  projectId: "hello-tacozz",
  storageBucket: "hello-tacozz.firebasestorage.app",
  messagingSenderId: "231501543550",
  appId: "1:231501543550:web:77ca61347708a6dd96802f",
  measurementId: "G-0NRZTYHTV1"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
