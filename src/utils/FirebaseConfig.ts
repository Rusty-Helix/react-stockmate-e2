// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { collection, getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC7IkK5cFD9pHmlOFQ3W2QTlwVfTKDszCQ",
  authDomain: "react-stockmate-e1.firebaseapp.com",
  projectId: "react-stockmate-e1",
  storageBucket: "react-stockmate-e1.appspot.com",
  messagingSenderId: "1095238100314",
  appId: "1:1095238100314:web:d782beced55d037bd9ff63",
  measurementId: "G-KM2CPR9VT0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const strategyListRef = collection(firebaseDB, "strategyList");