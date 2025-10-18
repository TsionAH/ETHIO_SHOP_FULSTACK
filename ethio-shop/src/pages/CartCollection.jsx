import React, { useEffect, useState } from "react";
import productsAPI from "../products";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function CartCollection() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch cart items from backend
  const fetchCart = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await productsAPI.get("/cart/", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Delete a cart item
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      await productsAPI.delete(`/cart/${id}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(cartItems.filter((i) => i.id !== id));
    } catch (err) {
      console.error(err);
    }
  };
  const handlePayAndDeliver = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        alert("You must login first");
        return;
      }
  
      const res = await productsAPI.post(
        "/cart/pay_and_deliver/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      const paymentUrl = res.data.payment_url;
      if (paymentUrl) {
        window.location.href = paymentUrl; // redirect to Chapa checkout
      } else {
        alert("Failed to initiate payment. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Payment initialization failed.");
    }
  };
  
  // Add another product → navigate to products page
  const handleAddAnother = () => navigate("/products");

  // Checkout
  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await productsAPI.post(
        "/cart/checkout/",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(`Order placed! Total: $${res.data.total} | Ref: ${res.data.payment_reference}`);
      navigate("/products");
    } catch (err) {
      console.error("Checkout failed:", err);
      alert("Checkout failed. Please try again.");
    }
  };

  if (loading) return <div>Loading cart...</div>;
  if (!cartItems.length) return <div>Your cart is empty.</div>;

  const total = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.product_detail.price) * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Your Cart Collection</h2>
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={item.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center gap-4">
              {item.product_detail.image && (
                <img
                  src={item.product_detail.image}
                  alt={item.product_detail.name}
                  className="w-20 h-20 object-cover"
                />
              )}
              <div>
                <div className="font-semibold">{item.product_detail.name}</div>
                <div>Qty: {item.quantity}</div>
                <div>Price each: ${item.product_detail.price}</div>
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="font-semibold">
                Subtotal: ${(parseFloat(item.product_detail.price) * item.quantity).toFixed(2)}
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  onClick={handleAddAnother}
                >
                  Add Another
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <div className="font-bold text-lg">Total: ${total.toFixed(2)}</div>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          onClick={handleCheckout}
        >
          Checkout
        </button>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={handlePayAndDeliver}
        >
          Pay & Deliver
        </button>
      </div>
    </div>
  );
}

export default CartCollection;
