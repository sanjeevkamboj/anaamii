import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

interface GalleryItem {
  id: number;
  image: string;
  height: string; // Tailored height profiles for masonry layout rhythm
}

const GALLERY_IMAGES: GalleryItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=95",
    height: "h-[220px] sm:h-[320px] lg:h-[180px] xl:h-[210px] 2xl:h-[320px]"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1500&q=95",
    height: "h-[300px] sm:h-[440px] lg:h-[225px] xl:h-[260px] 2xl:h-[440px]"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1500&q=95",
    height: "h-[180px] sm:h-[260px] lg:h-[140px] xl:h-[160px] 2xl:h-[260px]"
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1500&q=95",
    height: "h-[340px] sm:h-[480px] lg:h-[245px] xl:h-[285px] 2xl:h-[480px]"
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=95",
    height: "h-[200px] sm:h-[280px] lg:h-[155px] xl:h-[180px] 2xl:h-[280px]"
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=95",
    height: "h-[280px] sm:h-[400px] lg:h-[210px] xl:h-[240px] 2xl:h-[400px]"
  },
  {
    id: 7,
    image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1500&q=95",
    height: "h-[210px] sm:h-[300px] lg:h-[160px] xl:h-[185px] 2xl:h-[300px]"
  },
  {
    id: 8,
    image: "https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=1500&q=95",
    height: "h-[290px] sm:h-[420px] lg:h-[215px] xl:h-[250px] 2xl:h-[420px]"
  },
  {
    id: 9,
    image: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?auto=format&fit=crop&w=1500&q=95",
    height: "h-[220px] sm:h-[310px] lg:h-[170px] xl:h-[195px] 2xl:h-[310px]"
  },
  {
    id: 10,
    image: "https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1500&q=95",
    height: "h-[310px] sm:h-[450px] lg:h-[230px] xl:h-[265px] 2xl:h-[450px]"
  }
];

export default function ProjectsSection() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);
  const [zoomPan, setZoomPan] = useState({ x: 0, y: 0 });

  // Mobile swipe coordinates
  const touchStartX = useRef<number>(0);
  const touchEndX = useRef<number>(0);

  // Keyboard navigation support
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrev();
      } else if (e.key === "ArrowRight") {
        handleNext();
      } else if (e.key === "Escape") {
        closeLightbox();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx]);

  const handlePrev = () => {
    setIsZoomed(false);
    setSelectedIdx((prev) => 
      prev === null ? null : (prev - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length
    );
  };

  const handleNext = () => {
    setIsZoomed(false);
    setSelectedIdx((prev) => 
      prev === null ? null : (prev + 1) % GALLERY_IMAGES.length
    );
  };

  const closeLightbox = () => {
    setSelectedIdx(null);
    setIsZoomed(false);
  };

  // Touch Swipe Handlers for Mobile
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

  // Interactive Zoom Pan tracker
  const handleZoomMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    // Map center offset values
    setZoomPan({ x: (0.5 - x) * 200, y: (0.5 - y) * 200 });
  };

  // Parallax cursor hover tracker per individual card item
  const useCardParallax = () => {
    const [offset, setOffset] = useState({ x: 0, y: 0 });
    const cardRef = useRef<HTMLDivElement>(null);

    const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
      const y = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
      setOffset({ x: x * 6, y: y * 6 });
    };

    const onMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    return { cardRef, offset, onMouseMove, onMouseLeave };
  };

  return (
    <section 
      id="projects" 
      className="w-full bg-[#FFFFFF] py-[60px] lg:py-[32px] xl:py-[36px] 2xl:py-[60px] px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden"
    >
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="w-full flex flex-col items-center text-center mb-6 lg:mb-4 xl:mb-5 2xl:mb-12 max-w-3xl mx-auto">
          <h2 className="text-[#000000] text-3xl sm:text-4xl lg:text-3.5xl xl:text-[2.25rem] 2xl:text-5xl font-sans font-extrabold tracking-tight leading-[1.1] mb-2">
            Our Projects
          </h2>
          <p className="text-[#7C7267] font-sans text-xs sm:text-[13px] tracking-widest leading-relaxed font-bold uppercase">
            Explore Our Latest Interior Design Transformations
          </p>
        </div>

        {/* Gallery Masonry Layout: 5 Column Grid on Desktop viewports, styled for visual rhythm */}
        <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-4 sm:gap-6 [column-fill:_balance] w-full">
          
          {GALLERY_IMAGES.map((item, index) => {
            const { cardRef, offset, onMouseMove, onMouseLeave } = useCardParallax();

            return (
              <motion.div
                key={item.id}
                ref={cardRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                onClick={() => setSelectedIdx(index)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: Math.min((index % 6) * 0.05, 0.3) }}
                className={`break-inside-avoid mb-4 sm:mb-6 relative w-full ${item.height} bg-neutral-200/40 rounded-[1.25rem] sm:rounded-[1.75rem] overflow-hidden group cursor-pointer border border-[#EBE6DD] select-none shadow-[0_4px_12px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_60px_-15px_rgba(27,24,20,0.22),_0_0_25px_rgba(188,163,116,0.08)] hover:-translate-y-1.5 transition-all duration-500`}
              >
                {/* Subtle Interactive Inner Shift Layer */}
                <div
                  className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out scale-[1.03]"
                  style={{
                    transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`
                  }}
                >
                  <img 
                    src={item.image}
                    alt=""
                    className="w-full h-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    draggable="false"
                    loading="lazy"
                  />
                </div>

                {/* Ambient shadow gradient wrapper */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-black/5 pointer-events-none transition-opacity duration-500 group-hover:opacity-75" />
              </motion.div>
            );
          })}

        </div>

      </div>

      {/* LUXURY FULLSCREEN LIGHTBOX PORTFOLIO (COMPLETELY IMAGE-ONLY) */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 bg-[#121110]/96 backdrop-blur-2xl flex flex-col justify-center items-center overflow-hidden touch-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Minimal top luxury controls with Absolutely Zero Text */}
            <div className="absolute top-0 inset-x-0 h-24 px-6 sm:px-12 flex justify-between items-center z-50 pointer-events-none">
              
              {/* Double Click Zoom / Magnification Toggle */}
              <button
                onClick={() => setIsZoomed(!isZoomed)}
                className="w-12 h-12 rounded-[4px] bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-[#60584D] flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer focus:outline-none"
                aria-label="Toggle Magnification"
              >
                <Maximize2 className={`w-4 h-4 transition-transform duration-300 ${isZoomed ? "scale-110 text-[#60584D]" : ""}`} />
              </button>

              {/* Close/Dismiss Slider button */}
              <button
                onClick={closeLightbox}
                className="w-12 h-12 rounded-[4px] bg-black/40 backdrop-blur-md border border-white/10 text-white hover:text-red-400 flex items-center justify-center transition-all duration-300 pointer-events-auto cursor-pointer hover:rotate-90 hover:scale-105 focus:outline-none"
                aria-label="Dismiss Slider"
              >
                <X className="w-5 h-5" />
              </button>

            </div>

            {/* Interactive Image Display Stage */}
            <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
              
              {/* Dynamic canvas wrapper */}
              <div 
                className="relative w-full max-w-[1250px] h-[75vh] md:h-[82vh] overflow-hidden rounded-[2rem] sm:rounded-[3rem] bg-black/10 flex items-center justify-center border border-white/5 shadow-2xl"
                onMouseMove={handleZoomMouseMove}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedIdx}
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ 
                      opacity: 1, 
                      scale: 1,
                      transition: { duration: 0.5, ease: "easeOut" }
                    }}
                    exit={{ 
                      opacity: 0, 
                      scale: 0.97,
                      transition: { duration: 0.35, ease: "easeIn" }
                    }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    <motion.img
                      src={GALLERY_IMAGES[selectedIdx].image}
                      alt=""
                      draggable="false"
                      onDoubleClick={() => setIsZoomed(!isZoomed)}
                      className="w-full h-full object-contain select-none transition-transform duration-350 ease-out"
                      style={{
                        transform: isZoomed 
                          ? `scale(1.5) translate3d(${zoomPan.x}px, ${zoomPan.y}px, 0)` 
                          : "scale(1)",
                        cursor: isZoomed ? "zoom-out" : "zoom-in"
                      }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle active magnifier pulse dot */}
                {isZoomed && (
                  <div className="absolute bottom-6 right-6 z-40 w-2 h-2 rounded-full bg-[#60584D] animate-ping pointer-events-none" />
                )}
              </div>

              {/* Back slide switcher arrow */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-[4px] bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 text-white hover:text-[#60584D] flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer focus:outline-none z-40 hover:scale-105"
                aria-label="Previous Image"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </button>

              {/* Forward slide switcher arrow */}
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-[4px] bg-black/40 backdrop-blur-md border border-white/10 hover:border-white/30 text-white hover:text-[#60584D] flex items-center justify-center transition-all duration-300 active:scale-90 cursor-pointer focus:outline-none z-40 hover:scale-105"
                aria-label="Next Image"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
              </button>

            </div>

            {/* Minimalist modern slide index dot indicators (No Text Overlays) */}
            <div className="absolute bottom-8 flex gap-2.5 z-40 bg-black/40 px-5 py-2 rounded-full border border-white/5 backdrop-blur-md max-w-[90vw] overflow-x-auto scrollbar-none">
              {GALLERY_IMAGES.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => {
                    setIsZoomed(false);
                    setSelectedIdx(dotIdx);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer flex-shrink-0 ${
                    dotIdx === selectedIdx 
                      ? "w-8 bg-[#60584D]" 
                      : "w-2 bg-white/30 hover:bg-white"
                  }`}
                  aria-label={`Slide ${dotIdx + 1}`}
                />
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
