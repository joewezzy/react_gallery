// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFdnVnibz9s5EE--YMxh-LIzjJTFLZLFg",
  authDomain: "react-firebase-gallery-d-7e3e7.firebaseapp.com",
  projectId: "react-firebase-gallery-d-7e3e7",
  storageBucket: "react-firebase-gallery-d-7e3e7.appspot.com",
  messagingSenderId: "558810932386",
  appId: "1:558810932386:web:ea5c563c9210e3fbe2e3fb",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();

// Firebase Authentication setup.
export const auth = getAuth();
