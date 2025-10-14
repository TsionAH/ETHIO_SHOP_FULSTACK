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
            <a href="About.html">About</a>
            <a  href="Contact.html">Contact</a>
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
      <div className="bg-[#2e2c2c] text-white py-10 px-10">
        <footer className=" "> 
        <img className="h-8 w-10" src="ethi.png"/>
          <div className="flex gap-8">
          
          <p>Ethio Store is one of the best store 
on the Ethiopia. You can acess any 
thing you want that is cultural hand
craft and different kinds of material
. You can bring our culture to your 
country .</p>

<ul>
<h4 className="font-bold py-3">Explor</h4>
 
  <button className="underline transform hover:scale-105 transition duration-300" onClick={handleShopNow}>Mterials</button>
  <button className="underline transform hover:scale-105 transition duration-300" onClick={handleShopNow}>Cultural cloths</button>
  <button className="underline transform hover:scale-105 transition duration-300" onClick={handleShopNow}>Art & Handcraft</button>

</ul>

<ul>
<h4 className="font-bold py-3">help</h4>
  <li className="underline transform hover:scale-105 transition duration-300"><a href="#">Home</a></li>
  <li className="underline transform hover:scale-105 transition duration-300"><a href="About.html">About</a></li>
  <li className="underline transform hover:scale-105 transition duration-300"><a href="Contact.html">Contact Us</a></li>
</ul>
          </div>
         
        </footer>
        <div class="flex space-x-4">
      <a href="https://web.facebook.com/?_rdc=1&_rdr#" target="_blank" class="hover:text-blue-500">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22.675 0h-21.35C.595 0 0 .593 0 1.326v21.348C0 23.407.595 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.464.099 2.795.143v3.24h-1.918c-1.504 0-1.796.715-1.796 1.763v2.312h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.407 24 22.674V1.326C24 .593 23.406 0 22.675 0z"/>
        </svg>
      </a>

      <a href="https://www.linkedin.com/posts/tsion-alemu-handiso-48271630a_over-the-past-month-ive-been-learning-activity-7376543167082438657-q0Vl?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE7FsCIBouhpsR5sfXSoob-9grTHOYh_ZbE" target="_blank" class="hover:text-blue-400">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M22.23 0H1.77C.792 0 0 .77 0 1.723v20.554C0 23.23.792 24 1.77 24h20.46C23.208 24 24 23.23 24 22.277V1.723C24 .77 23.208 0 22.23 0zM7.08 20.452H3.537V9h3.543v11.452zM5.308 7.535a2.052 2.052 0 1 1 0-4.103 2.052 2.052 0 0 1 0 4.103zm15.144 12.917h-3.542v-5.605c0-1.336-.027-3.056-1.863-3.056-1.864 0-2.149 1.45-2.149 2.948v5.713h-3.543V9h3.402v1.561h.048c.474-.899 1.632-1.847 3.36-1.847 3.592 0 4.256 2.363 4.256 5.432v6.846z"/>
        </svg>
      </a>

      <a href="https://x.com/tsion_AH" target="_blank" class="hover:text-blue-300">
        <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 4.557a9.83 9.83 0 0 1-2.828.775 4.932 4.932 0 0 0 2.165-2.724c-.951.555-2.005.959-3.127 1.184a4.916 4.916 0 0 0-8.38 4.482C7.69 8.095 4.066 6.13 1.64 3.161a4.822 4.822 0 0 0-.666 2.475c0 1.708.87 3.216 2.188 4.099a4.903 4.903 0 0 1-2.228-.616v.062a4.919 4.919 0 0 0 3.946 4.827 4.996 4.996 0 0 1-2.224.084 4.923 4.923 0 0 0 4.596 3.417A9.867 9.867 0 0 1 0 19.54a13.936 13.936 0 0 0 7.548 2.212c9.057 0 14.01-7.514 14.01-14.03 0-.213-.004-.425-.014-.636A10.025 10.025 0 0 0 24 4.557z"/>
        </svg>
      </a>
    </div>
      </div>
      <p className="container text-center">&copy; 2025 EthioShop. All Rights Reserved.</p>
    </div>
  );
}

export default HomePage;
