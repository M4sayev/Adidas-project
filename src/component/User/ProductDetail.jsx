import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import AsFooter from "../../pages/User/AsFooter";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const token = localStorage.getItem("token");

  useEffect(() => {
    console.log("Product ID:", id);
  }, [id]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/product/${id}`);
        setProduct(res.data);
        console.log("Fetched Product:", res.data);

        // Eyni kategoriyadan məhsulları gətir
        if (res.data.categoryId) {
          fetchRelatedProducts(res.data.categoryId);
        }
      } catch (err) {
        toast.error("Məhsul yüklənmədi ❌", err);
      }
    };
    fetchProduct();
  }, [id]);

  const fetchRelatedProducts = async (categoryId) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/product/category/${categoryId}`
      );

      const filtered = res.data.filter((p) => p.id !== parseInt(id));
      setRelatedProducts(filtered); // Maksimum 4 məhsul göstər
    } catch (err) {
      console.error("Oxşar məhsullar yüklənə bilmədi:", err);
    }
  };

  const handleAddToBasket = async () => {
    if (!token) {
      toast.error("Zəhmət olmasa əvvəlcə daxil olun ❌");
      navigate("/signin");
      return;
    }

    try {
      await axios.post(
        `http://localhost:3000/api/basket/${id}`,
        {
          color: selectedColor,
          size: selectedSize,
          quantity,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Məhsul basket-ə əlavə edildi ✅");

      setTimeout(() => {
        navigate("/basket");
      }, 1000);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Məhsul basket-ə əlavə edilə bilmədi ❌");
    }
  };

  const handleAddToWishlist = () => {
    const savedWishlist = localStorage.getItem("wishlist");
    let wishlistIds = savedWishlist ? JSON.parse(savedWishlist) : [];

    if (wishlistIds.includes(product.id)) {
      toast.info("Bu məhsul artıq wishlist-dədir");
      return;
    }

    wishlistIds.push(product.id);
    localStorage.setItem("wishlist", JSON.stringify(wishlistIds));

    toast.success("Məhsul wishlist-ə əlavə edildi");
  };

  const handleRelatedProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg">Yüklənir...</p>
      </div>
    );

  return (
    <>
      <div className="container mx-auto mt-30 px-4 py-8 mt-20">
        {/* Əsas məhsul məlumatları */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Sol tərəf - Şəkillər */}
          <div className="space-y-4">
            {/* Əsas şəkil */}
            <div className=" w-full flex items-center justify-center  overflow-hidden rounded-lg border">
              <img
                src={
                  product.images[selectedImageIndex]?.url ||
                  product.images[0]?.url
                }
                alt={product.name}
                className="h-full w-full object-cover lg:object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
            {/* Kiçik şəkillər (əgər çox şəkil varsa) */}
            {product.images && product.images.length > 1 && (
              <div className="flex space-x-2  overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden border-2 ${
                      selectedImageIndex === index
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={image.url}
                      alt={`${product.name} ${index + 1}`}
                      className="max-w-full max-h-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sağ tərəf - Məhsul məlumatları */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-gray-900 mb-4">
                {product.price} ₼
              </p>
              {product.slug && (
                <p className="text-sm text-gray-500 mb-4">
                  SKU: {product.slug}
                </p>
              )}
            </div>

            <div className="border-t border-b py-4">
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Rəng seçimi */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rəng seçin:
                </label>
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Rəng seçin</option>
                  {product.colors.map((color, index) => (
                    <option key={index} value={color}>
                      {color}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Ölçü seçimi */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ölçü seçin:
                </label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Ölçü seçin</option>
                  {product.sizes.map((size, index) => (
                    <option key={index} value={size}>
                      {size}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Miqdar seçimi */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Miqdar:
              </label>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1 border border-gray-300 rounded-md min-w-[60px] text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Düymələr */}
            <div className="flex space-x-4 pt-4">
              <button
                onClick={handleAddToBasket}
                className="flex-1 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors duration-200 font-medium"
              >
                Basket-ə əlavə et
              </button>
              <button
                onClick={handleAddToWishlist}
                className="bg-red-500 text-white px-6 py-3 rounded-md hover:bg-red-600 transition-colors duration-200 font-medium"
              >
                ♡ Wishlist
              </button>
            </div>
          </div>
        </div>

        {/* You may Also Like bölməsi */}
        {relatedProducts.length > 0 && (
          <div className="border-t pt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              You may Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <div
                  key={relatedProduct.id}
                  className="bg-white rounded-lg shadow-md  hover:shadow-lg transition-shadow duration-200 cursor-pointer"
                  onClick={() => handleRelatedProductClick(relatedProduct.id)}
                >
                  <div className="w-full h-max-70 overflow-hidden">
                    <img
                      src={relatedProduct.images[0]?.url}
                      alt={relatedProduct.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium text-gray-900 mb-2 truncate">
                      {relatedProduct.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedProduct.description}
                    </p>
                    <p className="text-xl font-semibold text-gray-900">
                      {relatedProduct.price} ₼
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <AsFooter />
    </>
  );
};

export default ProductDetail;
