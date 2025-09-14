import { useState } from "react";
import RestInfo from "./searchRestInfo";
import { highlightText } from "./highlight";

export default function SearchMenuCard({ menuItems, query }) {
  const [isOpen, setIsOpen] = useState(true);

  if ("categories" in menuItems) {
    return (
      <div className="w-full">
        <p className="font-bold text-3xl text-center mb-5 p-2 mt-5 ">
          {highlightText(menuItems.title, query)}
        </p>
        <div>
          {menuItems?.categories?.map((items) => (
            <SearchMenuCard key={items?.title} menuItems={items} query={query} />
          ))}
        </div>
      </div>
    );
  }

  if (!isOpen) {
    return (
      <div className="w-full">
        <div className="flex justify-between">
          <p className="font-bold text-2xl mb-3">
            {highlightText(menuItems.title, query)}
          </p>
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

  let itemsToShow = menuItems?.itemCards || [];
  if (itemsToShow.length === 0) return <></>;

  return (
    <div className="w-full">
      <div className="flex justify-between">
        <p className="font-bold text-2xl mb-7">
          {highlightText(menuItems.title, query)}
        </p>
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

      {itemsToShow?.map((items) => (
        <RestInfo
          key={items?.card?.info?.id}
          isVeg={items?.card?.info?.isVeg === 1}
          restData={items?.card?.info}
          query={query} // 👈 pass query down
        />
      ))}
    </div>
  );
}
