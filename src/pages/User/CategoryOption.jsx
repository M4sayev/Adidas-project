import React from "react"; 
import { Link, useParams } from "react-router-dom"; 
 
const CategoryOption = () => { 
  const { id } = useParams();  
  let options = []; 
 
  if (id === "62") { 
    options = [ 
      { id: 62, img: "/campus.jpg", name: "Sneakers" }, 
      { id: 56, img: "/Tops.jpg", name: "Tops" }, 
      { id: 202, img: "/hoodies.jpg", name: "Hoodies & Sweatshirts" }, 
      { id: 203, img: "/pants.jpg", name: "Pants" }, 
    ]; 
  } else if (id === "63") { 
    options = [ 
      { id: 62, img: "/campus.jpg", name: "Sneakers" }, 
      { id: 56, img: "/Tops.jpg", name: "Tops" }, 
      { id: 202, img: "/pants-women.jpg", name: "Pants & Tights" }, 
      { id: 204, img: "/matching.jpg", name: "Matching Sets" }, 
    ]; 
  } else if (id === "64") { 
    options = [ 
      { id: 401, img: "/kids1.jpg", name: "Youth And Teens" }, 
      { id: 402, img: "/kids2.jpg", name: "Children" }, 
      { id: 403, img: "/kids3.jpg", name: "Infants & Toddlers" }, 
      { id: 404, img: "/kids3.jpg", name: "All Kids" }, 
    ]; 
  } 
 
  return ( 
    <div className="flex flex-wrap mt-10 justify-center gap-2 sm:gap-4 md:gap-6 px-2 sm:px-4 md:px-6"> 
      {options.map((opt) => ( 
        <Link  
          key={opt.id} 
          className="flex flex-col  hover:bg-gray-200 transition-colors duration-200 w-[calc(50%-4px)] sm:w-[calc(50%-8px)] md:w-[calc(33.333%-16px)] lg:w-[calc(25%-18px)] min-w-[150px] max-w-[300px]" 
          to={`/category/${opt.id}`} 
        > 
          <div className="w-full aspect-square bg-white"> 
            <img  
              src={opt.img}  
              className="object-cover w-full h-full" 
              alt={opt.name} 
            /> 
          </div> 
          <div className="p-2 sm:p-3 md:p-4">
            <p className="text-center text-black underline font-bold text-xs sm:text-sm md:text-base uppercase tracking-wide">
              {opt.name}
            </p>
          </div>
        </Link> 
      ))} 
    </div> 
  ); 
}; 
 
export default CategoryOption;