import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = initializeApp({
  apiKey: "AIzaSyAT937RtNichu3glvMH6saOXj9eILihTB4",
  authDomain: "authentication-bdd13.firebaseapp.com",
  projectId: "authentication-bdd13",
  storageBucket: "authentication-bdd13.appspot.com",
  messagingSenderId: "539307728508",
  appId: "1:539307728508:web:de01556ec2fe0bbdf7b3f9",
});
const db = getFirestore(config);

export default db;
