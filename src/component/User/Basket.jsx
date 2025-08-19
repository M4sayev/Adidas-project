import React, { useState, useEffect } from "react";

const Basket = () => {
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(false);

  // Səbəti serverdən götürmək
  const fetchBasket = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/basket");
      const data = await res.json();

      // Backend məhsulları "products" arrayində göndərirsə:
      if (data.products && Array.isArray(data.products)) {
        setBasket(data.products);
      } else if (Array.isArray(data)) {
        setBasket(data);
      } else {
        setBasket([]);
      }
    } catch (err) {
      console.error("Basket fetch error:", err);
      setBasket([]);
    } finally {
      setLoading(false);
    }
  };

  // Məhsulu səbətə əlavə etmək / miqdarı dəyişmək
  const updateBasket = async (productId, quantityChange) => {
    try {
      await fetch("http://localhost:3000/api/basket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, quantity: quantityChange }),
      });

      // səbəti yenilə
      fetchBasket();
    } catch (err) {
      console.error("Update basket error:", err);
    }
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  if (loading) return <p>Səbət yüklənir...</p>;

  return (
    <div className="p-5">
      <h1 className="text-xl font-bold mb-3">Səbətim</h1>

      {basket.length === 0 ? (
        <p>Səbət boşdur</p>
      ) : (
        basket.map((item) => (
          <div
            key={item.productId}
            className="flex items-center justify-between border p-3 rounded mb-2"
          >
            <span>{item.name}</span>
            <div className="flex items-center gap-3">
              <button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={() => updateBasket(item.productId, -1)}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="px-2 py-1 bg-gray-300 rounded"
                onClick={() => updateBasket(item.productId, 1)}
              >
                +
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Basket;
