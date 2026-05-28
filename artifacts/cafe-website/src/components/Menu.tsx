import { useState } from "react";
import { motion } from "framer-motion";
import { useGetMenu } from "@workspace/api-client-react";
import { Skeleton } from "@/components/ui/skeleton";

export function Menu() {
  const { data: menuItems, isLoading } = useGetMenu();
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Hot Drinks", "Cold Drinks", "Food", "Desserts"];

  const filteredItems = menuItems?.filter(
    (item) => activeCategory === "All" || item.category === activeCategory
  );

  return (
    <section id="menu" className="py-24 md:py-32 bg-[#FDF6EC]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl text-[#1C0A00] mb-6"
          >
            Our Menu
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#C8963E] mx-auto mb-12"
          ></motion.div>

          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-testid={`menu-filter-${cat.replace(/\s+/g, '-').toLowerCase()}`}
                className={`px-6 py-2 rounded-full border transition-all duration-300 uppercase tracking-wider text-sm font-semibold ${
                  activeCategory === cat
                    ? "bg-[#1C0A00] text-[#C8963E] border-[#1C0A00]"
                    : "bg-transparent text-[#1C0A00] border-[#1C0A00]/20 hover:border-[#1C0A00]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex flex-col">
                <Skeleton className="w-full aspect-video rounded-t-xl rounded-b-none bg-[#1C0A00]/10" />
                <div className="p-6 bg-white border border-[#1C0A00]/5 border-t-0 rounded-b-xl flex-grow">
                  <Skeleton className="h-6 w-2/3 mb-4 bg-[#1C0A00]/10" />
                  <Skeleton className="h-4 w-full mb-2 bg-[#1C0A00]/10" />
                  <Skeleton className="h-4 w-4/5 mb-6 bg-[#1C0A00]/10" />
                  <Skeleton className="h-6 w-1/4 bg-[#1C0A00]/10" />
                </div>
              </div>
            ))
          ) : (
            filteredItems?.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group flex flex-col bg-white rounded-xl overflow-hidden border border-[#1C0A00]/5 transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_15px_30px_-5px_rgba(28,10,0,0.1)]"
                data-testid={`menu-item-${item.id}`}
              >
                <div className="aspect-video w-full overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-[#1C0A00]/80 backdrop-blur-sm px-3 py-1 text-xs uppercase tracking-widest text-[#FDF6EC] rounded-full">
                    {item.category}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="font-serif text-2xl font-bold text-[#1C0A00] mb-3">{item.name}</h3>
                  <p className="text-[#1C0A00]/60 text-sm mb-6 flex-grow leading-relaxed">
                    {item.description}
                  </p>
                  <div className="font-serif text-xl font-bold text-[#C8963E]">
                    ${Number(item.price).toFixed(2)}
                  </div>
                </div>
              </motion.div>
            ))
          )}
          {filteredItems?.length === 0 && !isLoading && (
            <div className="col-span-full text-center py-12 text-[#1C0A00]/60">
              No items found in this category.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
