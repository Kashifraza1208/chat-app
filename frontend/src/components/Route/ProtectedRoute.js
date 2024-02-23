import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { authUser } = useAuthContext();

  console.log(authUser);

  if (!authUser) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default ProtectedRoute;
