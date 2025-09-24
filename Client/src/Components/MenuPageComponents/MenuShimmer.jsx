import React from "react";
import MenuShimmerCard from "./MenuShimmerCard";

const MenuShimmer = () => {
  return (
    <div className="w-full mx-auto flex-col justify-center  px-4">
      {/* Sections Loop */}
      {Array(3).fill(0).map((_, sectionIdx) => (
        <div key={sectionIdx} className="mb-10">
          {/* Items Loop */}
          {Array(5).fill(0).map((_, itemIdx) => (
            <MenuShimmerCard key={itemIdx} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default MenuShimmer;
