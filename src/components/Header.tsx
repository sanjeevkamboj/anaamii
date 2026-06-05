import React, { useState, useEffect } from "react";
import { Menu, X, ChevronRight, Instagram, Facebook } from "lucide-react";
import { NAVIGATION_ITEMS } from "../constants";

interface HeaderProps {
  onWishlistClick?: () => void;
  wishlistCount?: number;
  currentPage?: string;
  onPageChange?: (page: string) => void;
}

export default function Header({ wishlistCount = 0, currentPage = "home", onPageChange }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Monitor scrolling to transition header density & blur
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, targetSlug: string) => {
    if (onPageChange) {
      e.preventDefault();
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      onPageChange(targetSlug);
      setTimeout(() => {
        document.documentElement.style.scrollBehavior = "";
      }, 50);
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled
            ? "bg-[#60584D]/95 border-b border-white/15 backdrop-blur-md py-2 shadow-xl text-white"
            : "bg-[#60584D] border-b border-white/10 py-2 text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between h-14 relative font-sans">
          
          {/* Left Side: Logo */}
          <div className="flex items-center flex-shrink-0 z-10">
            <a 
              href="#" 
              onClick={(e) => handleLinkClick(e, "home")}
              className="flex items-center gap-3 group"
            >
              {/* Premium Vector 3D Penrose / Impossible Triangle Logo */}
              <svg
                viewBox="0 0 160 140"
                className="w-10 h-8.5 md:w-11 md:h-9.5 flex-shrink-0 text-white transition-all duration-300 group-hover:scale-105 pointer-events-none"
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
                <path d="M50 67 L80 37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M110 67 L80 37" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M80 110 L80 90" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="28" y1="126" x2="132" y2="126" stroke="currentColor" strokeWidth="1" strokeOpacity="0.6" />
              </svg>
 
              {/* Brand Lettering */}
              <div className="flex flex-col items-start leading-none text-left">
                <span 
                  className="text-[19px] md:text-[23px] font-normal tracking-[0.16em] text-white uppercase leading-none"
                  style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                >
                  ΛNΛΛMII
                </span>
                <div className="flex items-center w-full gap-1 mt-1">
                  <div className="h-[0.5px] bg-white/40 flex-grow"></div>
                  <span 
                    className="text-[6.5px] md:text-[7.5px] tracking-[0.18em] uppercase font-bold whitespace-nowrap"
                    style={{ fontFamily: "var(--font-helvetica)", color: "#EAE1D4" }}
                  >
                    MILLWORK GROUP
                  </span>
                  <div className="h-[0.5px] bg-white/40 flex-grow"></div>
                </div>
              </div>
            </a>
          </div>
 
          {/* Center Section: Centered Navigation Menu */}
          <nav className="hidden md:flex items-center gap-10 justify-center absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-0">
            {NAVIGATION_ITEMS.map((item) => {
              const itemSlug = item.label.toLowerCase();
              const isActive = currentPage === itemSlug;
 
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleLinkClick(e, itemSlug)}
                  className={`font-sans text-[11px] font-semibold tracking-[0.2em] transition-all uppercase nav-link whitespace-nowrap pb-0.5 border-b-2 ${
                    isActive ? "text-[#f5f2ed] border-[#f5f2ed]" : "text-white/75 hover:text-white border-transparent hover:border-white/40"
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Right Section: Prominent "Book Appointment" button + Socials */}
          <div className="flex items-center gap-5 md:gap-7 flex-shrink-0 z-10">
            {/* Social Media icons */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Instagram"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/15 hover:border-white hover:bg-white transition-all duration-300 cursor-pointer shadow-md group"
              >
                <Instagram className="w-4 h-4 stroke-[1.5] text-white group-hover:text-[#60584D] group-hover:scale-110 transition-all duration-300" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                title="Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/10 border border-white/15 hover:border-white hover:bg-white transition-all duration-300 cursor-pointer shadow-md group"
              >
                <Facebook className="w-4 h-4 stroke-[1.5] text-white group-hover:text-[#60584D] group-hover:scale-110 transition-all duration-300" />
              </a>
            </div>

            {/* Prominent "Book Appointment" CTA Button */}
            <a
              href="#appointment"
              onClick={(e) => handleLinkClick(e, "contact")}
              className="hidden sm:inline-flex items-center justify-center bg-[#f5f2ed] hover:bg-white text-stone-950 px-5 py-2.5 rounded-[4px] font-sans text-[11px] font-bold uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-lg"
            >
              Book Appointment
            </a>

            {/* Hamburger Button for Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-1.5 cursor-pointer text-white hover:text-stone-300 transition-colors"
              aria-label="Open global menu"
            >
              <Menu className="w-6 h-6 stroke-[1.5]" />
            </button>
          </div>

        </div>
      </header>

      {/* Side Slide-Over Drawer for Mobile & Global Navigation */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Soft backdrop overlay */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute inset-0 bg-stone-950/80 backdrop-blur-sm transition-opacity"
        />

        {/* Content panel */}
        <div
          className={`absolute left-0 top-0 h-full w-full max-w-sm bg-[#60584D] border-r border-white/15 p-8 flex flex-col justify-between transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div>
            {/* Header in panel */}
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <svg
                  viewBox="0 0 160 140"
                  className="w-8 h-7 flex-shrink-0 text-white"
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
                </svg>
                <div className="flex flex-col items-start leading-none text-left">
                  <span 
                    className="text-[16px] font-normal tracking-[0.14em] text-white uppercase leading-none"
                    style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', Georgia, serif" }}
                  >
                    ΛNΛΛMII
                  </span>
                  <span 
                    className="text-[6px] tracking-[0.14em] uppercase font-bold mt-0.5"
                    style={{ color: "#EAE1D4" }}
                  >
                    MILLWORK GROUP
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-white/60 hover:text-white p-1 text-xs uppercase tracking-widest flex items-center gap-1 cursor-pointer transition-colors"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Menu Links */}
            <div className="space-y-8">
              <span className="text-[10px] uppercase tracking-[0.25em] text-white/40 block mb-2 font-medium">
                Navigation
              </span>
              <nav className="flex flex-col space-y-5">
                {NAVIGATION_ITEMS.map((item) => {
                  const itemSlug = item.label.toLowerCase();
                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={(e) => {
                        setIsMobileMenuOpen(false);
                        handleLinkClick(e, itemSlug);
                      }}
                      className="font-sans text-xl font-light text-white hover:text-white/80 transition-colors flex items-center justify-between group"
                    >
                      <span>{item.label}</span>
                      <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white transition-transform group-hover:translate-x-1" />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Brand details and Appointment button on mobile */}
            <div className="mt-12 border-t border-white/5 pt-8 space-y-5">
              <a
                href="#appointment"
                onClick={(e) => {
                  setIsMobileMenuOpen(false);
                  handleLinkClick(e, "contact");
                }}
                className="w-full inline-flex items-center justify-center bg-[#f5f2ed] hover:bg-white text-stone-950 font-sans text-xs font-bold uppercase tracking-wider py-3 rounded-[4px] transition-all duration-300"
              >
                Book Appointment
              </a>

              {/* Mobile Social media icon row */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 border border-white/15 hover:border-white hover:bg-white transition-all duration-300 group"
                >
                  <Instagram className="w-5 h-5 stroke-[1.5] text-white/90 group-hover:text-[#60584D] transition-colors" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full flex items-center justify-center bg-white/10 border border-white/15 hover:border-white hover:bg-white transition-all duration-300 group"
                >
                  <Facebook className="w-5 h-5 stroke-[1.5] text-white/90 group-hover:text-[#60584D] transition-colors" />
                </a>
              </div>
            </div>
          </div>

          {/* Bottom credentials */}
          <div className="border-t border-white/5 pt-6 text-[9px] text-white/30 font-light uppercase tracking-wider space-y-1">
            <div>© 2026 ANAAMII Millwork Group.</div>
            <div>All Rights Reserved.</div>
          </div>
        </div>
      </div>
    </>
  );
}
