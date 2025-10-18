import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ShopModal({ show, onClose }) {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  if (!show) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const body = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
    };

    try {
      const res = await fetch("http://127.0.0.1:8000/products/register/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      // On success, close modal and navigate
      onClose();
      navigate("/login");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-sm w-full">
        {!isRegister ? (
          <>
            <h3 className="text-xl font-bold mb-4">Welcome to EthioShop</h3>
            <p className="mb-4">Please login or register to view products and add to cart.</p>
            <div className="flex gap-3">
              <button
                onClick={() => { onClose(); navigate("/login"); }}
                className="flex-1 bg-blue-600 text-white py-2 rounded"
              >
                Login
              </button>
              <button
                onClick={() => setIsRegister(true)}
                className="flex-1 border py-2 rounded"
              >
                Register
              </button>
            </div>
            <button className="mt-3 text-sm text-gray-500" onClick={onClose}>Close</button>
          </>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4">Register</h3>
            <form onSubmit={handleRegisterSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="border px-2 py-1 rounded"
                required
              />
              {error && <p className="text-red-500">{error}</p>}
              <button type="submit" className="bg-green-500 text-white py-2 rounded">
                Register
              </button>
            </form>
            <button
              className="mt-3 text-sm text-gray-500"
              onClick={() => setIsRegister(false)}
            >
              Back
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ShopModal;
