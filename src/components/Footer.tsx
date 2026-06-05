import React from "react";
import { Mail, Phone, Instagram, Facebook, Linkedin, ArrowUp } from "lucide-react";

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
            <svg
              viewBox="0 0 160 140"
              className="w-12 h-10 text-white mb-3 flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M80 15 L140 120 H20 L80 15 Z"
                stroke="currentColor"
                strokeWidth="3.5"
                strokeLinejoin="round"
              />
              <path
                d="M80 37 L122 110 H38 Z"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinejoin="round"
              />
              <path d="M80 15 L80 37" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M140 120 L122 110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M20 120 L38 110" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <div className="flex flex-col items-center">
              <span 
                className="text-2xl md:text-3xl font-normal tracking-[0.2em] text-white uppercase leading-none"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
              >
                ΛNΛΛMII
              </span>
              <div className="flex items-center w-40 gap-1.5 mt-2">
                <div className="h-[0.5px] bg-white/40 flex-grow"></div>
                <span 
                  className="text-[7.5px] tracking-[0.22em] uppercase font-bold whitespace-nowrap"
                  style={{ color: "#60584D" }}
                >
                  MILLWORK GROUP
                </span>
                <div className="h-[0.5px] bg-white/40 flex-grow"></div>
              </div>
            </div>
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
