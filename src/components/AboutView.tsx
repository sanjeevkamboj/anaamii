import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Trees, 
  Layers, 
  Wrench, 
  Info, 
  Award 
} from "lucide-react";

interface AboutViewProps {
  onPageChange?: (page: string) => void;
}

// Interactive Timber Data for the Master Material Library
interface TimberSpec {
  id: string;
  name: string;
  scientificName: string;
  origin: string;
  moistureRange: string;
  density: string;
  bestUse: string;
  grainProfile: string;
  hue: string;
  description: string;
  imageUrl: string;
}

const TIMBER_LIBRARY: TimberSpec[] = [
  {
    id: "smoked-oak",
    name: "Royal Smoked Oak",
    scientificName: "Quercus Robur",
    origin: "Sustainable Spessart Forest, Germany",
    moistureRange: "6.8% - 7.4%",
    density: "740 kg/m³",
    bestUse: "Bespoke Culinary Cabinetry & Wall Braces",
    grainProfile: "Highly defined, sequential straight cathedral sweeps",
    hue: "Deep espresso with raw bronze streaks",
    description: "Vacuum-treated at exact thermal curves to caramelize natural sugars, resulting in a dark wood tone that retains internal elasticity and repels insects naturally without chemical toxic lacquers.",
    imageUrl: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "nordic-walnut",
    name: "Heartwood Black Walnut",
    scientificName: "Juglans Nigra",
    origin: "Stabilized Appalachian Reserves, USA",
    moistureRange: "7.0% - 7.6%",
    density: "680 kg/m³",
    bestUse: "Curated Floating Credenzas & Ceiling Coffers",
    grainProfile: "Sinuous, active swirls of heartwood and creamy sapwood lines",
    hue: "Warm mocha with subtle slate gray accents",
    description: "Kiln-cured for 60 days following custom steam cycles. Our Heartwood Walnut carries unparalleled stability, ensuring zero warping across extreme dry-cold climatic shifts.",
    imageUrl: "https://images.unsplash.com/photo-1507347901242-73ab040177b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "brushed-maple",
    name: "Alabaster Rock Maple",
    scientificName: "Acer Saccharum",
    origin: "Northern Quebec Woodlands, Canada",
    moistureRange: "6.5% - 7.0%",
    density: "720 kg/m³",
    bestUse: "Minimalist Floating Storage and Acoustic Slats",
    grainProfile: "Extremely fine, closed, quiet linear patterns",
    hue: "Luminous warm bone with light amber highlights",
    description: "Highly resistant to abrasions and impacts. We brush the surfaces with fine brass wire rollers to elevate the soft textures before rubbing in white-infused organic botanical oils.",
    imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: "shou-sugi",
    name: "Shou Sugi Ban Cedar",
    scientificName: "Cryptomeria Japonica",
    origin: "Yoshino Mountain Slopes, Japan",
    moistureRange: "8.0% - 9.0%",
    density: "490 kg/m³",
    bestUse: "Acoustic Vertical Dividers & Entry Portals",
    grainProfile: "Relief carbonized scale with high-reflectivity valleys",
    hue: "Charcoal black velvet with silver-shimmer highlights",
    description: "Hand-charred using traditional Japanese blow-char techniques, followed by intense wire-brushing and cold-applied natural tung-oil infusions. It seals acoustics and creates raw brutalist contrast.",
    imageUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80"
  }
];

// Custom Counter Hook / Animation for Statistics
function AnimatedCounter({ value, duration = 1.8 }: { value: string; duration?: number }) {
  // Extract number and trailing characters (like "+", "%")
  const numericMatch = value.match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = value.replace(/\d+/g, "");

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (targetNumber === 0) return;

    let startTime: number | null = null;
    let animationFrameId: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      
      // Luxurious Cubic Ease-Out
      const easeOutValue = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutValue * targetNumber));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(targetNumber);
      }
    };

    const delayTimer = setTimeout(() => {
      animationFrameId = requestAnimationFrame(animate);
    }, 150);

    return () => {
      clearTimeout(delayTimer);
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [targetNumber, duration]);

  return (
    <span className="font-mono">
      {count}
      {suffix}
    </span>
  );
}

export default function AboutView({ onPageChange }: AboutViewProps) {
  const [selectedTimber, setSelectedTimber] = useState<TimberSpec>(TIMBER_LIBRARY[0]);

  const stats = [
    { value: "18+", label: "Years of Precision", desc: "Crafting bespoke design legacies across territories." },
    { value: "450+", label: "Bespoke Estates", desc: "Tailored custom cabinetry and premium paneling." },
    { value: "12", label: "Master Artisans", desc: "Elite joiners carrying generations of cabinetry heritage." },
    { value: "100%", label: "Lifelong Warranty", desc: "Structural integrity certified to withstand generations." }
  ];

  const pillars = [
    {
      icon: <Trees className="w-5 h-5 text-[#BCA374]" />,
      title: "Material Stewardship",
      subtitle: "Nordic & Sacred Timber",
      desc: "We extract slow-matured white oak, certified custom walnut, and sustainable Nordic timber. Every log undergoes unique humidity stabilization within computer-monitored kiln halls to achieve perfect mechanical integrity."
    },
    {
      icon: <Layers className="w-5 h-5 text-[#BCA374]" />,
      title: "1.2mm Precision Joinery",
      subtitle: "Laser-Guided Craftsmanship",
      desc: "By fusing German CNC engineering with manual hand chisels, we enforce absolute joint tolerances. Corners settle without gaps, creating gorgeous, single continuous seamless grain flows."
    },
    {
      icon: <Wrench className="w-5 h-5 text-[#BCA374]" />,
      title: "Hand-Applied Infusions",
      subtitle: "Natural Organic Finishings",
      desc: "No toxic lacquers enter our facility. We hand-rub architectural pieces with botanical oils and raw organic beeswaxes, leaving the raw timber breathing and naturally aging in place."
    }
  ];

  const processSteps = [
    {
      step: "01",
      title: "Interactive Atelier",
      phase: "Co-Design & Drafting",
      desc: "We analyze structural constraints, wood grains, and interior ambient acoustics with architects, mapping layouts on tactile raw-paper sketches and luxury 3D renderings."
    },
    {
      step: "02",
      title: "Wood Procurement",
      phase: "Hand-Selected Lumbers",
      desc: "Only timber with pristine fiber profiles, sequential grain matches, and perfect kiln-moisture levels (exactly 7-8%) passes our artisan inspection checks."
    },
    {
      step: "03",
      title: "Atelier Joinery",
      phase: "Precision Fabrication",
      desc: "Our millwork incorporates double-blind mortise and tenon joinery, custom sliding wood grooves, and traditional hand-dovetailed storage box alignments."
    },
    {
      step: "04",
      title: "Tactile Rubbing",
      phase: "Organic Oil Finishes",
      desc: "Each item receives multiple sessions of manual hand-rubbing, continuous detail sanding, and protective natural plant wax treatments before secure custom white-glove transport."
    }
  ];

  const showcaseGallery = [
    {
      img: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80",
      tag: "Culinary Suites",
      title: "Bespoke Smoked Oak Kitchen",
      desc: "Perfect handleless cabinet surfaces with dynamic touch latch mechanisms and recessed warm LED channels."
    },
    {
      img: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80",
      tag: "Architectural Accents",
      title: "Vertical Fluted Slated Accent Cladding",
      desc: "Acoustic micro-grooving engineered to diffuse light and balance space dimensions in standard high-ceiling corridors."
    },
    {
      img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80",
      tag: "Living Interiors",
      title: "Integrated Timber Credenza & Shelving",
      desc: "Floating walnut wall units crafted seamlessly into complex drywalls with absolute zero visible anchors."
    }
  ];

  return (
    <div className="w-full bg-black text-white relative leading-relaxed overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden px-6">
        
        {/* Soft immersive backdrop background with slow Ken Burns pan/zoom effect */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1.1, 1.15, 1.1],
              x: [0, -10, 0],
              y: [0, -15, 0]
            }}
            transition={{ 
              duration: 25, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="w-full h-full relative"
          >
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=90"
              alt="Premium architectural luxury kitchen close-up"
              className="w-full h-full object-cover filter brightness-[0.32]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
          {/* Subtle gradient overlays mapping back into pure black */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black z-10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-transparent to-black/90 z-10" />
        </div>

        {/* Content Box */}
        <div className="relative z-20 max-w-5xl mx-auto text-center px-4 md:px-8 mt-24">
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 mb-6 bg-stone-900/80 border border-white/15 px-5 py-2.5 rounded-full backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#BCA374] animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-[10px] uppercase tracking-[0.25em] text-stone-300 font-semibold">
              ARCHITECTURAL HERITAGE & MILLWORK BIOGRAPHY
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight mb-8 font-serif leading-[1.08]"
          >
            The Shape of True <br />
            <span className="text-[#BCA374] italic">Quiet Luxury</span>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, delay: 0.4 }}
            className="h-[1px] w-40 bg-gradient-to-r from-transparent via-[#BCA374] to-transparent mx-auto my-9"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="text-stone-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light tracking-wide text-balance select-none"
          >
            Anami Millwork Group is a premium structural joinery and master fabrication studio. 
            We build custom interior wood millwork, exquisite culinary cabinetry, and beautiful paneling systems for prominent architectural domains worldwide.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5 }}
            className="mt-12 flex flex-wrap gap-4 items-center justify-center"
          >
            <button 
              onClick={() => onPageChange && onPageChange("contact")}
              id="hero-consultation-btn"
              className="bg-white text-black hover:bg-[#BCA374] hover:text-white transition-all duration-550 px-8 py-4 text-xs uppercase tracking-[0.2em] font-semibold rounded-[4px] flex items-center gap-3.5 group cursor-pointer shadow-lg active:scale-95"
            >
              <span>Consult an Artisan</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1.5 duration-300" />
            </button>
            <a 
              href="#story-section" 
              className="text-stone-300 hover:text-white transition-all duration-300 px-8 py-4 text-xs uppercase tracking-[0.2em] border border-white/15 backdrop-blur-sm hover:bg-stone-900/30 font-medium cursor-pointer"
            >
              Review Our Heritage
            </a>
          </motion.div>
        </div>

        {/* Elegant scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 text-stone-500 font-mono text-[9px] tracking-[0.3em] uppercase opacity-75">
          <motion.span 
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="text-[#BCA374] text-xs font-bold"
          >
            ↓
          </motion.span>
          <span>Scroll</span>
        </div>
      </section>

      {/* 2. OUR STORY SECTION */}
      <section id="story-section" className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 bg-black border-t border-stone-900 scroll-mt-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* Left Narrative Text with Fade-Up */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#BCA374] block">
              THE WOOD GENESIS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white font-serif leading-[1.12]">
              Honoring Natural Grains, Elevating Spatial Dimensions.
            </h2>
            <div className="h-[1.5px] w-24 bg-[#BCA374]" />
            
            <p className="text-stone-300 text-sm sm:text-base font-light leading-relaxed">
              Founded on the simple principle that premium millwork should act as permanent architectural sculpture, Anami Millwork Group was brought into existence by an elite consortium of second-generational woodwork artisans. We set out to rescue millwork from the bland repetition of standard high-volume industrial lumber yards.
            </p>

            <blockquote className="border-l-[3px] border-[#BCA374] pl-6 py-3 my-8 bg-[#0a0a0a] pr-4 rounded-r-lg">
              <p className="text-stone-200 italic text-sm sm:text-base md:text-lg font-serif leading-relaxed">
                "Custom woodwork should not just decorate walls—it must curate how light reflects, how physical scale registers, and how organic warmth settling defines the home's emotional climate."
              </p>
              <cite className="text-[#BCA374] text-[10px] uppercase tracking-[0.25em] font-bold block mt-4 not-italic">
                — ANAMI ATELIER CHARTER
              </cite>
            </blockquote>

            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
              Today, our custom architectural panels, luxury minimalist kitchens, and concealed solid wood shelving systems populate prestigious penthouse corridors and high-profile residential domains.
            </p>
          </motion.div>

          {/* Right custom image panel with luxury curtain reveal effect */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-2xl overflow-hidden group aspect-[4/5] bg-stone-950 border border-white/5 shadow-2xl">
              
              {/* Image */}
              <motion.img
                initial={{ scale: 1.15, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80"
                alt="ANAMI timber fluted slat custom millwork and screen detailing"
                className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              
              {/* Luxury gold reveal curtain */}
              <motion.div
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1.2, ease: [0.85, 0, 0.15, 1], delay: 0.1 }}
                className="absolute inset-0 bg-[#BCA374] origin-left z-20 pointer-events-none"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-transparent pointer-events-none z-10" />
              
              {/* Floating aesthetic caption info */}
              <div className="absolute bottom-6 left-6 right-6 bg-black/85 backdrop-blur-md p-6 rounded-xl border border-white/10 z-10">
                <span className="text-[9px] uppercase tracking-widest text-[#BCA374] font-bold block mb-1.5">
                  SIGNATURE ARCHITECTURAL RIGOR
                </span>
                <p className="text-stone-300 text-xs font-light leading-relaxed">
                  Every fluted batten is micro-milled and manually calibrated with custom joinery techniques to sustain absolute dimensional integrity across long wall expanses.
                </p>
              </div>
            </div>
            
            {/* Elegant backdrop glows */}
            <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-[#BCA374]/10 rounded-full filter blur-3xl -z-10 animate-pulse" />
            <div className="absolute -top-10 -left-10 w-36 h-36 bg-stone-900 rounded-full filter blur-2xl -z-10" />
          </div>

        </div>
      </section>

      {/* NEW: INTERACTIVE ATELIER MATERIAL LIBRARY SECTION */}
      <section className="relative py-24 sm:py-32 px-6 md:px-12 lg:px-20 bg-stone-950 border-t border-b border-stone-900">
        <div id="material-library-container" className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div className="text-left space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#BCA374] block">
                ATELIER STABILIZED LUMBERS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white font-serif tracking-tight">
                Anami Material Library
              </h2>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm font-light max-w-md">
              We govern moisture ratios and fiber alignment strictly. Click a timber type below to inspect physical specifications and typical architectural assignments.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            {/* Left: Materials List Tabs */}
            <div className="lg:col-span-5 flex flex-col gap-4 self-center">
              {TIMBER_LIBRARY.map((item) => {
                const isSelected = selectedTimber.id === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setSelectedTimber(item)}
                    className={`p-6 text-left transition-all duration-300 flex items-center justify-between border cursor-pointer rounded-xl ${
                      isSelected 
                        ? "bg-black border-[#BCA374] shadow-xl translate-x-1" 
                        : "bg-black/40 border-stone-900 hover:border-white/10 hover:bg-black/60"
                    }`}
                  >
                    <div>
                      <h3 className="text-white text-base font-semibold tracking-wide font-sans">
                        {item.name}
                      </h3>
                      <p className="text-[#BCA374] text-[11px] font-mono italic mt-1 font-light">
                        {item.scientificName}
                      </p>
                    </div>
                    <div className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all ${
                      isSelected 
                        ? "border-[#BCA374] bg-[#BCA374]/15 text-[#BCA374]" 
                        : "border-stone-800 text-stone-500"
                    }`}>
                      <Info className="w-4 h-4" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right: Selected Material Detailed Inspector Card */}
            <div className="lg:col-span-7">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedTimber.id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="bg-black/80 border border-stone-900 rounded-2xl p-6 sm:p-10 flex flex-col justify-between h-full relative overflow-hidden group shadow-2xl"
                >
                  {/* Subtle backdrop texture representing wood grains */}
                  <div className="absolute inset-0 bg-radial-gradient from-transparent to-black pointer-events-none z-0" />
                  
                  <div className="relative z-10">
                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-start">
                      
                      {/* Macro photo frame */}
                      <div className="sm:col-span-5 relative rounded-xl overflow-hidden aspect-square sm:aspect-[4/5] bg-stone-900 border border-white/5">
                        <img 
                          src={selectedTimber.imageUrl} 
                          alt={selectedTimber.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.5s]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-85" />
                        <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded border border-white/5">
                          <Check className="w-3 h-3 text-[#BCA374]" />
                          <span className="text-[8px] font-mono tracking-widest text-[#BCA374] uppercase font-bold">STABILIZED</span>
                        </div>
                      </div>

                      {/* Scientific Specifications */}
                      <div className="sm:col-span-7 space-y-4">
                        <div className="inline-block bg-[#BCA374]/10 border border-[#BCA374]/30 px-3 py-1.5 rounded text-[9px] uppercase tracking-widest text-[#BCA374] font-bold">
                          Material Blueprint Spec
                        </div>
                        <h4 className="text-white text-2xl font-light font-serif">
                          {selectedTimber.name}
                        </h4>
                        
                        <div className="grid grid-cols-2 gap-4 pt-1 text-[11px] font-mono border-t border-stone-900">
                          <div>
                            <span className="text-stone-500 block uppercase tracking-wider text-[8px]">Sourcing Slices</span>
                            <span className="text-stone-200">{selectedTimber.origin}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block uppercase tracking-wider text-[8px]">Humidity Gauge</span>
                            <span className="text-[#BCA374] font-semibold">{selectedTimber.moistureRange}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block uppercase tracking-wider text-[8px]">Dry Density</span>
                            <span className="text-stone-200">{selectedTimber.density}</span>
                          </div>
                          <div>
                            <span className="text-stone-500 block uppercase tracking-wider text-[8px]">Joint Category</span>
                            <span className="text-stone-200">Double mortise dovetail</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 border-t border-stone-900 pt-6 space-y-3">
                      <span className="text-stone-500 font-mono uppercase tracking-wider text-[8px] block">Architectural Best Use Case</span>
                      <p className="text-stone-200 text-sm font-light font-sans tracking-tight">
                        {selectedTimber.bestUse}
                      </p>
                      <span className="text-stone-500 font-mono uppercase tracking-wider text-[8px] block pt-2">Optical & Grain Feedback</span>
                      <p className="text-stone-300 text-xs font-light leading-relaxed">
                        {selectedTimber.description}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 pt-4 border-t border-stone-900/60 z-10 flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase text-[#BCA374] font-bold">
                      Tone Match: {selectedTimber.hue}
                    </span>
                    <button 
                      onClick={() => onPageChange && onPageChange("contact")}
                      id="wood-spec-consultation"
                      className="text-white hover:text-[#BCA374] text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5 transition-colors group/link ml-auto"
                    >
                      <span>Request Texture Samples</span>
                      <ArrowRight className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

        </div>
      </section>

      {/* 3. WHY CHOOSE ANAMI MILLWORK GROUP */}
      <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 bg-[#070707] border-t border-stone-950 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#BCA374] block">
              THE STANDARD OF PERFECTION
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white font-serif">
              An Elite Grade of Material Execution
            </h2>
            <div className="h-[1.5px] w-20 bg-[#BCA374] mx-auto mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.15 }}
                className="bg-[#0c0c0c] border border-stone-900 hover:border-[#BCA374]/40 p-8 sm:p-10 rounded-2xl flex flex-col justify-between transition-all duration-500 hover:-translate-y-2.5 group shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#BCA374]/10 border border-[#BCA374]/25 flex items-center justify-center mb-8 transition-transform duration-500 group-hover:scale-110">
                    {pillar.icon}
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#BCA374]/75 uppercase block mb-1">
                    {pillar.subtitle}
                  </span>
                  <h3 className="text-white text-xl md:text-2xl font-light mb-4 font-sans tracking-tight">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed font-light mb-8">
                    {pillar.desc}
                  </p>
                </div>
                
                {/* Micro premium checkbox lists */}
                <div className="border-t border-stone-900 pt-6 mt-auto space-y-3.5">
                  <div className="flex items-center gap-3.5 text-xs text-stone-300">
                    <div className="w-4 h-4 rounded-full bg-[#BCA374]/15 border border-[#BCA374]/40 flex items-center justify-center text-[#BCA374] shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="font-light">Premium ISO joint integrity protocols</span>
                  </div>
                  <div className="flex items-center gap-3.5 text-xs text-stone-300">
                    <div className="w-4 h-4 rounded-full bg-[#BCA374]/15 border border-[#BCA374]/40 flex items-center justify-center text-[#BCA374] shrink-0">
                      <Check className="w-2.5 h-2.5" />
                    </div>
                    <span className="font-light">100% sustainable certified sourcing</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. OUR PROCESS (TIMELINE / STEP-BASED) */}
      <section className="relative py-28 sm:py-36 bg-black border-t border-stone-900">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="text-left space-y-3">
              <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-[#BCA374] block">
                THE MASTER CHRONOLOGY
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white font-serif">
                Four Epochs of Perfection
              </h2>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm font-light max-w-md leading-relaxed">
              From raw plan reviews within architectural software interfaces to physical onsite installation, we govern architectural timber metrics with continuous, absolute focus.
            </p>
          </div>

          {/* Sequential Timeline step layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {processSteps.map((p, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.8, ease: "easeOut", delay: idx * 0.15 }}
                className="relative p-8 sm:p-9 bg-[#0b0b0b] border border-stone-900 rounded-2xl flex flex-col justify-between hover:bg-stone-950 hover:border-[#BCA374]/30 transition-all duration-300 group"
              >
                <div>
                  <div className="flex justify-between items-start mb-8">
                    <span className="text-4xl font-serif text-[#BCA374] opacity-80 group-hover:scale-105 transition-transform duration-300 block">
                      {p.step}
                    </span>
                    <span className="text-[9px] uppercase tracking-widest text-[#BCA374] font-mono bg-stone-900 border border-white/5 py-1 px-3 rounded font-semibold">
                      {p.phase}
                    </span>
                  </div>
                  <h3 className="text-white text-lg md:text-xl font-medium mb-3 font-sans tracking-tight">
                    {p.title}
                  </h3>
                  <p className="text-stone-400 text-xs leading-relaxed font-light">
                    {p.desc}
                  </p>
                </div>

                {/* Animated progress bar line */}
                <div className="w-full h-[2.5px] bg-stone-900 duration-500 overflow-hidden mt-8">
                  <motion.div 
                    initial={{ width: 0 }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.1, ease: "easeOut", delay: idx * 0.15 }}
                    className="h-full bg-gradient-to-r from-[#BCA374] to-[#f5f2ed]" 
                  />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. IMAGE SHOWCASE */}
      <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 bg-[#050505] border-t border-stone-900">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.3em] font-semibold text-[#BCA374] block">
              EDITORIAL CANVAS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light text-white font-serif max-w-xl mx-auto leading-tight">
              A Glimpse of True Cabinetry Integrity
            </h2>
            <p className="text-stone-400 text-xs sm:text-sm font-light leading-relaxed">
              Explore how wood fibers, structured metal pivot joints, and custom proportions converge to frame luxurious layouts.
            </p>
          </div>

          {/* Premium layout gallery */}
          <div id="gallery-grid" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {showcaseGallery.map((item, idx) => {
              // Create dynamic spatial framing based on card position
              const colSpanClass = idx === 0 ? "lg:col-span-7" : "lg:col-span-5";
              const aspectClass = idx === 0 ? "aspect-[16/10] lg:aspect-[16/11]" : "aspect-[16/10] lg:aspect-[4/5]";
              
              return (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.9, delay: idx * 0.15 }}
                  className={`${colSpanClass} flex flex-col justify-between group cursor-pointer relative rounded-2xl overflow-hidden border border-white/5 bg-stone-900`}
                >
                  <div className={`relative w-full ${aspectClass} overflow-hidden`}>
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-[2.2s] group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Shadow scrim gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/20 to-transparent opacity-85" />
                    
                    {/* Floating top badge */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="text-[9px] uppercase tracking-widest font-mono text-stone-100 bg-black/75 border border-white/15 px-3 py-1.5 backdrop-blur-sm rounded font-bold">
                        {item.tag}
                      </span>
                    </div>

                    {/* Left overlay textual indicators */}
                    <div className="absolute bottom-6 left-6 right-6 text-left z-10">
                      <h4 className="text-white text-base sm:text-lg md:text-xl font-medium font-sans">
                        {item.title}
                      </h4>
                      <p className="text-stone-300 text-xs font-light leading-relaxed mt-2 opacity-0 group-hover:opacity-100 max-h-0 group-hover:max-h-[80px] overflow-hidden transition-all duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 6. STATISTICS / ACHIEVEMENTS */}
      <section className="relative py-24 bg-[#0a0a0a] border-t border-b border-stone-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 sm:gap-16 items-start">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col text-left space-y-4">
                <div className="text-4xl sm:text-5xl md:text-6xl font-light text-[#BCA374] tracking-tight">
                  <AnimatedCounter value={stat.value} />
                </div>
                <div className="text-white text-xs sm:text-sm font-semibold tracking-wide font-sans">
                  {stat.label}
                </div>
                <div className="h-[1.5px] w-12 bg-[#BCA374]" />
                <p className="text-stone-400 text-xs leading-relaxed font-light">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CONTACT CTA */}
      <section className="relative py-28 sm:py-36 px-6 md:px-12 lg:px-20 bg-black overflow-hidden flex justify-center text-center">
        
        {/* Soft custom glows behind CTA card */}
        <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-[60vw] h-[60vw] max-w-[600px] bg-[#BCA374]/5 rounded-full filter blur-[150px] pointer-events-none animate-pulse" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl bg-stone-950 border border-stone-900 rounded-3xl p-8 sm:p-14 md:p-16 w-full flex flex-col items-center shadow-2xl"
        >
          <Award className="w-12 h-12 text-[#BCA374] mb-6 animate-pulse" />
          <span className="text-[10px] uppercase tracking-[0.3em] font-extrabold text-[#BCA374] block mb-4">
            PRIVATE ATELIER ADVISORY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-light tracking-tight text-white font-serif max-w-3xl leading-tight">
            Begin Co-Designing Your <br />Structural Masterpiece
          </h2>
          <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-[#BCA374] to-transparent my-7" />
          <p className="text-stone-300 text-sm sm:text-base font-light max-w-2xl mb-12 leading-relaxed">
            We partner with premier architects, residential developers, and private homeowners globally to draft structural millwork that matches the environment. Schedule a private consultation slot with our leading master architectural joiners today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
            <button
              onClick={() => onPageChange && onPageChange("contact")}
              id="cta-advisory-btn"
              className="bg-[#BCA374] hover:bg-stone-100 text-black font-bold uppercase tracking-[0.16em] text-xs px-8 py-4 rounded-[4px] flex items-center gap-2 group transition-all duration-400 w-full sm:w-auto justify-center cursor-pointer shadow-lg hover:text-black active:scale-95"
            >
              <span>Submit Blueprint Consultation</span>
              <ArrowRight className="w-4.5 h-4.5 text-stone-950 transition-transform group-hover:translate-x-1 duration-300" />
            </button>
            <button
              onClick={() => onPageChange && onPageChange("projects")}
              id="cta-projects-btn"
              className="border border-white/15 hover:border-[#BCA374]/60 text-stone-300 hover:text-white px-8 py-4 text-xs font-semibold uppercase tracking-[0.16em] hover:bg-stone-900/40 rounded-[4px] transition-all duration-300 w-full sm:w-auto justify-center cursor-pointer"
            >
              Examine Our Projects
            </button>
          </div>
        </motion.div>
      </section>

    </div>
  );
}
