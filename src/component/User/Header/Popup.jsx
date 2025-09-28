import { X } from "lucide-react";
import React from "react";

function Popup({ animatePopup, setShowPopup }) {
  return (
    <div
      className={`fixed top-0 left-0 w-full bg-white border-t border-gray-300 px-3 py-32 flex flex-col md:flex-row justify-around z-[1000] shadow-lg transform transition-all duration-500 ease-in-out ${
        animatePopup
          ? "opacity-100 translate-y-0"
          : "opacity-0 -translate-y-10 pointer-events-none"
      }`}
    >
      <div className="mb-6 md:mb-0">
        <h2 className="font-bold mb-2">FREE STANDARD SHIPPING WITH ADICLUB</h2>
        <p className="text-sm text-gray-600">
          Sign up for adiClub to enjoy free standard shipping and earn points on
          every order.
        </p>
        <a
          href="/signup"
          className="mt-2 inline-block text-sm font-semibold underline"
        >
          JOIN ADICLUB FOR FREE
        </a>
      </div>
      <div>
        <h2 className="font-bold mb-2">FAST, FREE DELIVERY WITH PRIME</h2>
        <p className="text-sm text-gray-600">
          Get fast, free delivery on eligible items with Prime.
        </p>
        <a
          href="#"
          className="mt-2 inline-block text-sm font-semibold underline"
        >
          FAST, FREE PRIME DELIVERY
        </a>
      </div>
      <button
        onClick={() => setShowPopup(false)}
        className="absolute top-4 right-4"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}

export default Popup;
