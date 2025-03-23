// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCPgUp3ctLjGEos_14tSP514v9uzhut-qk",
  authDomain: "prepai-bdd74.firebaseapp.com",
  projectId: "prepai-bdd74",
  storageBucket: "prepai-bdd74.firebasestorage.app",
  messagingSenderId: "1040194171912",
  appId: "1:1040194171912:web:573a5795ff15e22f1dcdbd",
  measurementId: "G-HTCX70EYXG"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);