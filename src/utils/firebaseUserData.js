import { ref, update } from "firebase/database";
import { database } from "../firebase/firebase";

export const updateUserMovies = async (uid, { favorites, watched }) => {
  const userRef = ref(database, "users/" + uid);
  await update(userRef, { favorites, watched });
};
