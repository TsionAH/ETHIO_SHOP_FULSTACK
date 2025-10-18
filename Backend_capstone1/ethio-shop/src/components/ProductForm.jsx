// src/components/ProductForm.jsx
import { useState } from "react";
import axios from "axios";

function ProductForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // If authentication is required, include the access token
      const token = localStorage.getItem("access");

      const res = await axios.post("http://127.0.0.1:8000/products/", 
        { name, price, description },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token ? `Bearer ${token}` : "",
          },
        }
      );

      alert("✅ Product added successfully!");
      console.log(res.data);

      // Clear the form
      setName("");
      setPrice("");
      setDescription("");
    } catch (err) {
      console.error("Product creation failed:", err);
      alert(err.response?.data?.detail || "Failed to add product.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-10 p-6 shadow bg-white rounded flex flex-col"
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Add New Product</h1>

      <input
        type="text"
        placeholder="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        className="border p-2 mb-3 rounded"
      />

      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        className="border p-2 mb-3 rounded"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 mb-3 rounded"
      ></textarea>

      <button
        type="submit"
        className="bg-green-500 text-white py-2 rounded hover:bg-green-600"
      >
        Add Product
      </button>
    </form>
  );
}

export default ProductForm;
