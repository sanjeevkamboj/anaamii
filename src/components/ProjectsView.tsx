import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Maximize2, X, ChevronLeft, ChevronRight, Filter, MapPin, Layers } from "lucide-react";

interface ProjectItem {
  id: string;
  title: string;
  category: "Kitchens" | "Wardrobes" | "Cladding" | "Living Spaces";
  location: string;
  image: string;
  dimensions: string;
  year: string;
}

export default function ProjectsView() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  const projects: ProjectItem[] = [
    {
      id: "p1",
      title: "Munich Minimal Walnut Culinary Atelier",
      category: "Kitchens",
      location: "Munich, Germany",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      dimensions: "45 sqm area",
      year: "2025"
    },
    {
      id: "p2",
      title: "Copenhagen Symmetrical Slat Corridor",
      category: "Cladding",
      location: "Copenhagen, Denmark",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      dimensions: "180 linear meters",
      year: "2024"
    },
    {
      id: "p3",
      title: "New York Walkthrough Wardrobe Suite",
      category: "Wardrobes",
      location: "Manhattan, NYC",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      dimensions: "32 sqm dressing area",
      year: "2025"
    },
    {
      id: "p4",
      title: "Alpine Oak Library & Secret Portals",
      category: "Cladding",
      location: "Kitzbühel, Austria",
      image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      dimensions: "280 sqm book storage",
      year: "2025"
    },
    {
      id: "p5",
      title: "Amalienborg Walnut Floating Bureau",
      category: "Living Spaces",
      location: "Amalienborg, Denmark",
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      dimensions: "Custom 3.2m slab desk",
      year: "2024"
    },
    {
      id: "p6",
      title: "Copenhagen Minimalist Penthouse Kitchen",
      category: "Kitchens",
      location: "Copenhagen, Denmark",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
      dimensions: "52 sqm kitchen layout",
      year: "2025"
    },
    {
      id: "p7",
      title: "Berlin Architectural Glass Guardrobe",
      category: "Wardrobes",
      location: "Berlin, Germany",
      image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?auto=format&fit=crop&w=1200&q=80",
      dimensions: "Custom bronze profiling",
      year: "2024"
    },
    {
      id: "p8",
      title: "Modern Solitary Lounge & Panels",
      category: "Living Spaces",
      location: "Stuttgart, Germany",
      image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      dimensions: "Custom millwork profile",
      year: "2025"
    }
  ];

  const categories = ["All", "Kitchens", "Wardrobes", "Cladding", "Living Spaces"];

  const filteredProjects = activeFilter === "All" 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  // Key navigation for lightbox
  useEffect(() => {
    if (selectedIdx === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "Escape") setSelectedIdx(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIdx, filteredProjects]);

  const handlePrev = () => {
    setSelectedIdx((prev) => 
      prev === null ? null : (prev - 1 + filteredProjects.length) % filteredProjects.length
    );
  };

  const handleNext = () => {
    setSelectedIdx((prev) => 
      prev === null ? null : (prev + 1) % filteredProjects.length
    );
  };

  return (
    <div className="w-full bg-[#000000] text-white">
      {/* 1. Projects Hero Header */}
      <section className="relative h-[45vh] sm:h-[55vh] w-full overflow-hidden flex items-center justify-center bg-[#070707] border-b border-white/[0.04]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1920&q=80"
            alt="Lumber grain background"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8D9981] font-bold block mb-3.5">
            Architectural Skeletons
          </span>
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Finished Commissions
          </h1>
          <div className="h-[1px] w-12 bg-[#8D9981]/50 mx-auto" />
          <p className="text-stone-400 font-sans text-xs tracking-widest mt-4 uppercase">
            A precise record of our permanent installations
          </p>
        </div>
      </section>

      {/* 2. Interactive Filter Bar & Mass Showroom Grid */}
      <section className="w-full py-[60px] px-6 md:px-12 lg:px-20 bg-black">
        <div className="max-w-7xl mx-auto">
          
          {/* Dynamic Category Pill Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16 select-none bg-[#0c0c0c]/80 p-2 rounded-full border border-white/[0.04] max-w-2xl mx-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setActiveFilter(cat);
                  setSelectedIdx(null);
                }}
                className={`py-2 px-4 sm:px-5 text-[10px] rounded-[4px] font-bold uppercase tracking-widest border transition-all duration-300 cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#8D9981] border-[#8D9981] text-black shadow-lg"
                    : "bg-transparent border-transparent text-stone-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Symmetrical Grid for Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedIdx(index)}
                  className="group bg-[#0b0b0b] rounded-[2rem] overflow-hidden border border-white/[0.03] hover:border-[#8D9981]/35 transition-all duration-500 cursor-pointer flex flex-col h-full hover:shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
                >
                  {/* Image wrapper */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-900">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105 filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent pointer-events-none" />

                    {/* Expand icon indicator */}
                    <div className="absolute top-5 right-5 w-10 h-10 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Maximize2 className="w-4 h-4 text-[#8D9981]" />
                    </div>
                  </div>

                  {/* Body textual information */}
                  <div className="p-6 flex flex-col justify-between flex-grow text-left">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[9px] uppercase tracking-widest text-[#8D9981] font-bold">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{project.location}</span>
                      </div>
                      
                      <h3 className="text-white text-lg font-bold font-sans tracking-tight leading-snug group-hover:text-[#8D9981] transition-colors">
                        {project.title}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between border-t border-white/[0.05] pt-4 mt-6 text-[10px] text-stone-400 font-mono">
                      <span>{project.category}</span>
                      <span className="text-white/60">{project.dimensions}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

        </div>
      </section>

      {/* FULLSCREEN CINEMATIC GALLERY FOR COMMISSION CLICKS */}
      <AnimatePresence>
        {selectedIdx !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#000000e3] backdrop-blur-xl flex flex-col justify-center items-center overflow-hidden touch-none"
          >
            {/* Top Close bar */}
            <div className="absolute top-0 inset-x-0 h-24 px-6 sm:px-12 flex justify-between items-center z-50">
              <div className="text-left text-white hidden sm:block">
                <span className="text-[10px] uppercase tracking-widest text-[#8D9981] font-bold">Finished Project commission</span>
                <p className="text-xs font-light font-sans text-stone-300 mt-0.5">
                  {filteredProjects[selectedIdx].title} — {filteredProjects[selectedIdx].location}
                </p>
              </div>

              <button
                onClick={() => setSelectedIdx(null)}
                className="w-12 h-12 rounded-[4px] bg-stone-900 border border-white/10 text-white hover:text-red-400 flex items-center justify-center transition-all duration-300 cursor-pointer ml-auto hover:rotate-90"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Stage */}
            <div className="relative w-full h-[65vh] md:h-[75vh] flex items-center justify-center px-4 md:px-16">
              
              {/* Back switches */}
              <button
                onClick={handlePrev}
                className="absolute left-3 sm:left-6 md:left-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-[4px] bg-stone-900/80 border border-white/10 hover:border-white/30 text-white hover:text-[#8D9981] flex items-center justify-center transition-all duration-300 cursor-pointer z-40 active:scale-90"
              >
                <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>

              {/* Central Frame Canvas */}
              <div className="relative w-full max-w-[1200px] h-full overflow-hidden rounded-[2.5rem] border border-white/5 bg-stone-950 flex shadow-2xl">
                <img
                  src={filteredProjects[selectedIdx].image}
                  alt=""
                  className="w-full h-full object-cover sm:object-contain select-none"
                />
                
                {/* Visual watermark tag */}
                <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-left">
                  <span className="text-[10px] text-stone-400 font-mono tracking-widest uppercase block">COMMISSION DATA</span>
                  <span className="text-white text-xs font-semibold">{filteredProjects[selectedIdx].dimensions} ({filteredProjects[selectedIdx].year})</span>
                </div>
              </div>

              {/* Next switches */}
              <button
                onClick={handleNext}
                className="absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 w-10 h-10 sm:w-14 sm:h-14 rounded-[4px] bg-stone-900/80 border border-white/10 hover:border-white/30 text-white hover:text-[#8D9981] flex items-center justify-center transition-all duration-300 cursor-pointer z-40 active:scale-90"
              >
                <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Bottom indexing indicators */}
            <div className="absolute bottom-8 flex gap-2 select-none bg-[#090909]/80 px-5 py-2.5 rounded-full border border-white/5">
              {filteredProjects.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  onClick={() => setSelectedIdx(dotIdx)}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    dotIdx === selectedIdx ? "w-8 bg-[#8D9981]" : "w-2 bg-white/20 hover:bg-white"
                  }`}
                />
              ))}
            </div>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
