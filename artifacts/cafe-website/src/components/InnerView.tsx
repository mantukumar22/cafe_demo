import { motion } from "framer-motion";
import { useGetImages } from "@workspace/api-client-react";

export function InnerView() {
  const { data: images } = useGetImages({ category: "inner-view" });

  if (!images || images.length === 0) return null;

  return (
    <section id="inner-view" className="py-24 bg-[#FDF6EC]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-4xl md:text-5xl text-[#1C0A00] mb-12 text-center"
        >
          Step Inside Our World
        </motion.h2>
        <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar">
          {images.map((img, i) => (
            <motion.img
              key={img.id || i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              src={`/api/storage${img.objectPath}`}
              alt={img.label || "Inner view"}
              className="rounded-xl h-64 w-auto object-cover min-w-[280px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}