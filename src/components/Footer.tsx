import React from "react";
import { Mail, Phone, Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";
import logo from "../../assets/image/anaami-main-logo.png";

interface FooterProps {
  onPageChange?: (page: string) => void;
}

export default function Footer({ onPageChange }: FooterProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (onPageChange) {
      e.preventDefault();
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      onPageChange("home");
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = "";
      }, 50);
    }
  };

  return (
    <footer className="w-full bg-[#0F0F0E] pt-8 pb-4 px-6 md:px-12 lg:px-20 border-t border-white/5 text-white">
      <div className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        
        {/* Top Branding Section */}
        <div className="flex flex-col items-center justify-center mb-5 text-center">
          {/* Logo */}
          <div 
            onClick={handleLogoClick}
            className="flex flex-col items-center justify-center group mb-3 cursor-pointer select-none"
          >
            <img
            src={logo}
            alt="Anaamii Logo"
            className="h-12 md:h-14 w-auto object-contain transition-all duration-300 group-hover:scale-105"
          />
          
          </div>

          {/* Contact Details Grid */}
          <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-12 mt-4 text-xs font-mono tracking-widest text-[#979AAA]">
            <a 
              href="mailto:concierge@anaamii.ca" 
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4 stroke-[1.25]" />
              <span>concierge@anaamii.ca</span>
            </a>
            <span className="hidden sm:inline text-white/25">•</span>
            <a 
              href="tel:+14165550192" 
              className="flex items-center gap-2 hover:text-white transition-colors"
            >
              <Phone className="w-4 h-4 stroke-[1.25]" />
              <span>+1 (416) 555-0192</span>
            </a>
          </div>
        </div>

        {/* Divider line */}
        <div className="w-full h-[1px] bg-white/5 mb-4" />

        {/* Bottom Socials & Rights Row */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Social Icons Container */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Instagram"
              aria-label="Instagram"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#60584D] hover:bg-[#60584D] hover:text-black transition-all duration-300 cursor-pointer shadow-md group"
            >
              <Instagram className="w-4 h-4 stroke-[1.5] text-white group-hover:text-black group-hover:scale-110 transition-all duration-300" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              title="Facebook"
              aria-label="Facebook"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#60584D] hover:bg-[#60584D] hover:text-black transition-all duration-300 cursor-pointer shadow-md group"
            >
              <Facebook className="w-4 h-4 stroke-[1.5] text-white group-hover:text-black group-hover:scale-110 transition-all duration-300" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              aria-label="LinkedIn"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#60584D] hover:bg-[#60584D] hover:text-black transition-all duration-300 cursor-pointer shadow-md group"
            >
              <Linkedin className="w-4 h-4 stroke-[1.5] text-white group-hover:text-black group-hover:scale-110 transition-all duration-300" />
            </a>
          </div>

          {/* Legal and Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-[10px] font-mono tracking-widest text-white/50">
            <span>© {new Date().getFullYear()} ANAAMII INC.</span>
            <span className="text-white/20">-</span>
            <a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a>
            <span className="text-white/20">-</span>
            <a href="#terms" className="hover:text-white transition-colors">TERMS OF WORK</a>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={handleScrollToTop}
            aria-label="Scroll to top"
            className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 border border-white/10 hover:border-[#60584D] hover:bg-[#60584D] hover:text-black text-white hover:text-black transition-all cursor-pointer group shadow-md"
          >
            <ArrowUp className="w-4 h-4 stroke-[1.5] transition-transform group-hover:-translate-y-0.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
