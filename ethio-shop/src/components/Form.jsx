import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`http://127.0.0.1:8000${route}`, { username, password });



      if (method === "login") {
        // ✅ use consistent key names used by Protected route
        localStorage.setItem("access", res.data.access);
        localStorage.setItem("refresh", res.data.refresh);

        // ✅ navigate after a short delay (ensures token is stored)
        setTimeout(() => navigate("/products"), 100);
      } else {
        alert("Registration successful! Please login.");
        navigate("/login");
      }
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.detail || "Login failed, please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 shadow bg-white rounded flex flex-col"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">
        {method === "login" ? "Login" : "Register"}
      </h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        className="border p-2 mb-3 rounded"
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        className="border p-2 mb-3 rounded"
      />

      <button
        type="submit"
        className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
      >
        {method === "login" ? "Login" : "Register"}
      </button>
    </form>
  );
}

export default Form;
