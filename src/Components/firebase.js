import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/";

const config = initializeApp({
  apiKey: "AIzaSyApXgBARlGpwmVzNP-2sYxMOYOYnfYA6y8",
  authDomain: "auth-362c7.firebaseapp.com",
  projectId: "auth-362c7",
  storageBucket: "auth-362c7.appspot.com",
  messagingSenderId: "631169270195",
  appId: "1:631169270195:web:991c1771777b04d5918bc6",
});
const db = getFirestore(config);
const auth = getAuth(db);
export default auth;
