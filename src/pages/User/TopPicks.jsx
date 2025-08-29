import React, { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useGetProductsQuery } from "../../store/newsApi";
import { Link } from "react-router-dom";

const categoryDescriptions = {
  Men: `Men's Sneakers and Workout Clothes.
Attention, athletes and creators. Stand tall, stand proud and perform your best in men's shoes and apparel that support your passion and define your style. adidas takes fitness and comfort seriously. Workout with cutting-edge cushioning, or set the casual standard off the field with heritage sports style. adidas is here, and has always been, with men's workout clothes and sneakers for dreamers, athletes and everyday wear. Gear up with our best-in-class activewear that fits and feels as great as it looks. Experience the adidas difference.`,

  Women: `Women's Sneakers and Workout Clothes.
  Look great. Feel great. Perform great. Keep your workout on track with women's sneakers that support focused training with a supportive fit and a cushioned midsole. Designed for performance and comfort, our women's workout clothes and shoes support athletes and training at every level. Experience adidas technologies that support cool, dry comfort through intense workouts. Put your fitness first with adidas women's workout shoes and running clothes that breathe, manage sweat and help you realize your fitness goals.
`,

  Kids: `Kids's Sneakers and Workout Clothes.
Aspiring sports stars and busy kids deserve the best. Explore kids' sneakers and sportswear for active girls and boys. Fulfill their sports dreams with matching kids' activewear and warm-ups that fit and feel great from the classroom to the playground, the gym, and home. Enjoy the best selection of comfy kids' clothes and sneakers to keep your young athlete excited to exercise and play their best. Discover the latest trends and heritage adidas styles in kids' athletic clothes, sneakers, cleats and accessories.`,
};

const categoryMenu = {
  Men: {
    "MEN COLLECTIONS": ["Sneakers", "Clothing", "Sportswear", "Accessories"],
    "MEN SHOES": [
      "Running Shoes",
      "Casual Sneakers",
      "Football Boots",
      "Slides",
    ],
    "MEN ACCESSORIES": ["Socks", "Hats", "Backpacks", "Sunglasses"],
    "MEN BACK TO SCHOOL": ["Uniforms", "Bags", "Shoes", "Clothes"],
  },
  Women: {
    "WOMEN COLLECTIONS": ["Sneakers", "Clothing", "Sportswear", "Accessories"],
    "WOMEN SHOES": ["Running Shoes", "Casual Sneakers", "High Heels", "Slides"],
    "WOMEN ACCESSORIES": ["Socks", "Hats", "Backpacks", "Sunglasses"],
    "WOMEN BACK TO SCHOOL": ["Uniforms", "Bags", "Shoes", "Clothes"],
  },
  Kids: {
    "KIDS COLLECTIONS": [
      "Infant & Toddler",
      "Boys",
      "Girls",
      "Disney",
      "Sportswear",
    ],
    "KIDS' SHOES": [
      "Casual Sneakers",
      "High Top Sneakers",
      "Slides & Sandals",
      "Cleats",
      "Boots",
    ],
    "KIDS' ACCESSORIES": [
      "Socks",
      "Hats",
      "Gloves",
      "Backpacks & Bags",
      "Sunglasses",
    ],
    "KIDS' BACK TO SCHOOL": [
      "Kids' School Uniforms",
      "Kids' Backpacks & Bags",
      "Kids' Lunch Bags",
      "Kids' School Shoes",
      "Kids' Back to School Clothes",
    ],
  },
};

const TopPicks = () => {
  const [favorites, setFavorites] = useState(new Set());
  const [selectedCategory, setSelectedCategory] = useState("Men");

  const { data, isLoading, isError } = useGetProductsQuery();
  const products = Array.isArray(data) ? data : data?.data || [];

  // Wishlist funksionallığı
  const toggleFavorite = (productId, event) => {
    event.preventDefault();
    event.stopPropagation();
    
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
    } else {
      newFavorites.add(productId);
    }
    setFavorites(newFavorites);
    
    // localStorage-da saxla
    const wishlistArray = Array.from(newFavorites);
    localStorage.setItem('wishlist', JSON.stringify(wishlistArray));
  };

  // Səhifə yüklənəndə wishlist-i yüklə
  useEffect(() => {
    const savedWishlist = localStorage.getItem('wishlist');
    if (savedWishlist) {
      setFavorites(new Set(JSON.parse(savedWishlist)));
    }
  }, []);

  const filteredProducts = products.filter(
    (p) =>
      p.category?.name === selectedCategory || p.category === selectedCategory
  );

  const handleProductClick = (productId) => {
    // Link functionality - in real app would use: <Link to={`/product/${productId}`}>
    console.log(`Maps to product: ${productId}`);
  };

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Xəta baş verdi!</p>;

  return (
    <div className="py-6 sm:py-8 lg:py-10 px-4 sm:px-6 lg:ml-20 lg:px-6">
      <h2 className="text-2xl sm:text-3xl uppercase font-extrabold mb-4 sm:mb-6 text-center lg:text-left">
        Top Picks for You
      </h2>

      {/* Category Tabs */}
      <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4 mb-6 sm:mb-8">
        {["Men", "Women", "Kids"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 sm:px-4 py-2 rounded-lg font-semibold text-sm sm:text-base transition ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Slider */}
      <div className="flex overflow-x-auto gap-4 scroll-smooth pb-4 no-scrollbar">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="flex-shrink-0 w-64 sm:w-72 lg:w-80 relative"
          >
            <div
              onClick={() => handleProductClick(product.id)}
              className="block border shadow hover:shadow-lg transition-all duration-300  cursor-pointer transform hover:-translate-y-1 h-full flex flex-col justify-between"
            >
              <Link 
                to={`/product/${product.id}`}
                className="relative overflow-hidden  mb-3 sm:mb-4">
                <img
                  src={product.images[0].url || "/placeholder.jpg"}
                  alt={product.name}
                  className="w-full h-max-40  object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </Link>
              <div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-1 sm:mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base font-medium">
                  {product.price} $
                </p>
              </div>
            </div>

            {/* Wishlist Heart Button */}
            <button
              onClick={(event) => toggleFavorite(product.id, event)}
              className="absolute top-5 sm:top-7 right-5 sm:right-7 z-10 p-1.5 sm:p-2 rounded-full bg-white/90 hover:bg-white shadow-sm transition-all duration-200 hover:scale-110"
            >
              <Heart
                className={`w-4 h-4 sm:w-5 sm:h-5 transition-colors duration-200 ${
                  favorites.has(product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400 hover:text-red-400"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Category Description */}
      <div className="mt-8 sm:mt-10 whitespace-pre-line text-center max-w-xl mx-auto leading-relaxed px-4">
        {(() => {
          const text = categoryDescriptions[selectedCategory];
          if (!text) return null;

          const sentences = text.split(".");
          const firstSentence = sentences[0];
          const rest = sentences.slice(1).join(".");

          return (
            <>
              <p className="font-bold text-2xl sm:text-3xl lg:text-4xl mb-4">
                {firstSentence}
              </p>
              <p className="text-sm sm:text-base text-gray-700">
                {rest}
              </p>
            </>
          );
        })()}
      </div>

      {/* Category Menu */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 px-4 sm:px-0 lg:ml-20 mb-6 sm:mb-10 mt-12 sm:mt-20">
        {Object.entries(categoryMenu[selectedCategory]).map(
          ([section, items]) => (
            <div key={section}>
              <h3 className="font-bold mb-3 text-sm sm:text-base">
                {section}
              </h3>
              <ul className="space-y-2 text-gray-700">
                {items.map((item) => (
                  <li 
                    key={item} 
                    className="hover:underline cursor-pointer text-xs sm:text-sm lg:text-base transition-colors duration-200 hover:text-black"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default TopPicks;