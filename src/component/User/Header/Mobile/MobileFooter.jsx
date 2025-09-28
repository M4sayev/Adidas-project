import { Heart, User } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function MobileFooter({ setMobileMenuOpen }) {
  return (
    <div className="p-2 border-t bg-gray-50 w-full">
      <div className="flex items-center justify-center space-x-6 mb-4 ">
        <Link
          to="/Signin"
          className="flex items-center space-x-1"
          onClick={() => setMobileMenuOpen(false)}
        >
          <User className="w-5 h-5" />
          <span className="text-sm">Login</span>
        </Link>
        <Link
          to="/Wishlist"
          className="flex items-center space-x-1"
          onClick={() => setMobileMenuOpen(false)}
        >
          <Heart className="w-5 h-5" />
          <span className="text-sm">Wishlist</span>
        </Link>
      </div>
      <div className="space-y-2 flex   justify-between text-sm text-gray-600">
        <Link
          to="/help"
          className="block"
          onClick={() => setMobileMenuOpen(false)}
        >
          Help
        </Link>
        <Link
          to="/orders"
          className="block"
          onClick={() => setMobileMenuOpen(false)}
        >
          Orders and Returns
        </Link>
        <a
          href="/gift-cards"
          className="block"
          onClick={() => setMobileMenuOpen(false)}
        >
          Gift Cards
        </a>
        <a
          href="/join"
          className="block font-semibold text-black"
          onClick={() => setMobileMenuOpen(false)}
        >
          Join adiClub
        </a>
      </div>
    </div>
  );
}

export default MobileFooter;
