// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";

// Твоя конфігурація
const firebaseConfig = {
  apiKey: "AIzaSyA-hVCYe8iyWY4wrH9Koxd6yvy99D1L5eU",
  authDomain: "favorite-movies-a9454.firebaseapp.com",
  projectId: "favorite-movies-a9454",
  storageBucket: "favorite-movies-a9454.firebasestorage.app",
  messagingSenderId: "1026420303179",
  appId: "1:1026420303179:web:7eece8a84d9e777f7174ce",
  measurementId: "G-LLN5BHJ2BM",
  databaseURL:
    "https://favorite-movies-a9454-default-rtdb.europe-west1.firebasedatabase.app", // <- ДОДАЙ ЦЕ
};

// Ініціалізація
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

export { auth, provider, database };
