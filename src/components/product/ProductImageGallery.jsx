import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductImageGallery({ images }) {
  const [selected, setSelected] = useState(0);

  return (
    <div className="flex flex-col-reverse lg:flex-row gap-4">
      {/* Thumbnails */}
      <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setSelected(i)}
            className={`w-14 h-14 lg:w-16 lg:h-16 rounded-md overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
              selected === i
                ? "border-primary shadow-md"
                : "border-transparent opacity-60 hover:opacity-100"
            }`}
          >
            <img src={img} alt="" className="w-full h-full object-cover" />
          </button>
        ))}
      </div>

      {/* Main image */}
      <div className="flex-1 relative bg-secondary/30 rounded-lg overflow-hidden group aspect-square">
        <AnimatePresence mode="wait">
          <motion.img
            key={selected}
            src={images[selected]}
            alt="Product"
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full object-contain p-6 transition-transform duration-700 group-hover:scale-110"
          />
        </AnimatePresence>
      </div>
    </div>
  );
}