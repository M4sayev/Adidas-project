import React from "react";
import { Link } from "react-router-dom";
import { X } from "lucide-react";

function MobileHeader({ toggleMobileMenu, setMobileMenuOpen }) {
  return (
    <div className="flex items-center justify-between p-4 border-b bg-white">
      <Link
        to="/"
        className="flex justify-center items-center"
        onClick={() => setMobileMenuOpen(false)}
      >
        <img src="/logo.png" alt="Adidas Logo" className="h-10 w-auto" />
      </Link>
      <button onClick={toggleMobileMenu} className="z-[1002]">
        <X className="w-6 h-6" />
      </button>
    </div>
  );
}

export default MobileHeader;
