import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ShoppingCart, User, Search, X, Heart } from "lucide-react";

function DesktopNav({
  categories,
  basketCount,
  searchQuery,
  handleSearchChange,
  handleSearchSubmit,
  showSearchDropdown,
  searchResults,
  isSearching,
  handleSearchResultClick,
  setShowSearchDropdown,
  navigate,
  toggleMobileMenu,
}) {
  const [hoveredCat, setHoveredCat] = useState(null);
  const [hoverTimeout, setHoverTimeout] = useState(null);

  const handleCategoryMouseEnter = (categoryId) => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
    setHoveredCat(categoryId);
  };

  const handleCategoryMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCat(null);
    }, 500);
    setHoverTimeout(timeout);
  };

  const handleDropdownMouseEnter = () => {
    if (hoverTimeout) {
      clearTimeout(hoverTimeout);
      setHoverTimeout(null);
    }
  };

  const handleDropdownMouseLeave = () => {
    const timeout = setTimeout(() => {
      setHoveredCat(null);
    }, 100);
    setHoverTimeout(timeout);
  };
  return (
    <div className="bg-white py-3 w-full">
      {/* Desktop Layout */}
      <div className="hidden lg:flex items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Link to="/" className="flex justify-center items-center">
          <img src="/logo.png" alt="Adidas Logo" className="h-14 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="flex uppercase space-x-2 text-[15px] flex-1 justify-center">
          {categories
            .filter((cat) => !cat.parentId)
            .map((mainCat) => (
              <div key={mainCat.id} className="relative">
                <div
                  onMouseEnter={() => handleCategoryMouseEnter(mainCat.id)}
                  onMouseLeave={handleCategoryMouseLeave}
                  className="relative"
                >
                  <Link
                    to={`/category/${mainCat.id}`}
                    className={`hover:text-gray-600 px-2 py-1 block ${
                      ["Men", "WOmen", "Kids"].includes(mainCat.slug)
                        ? "font-bold"
                        : "font-thin"
                    }`}
                  >
                    {mainCat.name}
                  </Link>
                </div>

                {/* Desktop Mega Menu */}
                {hoveredCat === mainCat.id && mainCat.children?.length > 0 && (
                  <div
                    className="fixed left-0 top-full w-full bg-white shadow-lg p-8 z-50 grid grid-cols-6 gap-6 border-t"
                    onMouseEnter={handleDropdownMouseEnter}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    {mainCat.children.map((subCat) => (
                      <div key={subCat.id}>
                        <Link
                          to={`/category/${subCat.id}`}
                          className="block font-bold text-sm mb-3 hover:underline"
                        >
                          {subCat.name}
                        </Link>
                        <div className="flex flex-col capitalize  gap-2">
                          {subCat.children?.map((child) => (
                            <Link
                              key={child.id}
                              to={`/category/${child.id}`}
                              className="text-sm hover:underline text-gray-600"
                            >
                              {child.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
        </nav>

        {/* Search & Icons - Desktop */}
        <div className="flex items-center space-x-4">
          <div className="relative w-max-[150px] search-container">
            <form onSubmit={handleSearchSubmit}>
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600 pointer-events-none" />
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
                className="w-full pl-4 pr-10 py-2 bg-gray-200 text-black outline-none text-sm rounded"
              />
            </form>

            {/* Search Dropdown */}
            {showSearchDropdown && (
              <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 shadow-lg rounded-b z-[1000] max-h-80 overflow-y-auto">
                {isSearching ? (
                  <div className="p-4 text-center text-gray-500">
                    Searching...
                  </div>
                ) : searchResults.length > 0 ? (
                  <>
                    {searchResults.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSearchResultClick(product.id)}
                        className="w-full p-3 hover:bg-gray-50 text-left border-b border-gray-100 last:border-b-0 flex items-center space-x-3"
                      >
                        {product.images && product.images[0] && (
                          <img
                            src={product.images[0].url}
                            alt={product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                        )}
                        <div className="flex-1">
                          <div className="font-medium text-sm">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ${product.price}
                          </div>
                        </div>
                      </button>
                    ))}
                    {searchResults.length === 8 && (
                      <button
                        onClick={() => {
                          setShowSearchDropdown(false);
                          navigate(
                            `/search?q=${encodeURIComponent(searchQuery)}`
                          );
                        }}
                        className="w-full p-3 text-center text-sm font-medium text-blue-600 hover:bg-gray-50 border-t"
                      >
                        View all results for "{searchQuery}"
                      </button>
                    )}
                  </>
                ) : (
                  searchQuery.trim() && (
                    <div className="p-4 text-center text-gray-500">
                      No products found for "{searchQuery}"
                    </div>
                  )
                )}
              </div>
            )}
          </div>
          <Link to="/Signin">
            <User className="w-6 h-6" />
          </Link>
          <Link to="/wishlist">
            <Heart className="w-6 h-6" />
          </Link>
          <Link to="/basket" className="relative">
            <ShoppingCart className="w-6 h-6" />
            {basketCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {basketCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Layout - YENİ SIRA */}
      <div className="flex lg:hidden items-center px-4 py-2 relative">
        {/* Sol tərəf - Menu burger və Wishlist */}
        <div className="flex items-center space-x-4">
          {/* 1. Menu burger */}
          <button className="z-[1002]" onClick={toggleMobileMenu}>
            <Menu className="w-8 h-8" />
          </button>

          {/* 2. Wishlist */}
          <Link to="/Wishlist">
            <Heart className="w-8 h-8" />
          </Link>
        </div>

        {/* Mərkəz - Adidas Logo (mütləq mərkəzdə) */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="flex justify-center items-center">
            <img src="/logo.png" alt="Adidas Logo" className="h-10 w-auto" />
          </Link>
        </div>

        {/* Sağ tərəf - Login, Search, Shopping Cart (ekranın sağından 6px, aralarında 6px gap) */}
        <div className="flex items-center space-x-4 ml-auto pr-1.5">
          {/* 4. Login */}
          <Link to="/Signin">
            <User className="w-7 h-7" />
          </Link>

          {/* 5. Search */}
          <button onClick={toggleMobileMenu}>
            <Search className="w-7 h-7" />
          </button>

          {/* 6. Shopping Cart */}
          <Link to="/basket" className="relative">
            <ShoppingCart className="w-7 h-7" />
            {basketCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {basketCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DesktopNav;
