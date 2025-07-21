import { useState } from "react";

export default function ImageSlider({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full px-2 py-4 flex flex-col items-center">
      {/* Main Image */}
      <div className="w-full max-w-md aspect-square rounded-lg overflow-hidden bg-gray-100 shadow">
        <img
          src={images[activeIndex]}
          alt="Product"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Thumbnails */}
      <div className="mt-3 flex gap-2 overflow-x-auto w-full max-w-md scrollbar-hide px-1">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Thumb ${index}`}
            onClick={() => setActiveIndex(index)}
            className={`h-16 w-16 object-cover rounded-md border-2 cursor-pointer transition ${
              index === activeIndex
                ? "border-[#be123c] scale-105"
                : "border-transparent hover:scale-105"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
