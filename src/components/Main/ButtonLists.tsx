import React, { useRef, useState, useEffect } from "react";
import Button from "./Button";
import { SlArrowRight, SlArrowLeft } from "react-icons/sl";

export default function ButtonLists() {
  const list: string[] = [
    "All",
    "Movie",
    "Kapil Sharma",
    "Comedy",
    "Drama",
    "Action",
    "Romance",
    "Thriller",
    "Horror",
    "Sci-Fi",
    "Documentary",
    "Animation",
    "Adventure",
    "Fantasy",
    "Mystery",
    "Musical",
    "Biography",
    "History",
    "War",
    "Western",
    "Crime",
    "Family",
    "Sport",
    "Short Film",
    "TV Show",
    "Web Series",
    "Reality Show",
    "Talk Show",
    "News",
    "Music Video",
    "Live Stream",
    "Podcast",
    "Educational",
    "How-To",
    "Review",
    "Unboxing",
    "Vlog",
    "Travel",
    "Food",
    "Fashion",
    "Beauty",
    "Fitness",
    "Health",
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(true);

  const checkScroll = (): void => {
    const container = containerRef.current;
    if (container) {
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(
        container.scrollLeft < container.scrollWidth - container.clientWidth
      );
    }
  };

  const scroll = (direction: "left" | "right"): void => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = 200;
      container.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      checkScroll(); // Initial check

      // Check on window resize
      window.addEventListener("resize", checkScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", checkScroll);
      }
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  return (
    <div className="w-full relative">
      {/* Left Gradient Overlay */}
      {showLeftArrow && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      )}

      {/* Right Gradient Overlay */}
      {showRightArrow && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
      )}

      {/* Left Arrow Button */}
      {showLeftArrow && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-gray-200 transition-colors duration-200"
          aria-label="Scroll left"
        >
          <SlArrowLeft className="w-4 h-4 text-gray-600" />
        </button>
      )}

      {/* Scrollable Button Container */}
      <div
        ref={containerRef}
        className="flex gap-2 overflow-x-auto py-2 px-4 scroll-smooth no-scrollbar"
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {list.map((val) => (
          <Button key={val} name={val} />
        ))}
      </div>

      {/* Right Arrow Button */}
      {showRightArrow && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white hover:bg-gray-100 w-8 h-8 rounded-full flex items-center justify-center shadow-sm border border-gray-200 transition-colors duration-200"
          aria-label="Scroll right"
        >
          <SlArrowRight className="w-4 h-4 text-gray-600" />
        </button>
      )}
    </div>
  );
}
