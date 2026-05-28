import { FaInstagram, FaFacebook, FaTwitter } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="bg-[#1C0A00] text-[#FDF6EC] pt-20 pb-10 border-t border-[#C8963E]/20">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Logo & Tagline */}
          <div className="space-y-6">
            <h3 className="font-serif text-3xl font-bold text-[#C8963E]">Brewed Bliss</h3>
            <p className="text-[#FDF6EC]/70 font-light max-w-sm">
              A premium boutique coffee experience. Handcrafted beverages, artisan food, and a space that feels like home.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:ml-auto">
            <h4 className="font-serif text-xl mb-6 text-[#C8963E]">Explore</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Menu', 'Services', 'Gallery', 'Contact'].map((item) => (
                <li key={item}>
                  <button 
                    onClick={() => {
                      const el = document.getElementById(item.toLowerCase());
                      if(el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-[#FDF6EC]/70 hover:text-[#D4694A] transition-colors uppercase text-sm tracking-widest"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:ml-auto">
            <h4 className="font-serif text-xl mb-6 text-[#C8963E]">Connect</h4>
            <div className="flex gap-6">
              <a href="#" className="w-10 h-10 rounded-full border border-[#C8963E]/40 flex items-center justify-center text-[#FDF6EC] hover:bg-[#C8963E] hover:text-[#1C0A00] transition-all duration-300">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#C8963E]/40 flex items-center justify-center text-[#FDF6EC] hover:bg-[#C8963E] hover:text-[#1C0A00] transition-all duration-300">
                <FaFacebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#C8963E]/40 flex items-center justify-center text-[#FDF6EC] hover:bg-[#C8963E] hover:text-[#1C0A00] transition-all duration-300">
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Divider & Copyright */}
        <div className="border-t border-[#C8963E]/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[#FDF6EC]/50 text-sm">
          <p>© 2025 Brewed Bliss Café. Made with ☕ and love.</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-[#C8963E] transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-[#C8963E] transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
