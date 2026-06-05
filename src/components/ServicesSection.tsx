import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Sparkles, LayoutGrid, Home, Building, Armchair, Hammer, Compass, MessageSquare, X, Check, Calendar } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

interface ServiceItem {
  id: string;
  code: string;
  title: string;
  description: string;
  image: string;
  icon: React.ComponentType<any>;
  detailedDescription: string;
  keyFeatures: string[];
  gallery: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: "residential",
    code: "01",
    title: "Residential Interior Design",
    description: "Bespoke luxury styling for private residences, modern penthouses, and private estates.",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
    icon: Home,
    detailedDescription: "Crafting bespoke living spaces that serve as an authentic physical portrait of their residents. We blend meticulous spatial proportions with grain-matched walnut, book-matched marble slabs, and custom-designed furniture systems, turning private villas, modern scale penthouses, and primary estates into refined environments of premium comfort and class.",
    keyFeatures: [
      "Custom kitchen & high-end wardrobe carpentry planning",
      "Sourcing of rare Italian stones & bespoke architectural hardware",
      "Bespoke layout modeling, scale sketches & CAD blueprints",
      "Comprehensive color scheme, material trim & art curation"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "commercial",
    code: "02",
    title: "Commercial Interior Design",
    description: "Inspiring retail flagship designs, luxury office lobbies, and boutique lounges.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    icon: Building,
    detailedDescription: "Elevating brand identity and workspace productivity through high-concept architectural layouts. We collaborate with business groups to sculpt luxury reception lobbies, premium retail showrooms, private corporate lounges, and collaborative executive hubs that project absolute corporate prestige and architectural sophistication.",
    keyFeatures: [
      "Custom reception counters & branded entrance spaces",
      "Acoustic planning & specialized wall-panel detailing",
      "Ergonomic custom lighting systems designed for display & focus",
      "Premium traffic-flow planning supporting high-density utility"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "space-planning",
    code: "03",
    title: "Space Planning",
    description: "Intelligent layout choreography, ergonomics, and structural optimization.",
    image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=80",
    icon: Compass,
    detailedDescription: "The silent blueprint behind residential flow and structural beauty. We scientifically study sightlines, horizontal density, door clearance, and natural light penetration to maximize every square inch. Our master floor layout planning ensures your architecture supports lifestyle workflows effortlessly.",
    keyFeatures: [
      "Comprehensive CAD layout optimization & spatial modeling",
      "Insightful programmatic volume allocation across multi-floor plans",
      "Symmetrical sightline and structural focal-point optimization",
      "Furniture scale alignment ensuring effortless room navigation"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "furniture-decor",
    code: "04",
    title: "Furniture & Decor",
    description: "Curation of Scandinavian systems, custom armchairs, and bespoke designer lighting.",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80",
    icon: Armchair,
    detailedDescription: "Artisanal procurement of stand-out bespoke pieces that elevate environments. We design furniture custom-made for our projects, pairing rich boucle, aniline leathers, hand-brushed bronze base structures, and curated lighting pieces that interact dynamically with space.",
    keyFeatures: [
      "Direct access to custom, limited-edition European furniture mills",
      "Tailor-made upholstery & premium hand-detailed leather selection",
      "Unique hand-blown glass lighting consults and placement",
      "Curated accent styling encompassing rich stonework and sculptures"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "renovation",
    code: "05",
    title: "Renovation & Remodeling",
    description: "Complete structural makeovers, premier material installations, and cabinet millwork.",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    icon: Hammer,
    detailedDescription: "Re-imagining architectural environments with modern technology and master craftsmanship. From double-height visual transformations to hand-crafted millwork installations, we manage complex demolition, premium masonry, and specialized architectural details with precision.",
    keyFeatures: [
      "Complete structural re-engineering and open-concept conversions",
      "Premium Calacatta and Nero Marquina marble slab matching",
      "Meticulous designer cabinet carpentry and custom wall paneling",
      "State-of-the-art smart illumination, climate and sound installations"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80"
    ]
  },
  {
    id: "turnkey",
    code: "06",
    title: "Turnkey Interior Solutions",
    description: "End-to-end project management, site layout, supervision, and white-glove handover.",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    icon: LayoutGrid,
    detailedDescription: "An entirely stress-free, luxury journey from initial concept drawings to moving into your completely finished, luxury living environment. Our comprehensive turnkey system handles structural calculations, municipal approvals, vendor contracting, direct on-site supervision, white-glove staging, and custom lighting styling.",
    keyFeatures: [
      "Dedicated single point of contact supervising all project phases",
      "Rigorous quality audits, material inspection and budget modeling",
      "Curator-grade styling, styling accent placement, and final vacuuming",
      "Full post-handover support, structural review, and upkeep guides"
    ],
    gallery: [
      "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1618219944342-824e40a13285?auto=format&fit=crop&w=600&q=80"
    ]
  }
];

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Selected service state for the modal
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);

  // Booking consultation forms fields (inside modal)
  const [bookingFirstName, setBookingFirstName] = useState("");
  const [bookingLastName, setBookingLastName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingPhone, setBookingPhone] = useState("");
  const [bookingDate, setBookingDate] = useState("");
  const [bookingMessage, setBookingMessage] = useState("");
  const [isBooked, setIsBooked] = useState(false);

  // Carousel States & Refs
  const trackRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const isHoveredRef = useRef(false);
  const [singleSetWidth, setSingleSetWidth] = useState(0);
  const [isCurrentlyDragging, setIsCurrentlyDragging] = useState(false);

  // Triplicated array for infinite loop (18 cards total: 6 x 3)
  const duplicatedServices = [...SERVICES, ...SERVICES, ...SERVICES];

  // GSAP ScrollTrigger timeline to dynamically scale container width from 100% to squeezed states and back
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;
      const startWidth = "100%";
      const midWidth1 = isMobile ? "94vw" : "84vw";
      const centerWidth = isMobile ? "88vw" : "72vw";
      const midWidth2 = isMobile ? "94vw" : "84vw";
      const endWidth = "100%";

      const startRadius = "0px";
      const midRadius1 = isMobile ? "24px" : "56px";
      const centerRadius = isMobile ? "32px" : "64px";
      const midRadius2 = isMobile ? "24px" : "56px";
      const endRadius = "0px";

      // Set initial full-width seamless configuration
      gsap.set(container, {
        width: startWidth,
        borderRadius: startRadius,
        maxWidth: "100%",
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Starts when top of section joins screen bottom
          end: "bottom bottom", // Ends exactly when bottom of section joins screen bottom
          scrub: 2.4,          // Highly relaxed, buttery smooth scrub interaction with momentum
          invalidateOnRefresh: true,
        }
      });

      tl.to(container, {
        width: midWidth1,
        borderRadius: midRadius1,
        duration: 1,
        ease: "power2.in" // Starts slowly/relaxed, then accelerates.
      })
      .to(container, {
        width: centerWidth,
        borderRadius: centerRadius,
        duration: 1.5,
        ease: "power3.in" // More dramatic pull in
      })
      .to(container, {
        width: midWidth2,
        borderRadius: midRadius2,
        duration: 1.5,
        ease: "power2.out" // Transitions out smoothly
      })
      .to(container, {
        width: endWidth,
        borderRadius: endRadius,
        duration: 1,
        ease: "power1.out"
      });
    });

    return () => {
      ctx.revert();
    };
  }, []);

  // Recalculate physical scroll width of one complete segment set of cards to snap infinite track
  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        const children = trackRef.current.children;
        if (children && children.length >= 7) {
          const firstCard = children[0] as HTMLElement;
          const secondCard = children[1] as HTMLElement;
          const seventhCard = children[6] as HTMLElement;
          
          const cardWidth = firstCard.offsetWidth;
          const gap = secondCard.offsetLeft - (firstCard.offsetLeft + cardWidth);
          const width = seventhCard.offsetLeft - firstCard.offsetLeft;
          setSingleSetWidth(width);
          
          // Calculate dynamic horizontal offset to center 4 cards perfectly with half cards on sides
          const blockWidth = (4 * cardWidth) + (3 * gap);
          const offset = (window.innerWidth - blockWidth) / 2;
          
          // Apply initial offset position locked perfectly in the middle repeated set
          currentXRef.current = -width + offset;
          trackRef.current.style.transform = `translate3d(${-width + offset}px, 0, 0)`;
        }
      }
    };

    measure();
    const timer = setTimeout(measure, 400); // Wait for browser styling paint loop
    window.addEventListener("resize", measure);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", measure);
    };
  }, []);

  // Infinite slow continuous ticker loop
  useEffect(() => {
    let frameId: number;

    const autoTicker = () => {
      if (!isDraggingRef.current && !isHoveredRef.current && singleSetWidth > 0) {
        currentXRef.current -= 0.8; // Auto scroll velocity per frame

        // Boundary safety check and seamless index offset shifting
        if (currentXRef.current <= -singleSetWidth * 2) {
          currentXRef.current += singleSetWidth;
        } else if (currentXRef.current >= 0) {
          currentXRef.current -= singleSetWidth;
        }

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
        }
      }
      frameId = requestAnimationFrame(autoTicker);
    };

    frameId = requestAnimationFrame(autoTicker);
    return () => cancelAnimationFrame(frameId);
  }, [singleSetWidth]);

  // Unified dragging computation functions
  const handleDragDown = (clientX: number) => {
    isDraggingRef.current = true;
    setIsCurrentlyDragging(true);
    startXRef.current = clientX - currentXRef.current;
  };

  const handleDragMove = (clientX: number) => {
    if (!isDraggingRef.current) return;
    
    let nextX = clientX - startXRef.current;

    // Boundary wrapping on interactive scroll movement
    if (singleSetWidth > 0) {
      if (nextX <= -singleSetWidth * 2) {
        nextX += singleSetWidth;
        startXRef.current = clientX - nextX;
      } else if (nextX >= 0) {
        nextX -= singleSetWidth;
        startXRef.current = clientX - nextX;
      }
    }

    currentXRef.current = nextX;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${nextX}px, 0, 0)`;
    }
  };

  const handleDragUp = () => {
    isDraggingRef.current = false;
    setIsCurrentlyDragging(false);
  };

  const openModal = (service: ServiceItem) => {
    setSelectedService(service);
    setIsBooked(false);
    setBookingFirstName("");
    setBookingLastName("");
    setBookingEmail("");
    setBookingPhone("");
    setBookingDate("");
    setBookingMessage("");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = "unset";
  };

  // Clean up scroll lock if the component unmounts unexpectedly
  useEffect(() => {
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full bg-[#000000] flex flex-col justify-center items-center overflow-hidden py-0 animate-fade-in"
    >
      {/* Outer Section Wrapper with initially reduced sizing and rounded corners */}
      <div
        ref={containerRef}
        className="w-full bg-[#F5F2ED] py-[60px] lg:py-[28px] xl:py-[32px] 2xl:py-[60px] rounded-none shadow-2xl relative flex flex-col items-center"
      >
        {/* Subtle Decorative Star Backlight */}
        <div className="absolute top-10 right-10 opacity-20 text-amber-850/40 pointer-events-none">
          <Sparkles className="w-16 h-16 animate-pulse" />
        </div>

        {/* Section Header */}
        <div className="max-w-7xl mx-auto mb-6 md:mb-8 lg:mb-3 xl:mb-4 2xl:mb-8 flex flex-col items-center text-center px-6 md:px-12 block">
          <div className="inline-flex items-center gap-2.5 mb-2.5 group select-none">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8D9981] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#8D9981]"></span>
            </div>
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#8D9981] font-sans">
              WHAT WE DO & BUILD
            </span>
          </div>
          
          <h2
            className="text-[#000000] text-3xl sm:text-4xl lg:text-3xl xl:text-3.5xl 2xl:text-[2.75rem] font-bold tracking-tight max-w-4xl leading-[115%]"
            style={{ fontFamily: "var(--font-helvetica)" }}
          >
            Discover Our Interior Design Services
          </h2>
          <div className="h-[1px] w-24 bg-[#8D9981]/45 mt-3 lg:mt-2 xl:mt-2.5 2xl:mt-4" />
        </div>

        {/* DRAGGABLE CAROUSEL CONTAINER (Full width, margin-free, immersive) */}
        <div 
          className="relative w-full overflow-hidden select-none cursor-grab active:cursor-grabbing py-2"
          onMouseEnter={() => { isHoveredRef.current = true; }}
          onMouseLeave={() => { isHoveredRef.current = false; handleDragUp(); }}
          onMouseDown={(e) => handleDragDown(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragUp}
          onTouchStart={(e) => { isHoveredRef.current = true; handleDragDown(e.touches[0].clientX); }}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={() => { isHoveredRef.current = false; handleDragUp(); }}
        >
          {/* Gradient Edge Overlays - pointer-events-none ensures interaction flows through seamlessly */}
          <div className="absolute top-0 bottom-0 left-0 w-24 sm:w-36 md:w-56 bg-gradient-to-r from-[#F5F2ED] via-[#F5F2ED]/65 to-transparent z-40 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 sm:w-36 md:w-56 bg-gradient-to-l from-[#F5F2ED] via-[#F5F2ED]/65 to-transparent z-40 pointer-events-none" />

          {/* Animated Slider Track Frame */}
          <div
            ref={trackRef}
            className="flex gap-4 sm:gap-6 lg:gap-[1.5vw] w-max will-change-transform px-0"
            style={{ touchAction: "pan-y" }}
          >
            {duplicatedServices.map((service, idx) => {
              const ServiceIcon = service.icon;
              return (
                <div
                  key={`${service.id}-${idx}`}
                  onClick={() => openModal(service)}
                  className="w-[280px] sm:w-[310px] lg:w-[18vw] xl:w-[16vw] 2xl:w-[18vw] h-[440px] lg:h-[300px] xl:h-[340px] 2xl:h-[460px] bg-stone-100 rounded-[1.75rem] lg:rounded-[2rem] hover:rounded-[2.25rem] relative group overflow-hidden transition-all duration-500 hover:shadow-2xl border border-stone-200/40 flex-shrink-0 cursor-pointer"
                >
                  {/* Master 100% Immersive Taller Image segment */}
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-[2.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105 select-none pointer-events-none filter brightness-95 group-hover:brightness-90"
                      draggable="false"
                    />
                    {/* Immersive gradient mask on card for pristine readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-all duration-300 group-hover:via-black/55" />
                  </div>

                  {/* Top-Left Floating Minimal Accent Icon */}
                  <div className="absolute top-4 left-4 lg:top-5 lg:left-5 bg-black/70 backdrop-blur-md rounded-full p-2.5 lg:p-3 shadow-md border border-white/10 text-white z-20 transition-all duration-500 group-hover:bg-[#8D9981] group-hover:text-black">
                    <ServiceIcon className="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-[1.5]" />
                  </div>

                  {/* Symmetrical code tag at the top-right */}
                  <div className="absolute top-4 right-4 lg:top-5 lg:right-5 bg-black/50 backdrop-blur-md text-[#8D9981] px-2.5 py-1 lg:px-3 lg:py-1.5 rounded-full text-[8.5px] lg:text-[9px] font-bold tracking-widest uppercase z-20 border border-white/5">
                    Code #{service.code}
                  </div>

                  {/* Overlaid Bottom Content Plate featuring ONLY title & high-end modern CTA */}
                  <div 
                    className="absolute bottom-4 left-4 right-4 lg:bottom-4 lg:left-4 lg:right-4 xl:bottom-5 xl:left-5 xl:right-5 bg-white/95 backdrop-blur-md rounded-[1.5rem] p-4 lg:p-3.5 xl:p-5 border border-white/45 shadow-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] transform group-hover:-translate-y-1.5 group-hover:bg-white z-30 flex flex-col items-center text-center justify-center"
                  >
                    {/* Service Heading ONLY */}
                    <h3
                      className="text-[#000000] text-xs sm:text-sm lg:text-[11px] xl:text-[13px] 2xl:text-base font-bold tracking-tight mb-2 lg:mb-1.5 xl:mb-3 transition-colors font-sans leading-tight w-full text-center"
                    >
                      {service.title}
                    </h3>

                    {/* Premium glass-accentuated/modern pill CTA */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openModal(service);
                      }}
                      className="inline-flex items-center gap-1.5 px-4 py-2 lg:px-3 lg:py-1.5 xl:px-4 xl:py-2 bg-[#000000] hover:bg-[#8D9981] text-white text-[8px] lg:text-[7.5px] xl:text-[8.2px] 2xl:text-[9.5px] font-bold tracking-[0.18em] uppercase transition-all duration-300 w-auto justify-center shadow-lg transform group-hover:scale-[1.02] cursor-pointer rounded-[4px]"
                    >
                      <span>Explore Service</span>
                      <ArrowUpRight className="w-3 h-3 lg:w-3.5 lg:h-3.5 stroke-[2] text-amber-100" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        </div>

        {/* Footer Contact Prompt */}
        <div className="mt-6 lg:mt-4 xl:mt-4.5 2xl:mt-12 flex justify-center text-center px-6 md:px-12 z-10">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 bg-[#000000] hover:bg-stone-900 border border-stone-850 text-white px-5 py-2.5 sm:px-6 sm:py-3.5 rounded-[4px] text-[11px] sm:text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer shadow-md font-sans hover:shadow-lg"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#8D9981]" />
            <span>Need more services based on your demand? <span className="underline ml-0.5 font-bold decoration-[#8D9981]">Contact us</span></span>
          </a>
        </div>

      </div>

      {/* RETAIL LUXURY EDITORIAL SERVICE POPUP / MODAL */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 180 }}
              className="relative bg-[#F5F2ED] w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 flex flex-col md:grid md:grid-cols-12 min-h-[85vh] my-4"
            >
              {/* Close Button */}
              <button
                onClick={closeModal}
                className="absolute top-6 right-6 bg-black/80 hover:bg-black text-white hover:text-[#8D9981] p-3 rounded-[4px] transition-all duration-350 z-50 shadow-lg cursor-pointer"
              >
                <X className="w-5 h-5 stroke-[2]" />
              </button>

              {/* Left Column: Image Collage & Showcase (col-span-5) */}
              <div className="md:col-span-5 relative bg-stone-900 border-r border-[#8D9981]/15 min-h-[40vh] md:min-h-auto">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover filter brightness-[0.85]"
                />
                
                {/* Floating Badge */}
                <div className="absolute top-6 left-6 bg-[#8D9981] text-white p-4 rounded-full shadow-lg z-20 flex items-center justify-center border border-white/10">
                  {React.createElement(selectedService.icon, { className: "w-6 h-6 stroke-[1.5]" })}
                </div>

                {/* Left Side Label Bottom */}
                <div className="absolute bottom-6 left-6 right-6 bg-black/75 backdrop-blur-md p-5 rounded-2xl border border-white/10 text-white z-10">
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-[#8D9981]">ANAAMII BESPOKE</span>
                  <p className="text-white/85 text-xs font-serif italic mt-1.5 leading-relaxed">
                    "{selectedService.description}"
                  </p>
                </div>
              </div>

              {/* Right Column: Editorial Details & Symmetrical Booking (col-span-7) */}
              <div className="md:col-span-7 p-8 sm:p-12 md:overflow-y-auto overflow-y-visible md:max-h-[85vh] flex flex-col justify-between">
                <div>
                  {/* Category Note */}
                  <span className="text-[10px] tracking-[0.25em] font-extrabold text-[#8D9981] uppercase inline-block mb-3">
                    Est. 2012 / Core Service Code #{selectedService.code}
                  </span>

                  {/* Title */}
                  <h3
                    className="text-[#000000] text-3xl sm:text-4xl font-bold tracking-tight mb-4 leading-tight"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {selectedService.title}
                  </h3>

                  {/* Golden subtle dividing line */}
                  <div className="h-[2px] w-16 bg-[#8D9981]/65 mb-6" />
                </div>

                {/* Booking Consultation Interactive CTA block */}
                <div className="border-t border-[#8D9981]/20 pt-6 mt-4 bg-[#8D9981]/5 p-5 sm:p-6 rounded-[2rem]">
                  {!isBooked ? (
                    <div>
                      <h4 className="text-stone-900 text-xs font-extrabold tracking-wider uppercase mb-4 flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-[#8D9981]" />
                        <span>Book A Director Consultation</span>
                      </h4>
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (
                            bookingFirstName.trim() &&
                            bookingLastName.trim() &&
                            bookingEmail.trim() &&
                            bookingPhone.trim() &&
                            bookingDate.trim()
                          ) {
                            setIsBooked(true);
                          }
                        }}
                        className="space-y-3.5"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-stone-600 font-bold uppercase tracking-wider pl-1 font-sans">First Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. John"
                              value={bookingFirstName}
                              onChange={(e) => setBookingFirstName(e.target.value)}
                              className="w-full text-stone-900 bg-white border border-[#8D9981]/25 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8D9981] transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-stone-600 font-bold uppercase tracking-wider pl-1 font-sans">Last Name</label>
                            <input
                              type="text"
                              required
                              placeholder="e.g. Doe"
                              value={bookingLastName}
                              onChange={(e) => setBookingLastName(e.target.value)}
                              className="w-full text-stone-900 bg-white border border-[#8D9981]/25 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8D9981] transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-stone-600 font-bold uppercase tracking-wider pl-1 font-sans">Email Address</label>
                            <input
                              type="email"
                              required
                              placeholder="e.g. name@domain.com"
                              value={bookingEmail}
                              onChange={(e) => setBookingEmail(e.target.value)}
                              className="w-full text-stone-900 bg-white border border-[#8D9981]/25 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8D9981] transition-colors"
                            />
                          </div>
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-stone-600 font-bold uppercase tracking-wider pl-1 font-sans">Phone Number</label>
                            <input
                              type="tel"
                              required
                              placeholder="e.g. +1 (555) 000-0000"
                              value={bookingPhone}
                              onChange={(e) => setBookingPhone(e.target.value)}
                              className="w-full text-stone-900 bg-white border border-[#8D9981]/25 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8D9981] transition-colors"
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                          <div className="flex flex-col gap-1">
                            <label className="text-[10px] text-stone-600 font-bold uppercase tracking-wider pl-1 font-sans">Appointment Date</label>
                            <input
                              type="date"
                              required
                              value={bookingDate}
                              onChange={(e) => setBookingDate(e.target.value)}
                              className="text-stone-900 bg-white border border-[#8D9981]/25 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8D9981] transition-colors w-full"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col gap-1">
                          <label className="text-[10px] text-stone-600 font-bold uppercase tracking-wider pl-1 font-sans">Message / Text Area</label>
                          <textarea
                            rows={3}
                            placeholder="Tell us about your project or styling needs..."
                            value={bookingMessage}
                            onChange={(e) => setBookingMessage(e.target.value)}
                            className="w-full text-stone-900 bg-white border border-[#8D9981]/25 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#8D9981] transition-colors resize-none"
                          />
                        </div>

                        <div className="pt-2">
                          <button
                            type="submit"
                            className="w-full bg-[#000000] hover:bg-[#8D9981] text-white text-xs font-bold uppercase tracking-widest py-3 rounded-[4px] transition-all duration-300 shadow-md cursor-pointer hover:shadow-lg hover:scale-[1.01]"
                          >
                            Submit Booking Request
                          </button>
                        </div>
                      </form>
                    </div>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-5 bg-white/60 backdrop-blur-sm rounded-xl border border-emerald-500/25 p-5"
                    >
                      <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                        <Check className="w-6 h-6 text-emerald-600 stroke-[2.5]" />
                      </div>
                      <h5 className="text-[#000000] text-sm font-bold uppercase tracking-widest">
                        Consultation Requested
                      </h5>
                      <p className="text-stone-600 text-[11px] sm:text-xs mt-1.5 leading-relaxed max-w-md mx-auto font-sans">
                        Thank you, <strong className="text-stone-900">{bookingFirstName} {bookingLastName}</strong>! Our Principal Director <strong className="text-[#8D9981]">Prachi Nagpal</strong> has received your message and requested date (<strong className="text-stone-900">{bookingDate}</strong>). We will get in touch with you at <strong className="text-stone-900">{bookingPhone}</strong> or <strong className="text-stone-900">{bookingEmail}</strong> within 2 hours.
                      </p>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
