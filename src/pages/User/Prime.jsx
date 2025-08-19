import React from "react";
import { Link } from "react-router-dom";

const Prime = () => {
  return (
    <div className="bg-black text-white pb-5 ">
      <div className="flex flex-col justify-center items-center w-full gap-4">
        <img
          className="font-bold "
          src="/public/prime.png"
          alt="Prime Logo"
        />

        <h1 className="text-medium uppercase font-medium ">Fast Free Delivery</h1>

        <Link
          to="/signup"
          className="relative inline-flex items-center text-medium text-black bg-white px-6 py-2 font-bold"
        >
          SHOP NOW
          <svg
            className="ml-2 w-8 h-8 group-hover:translate-x-1 transition-transform"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M4 15.3536H26.2929L22.6464 11.7072L23.3536 11L28.2071 15.8536L23.3536 20.7072L22.6464 20L26.2929 16.3536H4V15.3536Z"
              fill="black"
            />
          </svg>
          <span className="absolute bottom-0 right-0 w-full h-full border-b-2 border-r-2 border-white pointer-events-none translate-x-1 translate-y-1"></span>
        </Link>
      </div>
    </div>
  );
};

export default Prime;
