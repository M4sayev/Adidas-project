import React from 'react';

const PopularRightNow = () => {
  const trendingTerms = [
    'ultraboost 5x',
    'samba', 
    'campus',
    'gazelle',
    'spezial',
    'soccer'
  ];

  const relatedResources = [
    {
      id: 1,
      title: "How To Clean Shoes",
      description: "Get down and dirty with adidas and learn how to clean your sneakers the right way.",
      image: "/api/placeholder/300/200",
      category: "care"
    },
    {
      id: 2,
      title: "The adidas Samba Size Guide", 
      description: "Discover classic adidas heritage through the fit and feel of the one and only Samba.",
      image: "/api/placeholder/300/200",
      category: "sizing"
    },
    {
      id: 3,
      title: "Ace the Looks: How to Style a Tennis Skirt",
      description: "Are you ready to serve? Learn how to style your tennis skirt outfits with adidas.",
      image: "/api/placeholder/300/200",
      category: "style"
    },
    {
      id: 4,
      title: "How To Style A Soccer Jersey",
      description: "From sporty to flirty to polished, the soccer jersey is a surprisingly versatile wardrobe hero. Get inspired on how to style a jersey i...",
      image: "/api/placeholder/300/200",
      category: "style"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 bg-white">
      {/* Header */}
      <h2 className="text-3xl font-bold mb-12 text-black">Popular right now</h2>
      
      {/* Trending Terms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        {trendingTerms.map((term, index) => (
          <div key={index} className="group cursor-pointer py-7">
            <h3 className="text-4xl font-bold text-black mb-2 group-hover:transition-colors">
              {term}
            </h3>
            <div className="w-full h-px bg-black group-hover:h-1.5 group-hover:bg-gray-600 transition-all duration-100 transform-gpu origin-bottom"></div>
          </div>
        ))}
      </div>

      {/* Related Resources Section */}
      <div className="mb-8">
        <h3 className="text-xl font-bold text-black mb-8">RELATED RESOURCES</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedResources.map((resource) => (
            <article key={resource.id} className="group cursor-pointer">
              {/* Image Container */}
              <div className="relative overflow-hidden rounded-lg mb-4 aspect-[4/3] bg-gray-100">
                <div className="w-full h-full bg-gradient-to-br from-blue-100 to-gray-200 flex items-center justify-center">
                  {resource.id === 1 && (
                    <div className="text-6xl">👟</div>
                  )}
                  {resource.id === 2 && (
                    <div className="flex gap-2">
                      <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center">
                        <div className="text-white text-xs">◣◤◣</div>
                      </div>
                      <div className="w-16 h-16 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center">
                        <div className="text-black text-xs">◣◤◣</div>
                      </div>
                    </div>
                  )}
                  {resource.id === 3 && (
                    <div className="text-6xl">👓</div>
                  )}
                  {resource.id === 4 && (
                    <div className="flex gap-1">
                      <div className="w-12 h-16 bg-blue-500 rounded"></div>
                      <div className="w-12 h-16 bg-green-500 rounded"></div>
                      <div className="w-12 h-16 bg-yellow-500 rounded"></div>
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity"></div>
              </div>
              
              {/* Content */}
              <div>
                <h4 className="text-lg font-bold text-black mb-2 group-hover:text-gray-600 transition-colors">
                  {resource.title}
                </h4>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {resource.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularRightNow;