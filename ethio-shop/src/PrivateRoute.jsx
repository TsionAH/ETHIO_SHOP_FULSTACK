// src/PrivateRoute.jsx
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token"); // or wherever you store it
  return token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
