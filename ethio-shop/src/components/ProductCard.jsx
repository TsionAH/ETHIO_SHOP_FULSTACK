import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import productsAPI from "../products"; // your axios instance
import { ACCESS_TOKEN } from "../constants";

export default function ProductCardDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await productsAPI.get(`/material/${id}/`);
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      await productsAPI.post("/cart/add/", { product_id: id, quantity: 1 });
      navigate("/cart");
    } catch (err) {
      console.error("Add to cart failed", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-lg mb-6"/>
      <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
      <p className="mb-4">{product.description}</p>
      <p className="font-semibold">Price: {product.price}</p>
      <div className="mt-4">
        <button onClick={handleAddToCart} className="bg-green-500 text-white px-4 py-2 rounded">
          Add to cart
        </button>
      </div>
    </div>
  );
}
