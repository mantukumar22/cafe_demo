import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useGetImages } from "@workspace/api-client-react";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600&q=80",
  "https://images.unsplash.com/photo-1498804103079-a6351b050096?w=600&q=80",
  "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=600&q=80",
  "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=600&q=80",
  "https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&q=80",
  "https://images.unsplash.com/photo-1534040385115-33dcb3acba5b?w=600&q=80",
  "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=600&q=80",
  "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&q=80",
  "https://images.unsplash.com/photo-1421882046699-09bdfba5c639?w=600&q=80",
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const { data: apiImages } = useGetImages({ category: "gallery" });
  const images = (apiImages && apiImages.length > 0)
    ? apiImages.map(img => ({ src: `/api/storage${img.objectPath}`, alt: img.label || "Gallery image" }))
    : FALLBACK_IMAGES.map(src => ({ src, alt: "Gallery image" }));

  return (
    <section id="gallery" className="py-24 md:py-32 bg-[#FDF6EC]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl text-[#1C0A00] mb-6"
          >
            Gallery
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#C8963E] mx-auto"
          ></motion.div>
        </div>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {images.map((img, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="relative overflow-hidden rounded-xl cursor-pointer group break-inside-avoid"
              onClick={() => setSelectedImage(img.src)}
              data-testid={`gallery-image-${index}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-auto object-cover transition-all duration-500 group-hover:scale-105 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-[#1C0A00]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-[#1C0A00]/95 flex items-center justify-center p-4 md:p-12 cursor-zoom-out"
            onClick={() => setSelectedImage(null)}
            data-testid="gallery-lightbox"
          >
            <button
              className="absolute top-6 right-6 text-[#C8963E] hover:text-[#FDF6EC] transition-colors bg-transparent border-none"
              onClick={() => setSelectedImage(null)}
              data-testid="lightbox-close"
            >
              <X size={32} />
            </button>
            <motion.img
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              src={selectedImage}
              alt="Full screen gallery image"
              className="max-w-full max-h-full object-contain rounded shadow-2xl cursor-default"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
