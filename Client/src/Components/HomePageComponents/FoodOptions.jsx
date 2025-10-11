import { imageGridCards } from "../../Utils/Food";
import FoodCard from "./FoodCard";
import { useRef, useEffect } from "react";

import {CircleArrowRight,CircleArrowLeft} from "lucide-react"

export default function FoodOption() {
  const scrollRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    const cardWidth = 150 + 12; // adjust: card width + gap
    let scrolled = 0;

    const interval = setInterval(() => {
      scrollContainer.scrollLeft += 1;
      scrolled += 1;

      // pause after one card
      if (scrolled >= cardWidth) {
        scrolled = 0;
        // pause for 300ms
        clearInterval(interval);
        setTimeout(() => {
          runScroll();
        }, 300);
      }

      // infinite loop
      if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
        scrollContainer.scrollLeft = 0;
      }
    }, 10); // adjust speed: smaller = faster

    const runScroll = () => {
      const newInterval = setInterval(() => {
        scrollContainer.scrollLeft += 1;
        scrolled += 1;

        if (scrolled >= cardWidth) {
          scrolled = 0;
          clearInterval(newInterval);
          setTimeout(runScroll, 300);
        }

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }, 10);
    };

    return () => clearInterval(interval);
  }, []);

  const scrollLeft = () => {
    scrollRef.current.scrollLeft -= 150;
  };
  const scrollRight = () => {
    scrollRef.current.scrollLeft += 150;
  };

  return (
    <div className="w-[80%] container mx-auto mt-20 relative mb-20 pt-20">
      {/* Top-right buttons */}
      <div className="absolute top-1 right-1 flex gap-2 z-10">
        <button
          onClick={scrollRight}
          // className="bg-black/50 text-white px-3 py-2 rounded-full"
        >
          <CircleArrowLeft  className="h-10 w-auto text-slate-500"/>
        </button>
        <button
          onClick={scrollLeft}
          // className="bg-black/50 text-white px-3 py-2 rounded-full"
        >
        <CircleArrowRight  className="h-10 w-auto text-slate-500"/>

        </button>
      </div>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-hidden whitespace-nowrap"
      >
        {imageGridCards.concat(imageGridCards).map((foodData, idx) => (
          <FoodCard key={idx} foodData={foodData} />
        ))}
      </div>
    </div>
  );
}
