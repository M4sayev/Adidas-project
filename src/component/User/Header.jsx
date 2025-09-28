import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, ShoppingCart, User, Search, X, Heart } from "lucide-react";
import Banner from "./Header/Banner";
import TopLinks from "./Header/TopLinks";
import DesktopNav from "./Header/DesktopNav";
import MobileHeader from "./Header/Mobile/MobileHeader";
import MobileSearch from "./Header/Mobile/MobileSearch";
import MobileNav from "./Header/Mobile/MobileNav";
import MobileFooter from "./Header/Mobile/MobileFooter";
import Popup from "./Header/Popup";
import MobileMenu from "./Header/Mobile/MobileMenu";

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
          <Banner
            setShowPopup={setShowPopup}
            rotatingMessages={rotatingMessages}
            bannerIndex={bannerIndex}
          />
        )}

        {/* Top links - hidden on mobile */}
        <TopLinks />

        {/* Main Header */}
        <DesktopNav
          handleCategoryMouseEnter={handleCategoryMouseEnter}
          handleCategoryMouseLeave={handleCategoryMouseLeave}
          hoveredCat={hoveredCat}
          handleDropdownMouseEnter={handleDropdownMouseEnter}
          handleDropdownMouseLeave={handleDropdownMouseLeave}
          categories={categories}
          basketCount={basketCount}
          searchQuery={searchQuery}
          handleSearchChange={handleSearchChange}
          handleSearchSubmit={handleSearchSubmit}
          showSearchDropdown={showSearchDropdown}
          searchResults={searchResults}
          isSearching={isSearching}
          handleSearchResultClick={handleSearchResultClick}
          setShowSearchDropdown={setShowSearchDropdown}
          navigate={navigate}
          toggleMobileMenu={toggleMobileMenu}
        />
      </div>

      {/* Mobile Menu Overlay - TAM EKRAN */}
      {mobileMenuOpen && (
        <MobileMenu
          toggleMobileMenu={toggleMobileMenu}
          setMobileMenuOpen={setMobileMenuOpen}
          categories={categories}
          expandedCategories={expandedCategories}
          toggleCategory={toggleCategory}
          mobileSearchQuery={mobileSearchQuery}
          setMobileSearchQuery={setMobileSearchQuery}
          mobileSearchResults={mobileSearchResults}
          setMobileSearchResults={setMobileSearchResults}
          allProducts={allProducts}
          setSearchQuery={setSearchQuery}
          navigate={navigate}
          handleMobileSearchSubmit={handleMobileSearchSubmit}
        />
      )}

      {/* Popup */}
      {showPopup && (
        <Popup animatePopup={animatePopup} setShowPopup={setShowPopup} />
      )}
    </header>
  );
};

export default Header;
