import React from "react";
import { Link } from "react-router-dom";

function MobileNav({
  categories,
  expandedCategories,
  toggleCategory,
  setMobileMenuOpen,
}) {
  return (
    <div className="flex-1 overflow-y-auto bg-white w-full">
      <nav className="p-4 w-full">
        {categories
          .filter((cat) => !cat.parentId)
          .map((mainCat) => (
            <div key={mainCat.id} className="border-b last:border-b-0 w-full">
              {/* Main Category - Klik etdikdə subcategory açılır */}
              <div className="flex items-center justify-between py-4 w-full">
                <button
                  onClick={() => toggleCategory(mainCat.id)}
                  className={`text-lg uppercase text-left flex-1 ${
                    ["men", "women", "kids"].includes(
                      mainCat.slug.toLowerCase()
                    )
                      ? "font-bold"
                      : "font-normal"
                  }`}
                >
                  {mainCat.name}
                </button>
                {mainCat.children?.length > 0 && (
                  <button
                    onClick={() => toggleCategory(mainCat.id)}
                    className="p-2"
                  >
                    <svg
                      className={`w-5 h-5 transform transition-transform ${
                        expandedCategories[mainCat.id] ? "rotate-180" : ""
                      }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Mobile Submenu */}
              {expandedCategories[mainCat.id] &&
                mainCat.children?.length > 0 && (
                  <div className="pl-4 pb-4 w-full">
                    {mainCat.children.map((subCat) => (
                      <div key={subCat.id} className="mb-4">
                        {/* SubCategory - klik etdikdə alt kategoriyalar açılır */}
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => toggleCategory(`sub_${subCat.id}`)}
                            className="block font-medium text-base mb-2 hover:text-gray-600 text-left flex-1"
                          >
                            {subCat.name}
                          </button>
                          {subCat.children?.length > 0 && (
                            <button
                              onClick={() => toggleCategory(`sub_${subCat.id}`)}
                              className="p-1"
                            >
                              <svg
                                className={`w-4 h-4 transform transition-transform ${
                                  expandedCategories[`sub_${subCat.id}`]
                                    ? "rotate-180"
                                    : ""
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>
                          )}
                        </div>

                        {/* Child categories - subcategory açıq olduqda görsənir */}
                        {expandedCategories[`sub_${subCat.id}`] &&
                          subCat.children?.length > 0 && (
                            <div className="ml-4">
                              {subCat.children.map((child) => (
                                <Link
                                  key={child.id}
                                  to={`/category/${child.id}`}
                                  className="block text-sm text-gray-600 mb-2 hover:text-black py-1"
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                )}
            </div>
          ))}
      </nav>
    </div>
  );
}

export default MobileNav;
