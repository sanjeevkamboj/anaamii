import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, ArrowRight, X, Layers, Compass, Trees, Lightbulb, Hammer, Sparkle, ShieldCheck, Mail } from "lucide-react";

interface Service {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  shortDesc: string;
  fullDesc: string;
  capabilities: string[];
  materials: string[];
  leadTime: string;
}

export default function ServicesView() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const services: Service[] = [
    {
      id: "kitchen",
      name: "Bespoke Culinary Ateliers",
      subtitle: "Custom architectural grade kitchens & timber islands",
      image: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80",
      shortDesc: "Complete architectural kitchen suites incorporating blind handle channels (gola), luxury solid drawer frames, and concealed dynamic waste systems.",
      fullDesc: "Our kitchen suites are designed in close association with leading architects to establish absolute horizontal unity. Cabinet doors hide integrated heavy appliances entirely behind seamless, custom-sculpted grain facades. Drawer slides operate via hidden heavy undermount drawer tracks certified for flawless movement under full weight tolerances.",
      capabilities: [
        "Continuous wood grain matches across full cabinetry lines",
        "Custom machined integrated J-pull or invisible grip lines",
        "Internal solid white oak drawer box partitions",
        "Sub-zero and Gaggenau physical faceplate integration"
      ],
      materials: [
        "Certified Heartwood Walnut",
        "Invisible protective natural oils",
        "Solid brass structural support accents",
        "Precision high-grip German steel runner tracks"
      ],
      leadTime: "12 - 16 Weeks"
    },
    {
      id: "cladding",
      name: "Architectural Paneling & Pivot Doors",
      subtitle: "Laser-aligned wood slat systems & secret passage portals",
      image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
      shortDesc: "Dynamic corridor wall rib systems, sound dampening backing panels, and flush hidden doors designed to integrate directly with concrete and drywall layouts.",
      fullDesc: "We design and install continuous structural wood cladding that changes are entirely synchronized with ceiling and floor heights. Internal wall-hinged doors are milled with matching slats to completely visually vanish when swung shut. Each slat is hand-polished and spaced precisely using laser guidance.",
      capabilities: [
        "Acoustics-absorbing back planes with natural fiber felt",
        "Concealed magnetic latching systems",
        "Up to 3-meter tall seamless wood slat portals",
        "Shadow-gap integration with skirting boards"
      ],
      materials: [
        "Kiln-Dried Nordic Ash",
        "Blackened Forest Nero stained oak",
        "FR-Grade flame resistant wood substrates",
        "Concealed dynamic offset mechanical hinges"
      ],
      leadTime: "8 - 12 Weeks"
    },
    {
      id: "wardrobes",
      name: "Master Dressing Rooms & Suites",
      subtitle: "Bespoke walkthrough armoirs featuring leather and light",
      image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=1200&q=80",
      shortDesc: "Walk-in luxury clothing environments featuring hand-wrapped micro-perf leather partitions, warm recessed strip LEDs, and humidity-calibrated watch cases.",
      fullDesc: "Our walkthrough wardrobe installations deliver absolute symmetric peace. We pair dark structural woods, tempered pristine glass, and luxurious botanical-infused leathers. Every shoe rail, pull-out trouser rack, and hidden valuables vault is built to address your exact personal dimensions.",
      capabilities: [
        "Integrated touch-capacitive warm 2700K strip LED channels",
        "Full-extension soft-close jewelry drawer structures",
        "Tempered bronze-toned glass show facades",
        "Internal climate and dehumidifier integration"
      ],
      materials: [
        "Muted Eucalyptus Wood veneer",
        "Aniline hand-wrapped desert cowhide leather",
        "Dull-polished custom bronze drawer hardware",
        "Warm indirect-diffusion LED profiles"
      ],
      leadTime: "10 - 14 Weeks"
    },
    {
      id: "furniture",
      name: "Sculptural Slabs & Fine Furniture",
      subtitle: "Symmetrical dining benches & solid joinery desks",
      image: "https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?auto=format&fit=crop&w=1200&q=80",
      shortDesc: "Statement conference table surfaces, low-line Credenzas, and handcrafted solid mortise and tenon joinery desks made to endure.",
      fullDesc: "Unlike mass production, our fine furniture studies are structured from select single logs of ancient timber. Benches and dining slabs represent structural heft coupled with gorgeous, smooth rounded edges and Danish structural elegance.",
      capabilities: [
        "Continuously raw live-edge matching or precision square joints",
        "Butterfly wood key-splice stability lockings",
        "Invisible steel reinforcement rods inside tabletop slabs",
        "Modular expansion inserts on custom bronze pins"
      ],
      materials: [
        "Ancient English Bog Oak",
        "Sourced Local Denmark Ash",
        "Forged dark blackened structural carbon steel",
        "Anti-acid water repellent protective finishes"
      ],
      leadTime: "6 - 8 Weeks"
    }
  ];

  return (
    <div className="w-full bg-[#000000] text-white">
      {/* 1. Services Hero Banner */}
      <section className="relative h-[55vh] sm:h-[65vh] w-full overflow-hidden flex items-center justify-center bg-[#070707]">
        {/* Abstract Dark Wood grain visual overlay */}
        <div className="absolute inset-0 opacity-45 mix-blend-overlay">
          <img
            src="https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1920&q=80"
            alt="Warm glowing architectural grid"
            className="w-full h-full object-cover filter brightness-[0.25]"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-12">
          <div className="inline-flex items-center gap-2 mb-4 bg-white/5 border border-white/10 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3 text-[#BCA374] animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.35em] text-stone-300 font-bold font-sans">
              Atelier Services
            </span>
          </div>

          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-4 text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Bespoke Portfolios
          </h1>
          <div className="h-[1px] w-12 bg-[#BCA374]/50 mx-auto mb-4" />
          <p className="text-stone-400 font-sans text-xs sm:text-sm tracking-widest uppercase max-w-lg mx-auto font-light leading-relaxed">
            From Blueprint Conception to Laser-Guided Laser Installations
          </p>
        </div>
      </section>

      {/* 2. Main Luxury Service Grid with gorgeous zoom framing */}
      <section className="w-full py-[60px] px-6 md:px-12 lg:px-20 bg-black relative z-10">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {services.map((service, index) => {
            const isEven = index % 2 === 0;

            return (
              <div 
                key={service.id}
                className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                  isEven ? "" : "lg:flex-row-reverse"
                }`}
              >
                {/* Visual Cover Frame (Col-span-1/2) */}
                <div className="w-full lg:w-1/2 relative group">
                  <div className="relative rounded-[2rem] overflow-hidden aspect-[4/3] sm:aspect-[16/10] bg-stone-900 border border-white/5 shadow-2xl">
                    <img
                      src={service.image}
                      alt={service.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[1.8s] ease-[cubic-bezier(0.16,1,0.3,1)] filter brightness-95"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  
                  {/* Decorative corner accents matching Danish mid-century cabinets */}
                  <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#BCA374]/30 pointer-events-none" />
                  <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#BCA374]/30 pointer-events-none" />
                </div>

                {/* Service Specs & Capability Highlights */}
                <div className="w-full lg:w-1/2 text-left space-y-5">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#BCA374] uppercase font-bold">
                    Portfolio Segment 0{index + 1}
                  </span>
                  
                  <h2 
                    className="text-white text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight leading-tight"
                    style={{ fontFamily: "var(--font-serif)" }}
                  >
                    {service.name}
                  </h2>
                  <p className="text-stone-400 text-xs sm:text-xs tracking-wider uppercase font-semibold leading-relaxed">
                    {service.subtitle}
                  </p>
                  
                  <div className="h-[1px] w-12 bg-white/10" />

                  <p className="text-stone-300 text-xs sm:text-[13px] leading-relaxed font-light">
                    {service.shortDesc}
                  </p>

                  <div className="space-y-2 pt-2">
                    {service.capabilities.slice(0, 2).map((cap, cIdx) => (
                      <div key={cIdx} className="flex items-start gap-2 text-[11px] text-stone-400 font-light">
                        <Sparkle className="w-3 h-3 text-[#BCA374] shrink-0 mt-0.5" />
                        <span>{cap}</span>
                      </div>
                    ))}
                  </div>

                  {/* Symmetrical Booking Trigger */}
                  <div className="pt-6">
                    <button
                      onClick={() => setSelectedService(service)}
                      className="inline-flex items-center gap-3 bg-[#111] hover:bg-white text-white hover:text-black hover:shadow-xl border border-white/15 hover:border-white px-6 py-3 rounded-[4px] text-[9.5px] lg:text-[9px] xl:text-[9.5px] 2xl:text-[10.5px] font-bold uppercase tracking-widest transition-all duration-300 cursor-pointer"
                    >
                      <span>Explore Technical Spec</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            );
          })}

        </div>
      </section>

      {/* 3. Luxury Engineering Guarantees Footer strip */}
      <section className="w-full py-[60px] bg-[#090909] border-t border-white/[0.04] relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-6 relative z-10">
          <Layers className="w-8 h-8 text-[#BCA374] mx-auto animate-pulse" />
          <h3 className="text-white text-lg sm:text-xl font-bold font-sans tracking-tight">The ANAAMII Guarantee of Structural Integrity</h3>
          <p className="text-stone-400 text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            All structural frameworks are fully pressure-stabilized and evaluated against dynamic moisture adjustments. Joints carry a lifelong performance commitment.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[10.5px] font-bold tracking-widest uppercase text-stone-200">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#BCA374]" />
              <span>Laser Dry Fit Verification</span>
            </span>
            <span className="h-4 w-[1px] bg-white/10 hidden sm:block"></span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#BCA374]" />
              <span>Zero-VOC Botanical Sealers</span>
            </span>
          </div>
        </div>
      </section>

      {/* DETAILED SERVICE SPECS POPUP DIALOG (MODAL) */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Click-away overlay handler */}
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedService(null)} />

            {/* Spec Card Sheet */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 25 }}
              transition={{ type: "spring", damping: 26, stiffness: 190 }}
              className="relative bg-[#000000] w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 p-8 sm:p-10 max-h-[92vh] overflow-y-auto text-left z-10"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 bg-stone-900 border border-white/10 text-white hover:text-[#BCA374] p-3 rounded-[4px] transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[9px] uppercase tracking-[0.25em] text-[#BCA374] font-bold block mb-1">
                    Atelier Standard Spec Sheet
                  </span>
                  <h3 className="text-white text-2xl sm:text-3xl font-bold font-sans tracking-tight">
                    {selectedService.name}
                  </h3>
                  <div className="h-[1px] w-12 bg-[#BCA374] mt-3" />
                </div>

                <p className="text-stone-350 text-xs sm:text-[13px] leading-relaxed font-light font-sans">
                  {selectedService.fullDesc}
                </p>

                {/* Specifications details columns */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                  
                  {/* Capabilities List */}
                  <div className="bg-[#0b0b0b] border border-white/5 p-5 rounded-2xl">
                    <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-[#BCA374] mb-3 flex items-center gap-2">
                      <Hammer className="w-3.5 h-3.5" />
                      <span>Atelier Capabilities</span>
                    </h4>
                    <ul className="space-y-2.5 text-[11px] text-stone-300 font-light">
                      {selectedService.capabilities.map((cap, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#BCA374] font-bold">•</span>
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Materials & Core hardware specs */}
                  <div className="bg-[#0b0b0b] border border-white/5 p-5 rounded-2xl">
                    <h4 className="text-[10px] uppercase tracking-wider font-extrabold text-[#BCA374] mb-3 flex items-center gap-2">
                      <Trees className="w-3.5 h-3.5" />
                      <span>Signature Materials</span>
                    </h4>
                    <ul className="space-y-2.5 text-[11px] text-stone-300 font-light">
                      {selectedService.materials.map((mat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#BCA374] font-bold">•</span>
                          <span>{mat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Symmetrical Lead-times or custom Ordering Info details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/[0.05] pt-5 mt-4">
                  <div className="text-left">
                    <span className="text-[10px] uppercase tracking-wider text-stone-400 block font-medium">Estimated Hand-Milling Lead Time</span>
                    <span className="text-white text-sm font-semibold font-mono tracking-wide">{selectedService.leadTime}</span>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedService(null)}
                      className="bg-transparent text-white border border-white/10 px-4 py-3 rounded-[4px] text-[9.5px] lg:text-[9px] xl:text-[9.5px] 2xl:text-[10.5px] uppercase tracking-wider font-bold hover:bg-white/5 transition-colors cursor-pointer"
                    >
                      Close Spec
                    </button>
                    <button
                      onClick={() => {
                        setSelectedService(null);
                        const contactEl = document.getElementById("contact");
                        if (contactEl) {
                          contactEl.scrollIntoView({ behavior: "smooth" });
                        }
                      }}
                      className="bg-white hover:bg-[#BCA374] text-black px-5 py-3 rounded-[4px] text-[9.5px] lg:text-[9px] xl:text-[9.5px] 2xl:text-[10.5px] uppercase tracking-wider font-bold transition-colors cursor-pointer inline-flex items-center gap-2"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Submit Blueprint inquiry</span>
                    </button>
                  </div>
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
