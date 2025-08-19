import React from "react";

const products = [
  {
    title: "SAMBA",
    description: "The cheetah print Samba is back.",
    image: "/public/samba.avif",
    link: "/samba", // klikləyəndə gedəcəyi səhifə
  },
  {
    title: "TEAMGEIST",
    description: "Heritage soccer recut for today.",
    image: "/public/yamal.avif",
    link: "/teamgeist",
  },
  {
    title: "ADIZERO EVO SL",
    description: "Feel fast. In all aspects of life.",
    image: "/public/messi.avif",
    link: "/adizero",
  },
  {
    title: "Y-3 TENNIS",
    description: "As worn by Jessica Pegula.",
    image: "/public/y-3.jpg",
    link: "/y3-tennis",
  },
];

const Teaser = () => {
  return (
    <div className="flex flex-wrap gap-6 justify-center pt-16 pb-6 px-10">
      {products.map((product, index) => (
        <a
          key={index}
          href={product.link} // link burda
          className="bg-white overflow-hidden w-64 md:w-72 lg:w-80 border border-transparent hover:border-black transition-all duration-300 rounded-lg"
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
        </a>
      ))}
    </div>
  );
};

export default Teaser;
