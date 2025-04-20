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
      const firebaseUser = result.user;

      dispatch(
        setUser({
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
        })
      );

      const userRef = ref(database, "users/" + firebaseUser.uid);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const data = snapshot.val();
        dispatch(setFavorites(data.favorites || []));
        dispatch(setWatched(data.watched || []));
      } else {
        await set(userRef, {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          favorites: [],
          watched: [],
        });
      }
    } catch (error) {
      console.error("Помилка входу:", error.message);
    }
  };

  if (user?.displayName) {
    return (
      <div className="flex items-center gap-2">
        <img
          src={user.photoURL}
          alt="User avatar"
          className="w-8 h-8 rounded-full"
        />
        <span>{user.displayName}</span>
      </div>
    );
  }

  return (
    <button onClick={handleLogin} className="text-[#51cda6] font-medium">
      Увійти через Google
    </button>
  );
};

export default GoogleLoginButton;
