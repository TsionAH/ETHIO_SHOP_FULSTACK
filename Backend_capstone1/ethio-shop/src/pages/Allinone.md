[
{
"id": 1 ,
"title": "Traditional Tigray Art",
"summary": "Handmade Tigray art that reflects Ethiopian culture and tradition.",
"image": "/image/tigray.png",
"detail": "Unique traditional art with symbolic patterns.",
"ingredients": ["Wood base", "Natural colors", "Cultural patterns"],
"instructions": ["Craft base", "Design patterns", "Paint carefully", "Polish and finish"]
},
{
"id": 2 ,
"title": "Ethiopian Kemis Dress",
"summary": "A handwoven traditional Kemis with colorful embroidery.",
"image": "/image/kemis1.png",
"detail": "Made with cotton and embroidered borders.",
"ingredients": ["Cotton fabric", "Embroidery thread", "Cultural design"],
"instructions": ["Weave cotton", "Sew dress", "Add embroidery", "Finalize with cultural patterns"]
}
]

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HeroPage from "./components/HeroPage";
import ProductCard from "./components/ProductCard";
import ProductCardDetail from "./components/ProductCardDetail";

function App() {
return (
<Router>
<Header />
<Routes>
{/_ Home page shows Hero + Product Grid _/}
<Route
path="/"
element={
<>
<HeroPage />
<ProductCard />
</>
}
/>

        {/* Product Detail page shows Hero + specific product */}
        <Route
          path="/product/:id"
          element={
            <>
              <HeroPage />
              <ProductCardDetailWrapper />
            </>
          }
        />

        {/* Catch-all */}
        <Route
          path="*"
          element={<p className="text-center mt-10 text-red-500">Page not found</p>}
        />
      </Routes>
    </Router>

);
}

export default App;

// Wrapper to pass the ID from URL to ProductCardDetail
import { useParams } from "react-router-dom";
function ProductCardDetailWrapper() {
const { id } = useParams();
return <ProductCardDetail id={id} />;
}

import Header from "../components/Header";
import HeroPage from "../components/HeroPage";
import ProductCard from "../components/ProductCard";

function HomePage() {
return (
<div className="w-full">
{/_ Header _/}
<Header />

      {/* Hero Section */}
      <HeroPage />

      {/* Products Section */}
      <section className="py-10 bg-gray-50">
        <h2 className="text-3xl font-bold text-center mb-8">
          Explore Our Products
        </h2>
        <ProductCard />
      </section>
    </div>

);
}

export default HomePage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import productsData from "../data.json";

function ProductCard() {
const [data, setData] = useState([]);

useEffect(() => {
setData(productsData);
}, []);

return (
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-6">
{data.map((product) => (
<div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
<Link to={`/product/${product.id}`} className="w-full">
<img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
<h2 className="text-xl font-semibold mb-2">{product.title}</h2>
<p className="text-gray-600 text-center">{product.summary}</p>
</Link>
</div>
))}
</div>
);
}

export default ProductCard;

import productsData from "../data.json";
import { useState, useEffect } from "react";
import productData from "../data.json"
function ProductCardDetail({ id }) {
// If 'id' is not passed as prop, return null (used for safety)
if (!id) return null;

// Find the product by matching string vs number
const product = productsData.find((p) => String(p.id) === String(id));

if (!product) {
return (
<p className="text-center text-red-500 mt-6">
Product not found. The item ID "{id}" does not exist.
</p>
);
}

return (
<div className="max-w-4xl mx-auto p-6 flex flex-col items-center">
<img
        src={product.image}
        alt={product.title}
        className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
      />
<h2 className="text-3xl font-bold mb-4 text-center">{product.title}</h2>
<p className="text-gray-700 text-center mb-6">{product.summary}</p>

      <div className="w-full bg-white shadow-md rounded-lg p-4">
        <h3 className="text-2xl font-semibold mb-2">Details:</h3>
        <p className="text-gray-600 mb-4">{product.detail}</p>

        <h3 className="text-2xl font-semibold mb-2">Ingredients / Materials:</h3>
        <ul>
          {product.ingredients.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <h3 className="text-2xl font-semibold mb-2 mt-4">Process:</h3>
        <ol>
          {product.instructions.map((step, index) => (
            <li key={index}>{step}</li>
          ))}
        </ol>
      </div>
    </div>

);
}

export default ProductCardDetail;

import { useState, useEffect } from "react";

function HeroPage() {
const images = [
"bg-[url('/image/home1.png')]",
"bg-[url('/image/home2.png')]",
"bg-[url('/image/jebena.png')]"
];

const [slide, setSlide] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setSlide((prev) => (prev + 1) % images.length);
}, 3000);
return () => clearInterval(interval);
}, [images.length]);

return (
<div className={`h-screen bg-cover bg-center ${images[slide]} flex items-center justify-center`}>
<h1 className="text-white text-4xl font-bold text-center">
Bring Ethiopian Culture to Your Home
</h1>
</div>
);
}

export default HeroPage;

import { useState } from "react";

function Header() {
const [open, setOpen] = useState(false);
const [query, setQuery] = useState("");

const handleSearch = () => {
console.log("Searching for", query);
// Later: call backend API or filter frontend data
};

return (
<header className="flex flex-col md:flex-row justify-between items-center p-4 bg-white shadow-md">
<div className="flex items-center space-x-4">
<div className="text-xl font-bold">EthioShop</div>
<div className="hidden md:flex space-x-4">
<a href="/">Home</a>
<div className="relative">
<button onClick={() => setOpen(!open)}>
Shop {open ? "▲" : "▼"}
</button>
{open && (
<ul className="absolute bg-blue shadow-md mt-1 p-2 rounded">
<li><a href="#">Material</a></li>
<li><a href="#">Art</a></li>
<li><a href="#">Dresses</a></li>
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
          onClick={handleSearch}
          className="bg-green-500 text-white px-3 rounded-r"
        >
Search
</button>
</div>
</header>
);
}

export default Header;
