import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

const ProductDetail = () => {
  const location = useLocation();
  const { product } = location.state || {}; // undefined olarsa boş obyektdən al
  const { id } = useParams();

  if (!product) {
    return <div className="text-center p-10">Product not found!</div>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2">
          <img src={product.image} alt={product.name} className="w-full object-cover rounded-lg" />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-gray-500 mb-4">{product.category}</p>
          <div className="text-2xl font-bold mb-4">{product.price}</div>

          {product.originalPrice && (
            <div className="text-gray-500 line-through mb-2">{product.originalPrice}</div>
          )}

          {product.colors && product.colors.length > 0 && (
            <div className="flex gap-2 mt-4">
              {product.colors.map((color, index) => (
                <span
                  key={index}
                  className="w-6 h-6 rounded-full border border-gray-300"
                  style={{ backgroundColor: color }}
                  
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
 