import { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function ImageSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center ">
      {/* Image Slider Container */}
      <div className="relative w-full max-w-2xl aspect-square bg-gray-100 rounded-xl overflow-hidden shadow-xl">
        <img
          src={images[activeIndex]}
          alt="Active"
          className="w-full h-full object-cover"
        />

        {/* Arrow Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <FaChevronLeft size={20} />
        </button>
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition"
        >
          <FaChevronRight size={20} />
        </button>

        {/* Thumbnails */}
        <div className="h-[80px] w-full absolute bottom-0 left-0 bg-black/30 backdrop-blur-md flex items-center overflow-x-auto px-4 space-x-2 scrollbar-hide">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Thumbnail ${index + 1}`}
              onClick={() => setActiveIndex(index)}
              className={`h-full aspect-square object-cover rounded-md border-2 cursor-pointer transition ${
                index === activeIndex
                  ? "border-white scale-105"
                  : "border-transparent hover:scale-105"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
