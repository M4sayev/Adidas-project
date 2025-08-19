import React, { useContext } from 'react';
import { ProductContext } from '../context/ProductContext';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { products } = useContext(ProductContext);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Total Products: {products.length}</p>
      <Link to="/admin/add-product" className="text-blue-500 hover:underline mt-4 inline-block">
        Add New Product
      </Link>
    </div>
  );
};

export default Dashboard;
