import React from 'react'
import { Link } from 'react-router-dom'

const Banner = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-10 justify-center items-center bg-blue-400 text-center p-4 sm:p-6 lg:p-15 text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-white">
      <p className="flex-shrink-0">JOIN OUR ADICLUB & GET 15% OFF</p>
      <Link
        to="/signup"
        className="relative inline-flex items-center text-sm sm:text-base lg:text-lg text-black bg-white px-4 sm:px-6 py-2 font-bold whitespace-nowrap hover:bg-gray-100 transition-colors"
      >
        SIGN UP FOR FREE
        <svg
          className="ml-2 w-6 h-6 sm:w-8 sm:h-8 group-hover:translate-x-1 transition-transform"
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
  )
}

export default Banner