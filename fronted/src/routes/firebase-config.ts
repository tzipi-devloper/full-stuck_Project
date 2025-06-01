// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDP4ovGF_YfRF8cB4OPo57dWW22IlmXaSk",
  authDomain: "competition-d6e11.firebaseapp.com",
  projectId: "competition-d6e11",
  storageBucket: "competition-d6e11.firebasestorage.app",
  messagingSenderId: "944721586083",
  appId: "1:944721586083:web:7583847430308d14c69c16",
  measurementId: "G-30NF9D0JY7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);