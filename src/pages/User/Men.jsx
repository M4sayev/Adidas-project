import React from "react";
import { useGetProductsQuery } from "../../store/newsApi";

const Men = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  if (isLoading) return <p className="p-4">Yüklənir...</p>;
  if (error) return <p className="p-4 text-red-500">Xəta baş verdi</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products && products.length > 0 ? (
        products.map((product) => (
          <ProductCard key={product.id || product._id} product={product} />
        ))
      ) : (
        <p>Məhsul tapılmadı</p> 
      )}
    </div>
  );
};

const getImageUrl = (image) => {
  if (!image) return null;
  if (typeof image === "string") return image;
  if (typeof image === "object") return image.url || image.name || image.filename || null;
  return null;
};
const ProductCard = ({ product }) => {
  if (!product.images || product.images.length === 0) return null;

  const addToBasket = async () => {
    try {
      await fetch("http://localhost:3000/api/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      alert("Məhsul səbətə əlavə olundu!");
    } catch (err) {
      console.error("Basket error:", err);
      alert("Xəta baş verdi.");
    }
  };

  return (
    <div className="p-3 bg-gray-200 rounded shadow">
      <h3 className="font-semibold text-center underline mb-2">{product.name}</h3>
      <p className="text-center text-gray-700 mb-3">{product.price} ₼</p>

      <div className="grid grid-cols-2 gap-2">
        {product.images.map((img, idx) => {
          const imageUrl = getImageUrl(img);
          return (
            <img
              key={idx}
              src={imageUrl || "https://via.placeholder.com/150x150?text=No+Image"}
              alt={`${product.name} ${idx + 1}`}
              className="w-full h-32 object-cover rounded"
            />
          );
        })}
      </div>

      <button
        onClick={addToBasket}
        className="mt-3 w-full py-2 bg-black text-white rounded hover:bg-gray-800"
      >
        Səbətə əlavə et
      </button>
    </div>
  );
};

export default Men;
