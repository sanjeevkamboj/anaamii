import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";

interface TestimonialItem {
  id: number;
  name: string;
  projectType: string;
  location: string;
  review: string;
  rating: number;
  image: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Aarav Singhal",
    projectType: "Turnkey Penthouse Redesign",
    location: "DLF Phase 5, Gurgaon",
    review: "ANAMII completely redefined our living concept. The bespoke millwork, brass paneling, and curated lighting have turned our home into a liveable art gallery. Prachi and her execution team possess a degree of professionalism that is rare to find. Absolutely stellar experience.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 2,
    name: "Meera Sen",
    projectType: "Symmetrical Modern Duplex",
    location: "Vasant Vihar, South Delhi",
    review: "The customization on the bespoke furniture is pristine. Every single room has a deep architectural voice that speaks of luxury but feels extremely inviting and warm. Their custom lighting and furniture procurement were perfectly streamlined. We cannot recommend them enough.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 3,
    name: "Rohan & Kiara Mehta",
    projectType: "Minimalist Coastal Mansion",
    location: "Alibaug, Mumbai Outskirts",
    review: "From initial conceptual 3D renders to the final white-glove styling, the journey was stress-free and exciting. The bespoke oak cabinetry, the integrated smart lighting, and the customized stone details took our breath away. They really are the premium design studio.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 4,
    name: "Vikramaditya Rathore",
    projectType: "Heritage Contemporary Villa",
    location: "Civil Lines, Jaipur",
    review: "The selection of hand-brushed bronzes, customized premium leather claddings, and Italian marble backsplashes has elevated our estate to a masterwork. The team honored our traditional aesthetic while infusing modern comfort effortlessly.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 5,
    name: "Ananya Deshmukh",
    projectType: "Skyline Corporate-Residential Suite",
    location: "Indiranagar, Bangalore",
    review: "Unparalleled space acoustics and bespoke wood accents. The turn-key service was precise down to the millimeter. Seeing our master bedroom stages styled with custom duvets and accent placements was like stepping into a high-end editorial spread.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80"
  },
  {
    id: 6,
    name: "Commander Kabir Bhasin",
    projectType: "Executive Estate Revitalization",
    location: "Sector 9, Chandigarh",
    review: "Prachi Nagpal is a true visionary. The carpentry quality of the walk-in closets and bespoke bar counters is incredible. Outstanding coordination, timely delivery, and exceptional eye for detail throughout the whole execution process.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150&q=80"
  }
];

export default function TestimonialsSection() {
  // We use an index corresponding to the center of the viewport
  const [centerIdx, setCenterIdx] = useState(2);
  const [isPaused, setIsPaused] = useState(false);

  // Swipe support refs
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Autoplay functionality
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      handleNext();
    }, 4500); // Progresses slowly every 4.5 seconds

    return () => clearInterval(timer);
  }, [isPaused]);

  const handlePrev = () => {
    setCenterIdx((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCenterIdx((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
  };

  // Touch handlers for mobile swipe gesture
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  // Help generate looping list indexing
  // We will build a helper that extracts items representing our infinite flow.
  // To have an infinite slider with correct active element relative styling,
  // we can map the center virtual position.
  const getVisibleItems = () => {
    const items = [];
    // We want to return 5 indices: [left2, left1, center, right1, right2]
    // which maps nicely onto the 5 slots.
    for (let offset = -2; offset <= 2; offset++) {
      let index = (centerIdx + offset) % TESTIMONIALS.length;
      if (index < 0) {
        index += TESTIMONIALS.length;
      }
      items.push({ item: TESTIMONIALS[index], offset });
    }
    return items;
  };

  const visibleItems = getVisibleItems();

  return (
    <section
      id="testimonials"
      className="w-full bg-[#000000] py-[60px] lg:py-[40px] xl:py-[50px] px-4 overflow-hidden relative select-none border-t border-neutral-800"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="w-full flex flex-col items-center text-center mb-8 lg:mb-5 xl:mb-6 max-w-3xl mx-auto">
          <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-sans font-extrabold tracking-tight leading-[1.1] mb-2.5">
            Client Experiences
          </h2>
          <p className="text-[#8D9981] font-sans text-xs sm:text-sm tracking-widest leading-relaxed font-bold uppercase">
            What Our Clients Say About Their Home Transformations
          </p>
        </div>

        {/* Dynamic Multi-Card Slider viewport */}
        <div 
          className="relative w-full h-[370px] sm:h-[345px] lg:h-[285px] xl:h-[315px] 2xl:h-[375px] flex items-center justify-center"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main absolute flex row for transitions */}
          <div className="absolute inset-x-0 bottom-0 top-0 flex items-center justify-center overflow-visible">
            
            <AnimatePresence mode="popLayout" initial={false}>
              {visibleItems.map(({ item, offset }) => {
                // Determine styling based on offset:
                // offset === 0: Active Center (fully highlighted, slightly larger, floating)
                // offset === -1 or +1: Center-left / Center-right (fully visible, standard size)
                // offset === -2 or +2: Outer parts (partially visible, faded, scaled down)
                const isActive = offset === 0;
                const isAdjacent = Math.abs(offset) === 1;
                const isOuter = Math.abs(offset) === 2;

                // Configure modern responsive offsets for translation
                // On massive screens, the gap should feel comfortable.
                // We'll set interactive transform translation properties using motion.
                let xPosition = "0%";
                if (offset === -2) xPosition = "-160%";
                else if (offset === -1) xPosition = "-80%";
                else if (offset === 0) xPosition = "0%";
                else if (offset === 1) xPosition = "80%";
                else if (offset === 2) xPosition = "160%";

                // Adapt size responsive factor: on smaller screens custom offsets compress
                return (
                  <motion.div
                    key={`${item.id}-${offset}`}
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                      x: offset > 0 ? "200%" : "-200%"
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.7,
                      transition: { duration: 0.4 }
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 160,
                      damping: 18,
                      opacity: { duration: 0.3 }
                    }}
                    // Active card with solid placement and stable scaling
                    animate={isActive ? {
                      scale: 1.05,
                      x: "0%",
                      opacity: 1,
                      zIndex: 30,
                      y: 0,
                      transition: {
                        scale: { duration: 0.3 },
                        x: { type: "spring", stiffness: 160, damping: 18 }
                      }
                    } : {
                      opacity: isOuter ? 0.25 : isAdjacent ? 0.75 : 1,
                      scale: isAdjacent ? 0.95 : 0.82,
                      x: xPosition,
                      y: 0,
                      zIndex: isActive ? 30 : isAdjacent ? 20 : 10,
                    }}
                    className={`absolute w-[82vw] sm:w-[460px] md:w-[410px] lg:w-[350px] xl:w-[390px] 2xl:w-[450px] shrink-0 bg-white/95 backdrop-blur-md rounded-[1.75rem] lg:rounded-[2rem] sm:rounded-[2.5rem] border border-white/80 p-5 sm:p-6 lg:p-4.5 xl:p-6 2xl:p-10 text-stone-900 select-none shadow-[0_20px_50px_rgba(0,0,0,0.3)] selection:bg-transparent transition-shadow duration-500 hover:shadow-[0_40px_80px_rgba(0,0,0,0.45)] flex flex-col justify-between h-[340px] sm:h-[310px] lg:h-[260px] xl:h-[290px] 2xl:h-[340px]`}
                  >
                    {/* Quotation mark backdrop icon */}
                    <div className="absolute top-4 right-6 lg:top-5 lg:right-6 text-[#8D9981]/15 pointer-events-none">
                      <Quote className="w-12 h-12 lg:w-10 lg:h-10 xl:w-14 xl:h-14 fill-current rotate-180" />
                    </div>

                    {/* Top Content */}
                    <div className="w-full relative">
                      {/* Rating Icons */}
                      <div className="flex gap-1 mb-3 lg:mb-2 xl:mb-3">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 lg:w-3 lg:h-3 xl:w-4 xl:h-4 fill-[#8D9981] text-[#8D9981] stroke-[1]" />
                        ))}
                      </div>

                      {/* Review Text block */}
                      <p className="text-[#333333] text-xs sm:text-sm lg:text-[11px] xl:text-[13px] 2xl:text-[14px] leading-relaxed font-sans italic line-clamp-5 lg:line-clamp-4 xl:line-clamp-5">
                        "{item.review}"
                      </p>
                    </div>

                    {/* Client Info Bar */}
                    <div className="flex items-center gap-3 lg:gap-2.5 xl:gap-4 border-t border-stone-200 pt-3 mt-3 lg:pt-2 lg:mt-2 xl:pt-3 xl:mt-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full object-cover border border-[#8D9981]/35"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full bg-[#8D9981]/15 flex items-center justify-center font-bold text-xs text-[#8D9981] border border-[#8D9981]/35">
                          {item.name.charAt(0)}
                        </div>
                      )}
                      
                      <div className="flex flex-col text-left">
                        <span className="text-stone-950 text-xs sm:text-sm lg:text-[11px] xl:text-xs 2xl:text-sm font-extrabold tracking-wide font-sans">
                          {item.name}
                        </span>
                        <span className="text-[#7C7267] text-[10px] sm:text-xs lg:text-[9px] xl:text-[10px] 2xl:text-xs font-medium font-sans leading-none mt-0.5">
                          {item.projectType} • <span className="font-bold">{item.location}</span>
                        </span>
                      </div>
                    </div>

                  </motion.div>
                );
              })}
            </AnimatePresence>

          </div>

          {/* Navigation Controllers overlay */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none hidden sm:flex justify-between sm:px-6 z-40">
            <button
              onClick={handlePrev}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[4px] bg-white/10 hover:bg-white text-white hover:text-stone-900 border border-white/20 hover:border-[#8D9981] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto shadow-md backdrop-blur-sm"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5 stroke-[2]" />
            </button>
            <button
              onClick={handleNext}
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-[4px] bg-white/10 hover:bg-white text-white hover:text-stone-900 border border-white/20 hover:border-[#8D9981] flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 pointer-events-auto shadow-md backdrop-blur-sm"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5 stroke-[2]" />
            </button>
          </div>

        </div>

        {/* Minimal dot trackers at bottom based on original testimonial ids */}
        <div className="flex justify-center gap-2 mt-4 sm:mt-6 z-45 relative">
          {TESTIMONIALS.map((t, idx) => (
            <button
              key={t.id}
              onClick={() => {
                setCenterIdx(idx);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === centerIdx 
                  ? "w-8 bg-[#8D9981]" 
                  : "w-1.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
