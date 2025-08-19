import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Auth from "./Auth";
import Category from "../pages/Admin/Category";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../component/Admin/user/Dashboard";
import Product from "../pages/Admin/Product";
import Men from "../pages/User/Men";
import Basket from "../component/User/Basket";
import ProductDetail from "../component/User/ProductDetail";

export const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Login səhifəsi */}
      <Route path="/login" element={<Login />} />

      {/* İstifadəçi layoutu (Header + Footer sabit qalır) */}
      <Route path="/" element={<UserLayout />}>
        <Route index element={<App />} />
        <Route path="category/men" element={<Men />} /> {/* Men səhifəsi */}
        <Route path="/basket" element={<Basket />} /> {/* Men səhifəsi */}
        <Route path="product/:id" element={<ProductDetail />} />
      </Route>

      {/* Admin panel */}
      <Route
        path="/admin"
        element={
          <Auth>
            <AdminLayout />
          </Auth>
        }
      >
        <Route index element={<Dashboard />} />
        <Route path="category" element={<Category />} />
        <Route path="products" element={<Product />} />
      </Route>
    </>
  )
);

export default route;
