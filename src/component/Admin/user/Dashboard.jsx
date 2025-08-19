import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [stats, setStats] = useState({
    productCount: 0,
    categoryCount: 0,
    basketCount: 0,
  });

  const [baskets, setBaskets] = useState([]);
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchStats = async () => {
    try {
      const [productRes, categoryRes, basketRes] = await Promise.all([
        axios.get('/api/product'),
        axios.get('/api/category'),
        axios.get('/api/basket'),
      ]);

      const products = productRes.data?.data || productRes.data;
      const categories = categoryRes.data?.data || categoryRes.data;
      const baskets = basketRes.data?.data || basketRes.data;

      console.log('Products:', products);
      console.log('Categories:', categories);
      console.log('Baskets:', baskets);

      setStats({
        productCount: products.length,
        categoryCount: categories.length,
        basketCount: baskets.length,
      });

      const recentBaskets = [...baskets]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 3);

      setBaskets(recentBaskets);
      setLoading(false);
    } catch (error) {
      console.error('Dashboard məlumatları alınarkən xəta:', error);
      setLoading(false);
    }
  };

  fetchStats();
}, []);


  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white text-xl">Yüklənir...</div>;
  }

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white p-6 space-y-8">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Statistik Kartlar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard label="Məhsulların sayı" value={stats.productCount} />
        <StatCard label="Kateqoriyaların sayı" value={stats.categoryCount} />
        <StatCard label="Səbətdə olanlar" value={stats.basketCount} />
      </div>

      {/* Son Səbətlər */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-md flex-grow overflow-auto">
        <h2 className="text-lg font-semibold mb-4">Son Səbətlər</h2>
        {baskets.length > 0 ? (
          <table className="w-full text-left text-sm table-auto">
            <thead>
              <tr className="text-gray-300 border-b border-gray-600">
                <th className="pb-2">Səbət ID</th>
                <th className="pb-2">İstifadəçi</th>
                <th className="pb-2">Məhsul sayı</th>
                <th className="pb-2">Tarix</th>
              </tr>
            </thead>
            <tbody>
              {baskets.map(basket => (
                <tr key={basket._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-2">{basket._id}</td>
                  <td>{basket.userName || 'Anonim'}</td>
                  <td>{basket.items?.length || 0}</td>
                  <td>{new Date(basket.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-400">Səbət məlumatı yoxdur</p>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ label, value }) => (
  <div className="p-4 rounded-xl shadow-md bg-gray-800 hover:bg-gray-700 transition">
    <div className="text-sm text-gray-400">{label}</div>
    <div className="text-2xl font-semibold">{value}</div>
  </div>
);

export default Dashboard;
