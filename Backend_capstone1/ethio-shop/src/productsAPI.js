import axios from "axios";

const BASE_URL = "https://ethio-shop-fulstack-b1.onrender.com"; // deployed backend

const ACCESS_TOKEN = "access";
const REFRESH_TOKEN = "refresh";

const productsAPI = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Interceptor to handle expired access token
productsAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      localStorage.getItem("refresh") // should return a string

      const refresh = localStorage.getItem(REFRESH_TOKEN);
      if (!refresh) return Promise.reject(error);

      try {
        const res = await axios.post(`${BASE_URL}/products/token/refresh/`, { refresh });
        localStorage.setItem(ACCESS_TOKEN, res.data.access);

        originalRequest.headers["Authorization"] = `Bearer ${res.data.access}`;
        return axios(originalRequest);
      } catch (err) {
        console.error("Refresh token failed", err);
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default productsAPI;
