import { useDispatch } from "react-redux";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { logoutUser } from "../../store/userSlice";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth); // вихід з Firebase
      dispatch(logoutUser()); // очищення Redux
      console.log("Користувач вийшов");
    } catch (error) {
      console.error("Помилка при виході:", error.message);
    }
  };

  return <button onClick={handleLogout}>Вийти</button>;
};

export default LogoutButton;
