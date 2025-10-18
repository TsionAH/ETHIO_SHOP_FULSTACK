import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import products from "../products"; // your axios instance
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

function Protected({ children }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        setIsAuthorized(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now) {
          await refreshToken();
        } else {
          setIsAuthorized(true);
        }
      } catch (err) {
        console.log("JWT decode failed:", err);
        setIsAuthorized(false);
      }
    };

    const refreshToken = async () => {
      const refresh = localStorage.getItem(REFRESH_TOKEN);
      if (!refresh) {
        setIsAuthorized(false);
        return;
      }

      try {
        const res = await products.post("/products/token/refresh/", { refresh });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthorized(true);
      } catch (err) {
        console.log("Refresh token failed:", err);
        setIsAuthorized(false);
      }
    };

    auth();
  }, []);

  if (isAuthorized === null) return <div>Loading...</div>;
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default Protected;