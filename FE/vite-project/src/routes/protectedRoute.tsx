import { getToken } from "../../src/utils";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = getToken();

  return token ? children : <Navigate to="/sign-in" />;
};

export default ProtectedRoute;
