import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { logoutUser } from "../../store/userSlice";
import { useNavigate } from "react-router-dom";
import { clearMovies } from "../../store/moviesSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      dispatch(logoutUser());
      dispatch(clearMovies());
      navigate("/");
    } catch (error) {
      console.error("Помилка при виході:", error.message);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white text-sm px-4 py-2 rounded-full hover:bg-red-600 transition-all">
      Вийти
    </button>
  );
};

export default LogoutButton;
