import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User, Search, X, Heart } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [bannerIndex, setBannerIndex] = useState(0);
  const [animatePopup, setAnimatePopup] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [categories, setCategories] = useState([]);
  const [hoveredCat, setHoveredCat] = useState(null);
  const [basketCount, setBasketCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});
  const [hoverTimeout, setHoverTimeout] = useState(null);

  // 🔍 Search states

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState([]);
  const [allProducts, setAllProducts] = useState([]); // bütün məhsullar

  // 📌 Kategoriyalar API
  useEffect(() => {
    fetch("http://localhost:3000/api/category")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Category fetch error:", err));
  }, []);

  // 📌 Bütün məhsulları yüklə
  useEffect(() => {
    fetch("http://localhost:3000/api/product/all")
      .then((res) => res.json())
      .then((data) => {
        console.log("All products:", data);
        setAllProducts(data);
      })
      .catch((err) => console.error("Products fetch error:", err));
  }, []);

  const searchProducts = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    setIsSearching(true);

    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results.slice(0, 8));
    setIsSearching(false);
  };

  // Debounced search
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      if (searchQuery.trim()) {
        searchProducts(searchQuery);
        setShowSearchDropdown(true);
      } else {
        setSearchResults([]);
        setShowSearchDropdown(false);
      }
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery]);

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

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle search submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setShowSearchDropdown(false);
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Handle clicking on search result
  const handleSearchResultClick = (productId) => {
    setShowSearchDropdown(false);
    setSearchQuery("");
    navigate(`/product/${productId}`);
  };

  // Close search dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".search-container")) {
        setShowSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const rotatingMessages = [
    `FAST, FREE DELIVERY WITH PRIME`,
    `FREE STANDARD SHIPPING WITH ADICLUB`,
  ];

  useEffect(() => {
    if (!showPopup) {
      const interval = setInterval(() => {
        setBannerIndex((prev) => (prev + 1) % rotatingMessages.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [showPopup]);

  useEffect(() => {
    if (showPopup) {
      const timeout = setTimeout(() => setAnimatePopup(true), 10);
      return () => clearTimeout(timeout);
    } else {
      setAnimatePopup(false);
    }
  }, [showPopup]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleCategory = (categoryId) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [categoryId]: !prev[categoryId],
    }));
  };

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

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    }
    return () => {
      document.body.style.overflow = "unset";
      document.body.style.position = "static";
      document.body.style.width = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="w-full border-b">
      <div
        className={`fixed top-0 left-0 w-full z-[999] transition-transform duration-1000 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Banner */}
        {!showPopup && (
          <div
            className="bg-black text-white text-sm font-semibold text-center py-2 cursor-pointer flex items-center justify-center gap-1 w-full"
            onClick={() => setShowPopup(true)}
          >
            {rotatingMessages[bannerIndex]}
            <svg
              width="23"
              height="23"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="ml-1"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M16 19.2929L8.35359 11.6465L7.64648 12.3536L16 20.7071L24.3536 12.3536L23.6465 11.6465L16 19.2929Z"
                fill="#fafafa"
              />
            </svg>
          </div>
        )}

        {/* Top links - hidden on mobile */}
        <div className="bg-white w-full hidden md:block">
          <div className="flex justify-end space-x-6 text-xs text-black-600 px-5 ">
            <Link to="/help" className="hover:underline">
              help
            </Link>
            <Link to="/orders" className="hover:underline">
              orders and returns
            </Link>
            <Link to="/gift-cards" className="hover:underline">
              gift cards
            </Link>
            <Link to="/join" className="hover:underline">
              join adiClub
            </Link>
          </div>
        </div>

        {/* Main Header */}
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
                    {hoveredCat === mainCat.id &&
                      mainCat.children?.length > 0 && (
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
                <img
                  src="/logo.png"
                  alt="Adidas Logo"
                  className="h-10 w-auto"
                />
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
      </div>

      {/* Mobile Menu Overlay - TAM EKRAN */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[1001] bg-white w-screen h-screen">
          <div className="flex flex-col h-full w-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-4 border-b bg-white">
              <Link
                to="/"
                className="flex justify-center items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <img
                  src="/logo.png"
                  alt="Adidas Logo"
                  className="h-10 w-auto"
                />
              </Link>
              <button onClick={toggleMobileMenu} className="z-[1002]">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Search */}
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
                          product.name
                            .toLowerCase()
                            .includes(value.toLowerCase())
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
                          <div className="font-medium text-sm">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            ${product.price}
                          </div>
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

            {/* Mobile Navigation - TAM ƏHATƏ */}
            <div className="flex-1 overflow-y-auto bg-white w-full">
              <nav className="p-4 w-full">
                {categories
                  .filter((cat) => !cat.parentId)
                  .map((mainCat) => (
                    <div
                      key={mainCat.id}
                      className="border-b last:border-b-0 w-full"
                    >
                      {/* Main Category - Klik etdikdə subcategory açılır */}
                      <div className="flex items-center justify-between py-4 w-full">
                        <button
                          onClick={() => toggleCategory(mainCat.id)}
                          className={`text-lg uppercase text-left flex-1 ${
                            ["men", "women", "kids"].includes(
                              mainCat.slug.toLowerCase()
                            )
                              ? "font-bold"
                              : "font-normal"
                          }`}
                        >
                          {mainCat.name}
                        </button>
                        {mainCat.children?.length > 0 && (
                          <button
                            onClick={() => toggleCategory(mainCat.id)}
                            className="p-2"
                          >
                            <svg
                              className={`w-5 h-5 transform transition-transform ${
                                expandedCategories[mainCat.id]
                                  ? "rotate-180"
                                  : ""
                              }`}
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </button>
                        )}
                      </div>

                      {/* Mobile Submenu */}
                      {expandedCategories[mainCat.id] &&
                        mainCat.children?.length > 0 && (
                          <div className="pl-4 pb-4 w-full">
                            {mainCat.children.map((subCat) => (
                              <div key={subCat.id} className="mb-4">
                                {/* SubCategory - klik etdikdə alt kategoriyalar açılır */}
                                <div className="flex items-center justify-between">
                                  <button
                                    onClick={() =>
                                      toggleCategory(`sub_${subCat.id}`)
                                    }
                                    className="block font-medium text-base mb-2 hover:text-gray-600 text-left flex-1"
                                  >
                                    {subCat.name}
                                  </button>
                                  {subCat.children?.length > 0 && (
                                    <button
                                      onClick={() =>
                                        toggleCategory(`sub_${subCat.id}`)
                                      }
                                      className="p-1"
                                    >
                                      <svg
                                        className={`w-4 h-4 transform transition-transform ${
                                          expandedCategories[`sub_${subCat.id}`]
                                            ? "rotate-180"
                                            : ""
                                        }`}
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M19 9l-7 7-7-7"
                                        />
                                      </svg>
                                    </button>
                                  )}
                                </div>

                                {/* Child categories - subcategory açıq olduqda görsənir */}
                                {expandedCategories[`sub_${subCat.id}`] &&
                                  subCat.children?.length > 0 && (
                                    <div className="ml-4">
                                      {subCat.children.map((child) => (
                                        <Link
                                          key={child.id}
                                          to={`/category/${child.id}`}
                                          className="block text-sm text-gray-600 mb-2 hover:text-black py-1"
                                          onClick={() =>
                                            setMobileMenuOpen(false)
                                          }
                                        >
                                          {child.name}
                                        </Link>
                                      ))}
                                    </div>
                                  )}
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  ))}
              </nav>
            </div>

            {/* Mobile Menu Footer - TAM GENIŞLIK */}
            <div className="p-2 border-t bg-gray-50 w-full">
              <div className="flex items-center justify-center space-x-6 mb-4 ">
                <Link
                  to="/Signin"
                  className="flex items-center space-x-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">Login</span>
                </Link>
                <Link
                  to="/Wishlist"
                  className="flex items-center space-x-1"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="w-5 h-5" />
                  <span className="text-sm">Wishlist</span>
                </Link>
              </div>
              <div className="space-y-2 flex   justify-between text-sm text-gray-600">
                <Link
                  to="/help"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Help
                </Link>
                <Link
                  to="/orders"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Orders and Returns
                </Link>
                <a
                  href="/gift-cards"
                  className="block"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Gift Cards
                </a>
                <a
                  href="/join"
                  className="block font-semibold text-black"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Join adiClub
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Popup */}
      {showPopup && (
        <div
          className={`fixed top-0 left-0 w-full bg-white border-t border-gray-300 px-3 py-32 flex flex-col md:flex-row justify-around z-[1000] shadow-lg transform transition-all duration-500 ease-in-out ${
            animatePopup
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-10 pointer-events-none"
          }`}
        >
          <div className="mb-6 md:mb-0">
            <h2 className="font-bold mb-2">
              FREE STANDARD SHIPPING WITH ADICLUB
            </h2>
            <p className="text-sm text-gray-600">
              Sign up for adiClub to enjoy free standard shipping and earn
              points on every order.
            </p>
            <a
              href="/signup"
              className="mt-2 inline-block text-sm font-semibold underline"
            >
              JOIN ADICLUB FOR FREE
            </a>
          </div>
          <div>
            <h2 className="font-bold mb-2">FAST, FREE DELIVERY WITH PRIME</h2>
            <p className="text-sm text-gray-600">
              Get fast, free delivery on eligible items with Prime.
            </p>
            <a
              href="#"
              className="mt-2 inline-block text-sm font-semibold underline"
            >
              FAST, FREE PRIME DELIVERY
            </a>
          </div>
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-4 right-4"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
