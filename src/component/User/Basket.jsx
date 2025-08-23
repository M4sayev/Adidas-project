import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ShoppingCart, Trash2, Plus, Minus, User, UserPlus } from "lucide-react";
import { toast } from "react-toastify";

const Basket = () => {
  const navigate = useNavigate();
  const [basket, setBasket] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [updatingItems, setUpdatingItems] = useState(new Set());

  const token = localStorage.getItem("token");

  const fetchBasket = async () => {
    if (!token) {
      setShowAuthModal(true);
      setLoading(false);
      return;
    }
    try {
      const res = await axios.get("http://localhost:3000/api/basket", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Basket Data:", res.data); // basketin datasiiii
      setBasket(res.data);
    } catch (err) {
      console.error(err.response?.data || err);
      toast.success("Basket məlumatı çəkilə bilmədi.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBasket();
  }, []);

  const updateQuantity = async (productId, newQuantity) => {
  if (newQuantity < 1) return;

  setUpdatingItems(prev => new Set(prev).add(productId));

  try {
    // Cari miqdarı tapırıq
    const currentItem = basket[0]?.items.find(item => item.product.id === productId);
    const currentQuantity = currentItem?.quantity || 0;

    // Server toplama edir, ona görə diff göndəririk
    const diff = newQuantity - currentQuantity;

    if (diff === 0) return; // dəyişiklik yoxdursa heç nə göndərmirik

    await axios.post(
      `http://localhost:3000/api/basket/${productId}`,
      { quantity: diff },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // Local state-i yeni miqdara təyin edirik
    setBasket(prevBasket => {
      const updatedBasket = [...prevBasket];
      if (updatedBasket[0] && updatedBasket[0].items) {
        updatedBasket[0].items = updatedBasket[0].items.map(item =>
          item.product.id === productId
            ? { ...item, quantity: newQuantity }
            : item
        );
      }
      return updatedBasket;
    });
  } catch (err) {
    console.error(err.response?.data || err);
    toast.error("Miqdar yenilənə bilmədi.");
  } finally {
    setUpdatingItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(productId);
      return newSet;
    });
  }
};

  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/basket/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        
      });
      await fetchBasket();
      toast.success("Məhsul silindi ✅");
      setBasket(prevBasket => {
        const updatedBasket = [...prevBasket];
        if (updatedBasket[0] && updatedBasket[0].items) {
          updatedBasket[0].items = updatedBasket[0].items.filter(
            item => item.product.id !== id
          );
        }
        return updatedBasket;
      });
    } catch (err) {
      console.error(err.response?.data || err);
      toast.error("Məhsul silinə bilmədi.");
    }
  };

  const calculateTotal = () => {
    if (!basket[0] || !basket[0].items) return 0;
    return basket[0].items.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 1;
      return total + (price * quantity);
    }, 0);
  };

  const goSignIn = () => navigate("/Signin");
  const goSignUp = () => navigate("/Signup");

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
          <p className="text-gray-600 font-medium">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br mt-30 from-blue-50 to-indigo-100">
      {/* Auth Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
            <div className="text-center mb-6">
              <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="w-8 h-8 text-indigo-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Hesabınız yoxdur?
              </h2>
              <p className="text-gray-600">
                Basketdən istifadə etmək üçün daxil olun.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={goSignIn}
                className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <User className="w-4 h-4" />
                <span>Sign In</span>
              </button>
              <button
                onClick={goSignUp}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2"
              >
                <UserPlus className="w-4 h-4" />
                <span>Sign Up</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      {!showAuthModal && (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center space-x-3">
              <ShoppingCart className="w-8 h-8 text-indigo-600" />
              <span>Sizin Basket</span>
            </h1>
          </div>

          {basket.length === 0 || !basket[0] || !basket[0].items || basket[0].items.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <ShoppingCart className="w-12 h-12 text-gray-400" />
              </div>
              <h2 className="text-xl font-semibold text-gray-600 mb-2">Basketiniz boşdur</h2>
              <p className="text-gray-500">Alış-verişə başlamaq üçün məhsullar əlavə edin</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Items */}
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                <div className="divide-y divide-gray-100">
                  {basket[0].items.map((item, index) => {
                    const isUpdating = updatingItems.has(item.product.id);
                    return (
                      <div key={index} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-lg text-gray-800 mb-2">
                              {item.product?.name}
                            </h3>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                              <span className="bg-gray-100 px-3 py-1 rounded-full">
                                Rəng: {item.color}
                              </span>
                              <span className="bg-gray-100 px-3 py-1 rounded-full">
                                Ölçü: {item.size}
                              </span>
                              {item.product?.price && (
                                <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full font-medium">
                                  {item.product.price} AZN
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex items-center space-x-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center bg-gray-100 rounded-xl overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.product.id, (item.quantity || 1) - 1)}
                                disabled={isUpdating || (item.quantity || 1) <= 1}
                                className="p-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 min-w-[3rem] text-center font-medium bg-white">
                                {isUpdating ? "..." : (item.quantity || 1)}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.product.id, (item.quantity || 1) + 1)}
                                disabled={isUpdating}
                                className="p-2 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Subtotal */}
                            {item.product?.price && (
                              <div className="text-right min-w-[100px]">
                                <p className="font-bold text-lg text-gray-800">
                                  {(item.product.price * (item.quantity || 1)).toFixed(2)} AZN
                                </p>
                              </div>
                            )}

                            {/* Remove Button */}
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors duration-200"
                              title="Məhsulu sil"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Total */}
              {basket[0] && basket[0].items && basket[0].items.length > 0 && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">Ümumi məbləğ</h2>
                    <p className="text-2xl font-bold text-indigo-600">
                      {calculateTotal().toFixed(2)} AZN
                    </p>
                  </div>
                  <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]">
                    Sifarişi tamamla
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Basket;