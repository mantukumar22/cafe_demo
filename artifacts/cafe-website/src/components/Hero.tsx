import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1920&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <motion.div
        className="container mx-auto px-6 relative z-10 text-center text-[#FDF6EC] max-w-4xl pt-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.p 
          variants={itemVariants}
          className="text-[#C8963E] uppercase tracking-[0.3em] text-sm md:text-base font-semibold mb-6"
        >
          Est. 2018 · San Francisco
        </motion.p>
        
        <motion.h1 
          variants={itemVariants}
          className="font-serif italic text-5xl md:text-7xl lg:text-8xl mb-8 leading-tight drop-shadow-lg"
        >
          Where Every Sip<br/>Tells a Story
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-200 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
        >
          Handcrafted beverages, artisan food, and a space that feels like home.
        </motion.p>
        
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button 
            size="lg" 
            className="bg-[#C8963E] text-[#1C0A00] hover:bg-[#D4694A] hover:text-[#FDF6EC] px-8 py-6 text-sm uppercase tracking-widest w-full sm:w-auto transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("menu")}
            data-testid="hero-btn-menu"
          >
            Explore Our Menu
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-[#C8963E] text-[#C8963E] hover:bg-[#C8963E] hover:text-[#1C0A00] bg-transparent px-8 py-6 text-sm uppercase tracking-widest w-full sm:w-auto transition-all duration-300 hover:scale-105"
            onClick={() => scrollToSection("contact")}
            data-testid="hero-btn-reserve"
          >
            Reserve a Table
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 text-[#C8963E] cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        onClick={() => scrollToSection("about")}
        data-testid="hero-scroll-indicator"
      >
        <ChevronDown size={40} className="opacity-80 hover:opacity-100 transition-opacity" />
      </motion.div>
    </section>
  );
}
