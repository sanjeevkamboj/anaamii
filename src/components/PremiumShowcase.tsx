import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "motion/react";

interface ShowcaseItem {
  id: number;
  image: string;
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=95",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1800&q=95",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1800&q=95",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1800&q=95",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=95",
  }
];

export default function PremiumShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  // Handle auto-playing showcase loop with slow, elegant pace (e.g. 5 seconds)
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SHOWCASE_ITEMS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Handle subtle mouse hover interactive perspective offset
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Normalized position from -1 to 1
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    // Minimal parallax movement (up/down/left/right by a few pixels)
    setMouseOffset({ x: x * 10, y: y * 10 });
  };

  const handleMouseLeave = () => {
    setMouseOffset({ x: 0, y: 0 });
  };

  const activeItem = SHOWCASE_ITEMS[activeIndex];

  return (
    <section 
      id="portfolio-showcase"
      className="w-full bg-[#CFC8BE] py-[60px] lg:py-[32px] xl:py-[36px] 2xl:py-[60px] px-6 md:px-12 lg:px-20 flex flex-col justify-center items-center overflow-hidden"
    >
      {/* Immersive Center Frame Wrapper */}
      <div className="w-full max-w-[1380px] mx-auto flex flex-col items-center justify-center">
        
        {/* Sole Focal Point Showroom Frame */}
        <div 
          ref={containerRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="relative w-full h-[400px] sm:h-[480px] md:h-[550px] lg:h-[350px] xl:h-[400px] 2xl:h-[680px] overflow-hidden rounded-[2.5rem] sm:rounded-[3.5rem] bg-[#e6e2db] transition-all duration-700 ease-out border border-stone-200/30"
          style={{
            perspective: "1000px",
            boxShadow: "0 30px 70px -15px rgba(27, 26, 25, 0.15)"
          }}
        >
          {/* Subtle Parallax Layer that responds to cursor moving */}
          <div 
            className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out"
            style={{
              transform: `translate3d(${mouseOffset.x}px, ${mouseOffset.y}px, 0) scale(1.02)`
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  transition: {
                    opacity: { duration: 1.8, ease: "easeInOut" },
                    scale: { duration: 5.2, ease: "easeOut" } // continuous slow zoom transition
                  }
                }}
                exit={{ 
                  opacity: 0, 
                  scale: 0.96,
                  transition: {
                    opacity: { duration: 1.4, ease: "easeInOut" },
                    scale: { duration: 1.4, ease: "easeInOut" }
                  }
                }}
                className="absolute inset-0 w-full h-full"
              >
                <img 
                  src={activeItem.image}
                  alt="Luxury Space Showcase"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable="false"
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Minimal ambient gradient mask for framing depth */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/10 pointer-events-none" />
        </div>

      </div>
    </section>
  );
}
