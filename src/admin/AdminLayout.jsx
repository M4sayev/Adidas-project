import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const AdminLayout = () => {
  return (
    
    <div className="flex min-h-screen">
      <aside className="w-64 bg-gray-800 text-white p-4">
        <nav>
          <ul>
            <li className="mb-4">
              <Link to="/admin" className="hover:underline">Dashboard</Link>
            </li>
            <li className="mb-4">
              <Link to="/admin/add-product" className="hover:underline">Add Product</Link>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
