import React, { useState } from "react";
import { Heart } from "lucide-react";
import { useGetProductsQuery } from "../../store/newsApi";

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

  const toggleFavorite = (id) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(id)) newFavorites.delete(id);
    else newFavorites.add(id);
    setFavorites(newFavorites);
  };

  const filteredProducts = products.filter(
    (p) =>
      p.category?.name === selectedCategory || p.category === selectedCategory
  );

  if (isLoading) return <p className="text-center text-gray-500">Loading...</p>;
  if (isError)
    return <p className="text-center text-red-500">Xəta baş verdi!</p>;

  return (
    <div className="py-10 px-6">
      <h2 className="text-2xl font-bold mb-6">Top Picks</h2>

      {/* Category Tabs */}
      <div className="flex gap-4 mb-8">
        {["Men", "Women", "Kids"].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg font-semibold transition ${
              selectedCategory === cat
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="relative border rounded-2xl shadow hover:shadow-lg transition p-4"
          >
            <img
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              className="w-full h-48 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-gray-600">{product.price} ₼</p>

            <button
              onClick={() => toggleFavorite(product.id)}
              className="absolute top-3 right-3"
            >
              <Heart
                className={`w-6 h-6 ${
                  favorites.has(product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400"
                }`}
              />
            </button>
          </div>
        ))}
      </div>

      {/* Category Description */}
      <div className="mt-10  whitespace-pre-line text-center max-w-xl mx-auto leading-relaxed">
        {(() => {
          const text = categoryDescriptions[selectedCategory];
          if (!text) return null;

          const sentences = text.split(".");
          const firstSentence = sentences[0];
          const rest = sentences.slice(1).join(".");

          return (
            <>
              <p className="font-bold text-4xl">{firstSentence}</p>
              {rest}
            </>
          );
        })()}
      </div>

      <div className="grid grid-cols-3 md:grid-cols-4 gap-8 ml-20 mb-10  mt-20">
        {Object.entries(categoryMenu[selectedCategory]).map(
          ([section, items]) => (
            <div key={section}>
              <h3 className="font-bold mb-3">{section}</h3>
              <ul className="space-y-2 text-gray-700">
                {items.map((item) => (
                  <li key={item} className="hover:underline cursor-pointer">
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
