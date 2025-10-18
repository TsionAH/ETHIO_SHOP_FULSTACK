import React, { useEffect, useState } from "react";
import productsAPI from "../products";
import { ACCESS_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const res = await productsAPI.get("/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setItems(res.data);
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
      setItems(items.filter((i) => i.id !== id));
    } catch (err) {
      console.error("Failed to delete item:", err);
    }
  };

  // Add another product
  const handleAddAnother = () => {
    navigate("/products");
  };

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
  if (!items.length) return <div>Your cart is empty.</div>;

  const total = items.reduce(
    (acc, it) => acc + parseFloat(it.product_detail.price) * it.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
  <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

  {loading && <div>Loading cart...</div>}

  {!loading && items.length === 0 && <div>Your cart is empty.</div>}

  {!loading && items.length > 0 && (
    <>
      <div className="space-y-4">
        {items.map((it) => (
          <div key={it.id} className="flex items-center justify-between border p-4 rounded">
            <div className="flex items-center gap-4">
              {it.product_detail.image && (
                <img
                  src={it.product_detail.image}
                  alt={it.product_detail.name}
                  className="w-20 h-20 object-cover"
                />
              )}
              <div>
                <div className="font-semibold">{it.product_detail.name}</div>
                <div>Qty: {it.quantity}</div>
                <div>Price each: ${it.product_detail.price}</div>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div className="font-semibold">
                Subtotal: ${(parseFloat(it.product_detail.price) * it.quantity).toFixed(2)}
              </div>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-blue-500 text-white py-1 px-2 rounded hover:bg-blue-600"
                  onClick={() => navigate("/products")}
                >
                  Add Another
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded hover:bg-red-600"
                  onClick={() => handleDelete(it.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Buttons at the bottom */}
      <div className="mt-6 flex gap-2">
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
    </>
  )}
</div>

  );
}

export default Cart;
