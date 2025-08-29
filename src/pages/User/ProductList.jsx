import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Heart, Filter, ChevronLeft, Home } from "lucide-react";
import axios from "axios";
import CategoryOption from "./CategoryOption";
import Teaser from "./Teaser";
import TopPicks from "./TopPicks";
import AsFooter from "./AsFooter";
import Banner from "./Banner";
import FilterSort from "./FilterSort";

const ProductList = () => {
  const { id } = useParams();
  const idnum = Number(id);
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [allCategories, setAllCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState(new Set());
  const [activeSubCategory, setActiveSubCategory] = useState(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("default");
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [showAuthModal, setShowAuthModal] = useState(false);

  // 🔑 login yoxlama
  const checkAuth = () => {
    const token = localStorage.getItem("token");
    return !!token;
  };

  const findCategoryById = (categories, id) => {
    for (let cat of categories) {
      if (cat.id === id) return cat;
      if (cat.children) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  const findCategoryPath = (categories, targetId, path = []) => {
    for (let cat of categories) {
      const currentPath = [...path, cat];
      if (cat.id === targetId) return currentPath;
      if (cat.children) {
        const found = findCategoryPath(cat.children, targetId, currentPath);
        if (found) return found;
      }
    }
    return null;
  };

  const findParentCategory = (categories, targetId) => {
    for (let cat of categories) {
      if (cat.children) {
        for (let child of cat.children) {
          if (child.id === targetId) return cat;
          const found = findParentCategory([child], targetId);
          if (found) return found;
        }
      }
    }
    return null;
  };

  const toggleFavorite = (productId) => {
    if (!checkAuth()) {
      setShowAuthModal(true);
      return;
    }

    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);

    try {
      localStorage.setItem("wishlist", JSON.stringify([...newFavorites]));
    } catch (error) {
      console.warn("LocalStorage not available");
    }
  };

  const handleSubCategoryClick = async (subCatId) => {
    setActiveSubCategory(subCatId);
    try {
      const prodRes = await axios.get(`/api/product/category/${subCatId}`);
      const productsArray = Array.isArray(prodRes.data)
        ? prodRes.data
        : [prodRes.data];
      setProducts(productsArray);
      setFilteredProducts(productsArray);
    } catch (err) {
      console.error(err);
    }
  };

  const applyFilters = () => {
    let filtered = [...products];

    if (selectedColors.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.colors &&
          product.colors.some((color) => selectedColors.includes(color))
      );
    }

    if (selectedSizes.length > 0) {
      filtered = filtered.filter(
        (product) =>
          product.sizes &&
          product.sizes.some((size) => selectedSizes.includes(size))
      );
    }

    switch (sortBy) {
      case "price_low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price_high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    applyFilters();
  }, [products, selectedColors, selectedSizes, sortBy]);

  const handleColorFilter = (color) => {
    setSelectedColors((prev) =>
      prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
    );
  };

  const handleSizeFilter = (size) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const getUniqueColors = () => {
    const colors = new Set();
    products.forEach((product) => {
      if (product.colors) {
        product.colors.forEach((color) => colors.add(color));
      }
    });
    return Array.from(colors);
  };

  const getUniqueSizes = () => {
    const sizes = new Set();
    products.forEach((product) => {
      if (product.sizes) {
        product.sizes.forEach((size) => sizes.add(size));
      }
    });
    return Array.from(sizes);
  };

  const handleClearFilters = () => {
    setSortBy("default");
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setFavorites(new Set(JSON.parse(savedWishlist)));
      }
    } catch (error) {
      console.warn("LocalStorage not available");
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        const catRes = await axios.get("/api/category");
        setAllCategories(catRes.data);
        const selectedCat = findCategoryById(catRes.data, idnum);
        setCategory(selectedCat || null);

        if (selectedCat) {
          const prodRes = await axios.get(`/api/product/category/${idnum}`);
          const productsArray = Array.isArray(prodRes.data)
            ? prodRes.data
            : [prodRes.data];
          setProducts(productsArray);
          setFilteredProducts(productsArray);

          const parentCat = findParentCategory(catRes.data, idnum);
          if (parentCat) {
            setActiveSubCategory(idnum);
          } else {
            setActiveSubCategory(idnum);
          }
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idnum]);

  if (loading) return <div>Loading...</div>;
  if (!category) return <div className="mt-50">Category not found</div>;

  const categoryPath = findCategoryPath(allCategories, idnum) || [];
  const parentCategory = findParentCategory(allCategories, idnum);

  return (
    <>
      {/* Banner */}
      <div className="w-full mt-35 h-full object-cover lg:object-cover object-right md:object-cover">
        {["Men", "WOmen", "Kids"].includes(category.slug) && (
          <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <img
              src={`/${category.slug}.avif`}
              alt="Banner"
              className="w-full h-full object-cover object-right md:object-cover"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-start px-6 md:px-12 lg:px-20 pb-10">
              <h2 className="md:text-lg lg:text-xl font-extrabold px-1 py-1 bg-white text-black mb-2">
                SUPERSTAR
              </h2>
              <p className="text-xs md:text-sm lg:text-base px-2 py-1 bg-white text-black mb-6">
                Because icons wear the original icon.
              </p>
              <div className="flex flex-row gap-3">
                <Link
                  to={`/category/${category.id}`}
                  className="flex items-center border px-4 py-3 bg-white text-black font-bold text-xs md:text-sm lg:text-base group hover:bg-gray-100 transition-colors"
                >
                  SHOP NOW
                  <svg
                    className="ml-2 w-5 h-5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
                    viewBox="0 0 32 32"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M4 15.3536H26.2929L22.6464 11.7072L23.3536 11L28.2071 15.8536L23.3536 20.7072L22.6464 20L26.2929 16.3536H4V15.3536Z"
                      fill="black"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        {["Men", "Women", "Kids"].includes(category.name) ? (
          <>
            <CategoryOption />
            <Teaser />
            <TopPicks />
          </>
        ) : (
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <button
                onClick={() => window.history.back()}
                className="flex items-center hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                BACK
              </button>
              <span className="text-gray-400">/</span>
              <Link
                to="/"
                className="hover:text-gray-900 transition-colors flex items-center"
              >
                <Home className="w-4 h-4 mr-1" />
                Home
              </Link>
              {categoryPath.map((cat) => (
                <div key={cat.id} className="flex items-center">
                  <span className="text-gray-400">/</span>
                  <Link
                    to={`/category/${cat.id}`}
                    className="hover:text-gray-900 transition-colors ml-2"
                  >
                    {cat.name}
                  </Link>
                </div>
              ))}
            </div>

            {/* Category Header */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {category.name.toUpperCase()}
              </h2>

              <div className="flex items-center justify-between mb-6">
                <div className="flex flex-wrap">
                  {category.children && category.children.length > 0
                    ? [category, ...category.children].map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleSubCategoryClick(cat.id)}
                          className={`mr-6 pb-2 border-b-2 transition-colors ${
                            activeSubCategory === cat.id
                              ? "border-black text-black font-medium"
                              : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))
                    : parentCategory?.children?.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => handleSubCategoryClick(cat.id)}
                          className={`mr-6 pb-2 border-b-2 transition-colors ${
                            activeSubCategory === cat.id
                              ? "border-black text-black font-medium"
                              : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
                          }`}
                        >
                          {cat.name}
                        </button>
                      ))}
                </div>

                <button
                  onClick={() => setFilterOpen(true)}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  FILTER & SORT
                </button>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="relative bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                >
                  <button
                    onClick={() => toggleFavorite(prod.id)}
                    className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        favorites.has(prod.id)
                          ? "text-red-500 fill-red-500"
                          : "text-gray-400 hover:text-red-400"
                      }`}
                    />
                  </button>

                  <Link to={`/product/${prod.id}`} className="block group">
                    {prod.images?.length > 0 && (
                      <div className="aspect-square bg-gray-100 overflow-hidden flex items-center justify-center">
                        <img
                          src={prod.images[0].url}
                          alt={prod.name}
                          className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                    )}

                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {prod.name}
                      </h3>
                      {prod.description && (
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {prod.description}
                        </p>
                      )}
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-gray-900">
                          ${prod.price}
                        </span>
                        {prod.originalPrice &&
                          prod.originalPrice > prod.price && (
                            <span className="text-sm text-red-500 font-medium">
                              Sale
                            </span>
                          )}
                      </div>
                      {prod.originalPrice &&
                        prod.originalPrice > prod.price && (
                          <span className="text-sm text-gray-400 line-through">
                            ${prod.originalPrice}
                          </span>
                        )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found in this category.
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Filter Sort */}
      <FilterSort
        filterOpen={filterOpen}
        setFilterOpen={setFilterOpen}
        sortBy={sortBy}
        setSortBy={setSortBy}
        selectedColors={selectedColors}
        selectedSizes={selectedSizes}
        handleColorFilter={handleColorFilter}
        handleSizeFilter={handleSizeFilter}
        getUniqueColors={getUniqueColors}
        getUniqueSizes={getUniqueSizes}
        onClearFilters={handleClearFilters}
      />

      {/* 🔹 Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full text-center">
            <h2 className="text-xl font-bold mb-4">Daxil ol</h2>
            <p className="text-gray-600 mb-6">
              Məhsulu wishlist-ə əlavə etmək üçün əvvəlcə hesabınıza daxil olun.
            </p>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setShowAuthModal(false)}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50"
              >
                Bağla
              </button>
              <button
                onClick={() => navigate("/signin")}
                className="px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800"
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      )}

      <Banner />
      <AsFooter />
    </>
  );
};

export default ProductList;
