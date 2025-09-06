import { imageGridCards } from "../../Utils/Grocery";
import GroceryCard from "./GroceryCard";
import { useRef, useEffect } from "react";

export default function GroceryOption() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 150 + 12; // card width + gap
    let scrolled = 0;

    const runScroll = () => {
      let interval = setInterval(() => {
        scrollContainer.scrollLeft += 1; // same as FoodOption
        scrolled += 1;

        if (scrolled >= cardWidth) {
          scrolled = 0;
          clearInterval(interval);
          setTimeout(runScroll, 300); // pause 300ms per card
        }

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }, 10); // interval same as FoodOption for speed
    };

    runScroll(); // start scrolling

  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 150;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 150;
  };

  return (
    <div className="w-[80%] container mx-auto mt-20 relative mb-20 pt-20">
      <h1 className="text-2xl font-bold mb-5">Shop Groceries on Instamart</h1>

      {/* Top-right manual buttons */}
      <div className="absolute top-1 right-1 flex gap-2 z-10">
        <button
          onClick={scrollLeft}
          className="bg-black/50 text-white px-3 py-2 rounded-full"
        >
          ◀
        </button>
        <button
          onClick={scrollRight}
          className="bg-black/50 text-white px-3 py-2 rounded-full"
        >
          ▶
        </button>
      </div>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="flex gap-3 overflow-hidden whitespace-nowrap"
      >
        {imageGridCards.concat(imageGridCards).map((foodData, idx) => (
          <GroceryCard key={idx} foodData={foodData} />
        ))}
      </div>
    </div>
  );
}
