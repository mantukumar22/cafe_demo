import { motion } from "framer-motion";
import { UtensilsCrossed, ShoppingBag, Truck, Calendar, Users, Briefcase } from "lucide-react";

const services = [
  {
    title: "Dine-In",
    description: "Experience the warm, candlelit ambiance of our café. Perfect for deep conversations or deep work.",
    icon: UtensilsCrossed,
  },
  {
    title: "Takeaway",
    description: "Artisan coffee on the go. Pre-order through our app and it'll be ready when you arrive.",
    icon: ShoppingBag,
  },
  {
    title: "Home Delivery",
    description: "Can't make it to us? We'll bring the bliss to you, packaged to preserve temperature and taste.",
    icon: Truck,
  },
  {
    title: "Event Hosting",
    description: "Rent our beautiful space for your evening events. Custom menus and dedicated baristas included.",
    icon: Calendar,
  },
  {
    title: "Private Bookings",
    description: "Reserve a secluded section of the café for intimate gatherings, book clubs, or study groups.",
    icon: Users,
  },
  {
    title: "Corporate Catering",
    description: "Elevate your morning meetings with our bulk coffee boxes and artisan pastry platters.",
    icon: Briefcase,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32 bg-[#1C0A00] text-[#FDF6EC]">
      <div className="container mx-auto px-6 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-serif text-5xl md:text-6xl mb-6"
          >
            What We Offer
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            whileInView={{ opacity: 1, width: "80px" }}
            viewport={{ once: true }}
            className="h-1 bg-[#C8963E] mx-auto"
          ></motion.div>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
        >
          {services.map((service, index) => (
            <motion.div 
              key={index}
              variants={cardVariants}
              className="bg-[#2A1200] border border-[#C8963E]/20 p-8 rounded-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(200,150,62,0.15)] group"
              data-testid={`service-card-${index}`}
            >
              <div className="w-16 h-16 rounded-full bg-[#1C0A00] border border-[#C8963E]/40 flex items-center justify-center mb-6 group-hover:bg-[#C8963E] group-hover:text-[#1C0A00] transition-colors duration-300">
                <service.icon className="w-8 h-8 text-[#C8963E] group-hover:text-[#1C0A00]" strokeWidth={1.5} />
              </div>
              <h3 className="font-serif text-2xl font-semibold mb-4 text-[#FDF6EC] group-hover:text-[#C8963E] transition-colors">
                {service.title}
              </h3>
              <p className="text-[#FDF6EC]/70 leading-relaxed font-light">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
