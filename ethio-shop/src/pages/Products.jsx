import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // <- added useNavigate
import productsAPI from "../products"; // axios instance
import { ACCESS_TOKEN } from "../constants";

function Products() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate(); // <- initialize navigate

  // Determine endpoint based on URL
  const endpoint = location.pathname.includes("material")
    ? "/materials/"
    : "/products/";

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
        console.log("check if the token is working in for the errro")
        console.log("Endpoint:", endpoint);
        console.log("Token:", token);
    
        const res = await productsAPI.get(endpoint, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
    
        console.log("Full API response:", res);
    
        const products = res.data.results || res.data;
        setProductList(products);
        console.log("Products fetched:", products);
      } catch (err) {
        console.error("Failed to fetch products. Check your backend or API.", err);
        setProductList([]);
      } finally {
        setLoading(false);
      }
    };
    

    fetchProducts();
  }, [endpoint]);

  // Add to Cart handler
  const handleAddToCart = async (product) => {
    try {
      const token = localStorage.getItem(ACCESS_TOKEN);
      if (!token) {
        alert("You must be logged in to add products to cart.");
        return;
      }

      await productsAPI.post(
        "/cart/add/",
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Navigate to Cart Collection page after adding
      navigate("/cart-collection");
    } catch (err) {
      console.error("Add to cart failed:", err.response || err);
      alert("Failed to add product to cart. Check your backend or login status.");
    }
  };

  if (loading) return <div>Loading products...</div>;

  if (productList.length === 0)
    return <div>No products found. Please check your database or API.</div>;

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {productList.map((p) => (
        <div key={p.id} className="border p-4 rounded shadow">
          <h2 className="font-bold text-lg">{p.name}</h2>
          <p className="text-sm mb-2">{p.description}</p>
          <p className="font-semibold mb-2">Price: ${p.price}</p>

          {p.image && (
            <img
              src={p.image}
              alt={p.name}
              className="w-full h-48 object-cover mb-3 rounded"
            />
          )}

          <button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            onClick={() => handleAddToCart(p)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default Products;
