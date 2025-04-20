import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getDatabase, ref, set, get } from "firebase/database";

// Твоя конфігурація
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
};

// Ініціалізація
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

// Функції для оновлення у Firebase
const updateUserFavorites = (uid, favorites) => {
  if (!uid) return;
  const userFavoritesRef = ref(database, `users/${uid}/favorites`);
  // Передаємо вже новий масив
  set(userFavoritesRef, [...favorites]);
};

const updateUserWatched = (uid, watched) => {
  if (!uid) return;
  const userWatchedRef = ref(database, `users/${uid}/watched`);
  set(userWatchedRef, [...watched]);
};

const fetchFavoritesFromFirebase = async (uid) => {
  if (!uid) return [];
  const userFavoritesRef = ref(database, `users/${uid}/favorites`);
  const snapshot = await get(userFavoritesRef);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

const fetchWatchedFromFirebase = async (uid) => {
  if (!uid) return [];
  const userWatchedRef = ref(database, `users/${uid}/watched`);
  const snapshot = await get(userWatchedRef);
  return snapshot.exists() ? Object.values(snapshot.val()) : [];
};

export {
  auth,
  provider,
  database,
  updateUserFavorites,
  updateUserWatched,
  fetchWatchedFromFirebase,
  fetchFavoritesFromFirebase,
};
