import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("access_token");

  if (!token) {
    // If the user is not logged in, redirect to login page
    return <Navigate to="/login" replace />;
  }

  // Otherwise, allow access
  return children;
}

export default PrivateRoute;
