import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import productsAPI from "../productsAPI";
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
          // Try to refresh token
          const refresh = localStorage.getItem(REFRESH_TOKEN);
          if (!refresh) {
            setIsAuthorized(false);
            return;
          }

          const res = await productsAPI.post("/products/token/refresh/", { refresh });
          localStorage.setItem(ACCESS_TOKEN, res.data.access);
        }

        setIsAuthorized(true);
      } catch (err) {
        console.log("JWT decode / refresh failed:", err);
        setIsAuthorized(false);
      }
    };

    auth();
  }, []);

  if (isAuthorized === null) return <div>Loading...</div>;
  return isAuthorized ? children : <Navigate to="/login" />;
}

export default Protected;
