import React from "react";

const  Pagination = ({ totalSlides, activeIndex, className = "" }) => {
  // Ajusta el índice activo para que no supere el número de slides reales
  const adjustedActiveIndex = activeIndex % totalSlides;

  return (
    <div className={`flex items-center gap-[6px] ${className}`}>
      {Array.from({ length: totalSlides }).map((_, index) => (
        <div
          key={index}
          className={`h-3 rounded-full transition-all duration-500 ${
            index === adjustedActiveIndex
              ? "w-[60px] bg-primary-olive"
              : "w-3 bg-[#B1B1B1]"
          }`}
        />
      ))}
    </div>
  );
};

export default Pagination;