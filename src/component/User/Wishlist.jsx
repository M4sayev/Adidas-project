import React, { useState, useEffect } from "react";
import { Heart, Trash2, ShoppingCart, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate əlavə et
import { toast } from "react-toastify";

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // login yoxlama funksiyası
  const checkAuth = () => {
    const token = localStorage.getItem("token"); 
    return !!token;
  };

  useEffect(() => {
    if (!checkAuth()) {
      navigate("/signin");
      return;
    }

    const loadWishlistItems = async () => {
      try {
        setLoading(true);
        const savedWishlist = localStorage.getItem("wishlist");

        if (!savedWishlist) {
          setWishlistItems([]);
          setLoading(false);
          return;
        }

        const wishlistIds = JSON.parse(savedWishlist);

        if (wishlistIds.length === 0) {
          setWishlistItems([]);
          setLoading(false);
          return;
        }

        const wishlistProducts = [];

        for (const productId of wishlistIds) {
          try {
            const response = await fetch(`/api/product/${productId}`);
            if (response.ok) {
              const product = await response.json();
              if (product && product.id) {
                wishlistProducts.push({
                  id: product.id,
                  name: product.name || "Ad tapılmadı",
                  price: product.price || 0,
                  image: product.images[0]?.url || "/placeholder.jpg",
                  category:
                    product.category?.name ||
                    product.category ||
                    "Kategoriya yoxdur",
                });
              }
            }
          } catch (error) {
            console.error(`Məhsul ${productId} yüklənə bilmədi:`, error);
          }
        }

        setWishlistItems(wishlistProducts);
      } catch (error) {
        console.error("Wishlist yüklənərkən xəta:", error);
        setWishlistItems([]);
      } finally {
        setLoading(false);
      }
    };

    loadWishlistItems();
  }, [navigate]);

  // Məhsulu wishlist-dən sil
  const removeFromWishlist = (productId) => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      const wishlistIds = JSON.parse(savedWishlist);
      const updatedIds = wishlistIds.filter((id) => id !== productId);
      localStorage.setItem("wishlist", JSON.stringify(updatedIds));

      // State-i yenilə
      setWishlistItems((prev) => prev.filter((item) => item.id !== productId));
    }
  };


  const clearWishlist = () => {
    localStorage.removeItem("wishlist");
    setWishlistItems([]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-black mx-auto mb-4"></div>
          <p className="text-gray-600">Wishlist yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-30 bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-center mb-8 gap-20">
          <div className="flex items-center justify-center gap-3">
           
            <h1 className="text-3xl font-bold text-gray-900">
              Beyendiklerim
            </h1>
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              {wishlistItems.length}
            </span>
          </div>

          
        </div>

        {/* Empty State */}
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              Wishlist-iniz boşdur
            </h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Bəyəndiyiniz məhsulları wishlist-ə əlavə edin və daha sonra onları
              rahatlıqla tapın
            </p>
            <Link
              to="/category/62"
              className="inline-flex items-center px-6 py-3 bg-black text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Alış-verişə başla
            </Link>
          </div>
        ) : (
          /* Products Grid */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlistItems.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow p-6 group"
              >
                {/* Product Image */}
                <div className="relative mb-4">
                  <Link to={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-max-48 object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
                    />
                  </Link>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-full shadow-sm transition-all hover:scale-110"
                  >
                    <X className="w-4 h-4 text-gray-500 hover:text-red-500" />
                  </button>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-semibold text-lg text-gray-900 hover:text-gray-600 transition-colors line-clamp-2">
                      {product.name}
                    </h3>
                  </Link>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                      {product.price} ₼
                    </span>
                    <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                      {product.category?.name ||
                        product.category ||
                        "Kategoriya"}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 mt-4">
                    <Link
                      to={`/product/${product.id}`}
                      className="w-full px-4 py-2 border text-center border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Bax
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {wishlistItems.length > 0 && (
          <div className="mt-12 flex justify-center text-center gap-10">
            <Link
              to="/category/62"
              className="inline-flex items-center px-8 py-3 bg-gray-900 text-white font-medium rounded-lg hover:bg-gray-800 transition-colors"
            >
              Daha çox məhsul kəşf et
            </Link>


            {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Hamısını sil
            </button>
          )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
