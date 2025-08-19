import React from 'react';
import { Link } from 'react-router-dom';

const CategoryLinks = () => {
  const categories = [
    {
      title: "SUMMER FAVORITES",
      links: [
        { name: "Summer Shirts", path: "/summer-shirts" },
        { name: "Tank Tops", path: "/tank-tops" },
        { name: "Shorts", path: "/shorts" },
        { name: "Pool Slides & Sandals", path: "/pool-slides-sandals" },
        { name: "Summer Hats & Accessories", path: "/summer-accessories" }
      ]
    },
    {
      title: "SUMMER FAMILY FITS",
      links: [
        { name: "Women's Summer Clothes", path: "/womens-summer" },
        { name: "Men's Summer Outfits", path: "/mens-summer" },
        { name: "Kids (Age 0 - 16)", path: "/kids" },
        { name: "Children (Age 4 - 8)", path: "/children" },
        { name: "Babies & Toddlers (Age 0 - 4)", path: "/babies-toddlers" }
      ]
    },
    {
      title: "OUR FAVORITE ACCESSORIES",
      links: [
        { name: "Laptop Bags", path: "/laptop-bags" },
        { name: "Belt Bags", path: "/belt-bags" },
        { name: "Water Bottles", path: "/water-bottles" },
        { name: "White Socks", path: "/white-socks" },
        { name: "Gift Cards", path: "/gift-cards" }
      ]
    },
    {
      title: "SCHOOL UNIFORMS",
      links: [
        { name: "Uniform Pants", path: "/uniform-pants" },
        { name: "Uniform Polos", path: "/uniform-polos" },
        { name: "Uniform Shoes", path: "/uniform-shoes" },
        { name: "Khaki Uniforms", path: "/khaki-uniforms" },
        { name: "Navy Uniforms", path: "/navy-uniforms" }
      ]
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {categories.map((category, index) => (
          <div key={index} className="space-y-6">
            {/* Category Title */}
            <h3 className="text-sm font-bold text-black tracking-wide uppercase">
              {category.title}
            </h3>
            
            {/* Category Links */}
            <div className="space-y-4">
              {category.links.map((link, linkIndex) => (
                <Link 
                  key={linkIndex}
                  to={link.path}
                  className="block text-gray-700 hover:text-black transition-colors duration-200 text-sm leading-relaxed"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryLinks;