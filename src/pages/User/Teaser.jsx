import React from "react";
import { Link } from "react-router-dom";

const products = [
  {
    title: "SAMBA",
    description: "The cheetah print Samba is back.",
    image: "/samba.avif",
    link: "/category/146", 
  },
  {
    title: "TEAMGEIST",
    description: "Heritage soccer recut for today.",
    image: "/yamal.avif",
    link: "/category/148",
  },
  {
    title: "ADIZERO EVO SL",
    description: "Feel fast. In all aspects of life.",
    image: "/messi.avif",
    link: "/category/97",
  },
  {
    title: "Y-3 TENNIS",
    description: "As worn by Jessica Pegula.",
    image: "/y-3.jpg",
    link: "/category/152",
  },
];

const Teaser = () => {
  return (
    <div className="flex flex-wrap  justify-center pt-16 pb-6  px-10">
      {products.map((product, index) => (
        <Link
          key={index}
          to={product.link} // link burda
          className="bg-white p-0.5 overflow-hidden w-64 md:w-72 lg:w-80 border border-transparent hover:border-black transition-all duration-300 "
        >
          {/* Şəkilin proporsiyasını 3:4 saxlamaq üçün relative + pb */}
          <div className="relative pb-[140%]">
            <img
              src={product.image}
              alt={product.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h2 className="font-bold text-lg mb-2">{product.title}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <span className="underline cursor-pointer font-bold hover:bg-gray-200 transition-colors duration-300">
              SHOP NOW
            </span>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Teaser;
