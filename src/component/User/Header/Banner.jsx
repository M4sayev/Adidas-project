import React from "react";

function Banner({ setShowPopup, rotatingMessages, bannerIndex }) {
  return (
    <div
      className="bg-black text-white text-sm font-semibold text-center py-2 cursor-pointer flex items-center justify-center gap-1 w-full"
      onClick={() => setShowPopup(true)}
    >
      {rotatingMessages[bannerIndex]}
      <svg
        width="23"
        height="23"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="ml-1"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M16 19.2929L8.35359 11.6465L7.64648 12.3536L16 20.7071L24.3536 12.3536L23.6465 11.6465L16 19.2929Z"
          fill="#fafafa"
        />
      </svg>
    </div>
  );
}

export default Banner;
