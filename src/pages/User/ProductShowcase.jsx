import React, { useState } from 'react';
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('newArrivals');
  const [favorites, setFavorites] = useState(new Set());
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const products = {
    newArrivals: [
      { id: 1, name: 'Air Max Revolution', price: '$129', category: 'Running', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop&crop=center' },
      { id: 2, name: 'Urban Street Pro', price: '$95', category: 'Lifestyle', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=300&fit=crop&crop=center' },
      { id: 3, name: 'Classic Canvas', price: '$75', category: 'Casual', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400&h=300&fit=crop&crop=center' },
      { id: 4, name: 'Sport Elite', price: '$149', category: 'Training', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400&h=300&fit=crop&crop=center' },
      { id: 5, name: 'Retro Runner', price: '$110', category: 'Retro', image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop&crop=center' }
    ],
    bestSellers: [
      { id: 6, name: 'Premium Leather', price: '$199', category: 'Luxury', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=400&h=300&fit=crop&crop=center' },
      { id: 7, name: 'Performance Max', price: '$159', category: 'Running', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400&h=300&fit=crop&crop=center' },
      { id: 8, name: 'Street Style', price: '$85', category: 'Urban', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=400&h=300&fit=crop&crop=center' },
      { id: 9, name: 'High Top Classic', price: '$120', category: 'Basketball', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&h=300&fit=crop&crop=center' }
    ],
    newToSale: [
      { id: 10, name: 'Vintage Runner', price: '$69', originalPrice: '$95', category: 'Sale', image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=400&h=300&fit=crop&crop=center' },
      { id: 11, name: 'Comfort Plus', price: '$89', originalPrice: '$129', category: 'Sale', image: 'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400&h=300&fit=crop&crop=center' },
      { id: 12, name: 'Limited Edition', price: '$179', originalPrice: '$249', category: 'Sale', image: 'https://images.unsplash.com/photo-1618898909019-010e4e234c55?w=400&h=300&fit=crop&crop=center' }
    ]
  };

  const categories = [
    { id: 'newArrivals', label: 'New Arrivals' },
    { id: 'bestSellers', label: 'Best Sellers' },
    { id: 'newToSale', label: 'New to Sale' }
  ];

  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) newFavorites.delete(productId);
    else newFavorites.add(productId);
    setFavorites(newFavorites);
  };

  const currentProducts = products[activeCategory] || [];
  const productsPerSlide = 4;
  const maxSlides = Math.max(0, Math.ceil(currentProducts.length / productsPerSlide) - 1);
  const visibleProducts = currentProducts.slice(currentSlide * productsPerSlide, (currentSlide + 1) * productsPerSlide);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 bg-white">
      {/* Categories */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-x-1">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setCurrentSlide(0); }}
              className={`px-6 py-3 text-sm font-medium ${activeCategory === cat.id ? 'bg-black text-white' : 'bg-gray-100 text-gray-700'}`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Slider */}
      <div className="relative">
        {/* Prev/Next */}
        {maxSlides > 0 && (
          <>
            <button onClick={() => setCurrentSlide(currentSlide <= 0 ? maxSlides : currentSlide - 1)}
              className="absolute left-1 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10">
              <ChevronLeft />
            </button>
            <button onClick={() => setCurrentSlide(currentSlide >= maxSlides ? 0 : currentSlide + 1)}
              className="absolute right-1 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow z-10">
              <ChevronRight />
            </button>
          </>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-500">
          {visibleProducts.map(product => (
            <div key={product.id}
              className="group relative bg-gray-50 rounded-lg overflow-hidden hover:shadow-xl cursor-pointer"
              onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            >
              {/* Favorite */}
              <button onClick={(e) => { e.stopPropagation(); toggleFavorite(product.id); }}
                className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md">
                <Heart className={`w-5 h-5 ${favorites.has(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
              </button>

              <div className="aspect-square overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-4">
                 <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-500">{product.category}</p>
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Slide Indicators */}
        {maxSlides > 0 && (
          <div className="flex justify-center mt-4 gap-2">
            {Array.from({ length: maxSlides + 1 }, (_, i) => (
              <button key={i} className={`w-3 h-3 rounded-full ${currentSlide === i ? 'bg-black' : 'bg-gray-300'}`}
                onClick={() => setCurrentSlide(i)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductShowcase;
