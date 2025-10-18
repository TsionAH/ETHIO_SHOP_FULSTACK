import { useState, useEffect } from "react";

function HeroPage() {
  const images = [
    "/image/home1.png",
    "/image/home2.png",
    "/image/jebena.png"
  ];

  const [slide, setSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            index === slide ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url(${img})` }}
        ></div>
      ))}

      <div className="relative flex flex-col items-center gap-6 z-10">
        <h1 className="text-white text-4xl font-bold text-center">
          Bring Ethiopian Culture to Your Home
        </h1>
        <button className="bg-purple-500 w-40 text-white px-4 py-2 rounded hover:bg-purple-600 transition duration-1000">
          Shop Now
        </button>
      </div>
    </div>
  );
}

export default HeroPage;
