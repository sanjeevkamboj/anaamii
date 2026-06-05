import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Check, Sparkles, ChevronRight, ArrowLeft, Calendar, Star } from "lucide-react";

const spaces = [
  {
    id: "kitchen",
    label: "Kitchen",
    description: "Bespoke Culinary Spaces",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "bedroom",
    label: "Bedroom",
    description: "Master Dressing Suites",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "living-room",
    label: "Living Room",
    description: "Bespoke Lounge & Shelving",
    image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "bathroom",
    label: "Bathroom",
    description: "Sanctuary Powder Room",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "closet",
    label: "Closet / Wardrobe",
    description: "Sartorial Dressing Enclaves",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "office",
    label: "Home Office",
    description: "Executive Studio Rooms",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "laundry",
    label: "Laundry Room",
    description: "Utility & Washing Chambers",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "millwork",
    label: "Custom Millwork",
    description: "Artisanal Tailored Millwork",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80"
  },
  {
    id: "library",
    label: "Library & Lounge",
    description: "Sovereign Bookcases & Cellars",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=700&q=80"
  }
];

export default function ContactCTA() {
  const [step, setStep] = useState<1 | 2>(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    appointmentDate: "",
    message: "",
    catalogOption: false,
    selectedSpace: ""
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectSpace = (spaceLabel: string) => {
    setFormData((prev) => ({ ...prev, selectedSpace: spaceLabel }));
    // Auto advance smoothly with an aesthetic delay
    setTimeout(() => {
      setStep(2);
    }, 320);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedSpace || !formData.firstName || !formData.email) return;
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      appointmentDate: "",
      message: "",
      catalogOption: false,
      selectedSpace: ""
    });
    setStep(1);
    setIsSubmitted(false);
  };

  const isFormValid = formData.firstName && formData.lastName && formData.email && formData.phone && formData.appointmentDate && formData.message;

  return (
    <section
      id="contact"
      className="relative w-full bg-[#FFFFFF] py-[70px] px-6 md:px-12 lg:px-24 flex flex-col items-center justify-center border-t border-stone-200/80 overflow-visible"
    >
      {/* Main Luxury Grid Layout */}
      <div className="w-full max-w-[1300px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-stretch relative z-10">
        
        {/* Left Column: Editorial & Exclusivity Content - STICKY */}
        <div className="lg:col-span-5 pr-0 lg:pr-8">
          <div className="lg:sticky lg:top-32 space-y-6 flex flex-col justify-start">
            <div className="space-y-6">
              {/* Category Tag */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-[#8D9981] rounded-full animate-pulse" />
                <span className="text-[11px] font-sans tracking-[0.4em] text-[#8D9981] uppercase font-extrabold">
                  07 / COLLABORATION
                </span>
              </div>

              {/* Breathtaking Editorial Heading */}
              <h2 
                className="text-4xl sm:text-5xl lg:text-6xl text-[#1C1B1A] font-extrabold tracking-tight leading-[1.1]"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Let’s draft your <span className="font-serif italic font-normal text-[#8D9981] block sm:inline">signature space.</span>
              </h2>

              {/* Sophisticated Editorial Copy */}
              <p className="text-stone-600 text-sm sm:text-base font-sans font-normal leading-relaxed tracking-normal max-w-sm">
                Perfect execution begins with meticulous conversation. Reach out to our design concierge and scheduling specialists to map out custom-engineered cabinetry for your residence.
              </p>

              {/* Exclusivity list of values */}
              <div className="space-y-4 pt-4 border-t border-stone-100 max-w-sm">
                <div className="flex items-start gap-4 group">
                  <div className="w-5 h-5 rounded-full bg-[#8D9981]/15 border border-[#8D9981]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#8D9981] group-hover:text-white transition-all duration-350">
                    <span className="text-[10px] font-mono font-bold text-[#8D9981] group-hover:text-white">01</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C1B1A] tracking-wider uppercase group-hover:text-[#8D9981] transition-colors">Virtual or On-Site Mapping</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5 font-light">60-minute space planning and architectural schematic overview.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-5 h-5 rounded-full bg-[#8D9981]/15 border border-[#8D9981]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#8D9981] group-hover:text-white transition-all duration-350">
                    <span className="text-[10px] font-mono font-bold text-[#8D9981] group-hover:text-white">02</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C1B1A] tracking-wider uppercase group-hover:text-[#8D9981] transition-colors">Material Selection Guides</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5 font-light">Review physical hardwood timber samples, patinas, and premium brass accents.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-5 h-5 rounded-full bg-[#8D9981]/15 border border-[#8D9981]/30 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#8D9981] group-hover:text-white transition-all duration-350">
                    <span className="text-[10px] font-mono font-bold text-[#8D9981] group-hover:text-white">03</span>
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-[#1C1B1A] tracking-wider uppercase group-hover:text-[#8D9981] transition-colors">Uncompromising Quality</h4>
                    <p className="text-[11px] text-stone-500 mt-0.5 font-light">Engineered to tolerances of under 0.5mm at our local joinery workshops.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiet, high-end blockquote */}
            <div className="pt-4 border-t border-stone-100 hidden lg:block">
              <p className="text-xs font-serif italic text-stone-400 leading-relaxed max-w-xs border-l border-[#8D9981]/30 pl-3">
                “True luxury lies in the micro-details—the silent sweep of a soft-close door and the exact grain match of continuous walnut panels.”
              </p>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#979AAA] mt-2 block">— Copenhagen Studio Lead</span>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Integrated Concierge Card */}
        <div className="lg:col-span-7 flex flex-col justify-start">
          <div className="bg-white border border-[#EAE6E1] pt-4 pb-6 px-6 sm:pt-5 sm:pb-10 sm:px-10 shadow-[0_25px_60px_-25px_rgba(28,27,26,0.06)] rounded-none relative text-left w-full">
            
            {/* Extremely elegant olive minimal card-edge accent line */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-[#8D9981]" />

            <AnimatePresence mode="wait">
              {!isSubmitted ? (
                <div key="inquiryform" className="flex flex-col h-full justify-between">
                  
                  {/* Premium Interactive Step Progress Bar with Olive Highlights - Progress bar at bottom */}
                  <div className="w-full mb-8 select-none text-left">
                    <div className="flex items-center justify-between text-xs sm:text-[13px] font-mono uppercase tracking-[0.2em] mb-4 relative z-10">
                      
                      {/* Step 1 Button */}
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex items-center gap-2 cursor-pointer transition-colors focus:outline-none select-none text-left"
                      >
                        <div className="relative flex items-center justify-center w-5 h-5">
                          {step === 2 ? (
                            <motion.div
                              initial={{ scale: 0.6, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-4 h-4 rounded-full bg-[#8D9981] flex items-center justify-center text-white"
                            >
                              <Check className="w-2.5 h-2.5 stroke-[3]" />
                            </motion.div>
                          ) : (
                            <div className="relative flex items-center justify-center">
                              <span className="absolute w-4 h-4 rounded-full border border-[#8D9981]/30 bg-[#8D9981]/15 animate-ping" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#8D9981] relative z-10" />
                            </div>
                          )}
                        </div>
                        <span className={`text-[10px] sm:text-[11.5px] font-semibold tracking-[0.25em] ${
                          step === 1 ? "text-stone-900 font-bold" : "text-[#8D9981]"
                        }`}>
                          Select Space
                        </span>
                      </button>

                      {/* Step 2 Button / Node */}
                      <button
                        type="button"
                        disabled={!formData.selectedSpace}
                        onClick={() => { if (formData.selectedSpace) setStep(2); }}
                        className={`flex items-center gap-2 transition-colors focus:outline-none select-none text-left ${
                          formData.selectedSpace ? "cursor-pointer" : "cursor-default"
                        }`}
                      >
                        <span className={`text-[10px] sm:text-[11.5px] font-semibold tracking-[0.25em] ${
                          step === 2 ? "text-[#8D9981] font-bold" : "text-stone-400"
                        }`}>
                          Contact Details
                        </span>
                        <div className="relative flex items-center justify-center w-5 h-5">
                          {step === 2 ? (
                            <div className="relative flex items-center justify-center">
                              <span className="absolute w-4 h-4 rounded-full border border-[#8D9981]/30 bg-[#8D9981]/15 animate-ping" />
                              <span className="w-2.5 h-2.5 rounded-full bg-[#8D9981] relative z-10" />
                            </div>
                          ) : (
                            <span className="w-2.5 h-2.5 rounded-full bg-stone-200 border border-stone-100" />
                          )}
                        </div>
                      </button>
                    </div>

                    {/* Progress Track Line positioned at the bottom of the progress header */}
                    <div className="w-full h-[2px] bg-stone-100 relative overflow-hidden rounded-full">
                      <motion.div 
                        className="absolute top-0 left-0 h-full bg-[#8D9981]" 
                        initial={{ width: "50%" }}
                        animate={{ width: step === 1 ? "50%" : "100%" }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                      />
                    </div>
                  </div>


                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step1-content"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-5"
                      >
                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-[#8D9981] uppercase block mb-1">
                            Atelier Configurator Step 1
                          </span>
                          <h3 className="text-xl font-bold text-[#1C1B1A] tracking-tight">
                            Select Your Commissioned Space
                          </h3>
                        </div>

                        {/* Interactive Space Selection Image Grids - 3 columns on tablet and desktop */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-3 pt-1">
                          {spaces.map((space) => {
                            const isSel = formData.selectedSpace === space.label;
                            return (
                              <button
                                key={space.id}
                                type="button"
                                onClick={() => handleSelectSpace(space.label)}
                                className={`relative overflow-hidden rounded-xl aspect-[1.3] sm:aspect-[1.25] md:aspect-[1.22] lg:aspect-[1.2] xl:aspect-[1.18] 2xl:aspect-[1.22] group text-left cursor-pointer border transition-all duration-500 flex flex-col justify-end p-2.5 sm:p-3 shadow-sm ${
                                  isSel
                                    ? "border-[#8D9981] ring-1 ring-[#8D9981]/50 bg-[#8D9981]/5"
                                    : "border-stone-200/80 hover:border-[#8D9981]/60 bg-white"
                                }`}
                              >
                                <img
                                  src={space.image}
                                  alt={space.label}
                                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.5] saturate-[0.8] group-hover:scale-105 group-hover:brightness-[0.4] transition-all duration-750"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />

                                {/* Mini Select Dot Accent */}
                                <div className={`absolute top-2.5 right-2.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                  isSel 
                                    ? "border-[#8D9981] bg-[#8D9981] text-white" 
                                    : "border-white/30 bg-black/30 text-transparent"
                                }}`}>
                                  <div className="w-1 h-1 rounded-full bg-current" />
                                </div>

                                <div className="relative z-10">
                                  <span className="block text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider group-hover:text-[#8D9981] transition-colors leading-tight">
                                    {space.label}
                                  </span>
                                  <span className="block text-[8.5px] sm:text-[9.5px] text-stone-300 font-light mt-0.5 whitespace-nowrap overflow-hidden text-ellipsis">
                                    {space.description}
                                  </span>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="step2-content"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-4"
                      >
                        {/* Interactive selection badge & Back triggers */}
                        <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-2">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1 text-xs text-stone-500 hover:text-black cursor-pointer select-none transition-colors"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Change Space</span>
                          </button>
                          
                          <span className="text-[10px] uppercase font-mono tracking-widest bg-[#8D9981]/15 text-[#8D9981] px-2.5 py-1 border border-[#8D9981]/30 font-semibold rounded-[4px]">
                            Space: {formData.selectedSpace}
                          </span>
                        </div>

                        <div>
                          <span className="text-[9px] font-mono tracking-widest text-[#8D9981] uppercase block mb-1">
                            Atelier Configurator Step 2
                          </span>
                          <h3 className="text-xl font-bold text-[#1C1B1A] tracking-tight">
                            Personal & Estate Coordinates
                          </h3>
                        </div>

                        {/* Integrated Fields */}
                        <div className="space-y-3 pt-1">
                          
                          {/* Row 1: First and Last Name */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">First Name *</label>
                              <input
                                required
                                type="text"
                                placeholder="Adrienne"
                                value={formData.firstName}
                                onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981]/30 focus:bg-white text-stone-900 text-xs focus:outline-none transition-all font-sans tracking-wide rounded-lg"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">Last Name *</label>
                              <input
                                required
                                type="text"
                                placeholder="Vance"
                                value={formData.lastName}
                                onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981]/30 focus:bg-white text-stone-900 text-xs focus:outline-none transition-all font-sans tracking-wide rounded-lg"
                              />
                            </div>
                          </div>

                          {/* Row 2: Email and Phone */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">Email Address *</label>
                              <input
                                required
                                type="email"
                                placeholder="adrienne@residence.com"
                                value={formData.email}
                                onChange={(e) => setFormData({...formData, email: e.target.value})}
                                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981]/30 focus:bg-white text-stone-900 text-xs focus:outline-none transition-all font-sans tracking-wide rounded-lg"
                              />
                            </div>

                            <div className="space-y-1">
                              <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">Phone Number *</label>
                              <input
                                required
                                type="tel"
                                placeholder="+1 (416) 555-0192"
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981]/30 focus:bg-white text-stone-900 text-xs focus:outline-none transition-all font-sans tracking-wide rounded-lg"
                              />
                            </div>
                          </div>

                          {/* Row 3: Appointment Date Selection */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase flex items-center gap-1">
                              <Calendar className="w-3 h-3 text-[#8D9981]" />
                              <span>Preferred Appointment Date *</span>
                            </label>
                            <input
                              required
                              type="date"
                              value={formData.appointmentDate}
                              onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981]/30 text-stone-900 text-xs focus:outline-none cursor-pointer rounded-lg transition-all"
                            />
                          </div>

                          {/* Row 4: Message Text Area */}
                          <div className="space-y-1">
                            <label className="text-[10px] font-mono tracking-wider text-stone-400 uppercase">Commission Message *</label>
                            <textarea
                              required
                              rows={3}
                              placeholder={`List parameters or vision details for your customized ${formData.selectedSpace}...`}
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              className="w-full px-4 py-2.5 bg-stone-50 border border-stone-200 focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981]/30 focus:bg-white text-stone-900 text-xs focus:outline-none transition-all font-sans tracking-wide resize-none rounded-lg"
                            />
                          </div>
                        </div>

                        {/* Symmetrical Catalog Option inside light box */}
                        <div className="flex items-start gap-2.5 select-none pt-1">
                          <input
                            type="checkbox"
                            id="conciergeCatalogOption"
                            checked={formData.catalogOption}
                            onChange={(e) => setFormData({...formData, catalogOption: e.target.checked})}
                            className="w-4 h-4 mt-0.5 rounded border-stone-300 text-stone-900 accent-[#8D9981] cursor-pointer shrink-0"
                          />
                          <label htmlFor="conciergeCatalogOption" className="text-[10.5px] text-stone-500 cursor-pointer font-sans leading-tight">
                            Deliver architectural <span className="text-[#1C1B1A] font-semibold">Atelier Portfolio Catalogs</span> directly to my coordinate.
                          </label>
                        </div>

                        {/* Luxurious Action Button */}
                        <button
                          type="submit"
                          disabled={!isFormValid}
                          className={`w-full py-4 mt-2 font-sans text-xs font-bold tracking-[0.25em] uppercase transition-all flex items-center justify-center gap-2 rounded-[4px] cursor-pointer ${
                            isFormValid
                              ? "bg-[#8D9981] text-white hover:bg-[#7e8a71] hover:shadow-[0_12px_30px_rgba(141,153,129,0.3)]"
                              : "bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed"
                          }`}
                        >
                          <span>CONFIRM CONSULTATION REQUEST</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <motion.div
                  key="formsuccess"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="text-center py-12 flex flex-col items-center justify-center"
                >
                  <div className="w-14 h-14 bg-stone-950 text-white flex items-center justify-center mb-6 rounded-full shadow-md">
                    <Check className="w-5 h-5 stroke-[2]" />
                  </div>

                  <h3 className="text-3xl font-light text-[#1C1B1A] mb-4" style={{ fontFamily: "var(--font-serif)" }}>
                    Inquiry Safely Received
                  </h3>

                  <div className="text-stone-600 text-xs sm:text-sm max-w-md mx-auto leading-relaxed space-y-4 font-sans mb-8">
                    <p>
                      Thank you, <strong className="text-black font-semibold">{formData.firstName} {formData.lastName}</strong>. Your custom consultation request for a luxurious <strong className="text-[#8D9981] font-semibold">{formData.selectedSpace}</strong> has been registered on our server.
                    </p>
                    <p className="text-stone-500 font-light">
                      One of our expert draftspersons will review your specs and email you closely at <strong className="text-stone-800">{formData.email}</strong> by <strong className="text-stone-800">{formData.appointmentDate}</strong>.
                    </p>
                  </div>

                  <button
                    onClick={handleReset}
                    className="px-8 py-3.5 bg-[#F5F2EB] hover:bg-[#EAE5DA] border border-[#1C1B1A]/20 text-[#1C1B1A] font-sans text-xs font-bold tracking-[.2em] uppercase transition-colors rounded-[4px]"
                  >
                    SUBMIT ANOTHER REQUEST
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
}
