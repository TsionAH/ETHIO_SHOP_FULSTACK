import { Link } from "react-router-dom";
import productsData from "../data.json";

export default function ProductCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-6xl mx-auto p-6">
      {productsData.map((product) => (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:scale-105 hover:shadow-xl transition-transform duration-300"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded-lg mb-4"
          />
          <h2 className="text-xl font-semibold mb-2">{product.title}</h2>
          <p className="text-gray-600 text-center">{product.summary}</p>
        </Link>
      ))}
    </div>
  );
}
