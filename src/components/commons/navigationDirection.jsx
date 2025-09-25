import React from "react";

const NavigationButton = ({ direction, onClick, className = "", stroke = "black" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex items-center justify-center w-[34px] h-[34px] rounded-full overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 ${className}`}
      aria-label={direction === "prev" ? "Previous slide" : "Next slide"}
    >
      <div className={`absolute inset-0 bg-primary-olive transform transition-transform duration-500 ease-in-out ${
        direction === "prev" 
          ? "translate-x-full group-hover:translate-x-0" // De derecha a izquierda para prev
          : "-translate-x-full group-hover:translate-x-0" // De izquierda a derecha para next
      }`}></div>
      
      <div className="relative z-10 flex items-center justify-center">
        {direction === "prev" ? (
          <img src="/images/home/arrow.svg" alt="Previous slide" className="w-[34px] h-[34px]" />
        ) : (
          <img src="/images/home/arrow.svg" alt="Next slide" className="w-[34px] h-[34px] rotate-180" />
        )}
      </div>
    </button>
  );
};

export default NavigationButton;
