import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Banner */}
      <div className="md:pt-[130px] lg:pt-[140px] w-full">
        <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden">
          <img
            src="/WOmen.avif"
            alt="Banner"
            className="w-full h-full object-cover lg:object-cover object-right md:object-cover"
          />
          
          {/* Overlay content */}
          <div className="absolute inset-0 flex flex-col justify-end items-start px-6 md:px-12 lg:px-20 pb-10">
           
            
            <h2 className="text-base md:text-lg lg:text-xl font-bold px-2 py-1 bg-white text-black mb-2">
              SUPERSTAR
            </h2>
            
            {/* Description */}
            <p className="text-xs md:text-sm lg:text-base px-2 py-1 bg-white text-black mb-6">
              Because icons wear the original icon.
            </p>
            
            {/* Categories - Şaquli sıralama */}
            <div className="flex flex-row gap-3">
              {["women", "men", "kids"].map((cat) => (
                <Link
                  key={cat}
                  to={`/${cat}`}
                  className="flex items-center border px-2 py-1 bg-white text-black font-bold text-xs md:text-sm lg:text-base group hover:bg-gray-100 transition-colors"
                >
                   {cat.toUpperCase()}
                  <svg
                    className="ml-2 w-5 h-5 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform"
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
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;