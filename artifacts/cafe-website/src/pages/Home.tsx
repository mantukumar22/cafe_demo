import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Menu } from "@/components/Menu";
import { Services } from "@/components/Services";
import { Gallery } from "@/components/Gallery";
import { InnerView } from "@/components/InnerView";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-[100dvh] w-full bg-[#FDF6EC] text-[#1C0A00] font-sans selection:bg-[#C8963E] selection:text-[#1C0A00]">
      <Navbar />
      <Hero />
      <About />
      <Menu />
      <Services />
      <Gallery />
      <InnerView />
      <Testimonials />
      <Contact />
      <WhatsAppButton />
      <Footer />
    </main>
  );
}
