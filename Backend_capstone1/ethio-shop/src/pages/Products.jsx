import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import productsAPI from "../productsAPI"; // the new file we created
 // your axios instance
import { ACCESS_TOKEN,REFRESH_TOKEN } from "../constants";
// your axios instance

function Products() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // Determine endpoint based on URL
  const endpoint = location.pathname.includes("material")
    ? "/materials/"
    : "/products/";

  // ✅ Fetch products once
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem(ACCESS_TOKEN);
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
        console.error("Failed to fetch products:", err);
        setProductList([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [endpoint]);

  // ✅ Add to Cart
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

      navigate("/cart-collection");
    } catch (err) {
      console.error("Add to cart failed:", err);
      alert("Failed to add product to cart. Please try again.");
    }
  };

  if (loading) return <div>Loading products...</div>;
  if (productList.length === 0)
    return <div>No products found. Please check your database or API.</div>;

  // ✅ Filter products based on search term
  const filteredProducts = productList.filter((p) =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-5xl mx-auto mt-10">
      {/* Search bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border p-2 rounded w-full md:w-1/2"
        />
      </div>

      <h1 className="text-3xl font-bold mb-6 text-center">Product List</h1>

      {isAdmin && (
        <div className="mb-4 text-right">
          <button
            onClick={() => navigate("/add-product")}
            className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            ➕ Add Product
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {filteredProducts.map((p) => (
          <div key={p.id} className="p-4 border rounded shadow">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p>{p.description}</p>
            <p className="font-bold text-gray-700 mt-1">${p.price}</p>

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
    </div>
  );
}

export default Products;
