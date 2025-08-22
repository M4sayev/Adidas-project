import React from "react";
import { Outlet } from "react-router";
import Header from "../component/User/Header";
import Footer from "../component/User/Footer";

const UserLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserLayout;
