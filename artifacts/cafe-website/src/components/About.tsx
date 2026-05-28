import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

function AnimatedCounter({ value, text }: { value: number, text: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  // Format text based on original content: e.g. 5000 -> 5,000+
  let displayValue = count.toString();
  if (value === 5000) displayValue = "5,000+";
  if (value === 50) displayValue = "50+";
  if (value === 6) displayValue = "6+";
  if (value === 49) displayValue = "4.9★";

  return (
    <div ref={ref} className="flex flex-col items-center justify-center p-4">
      <div className="font-serif text-4xl md:text-5xl text-[#C8963E] mb-2 font-bold" data-testid={`counter-${value}`}>
        {displayValue}
      </div>
      <div className="text-sm uppercase tracking-widest text-[#1C0A00]/70 font-semibold text-center">
        {text}
      </div>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32 bg-[#FDF6EC] overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2"
          >
            <h2 className="font-serif text-5xl md:text-6xl text-[#1C0A00] mb-8 relative inline-block">
              Our Story
              <span className="absolute -bottom-4 left-0 w-24 h-1 bg-[#C8963E]"></span>
            </h2>
            <div className="space-y-6 text-[#1C0A00]/80 text-lg leading-relaxed font-light">
              <p>
                Founded in the heart of San Francisco in 2018, Brewed Bliss Café began with a simple belief: coffee is a ritual, not just a routine. We wanted to create a sanctuary away from the hustle of the city, inspired by the candlelit espresso bars tucked into Italian alleyways.
              </p>
              <p>
                Every bean we roast is ethically sourced and meticulously prepared by artisans who treat coffee making as a lifelong craft. Our food is prepared daily using local, organic ingredients, designed to perfectly complement the nuanced flavor profiles of our beverages.
              </p>
              <p>
                Whether you're here to work, to meet an old friend, or simply to watch the world go by with a perfect cortado in hand, you've found your place. Welcome home.
              </p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute inset-0 bg-[#C8963E] translate-x-4 translate-y-4 rounded-t-full rounded-b-md"></div>
            <img 
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&q=80" 
              alt="Barista pouring latte art" 
              className="relative z-10 w-full h-auto object-cover rounded-t-full rounded-b-md shadow-xl aspect-[4/5]"
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-[#C8963E]/30 pt-12 border-t border-[#C8963E]/30"
        >
          <AnimatedCounter value={5000} text="Cups Served Daily" />
          <AnimatedCounter value={50} text="Menu Items" />
          <AnimatedCounter value={6} text="Years of Excellence" />
          <AnimatedCounter value={49} text="Average Rating" />
        </motion.div>
      </div>
    </section>
  );
}
