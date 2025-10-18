import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Later: integrate filtering or backend search
  };

  return (
    <header className="p-4 bg-white shadow-md">
      {/* Logo and Title */}
      <div className="flex items-center gap-5 mb-4">
        <img className="h-8 w-10" src="/image/logo.png" alt="Logo" />
        <h3 className="text-xl font-bold">EthioShop</h3>
        <p className="text-black bg-white hover:bg-blue-500 px-2 py-1 rounded">
          <a href="#">| More Info</a>
        </p>
      </div>

      {/* Search Bar and Navigation */}
      <div className="flex items-center justify-between gap-4">
        {/* Search */}
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="border border-gray-300 rounded-l px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-3 py-1 rounded-r hover:bg-blue-600"
          >
            🔍
          </button>
        </div>

        {/* Navigation */}
        <ul className="flex items-center gap-6">
          <li className="cursor-pointer hover:text-blue-500">Home</li>
          <li className="relative">
            <button
              onClick={() => setOpen(!open)}
              className="cursor-pointer hover:text-blue-500"
            >
              Shop {open ? "▲" : "▼"}
            </button>
            {open && (
              <ul className="absolute top-full left-0 bg-white shadow-md rounded mt-1 p-2 flex flex-col gap-2">
                <li className="hover:text-blue-500 cursor-pointer">Art</li>
                <li className="hover:text-blue-500 cursor-pointer">Material</li>
                <li className="hover:text-blue-500 cursor-pointer">Dress</li>
              </ul>
            )}
          </li>
          <li className="cursor-pointer hover:text-blue-500">About</li>
          <li className="cursor-pointer hover:text-blue-500">Contact</li>
        </ul>
      </div>
    </header>
  );
}

export default Header;
