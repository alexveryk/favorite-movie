import React from "react";
import { signInWithPopup } from "firebase/auth";
import { auth, provider, database } from "../../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../store/userSlice";
import { setFavorites, setWatched } from "../../store/moviesSlice";
import { ref, get, set } from "firebase/database";

const GoogleLoginButton = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const handleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Зберігаємо юзера в Redux
      dispatch(
        setUser({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL, // додано фото
        })
      );

      // Перевіряємо чи є вже дані в БД
      const userRef = ref(database, "users/" + user.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(setFavorites(data.favorites || []));
        dispatch(setWatched(data.watched || []));
      } else {
        await set(userRef, {
          displayName: user.displayName,
          email: user.email,
          favorites: [],
          watched: [],
        });
      }

      console.log("Успішний вхід:", user.displayName);
    } catch (error) {
      console.error("Помилка входу:", error.message);
    }
  };

  // Якщо користувач залогінений — показуємо ім’я і аватар
  if (user && user.displayName) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <img
          src={user.photoURL}
          alt="User avatar"
          style={{ width: "32px", height: "32px", borderRadius: "50%" }}
        />
        <span>{user.displayName}</span>
      </div>
    );
  }

  return <button onClick={handleLogin}>Увійти через Google</button>;
};

export default GoogleLoginButton;
