import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({ element }) => {
  const user = useSelector((state) => state.user);

  if (!user || !user.uid) {
    return <Navigate to="/" replace />;
  }
  return element;
};
