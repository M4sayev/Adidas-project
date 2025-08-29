import { X } from "lucide-react";

const FilterSort = ({
  filterOpen,
  setFilterOpen,
  sortBy,
  setSortBy,
  selectedColors,
  selectedSizes,
  handleColorFilter,
  handleSizeFilter,
  getUniqueColors,
  getUniqueSizes,
  onClearFilters
}) => {
  if (!filterOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl transform transition-transform z-60">
        <div className="flex flex-col h-full">
          <div className="p-6 mt-30 flex-1 overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">FILTER & SORT</h3>
              <button
                onClick={() => setFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Sort Options */}
            <div className="mb-8">
              <h4 className="font-medium mb-4">SORT BY</h4>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="default"
                    checked={sortBy === "default"}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mr-3"
                  />
                  Default
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="price_low"
                    checked={sortBy === "price_low"}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mr-3"
                  />
                  Price (Low to High)
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value="price_high"
                    checked={sortBy === "price_high"}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="mr-3"
                  />
                  Price (High to Low)
                </label>
              </div>
            </div>

            {/* Color Filter */}
            {getUniqueColors().length > 0 && (
              <div className="mb-8">
                <h4 className="font-medium mb-4">COLOR</h4>
                <div className="space-y-2">
                  {getUniqueColors().map((color) => (
                    <label key={color} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedColors.includes(color)}
                        onChange={() => handleColorFilter(color)}
                        className="mr-3"
                      />
                      <span className="capitalize">{color}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {/* Size Filter */}
            {getUniqueSizes().length > 0 && (
              <div className="mb-8">
                <h4 className="font-medium mb-4">SIZE</h4>
                <div className="grid grid-cols-4 gap-2">
                  {getUniqueSizes().map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeFilter(size)}
                      className={`p-2 border text-sm ${
                        selectedSizes.includes(size)
                          ? "border-black bg-black text-white"
                          : "border-gray-300 hover:border-gray-400"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Clear Filters */}
            <button
              onClick={onClearFilters}
              className="w-full py-3 border border-gray-300 text-center hover:bg-gray-50 transition-colors"
            >
              CLEAR ALL FILTERS
            </button>

            {/* Apply Button - only visible on mobile */}
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full py-3 bg-black text-white text-center hover:bg-gray-800 transition-colors mt-4 md:hidden"
            >
              APPLY FILTERS
            </button>
          </div>

          {/* Fixed Apply Button - only visible on mobile */}
          <div className="md:hidden fixed bottom-0 right-0 w-full max-w-md p-6 border-t bg-white">
            <button
              onClick={() => setFilterOpen(false)}
              className="w-full py-3 bg-black text-white text-center hover:bg-gray-800 transition-colors"
            >
              APPLY FILTERS
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterSort;