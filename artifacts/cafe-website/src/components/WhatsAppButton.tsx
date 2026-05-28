import { FaWhatsapp } from "react-icons/fa";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/14155550198"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-[#25D366] text-white rounded-full shadow-xl hover:scale-110 transition-transform duration-300 group"
      data-testid="whatsapp-button"
    >
      <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-pulse-ring pointer-events-none"></div>
      <FaWhatsapp className="w-8 h-8 relative z-10" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-[#1C0A00] text-[#FDF6EC] text-sm whitespace-nowrap py-2 px-4 rounded shadow-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
        Chat with us on WhatsApp
        <span className="absolute left-full top-1/2 -translate-y-1/2 border-8 border-transparent border-l-[#1C0A00]"></span>
      </span>
    </a>
  );
}
