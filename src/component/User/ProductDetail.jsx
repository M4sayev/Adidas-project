import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");
  useEffect(() => {
  console.log("Product ID:", id); // <- bax gör nə gəlir
}, [id]);


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/product/${id}`);
        setProduct(res.data);
      } catch (err) {
         toast.success("Məhsul yüklənmədi ❌", err);
      }
    };
    fetchProduct();
  }, [id]);

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

      // 1.5 saniyə sonra avtomatik yönləndir
      setTimeout(() => {
        navigate("/basket");
      }, 1000);

    } catch (err) {
      console.error(err.response?.data || err);
      alert("Məhsul basket-ə əlavə edilə bilmədi ❌");
    }
  };

  if (!product) return <p>Yüklənir...</p>;

  return (
    <div className="p-6 mt-30">
      <h1 className="text-2xl font-bold">{product.name}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-semibold">{product.price} AZN</p>

      {/* Rəng seçimi */}
      <div className="mt-4">
        <label>Rəng seç:</label>
        <select
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          className="border p-2 ml-2"
        >
          <option value="">Seçin</option>
          {product.colors?.map((c, i) => (
            <option key={i} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Ölçü seçimi */}
      <div className="mt-4">
        <label>Ölçü seç:</label>
        <select
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="border p-2 ml-2"
        >
          <option value="">Seçin</option>
          {product.sizes?.map((s, i) => (
            <option key={i} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

       <button
        onClick={handleAddToBasket}
        className="mt-6 bg-black text-white px-4 py-2 rounded"
      >
        Basket-ə əlavə et
      </button>
    </div>
  );
};

export default ProductDetail;
