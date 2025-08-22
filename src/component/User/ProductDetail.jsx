import React from "react";
import { useParams } from "react-router-dom";

const ProductDetail = () => {
  const { id } = useParams();

  return (
    <div className="max-w-5xl mt-40 mx-auto p-6">
      <div className="flex flex-col md:flex-row ga  p-6">
        <div className="md:w-1/2">
          <img
            src={id.image}
            alt={id.name}
            className="w-full object-cover rounded-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-2">{id.name}</h1>
          <p className="text-gray-500 mb-4">{id.category}</p>
          <div className="text-2xl font-bold mb-4">{id.price}</div>

          {id.originalPrice && (
            <div className="text-gray-500 line-through mb-2">
              {id.originalPrice}
            </div>
          )}

          {id.colors && id.colors.length > 0 && (
            <div className="flex gap-2 mt-4">
              {id.colors.map((color, index) => (
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
