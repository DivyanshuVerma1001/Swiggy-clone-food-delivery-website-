import { useState } from "react";
import RestInfo from "./RestInfo";

export default function MenuCard({
  foodSelected,
  priceRange,
  minRating,
  bestsellerOnly,
  sortOrder,
  menuItems,
}) {
  const [isOpen, setIsOpen] = useState(true);

  // Case 1: Categories (recursive rendering)
  if ("categories" in menuItems) {
    return (
      <div className="w-full">
        <p className="font-bold text-3xl mb-5 bg-amber-600 p-2 text-white">
          {menuItems.title}
        </p>
        <div>
          {menuItems?.categories?.map((items) => (
            <MenuCard
              key={items?.title}
              foodSelected={foodSelected}
              priceRange={priceRange}
              minRating={minRating}
              bestsellerOnly={bestsellerOnly}
              sortOrder={sortOrder}
              menuItems={items}
            />
          ))}
        </div>
      </div>
    );
  }

  // Case 2: Collapsed section
  if (!isOpen) {
    return (
      <div className="w-full">
        <div className="flex justify-between">
          <p className="font-bold text-3xl mb-3">{menuItems.title}</p>
          <button onClick={() => setIsOpen(!isOpen)}>
            <img
              className={`h-9 mr-10 transform transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
              src="../../assets/dropDown.png"
              alt="dropdown"
            />
          </button>
        </div>
        <div className="h-3 w-full bg-[#02060C0D] mb-5"></div>
      </div>
    );
  }

  // Case 3: Items list with filters + sort
  let itemsToShow = menuItems?.itemCards || [];

  // Veg / Non-Veg
  if (foodSelected === "veg") {
    itemsToShow = itemsToShow.filter((food) => food?.card?.info?.isVeg === 1);
  }
  if (foodSelected === "nonveg") {
    itemsToShow = itemsToShow.filter((food) => !food?.card?.info?.isVeg);
  }

  // Price filter
  itemsToShow = itemsToShow.filter(
    (food) =>
      food?.card?.info?.price / 100 >= priceRange[0] &&
      food?.card?.info?.price / 100 <= priceRange[1]
  );

  // Rating filter
  if (minRating) {
    itemsToShow = itemsToShow.filter(
      (food) =>
        parseFloat(food?.card?.info?.ratings?.aggregatedRating?.rating || 0) >=
        minRating
    );
  }

  // Bestseller filter
  if (bestsellerOnly) {
    itemsToShow = itemsToShow.filter((food) => food?.card?.info?.isBestseller);
  }

  // 🔹 Apply Sorting
  if (sortOrder === "lowToHigh") {
    itemsToShow = [...itemsToShow].sort(
      (a, b) =>
        (a?.card?.info?.price || 0) - (b?.card?.info?.price || 0)
    );
  } else if (sortOrder === "highToLow") {
    itemsToShow = [...itemsToShow].sort(
      (a, b) =>
        (b?.card?.info?.price || 0) - (a?.card?.info?.price || 0)
    );
  }

  if (itemsToShow.length === 0) return <></>;

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="flex justify-between">
        <p className="font-bold text-3xl mb-7">{menuItems.title}</p>
        <button onClick={() => setIsOpen(!isOpen)}>
          <img
            className={`h-9 mr-10 transform transition-transform duration-300 ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
            src="../../assets/dropDown.png"
            alt="dropdown"
          />
        </button>
      </div>

      {/* Items List */}
      {itemsToShow?.map((items) => (
        <RestInfo
          key={items?.card?.info?.id}
          isVeg={items?.card?.info?.isVeg === 1}
          restData={items?.card?.info}
        />
      ))}
    </div>
  );
}
