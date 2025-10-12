import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const productsData = [
  {
    id: 1,
    title: "Traditional Tigray Art",
    summary: "Handmade Tigray art that reflects Ethiopian culture and tradition.",
    image: "/image/tigray.png",
    detail: "Unique traditional art with symbolic patterns.",
    ingredients: ["Wood base", "Natural colors", "Cultural patterns"],
    instructions: ["Craft base", "Design patterns", "Paint carefully", "Polish and finish"],
  },
  {
    id: 2,
    title: "Ethiopian Kemis Dress",
    summary: "A handwoven traditional Kemis with colorful embroidery.",
    image: "/image/kemis1.png",
    detail: "Made with cotton and embroidered borders.",
    ingredients: ["Cotton fabric", "Embroidery thread", "Cultural design"],
    instructions: ["Weave cotton", "Sew dress", "Add embroidery", "Finalize with cultural patterns"],
  },
];

function HomePage() {
  const [showShopModal, setShowShopModal] = useState(false);

  const [shopOpen, setShopOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [products] = useState(productsData);
  const [selectedId, setSelectedId] = useState(null);
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();

  const heroImages = [
    "bg-[url('/image/home1.png')]",
    "bg-[url('/image/home2.png')]",
    "bg-[url('/image/jebena.png')]",
    "bg-[url('/image/kemis1.png')]",
    "bg-[url('/image/birde.png')]",
    "bg-[url('/image/kembata.png')]",
    "bg-[url('/image/mesob.png')]",
    "bg-[url('/image/oromo.png')]",
    "bg-[url('/image/tigray.png')]",
    "bg-[url('/image/unberella.png')]",
    "bg-[url('/image/rekebot.png')]",
  
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );
  
  const handleShopNow = () => {
    const token = localStorage.getItem("ACCESS_TOKEN");
    if (token) {
      navigate("/products");
    } else {
      // show a simple modal asking to login or signup
      setShowShopModal(true);
    }
  };
  // const handleShoplogins = () =>{
  //   navigate("/login");
  
  return (
    <div>
      {/* --- Header --- */}
      <header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md">
        <div className="flex items-center space-x-4">
          <div className="text-xl font-bold">EthioShop</div>
          <div className="hidden md:flex space-x-4">
            <a href="#">Home</a>
            <div className="relative">
              <button onClick={() => setShopOpen(!shopOpen)}>
                Shop {shopOpen ? "▲" : "▼"}
              </button>
              {shopOpen && (
                <ul className="absolute bg-blue-100 shadow-md mt-1 p-2 rounded">
                  <li><a href="http://localhost:5174/login">Material</a></li>
                  <li><a href="http://localhost:5174/login">Art</a></li>
                  <li><a href="http://localhost:5174/login">Dresses</a></li>
                </ul>
              )}
            </div>
            <a href="#">About</a>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="flex mt-2 md:mt-0">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border rounded-l px-2 py-1"
          />
          <button
            className="bg-green-500 text-white px-3 rounded-r"
          >
            🔍
          </button>
        </div>
      </header>

      {/* --- Hero Section --- */}
      <div
        className={`h-screen bg-cover bg-center ${heroImages[slide]} flex items-center justify-center transition-all duration-1000`}
      >
        <div className="flex flex-col items-center gap-6">
          <h1 className="text-white text-4xl font-bold text-center">
            Bring Ethiopian Culture to Your Home
          </h1>
          <button
            onClick={handleShopNow}
            className="bg-purple-500 w-40 text-white px-4 py-2 rounded hover:bg-purple-600 transition"
          >
            Shop Now
          </button>
        </div>{/* Shop choice modal */}
{showShopModal && (
  <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
    <div className="bg-white p-6 rounded-lg max-w-sm w-full">
      <h3 className="text-xl font-bold mb-4">Welcome to EthioShop</h3>
      <p className="mb-4">Please login or register to view products and add to cart.</p>
      <div className="flex gap-3">
        <button onClick={() => { setShowShopModal(false); navigate("/login"); }}
                className="flex-1 bg-blue-600 text-white py-2 rounded">Login</button>
        <button onClick={() => { setShowShopModal(false); navigate("/register"); }}
                className="flex-1 border py-2 rounded">Sign Up</button>
      </div>
      <button className="mt-3 text-sm text-gray-500" onClick={() => setShowShopModal(false)}>Close</button>
    </div>
  </div>
)}

      </div>

      {/* --- Product Cards --- */}
      <section className="py-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-6">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 hover:shadow-xl transition-transform duration-300"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
              <p className="text-gray-600 text-center">{product.summary}</p>
              <button
                onClick={handleShopNow}
                className="mt-3 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Shop Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomePage;
