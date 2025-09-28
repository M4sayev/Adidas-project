import { Search } from "lucide-react";
import React, { useState } from "react";

function MobileSearch({
  allProducts,
  setSearchQuery,
  navigate,
  setMobileMenuOpen,
}) {
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState([]);

  const handleMobileSearchChange = (e) => {
    const value = e.target.value;
    setMobileSearchQuery(value);

    if (!value.trim()) {
      setMobileSearchResults([]);
      return;
    }

    // filter allProducts by name
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(value.toLowerCase())
    );

    setMobileSearchResults(results.slice(0, 8));
  };

  const handleMobileSearchSubmit = (e) => {
    e.preventDefault();
    if (mobileSearchResults.length > 0) {
      navigate(`/product/${mobileSearchResults[0].id}`);
      setMobileMenuOpen(false); // menunu bağla
    }
  };

  return (
    <div className="p-4 border-b bg-white">
      {/* Mobile Search */}
      <div className="p-4 border-b bg-white relative">
        <form onSubmit={handleMobileSearchSubmit} className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
          <input
            type="text"
            placeholder="Search"
            value={mobileSearchQuery}
            onChange={(e) => {
              const value = e.target.value;
              setMobileSearchQuery(value);
              setSearchQuery(value); // allProducts üçün
              if (value.trim()) {
                const results = allProducts.filter((product) =>
                  product.name.toLowerCase().includes(value.toLowerCase())
                );
                setMobileSearchResults(results.slice(0, 8));
              } else {
                setMobileSearchResults([]);
              }
            }}
            className="w-full pl-10 pr-4 py-3 bg-gray-100 text-black outline-none text-sm rounded"
          />
        </form>

        {/* Mobile Search Results Dropdown */}
        {mobileSearchResults.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-b z-[2000] max-h-80 overflow-y-auto">
            {mobileSearchResults.map((product) => (
              <button
                key={product.id}
                onClick={() => {
                  navigate(`/product/${product.id}`);
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
              >
                {product.images && product.images[0] && (
                  <img
                    src={product.images[0].url || product.images[0]}
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                )}
                <div className="flex-1">
                  <div className="font-medium text-sm">{product.name}</div>
                  <div className="text-xs text-gray-500">${product.price}</div>
                </div>
              </button>
            ))}
            {mobileSearchResults.length === 8 && (
              <button
                onClick={() => {
                  setMobileSearchResults([]);
                  navigate(
                    `/search?q=${encodeURIComponent(mobileSearchQuery)}`
                  );
                  setMobileMenuOpen(false);
                }}
                className="w-full p-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-50 border-t"
              >
                View all results for "{mobileSearchQuery}"
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default MobileSearch;
