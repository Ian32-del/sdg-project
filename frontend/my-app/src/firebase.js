// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaNxxbf2GoJsFNyg0MA6sWJh67JvuYXZg",
  authDomain: "sdg-f78f4.firebaseapp.com",
  projectId: "sdg-f78f4",
  storageBucket: "sdg-f78f4.firebasestorage.app",
  messagingSenderId: "923387007726",
  appId: "1:923387007726:web:3a83c08b459a80233119ff",
  measurementId: "G-K491EEK2TB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
