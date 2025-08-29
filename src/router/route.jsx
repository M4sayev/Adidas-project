import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "../App";
import Login from "../pages/Login";
import Auth from "./Auth";
import Category from "../pages/Admin/Category";
import UserLayout from "../layout/UserLayout";
import AdminLayout from "../layout/AdminLayout";
import Dashboard from "../component/Admin/user/Dashboard";
import Product from "../pages/Admin/Product";
import Basket from "../component/User/Basket";
import ProductDetail from "../component/User/ProductDetail";
import Wishlist from "../component/User/Wishlist";
import ProductList from "../pages/User/ProductList";
import SignIn from "../pages/Singin";
import SignUp from "../pages/Signup";
import CategoryOption from "../pages/User/CategoryOption";

export const route = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Login səhifəsi */}
      <Route path="/login" element={<Login />} />
      <Route path="/Signin" element={<SignIn />} />
      <Route path="/Signup" element={<SignUp />} />
      

     
      <Route path="/" element={<UserLayout />}>
        <Route index element={<App />} />
        <Route path="/category/:id" element={<ProductList/>}/>
        <Route path="/basket" element={<Basket />} /> 
        <Route path="/wishlist" element={<Wishlist/>}/>
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/category/:id" element={<CategoryOption />} />
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
