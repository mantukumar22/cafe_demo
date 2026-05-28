import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const TESTIMONIALS = [
  {
    name: "Eleanor Vance",
    location: "San Francisco, CA",
    rating: 5,
    text: "The most authentic espresso I've had outside of Florence. The ambiance makes you want to stay for hours.",
  },
  {
    name: "Marcus Chen",
    location: "Oakland, CA",
    rating: 5,
    text: "Their cortado is perfection. I come here every Sunday morning just to start my week right.",
  },
  {
    name: "Sarah Jenkins",
    location: "Berkeley, CA",
    rating: 5,
    text: "Beyond the incredible coffee, the staff genuinely cares about their craft. It shows in every cup.",
  },
  {
    name: "David Rossi",
    location: "San Francisco, CA",
    rating: 5,
    text: "A hidden gem. The pastries are baked fresh daily and pair beautifully with their house blend.",
  },
  {
    name: "Amira Patel",
    location: "San Jose, CA",
    rating: 5,
    text: "The perfect place for deep work. Fast Wi-Fi, respectful noise levels, and brilliant coffee.",
  },
  {
    name: "James Wilson",
    location: "San Francisco, CA",
    rating: 5,
    text: "I hosted a small gathering here and the team was phenomenal. Everyone raved about the pour-overs.",
  },
];

export function Testimonials() {
  // Duplicate array for seamless scrolling
  const duplicatedTestimonials = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-[#1C0A00] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 mb-16 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-serif text-5xl md:text-6xl text-[#FDF6EC] mb-6"
        >
          Voices of Bliss
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          whileInView={{ opacity: 1, width: "80px" }}
          viewport={{ once: true }}
          className="h-1 bg-[#C8963E] mx-auto"
        ></motion.div>
      </div>

      <div className="relative w-full flex overflow-hidden mask-edges pb-8">
        <motion.div
          className="flex gap-8 px-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 40,
          }}
        >
          {duplicatedTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="w-[300px] md:w-[400px] flex-shrink-0 bg-[#2A1200] border border-[#C8963E]/20 rounded-2xl p-8 flex flex-col justify-between"
              data-testid={`testimonial-card-${idx}`}
            >
              <div>
                <div className="flex text-[#C8963E] mb-6 text-xl">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
                <p className="text-[#FDF6EC]/80 font-serif italic text-lg leading-relaxed mb-8">
                  "{testimonial.text}"
                </p>
              </div>
              <div className="flex items-center gap-4 mt-auto">
                <Avatar className="h-12 w-12 border border-[#C8963E]/40">
                  <AvatarFallback className="bg-[#1C0A00] text-[#C8963E] font-serif">
                    {testimonial.name.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="text-[#FDF6EC] font-semibold tracking-wide">
                    {testimonial.name}
                  </h4>
                  <p className="text-[#C8963E]/70 text-sm uppercase tracking-widest text-[10px]">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
        .mask-edges {
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }
      `}} />
    </section>
  );
}
