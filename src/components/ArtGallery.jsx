import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HiX } from "react-icons/hi";

const artworks = [
  {
    id: 1,
    src: "/assets/artwork/IMG-20251203-WA0003_1764701418166.jpg",
    title: "Krishna with Flute",
    medium: "Color Pencils",
  },
  {
    id: 2,
    src: "/assets/artwork/IMG-20251203-WA0002_1764701418163.jpg",
    title: "Traditional Portrait",
    medium: "Pencil Sketch",
  },
  {
    id: 3,
    src: "/assets/artwork/IMG-20251203-WA0006_1764701418170.jpg",
    title: "Lord Ganesha",
    medium: "Ball Pen Art",
  },
  {
    id: 4,
    src: "/assets/artwork/IMG-20251203-WA0004_1764701418168.jpg",
    title: "Divine Smile",
    medium: "Ball Pen Art",
  },
  {
    id: 5,
    src: "/assets/artwork/IMG-20251203-WA0005_1764701418169.jpg",
    title: "Krishna Portrait",
    medium: "Pencil Sketch",
  },
  {
    id: 6,
    src: "/assets/artwork/IMG-20251203-WA0001_1764701418172.jpg",
    title: "Anime Character",
    medium: "Color Pencils",
  },
];

export default function ArtGallery() {
  const [selectedArt, setSelectedArt] = useState(null);

  const handleKeyDown = useCallback((e) => {
    if (e.key === "Escape" && selectedArt) {
      setSelectedArt(null);
    }
  }, [selectedArt]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <section id="myart" className="py-16 lg:py-24 px-5 lg:px-28 bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl lg:text-5xl font-bold mb-4">
          My <span className="text-white" style={{ WebkitTextStroke: "1px black" }}>Art</span>
        </h2>
        <p className="text-[#71717A] max-w-2xl mx-auto">
          Beyond coding, I express my creativity through art. Here's a collection of my hand-drawn artworks 
          featuring traditional Indian themes, portraits, and anime illustrations.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {artworks.map((art, index) => (
          <motion.div
            key={art.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group cursor-pointer"
            onClick={() => setSelectedArt(art)}
          >
            <div className="relative overflow-hidden rounded-xl border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={art.src}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <h3 className="text-lg font-bold">{art.title}</h3>
                  <p className="text-sm text-gray-300">{art.medium}</p>
                </div>
              </div>
            </div>
            <div className="mt-3 text-center lg:hidden">
              <h3 className="font-semibold">{art.title}</h3>
              <p className="text-sm text-gray-500">{art.medium}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedArt && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center p-4"
            onClick={() => setSelectedArt(null)}
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-6 right-6 text-white bg-white/20 hover:bg-white/30 p-2 rounded-full transition-colors"
              onClick={() => setSelectedArt(null)}
            >
              <HiX size={28} />
            </motion.button>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", damping: 25 }}
              className="max-w-4xl max-h-[90vh] relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={selectedArt.src}
                alt={selectedArt.title}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
              <div className="text-center mt-4 text-white">
                <h3 className="text-xl font-bold">{selectedArt.title}</h3>
                <p className="text-gray-300">{selectedArt.medium}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
