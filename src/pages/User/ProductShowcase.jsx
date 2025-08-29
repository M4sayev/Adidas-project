import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('newArrivals');
  const [products, setProducts] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // Responsive items per slide based on screen size
  const getItemsPerSlide = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 1; // mobile
      if (window.innerWidth < 768) return 2; // tablet portrait
      if (window.innerWidth < 1024) return 3; // tablet landscape
      return 4; // desktop
    }
    return 4;
  };
  
  const [itemsPerSlide, setItemsPerSlide] = useState(getItemsPerSlide());

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const newItemsPerSlide = getItemsPerSlide();
      if (newItemsPerSlide !== itemsPerSlide) {
        setItemsPerSlide(newItemsPerSlide);
        setCurrentSlide(0); // Reset slide when layout changes
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [itemsPerSlide]);

  // Login statusunu yoxla
  useEffect(() => {
    const token = localStorage.getItem('authToken') || localStorage.getItem('token') || localStorage.getItem('accessToken');
    setIsLoggedIn(!!token);
  }, []);

  // Kateqoriyaya görə məhsulları çəkmək
  useEffect(() => {
    if (!activeCategory) return;
    
    setLoading(true);
    setCurrentSlide(0); // Yeni kateqoriya seçəndə slider-ı sıfırla
    const activeCategoryObj = categories.find(c => c.id === activeCategory);
    
    if (activeCategoryObj) {
      // Spesifik kateqoriya üçün məhsulları çək
      fetch(`http://localhost:3000/api/product/category/${activeCategoryObj.categoryId}`)
        .then(res => res.json())
        .then(data => {
          console.log("API Response for category:", data);
          setProducts(Array.isArray(data) ? data : []);
        })
        .catch(err => {
          console.error("Product fetch error:", err);
          // Əgər kateqoriya endpoint-i işləməzsə, bütün məhsulları çək
          return fetch("http://localhost:3000/api/product")
            .then(res => res.json())
            .then(data => {
              const productData = data.data || data || [];
              setProducts(productData);
            });
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [activeCategory]);

  // Wishlist - yalnız login olmuş istifadəçilər üçün
  useEffect(() => {
    if (!isLoggedIn) {
      setFavorites([]);
      return;
    }

    try {
      const savedWishlist = JSON.parse(localStorage.getItem('wishlist') || '[]');
      setFavorites(savedWishlist);
    } catch (error) {
      console.warn('Could not load from localStorage:', error);
      setFavorites([]);
    }
  }, [isLoggedIn]);

  const categories = [
    { id: 'newArrivals', label: 'New Arrivals', categoryId: 92 },
    { id: 'bestSellers', label: 'Best Sellers', categoryId: 93 },
    { id: 'newToSale', label: 'New to Sale', categoryId: 94 }
  ];

  const toggleFavorite = (productId) => {
    // Login yoxlaması
    if (!isLoggedIn) {
      alert('Wishlist-ə məhsul əlavə etmək üçün daxil olun');
      return;
    }

    setFavorites(prev => {
      let updated;
      if (prev.includes(productId)) {
        updated = prev.filter(id => id !== productId);
      } else {
        updated = [...prev, productId];
      }
      // localStorage-ı yalnız state update edildikdən sonra yeniləyin
      try {
        localStorage.setItem('wishlist', JSON.stringify(updated));
      } catch (error) {
        console.warn('Could not save to localStorage:', error);
      }
      return updated;
    });
  };

  const activeCategoryObj = categories.find(c => c.id === activeCategory);

  // İndi filtr etməyə ehtiyac yoxdur - API-dən artıq filtrlənmiş məhsullar gəlir
  const currentProducts = products;
  
  // Slider üçün hesablamalar
  const totalSlides = Math.ceil(currentProducts.length / itemsPerSlide);
  const currentSlideProducts = currentProducts.slice(
    currentSlide * itemsPerSlide,
    (currentSlide + 1) * itemsPerSlide
  );
  
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % totalSlides);
  };
  
  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + totalSlides) % totalSlides);
  };
  
  return (
    <div className="w-full max-w-7xl mx-auto p-3 sm:p-4 lg:p-6 bg-white">
      {/* Categories */}
      <div className="flex justify-start items-center mb-6 sm:mb-8 space-x-1 sm:space-x-2 flex-wrap gap-1 sm:gap-2">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-2.5 lg:py-3 text-xs sm:text-sm font-medium rounded-lg transition-colors ${
              activeCategory === cat.id
                ? 'bg-black text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
            {/* Məhsul sayını göstərmək üçün ayrıca API sorğusu lazımdır */}
          </button>
        ))}
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center py-8 sm:py-12">
          <div className="text-gray-500 text-sm sm:text-base">Loading products...</div>
        </div>
      )}

      {/* Products Slider Container */}
      {!loading && currentProducts.length > 0 && (
        <div className="relative">
          {/* Slider Navigation Buttons - Hide on mobile if only 1 item per slide */}
          {totalSlides > 1 && (
            <>
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:-left-4 lg:-left-6 top-1/2 transform -translate-y-1/2 -translate-x-2 sm:-translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
                aria-label="Previous products"
              >
                <svg className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:-right-4 lg:-right-6 top-1/2 transform -translate-y-1/2 translate-x-2 sm:translate-x-4 z-10 bg-white rounded-full p-2 sm:p-3 shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200"
                aria-label="Next products"
              >
                <svg className="w-4 h-4 sm:w-5 h-5 lg:w-6 lg:h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          {/* Products Grid - Responsive columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 overflow-hidden px-4 sm:px-0">
            {currentSlideProducts.map(product => (
              <div  
                key={product.id}
                className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl cursor-pointer transform hover:-translate-y-1 transition-all duration-300 flex flex-col"
                
              >
                <button
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                  className={`absolute top-2 sm:top-3 lg:top-4 right-2 sm:right-3 lg:right-4 z-10 p-1.5 sm:p-2 rounded-full shadow-md hover:shadow-lg transition-all duration-200 ${
                    isLoggedIn 
                      ? 'bg-white hover:bg-gray-50' 
                      : 'bg-gray-100 hover:bg-gray-200 cursor-pointer'
                  }`}
                  aria-label={
                    !isLoggedIn 
                      ? "Login to add to favorites" 
                      : favorites.includes(product.id) 
                        ? "Remove from favorites" 
                        : "Add to favorites"
                  }
                >
                  <Heart className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors ${
                    isLoggedIn && favorites.includes(product.id)
                      ? 'fill-red-500 text-red-500'
                      : isLoggedIn
                        ? 'text-gray-400 hover:text-red-400'
                        : 'text-gray-300'
                  }`} />
                  {!isLoggedIn && (
                    <div className="absolute -top-0.5 sm:-top-1 -right-0.5 sm:-right-1 w-2 h-2 sm:w-3 sm:h-3 bg-orange-500 rounded-full flex items-center justify-center">
                      <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-white rounded-full"></div>
                    </div>
                  )}
                </button>

                <Link className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200"
                  to={`/product/${product.id}`}
                >
                  {product.images?.[0]?.url ? (
                    <img
                      src={product.images[0].url}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span className="text-xs sm:text-sm">No Image</span>
                    </div>
                  )}
                </Link>

                <div className="p-3 sm:p-4 flex-grow flex flex-col justify-between">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-xs sm:text-sm leading-tight">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between flex-wrap gap-1">
                    <span className="text-base sm:text-lg font-bold text-gray-900">
                      ${product.price}
                    </span>
                    {(product.category || product.categoryId || product.category_id) && (
                      <span className="text-xs text-gray-500 bg-gray-200 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded">
                        {product.category?.name || `ID: ${product.categoryId || product.category_id || product.category}`}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Placeholder cards to maintain grid structure */}
            {currentSlideProducts.length < itemsPerSlide && 
              Array.from({ length: itemsPerSlide - currentSlideProducts.length }).map((_, index) => (
                <div key={`placeholder-${index}`} className="invisible">
                  <div className="aspect-square"></div>
                </div>
              ))
            }
          </div>

          {/* Slider Indicators */}
          {totalSlides > 1 && (
            <div className="flex justify-center mt-6 sm:mt-8 space-x-1.5 sm:space-x-2">
              {Array.from({ length: totalSlides }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-colors duration-200 ${
                    index === currentSlide
                      ? 'bg-black'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Slide Counter */}
          {totalSlides > 1 && (
            <div className="text-center mt-3 sm:mt-4 text-xs sm:text-sm text-gray-500">
              {currentSlide + 1} / {totalSlides}
            </div>
          )}
        </div>
      )}

      {/* Empty state */}
      {!loading && products.length > 0 && currentProducts.length === 0 && (
        <div className="flex justify-center items-center py-8 sm:py-12">
          <div className="text-center px-4">
            <div className="text-gray-500 text-base sm:text-lg mb-2">No products found in this category.</div>
            <div className="text-gray-400 text-xs sm:text-sm">
              Try selecting a different category or check if products have the correct category IDs.
            </div>
          </div>
        </div>
      )}

      {/* No products at all */}
      {!loading && products.length === 0 && (
        <div className="flex justify-center items-center py-8 sm:py-12">
          <div className="text-gray-500 text-sm sm:text-base">No products available.</div>
        </div>
      )}
    </div>
  );
};

export default ProductShowcase;