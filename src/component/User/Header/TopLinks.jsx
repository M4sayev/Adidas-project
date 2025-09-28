import React from "react";
import { Link } from "react-router-dom";

function TopLinks() {
  return (
    <div className="bg-white w-full hidden md:block">
      <div className="flex justify-end space-x-6 text-xs text-black-600 px-5 ">
        <Link to="/help" className="hover:underline">
          help
        </Link>
        <Link to="/orders" className="hover:underline">
          orders and returns
        </Link>
        <Link to="/gift-cards" className="hover:underline">
          gift cards
        </Link>
        <Link to="/join" className="hover:underline">
          join adiClub
        </Link>
      </div>
    </div>
  );
}

export default TopLinks;
