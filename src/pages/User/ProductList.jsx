import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import CategoryOption from "./CategoryOption";
import Teaser from "./Teaser";
import TopPicks from "./TopPicks";
import AsFooter from "./AsFooter";
import Banner from "./Banner";
import Footer from "../../component/User/Footer";


const ProductList = () => {
  const { id } = useParams();
  const idnum = Number(id);
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Recursive function to find category by id
  const findCategoryById = (categories, id) => {
    for (let cat of categories) {
      if (cat.id === id) return cat;
      if (cat.children) {
        const found = findCategoryById(cat.children, id);
        if (found) return found;
      }
    }
    return null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Category-ləri fetch et
        const catRes = await axios.get("/api/category");
        const selectedCat = findCategoryById(catRes.data, idnum);
        setCategory(selectedCat || null);
        console.log(catRes.data);

        if (selectedCat) {
          // Product-ları fetch et
          const prodRes = await axios.get(`/api/product/category/${idnum}`);
          const productsArray = Array.isArray(prodRes.data)
            ? prodRes.data
            : [prodRes.data];
          setProducts(productsArray);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idnum]);

  if (loading) return <div>Loading...</div>;
  if (!category) return <div className="mt-50">Category not found</div>;

  return (
    <>
      <div className="relative mt-35 w-full h-full object-cover object-right object-center">
        {["Men", "WOmen", "Kids"].includes(category.slug) && (
          <div className="relative w-full h-[500px] md:h-[500px] lg:h-[600px] overflow-hidden">
            <img
              src={`/${category.slug}.avif`}
              alt="Banner"
              className="w-full h-full object-center object-right md:object-center"
            />
            <div className="absolute inset-0 flex flex-col justify-end items-start px-6 md:px-12 lg:px-20 pb-10">
              {/* ✅ yazılar şəkilin aşağısında olacaq */}

              <h2 className=" md:text-lg lg:text-xl font-extrabold px-1 py-1 bg-white text-black mb-2">
                SUPERSTAR
              </h2>

              {/* Description */}
              <p className="text-xs md:text-sm lg:text-base px-2 py-1 bg-white text-black mb-6">
                Because icons wear the original icon.
              </p>

              <div className="flex flex-row gap-3">
              
                <Link 

                  key={category.slug}
                  to={`/${category}`}
                  className="flex items-center border px-4 py-3 bg-white text-black font-bold text-xs md:text-sm lg:text-base group hover:bg-gray-100 transition-colors"
                >
                   SHOP NOW
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
             
            </div>


            </div>
          </div>
        )}
      </div>

      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">{category.name}</h2>

        {products.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((prod) => (
              <div
                key={prod.id}
                className="border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                {prod.image && (
                  <img
                    src={prod.image}
                    alt={prod.name}
                    className="h-40 w-full object-cover mb-4 rounded"
                  />
                )}
                <h3 className="text-lg font-semibold">{prod.name}</h3>
                <p className="text-gray-600 mb-2">{prod.description}</p>
                <span className="font-bold text-blue-600">${prod.price}</span>
              </div>
            ))}
          </div>
        )}
      </div>

        <CategoryOption/>
        <Teaser/>
        <TopPicks/>
        <Banner/>
        <AsFooter/>


    </>
  );
};

export default ProductList;
