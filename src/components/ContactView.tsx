import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, ShieldCheck, Calendar, Star, ArrowLeft, ChevronRight, Sparkles } from "lucide-react";

const spaces = [
  {
    id: "kitchen",
    label: "Kitchen",
    description: "Bespoke Culinary Spaces",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=805&q=80"
  },
  {
    id: "bedroom",
    label: "Bedroom",
    description: "Master Dressing Suites",
    image: "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=805&q=80"
  },
  {
    id: "living-room",
    label: "Living Room",
    description: "Bespoke Lounge & Shelving",
    image: "https://images.unsplash.com/photo-1600210492486-724bc5c67fb0?auto=format&fit=crop&w=805&q=80"
  },
  {
    id: "bathroom",
    label: "Bathroom",
    description: "Sanctuary Powder Room",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=805&q=80"
  },
  {
    id: "closet",
    label: "Closet / Wardrobe",
    description: "Sartorial Dressing Enclaves",
    image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=805&q=80"
  },
  {
    id: "office",
    label: "Home Office",
    description: "Executive Studio Rooms",
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=805&q=80"
  },
  {
    id: "laundry",
    label: "Laundry Room",
    description: "Utility & Washing Chambers",
    image: "https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?auto=format&fit=crop&w=805&q=80"
  },
  {
    id: "millwork",
    label: "Custom Millwork",
    description: "Artisanal Tailored Millwork",
    image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=805&q=80"
  },
  {
    id: "library",
    label: "Library & Lounge",
    description: "Sovereign Bookcases & Cellars",
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=805&q=80"
  }
];

export default function ContactView() {
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

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSelectSpace = (spaceLabel: string) => {
    setFormData((prev) => ({ ...prev, selectedSpace: spaceLabel }));
    // Auto advance smoothly to Step 2
    setTimeout(() => {
      setStep(2);
    }, 350);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.selectedSpace) {
      setStep(1);
      return;
    }
    setFormSubmitted(true);
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
    setFormSubmitted(false);
  };

  return (
    <div className="w-full bg-[#000000] text-white">
      {/* 1. Page Hero Banner */}
      <section className="relative h-[40vh] sm:h-[45vh] lg:h-[35vh] xl:h-[40vh] 2xl:h-[50vh] w-full overflow-hidden flex items-center justify-center bg-[#070707] border-b border-white/[0.04]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1920&q=80"
            alt="Warm fireplace architectural wood detailing"
            className="w-full h-full object-cover filter brightness-[0.25]"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-transparent" />

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6 mt-8 sm:mt-12">
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#8D9981] font-bold block mb-2.5 sm:mb-3.5 animate-pulse">
            Atelier Consultation
          </span>
          <h1 
            className="text-3xl sm:text-4xl md:text-5xl lg:text-4.5xl xl:text-5.5xl font-bold tracking-tight mb-3 sm:mb-4 text-white"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Start Your Commission
          </h1>
          <div className="h-[1px] w-12 bg-[#8D9981]/50 mx-auto" />
          <p className="text-stone-400 font-sans text-[10px] sm:text-xs tracking-widest mt-3 sm:mt-4 uppercase max-w-sm sm:max-w-md mx-auto leading-relaxed">
            Secure private consultation with our Chief Design Officers
          </p>
        </div>
      </section>

      {/* 2. Main Luxury Interaction Section (Form & Information columns) */}
      <section className="w-full py-[60px] lg:py-[35px] xl:py-[45px] px-6 md:px-12 lg:px-20 bg-black relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 xl:gap-16 items-stretch">
          
          {/* Left Column: Form Builder (col-span-7) */}
          <div className="lg:col-span-7 bg-[#070707] border border-white/[0.04] p-6 sm:p-10 lg:p-6 xl:p-8 2xl:p-10 rounded-[2.5rem] flex flex-col justify-between relative shadow-2xl overflow-hidden min-h-[600px] lg:min-h-[480px] xl:min-h-[530px] 2xl:min-h-[600px]">
            <div className="absolute top-0.5 right-0.5 w-32 h-32 bg-[#8D9981]/5 rounded-full filter blur-2xl pointer-events-none" />

            <AnimatePresence mode="wait">
              {!formSubmitted ? (
                <div key="form-container" className="flex flex-col h-full justify-between">
                  {/* Progressive Step Indicator with Luxurious Typography */}
                  <div className="flex items-center gap-4 text-[10px] sm:text-[11px] font-mono uppercase tracking-[0.2em] mb-8 lg:mb-5 xl:mb-6 2xl:mb-8 pb-4 lg:pb-3 xl:pb-4 border-b border-white/[0.06] select-none">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className={`flex items-center gap-2 cursor-pointer transition-colors ${
                        step === 1 ? "text-[#8D9981] font-bold" : "text-stone-500 hover:text-stone-300"
                      }`}
                    >
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border transition-colors ${
                        step === 1 ? "border-[#8D9981] bg-[#8D9981]/15 text-[#8D9981]" : "border-stone-700 text-stone-500"
                      }`}>1</span>
                      <span>Select Space</span>
                    </button>

                    <ChevronRight className="w-3.5 h-3.5 text-stone-700" />

                    <div className={`flex items-center gap-2 transition-colors ${
                      step === 2 ? "text-[#8D9981] font-bold" : "text-stone-600"
                    }`}>
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border transition-colors ${
                        step === 2 ? "border-[#8D9981] bg-[#8D9981]/15 text-[#8D9981]" : "border-stone-800 text-stone-650"
                      }`}>2</span>
                      <span>Contact Details</span>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    {step === 1 ? (
                      <motion.div
                        key="step-select-space"
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 15 }}
                        transition={{ duration: 0.3 }}
                        className="space-y-6 lg:space-y-4 xl:space-y-5 2xl:space-y-6 text-left animate-fade-in"
                      >
                        <div className="space-y-1 sm:space-y-2">
                          <span className="text-[10px] uppercase tracking-wider text-[#8D9981] font-bold flex items-center gap-1.5">
                            <Sparkles className="w-3.5 h-3.5" />
                            Step 1 &bull; Configurator
                          </span>
                          <h3 className="text-white text-xl sm:text-2xl lg:text-lg xl:text-xl 2xl:text-2xl font-bold font-sans tracking-tight">Select Your Space</h3>
                          <p className="text-stone-400 text-xs lg:text-[11px] xl:text-xs font-light">
                            Choose an architectural zone in your estate you wish to design. Click a card to advance.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-2.5 sm:gap-3 lg:gap-2.5 xl:gap-3 2xl:gap-3.5 pt-1">
                          {spaces.map((space) => {
                            const isSelected = formData.selectedSpace === space.label;
                            return (
                              <button
                                key={space.id}
                                type="button"
                                onClick={() => handleSelectSpace(space.label)}
                                className={`relative overflow-hidden rounded-2xl aspect-[1.3] sm:aspect-[1.35] lg:aspect-[1.28] xl:aspect-[1.2] 2xl:aspect-[1.25] group text-left cursor-pointer border transition-all duration-500 flex flex-col justify-end p-2.5 sm:p-3 shadow-md ${
                                  isSelected
                                    ? "border-[#8D9981] ring-1 ring-[#8D9981] bg-[#8D9981]/10"
                                    : "border-white/[0.05] hover:border-[#8D9981]/50 bg-white/[0.01]"
                                }`}
                              >
                                {/* Immersive premium photo background */}
                                <img
                                  src={space.image}
                                  alt={space.label}
                                  className="absolute inset-0 w-full h-full object-cover filter brightness-[0.45] saturate-[0.8] group-hover:scale-105 group-hover:brightness-[0.35] transition-all duration-700"
                                  referrerPolicy="no-referrer"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                                {/* Interactive select icon overlay */}
                                <div className={`absolute top-2.5 right-2.5 w-4 h-4 rounded-full border flex items-center justify-center transition-all ${
                                  isSelected 
                                    ? "border-[#8D9981] bg-[#8D9981] text-black" 
                                    : "border-white/30 bg-black/40 text-transparent"
                                }`}>
                                  <div className="w-1.5 h-1.5 rounded-full bg-current" />
                                </div>

                                <div className="relative z-10 w-full">
                                  <h4 className="text-white text-[11px] sm:text-xs lg:text-[10px] xl:text-[11px] 2xl:text-sm font-bold uppercase tracking-wider group-hover:text-[#8D9981] transition-colors leading-tight">
                                    {space.label}
                                  </h4>
                                  <p className="text-stone-400 text-[9px] lg:text-[8px] xl:text-[9.5px] 2xl:text-[10px] font-light mt-0.5 group-hover:text-stone-200 transition-colors leading-none">
                                    {space.description}
                                  </p>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.form
                        key="step-contact-details"
                        initial={{ opacity: 0, x: 15 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -15 }}
                        transition={{ duration: 0.3 }}
                        onSubmit={handleSubmit}
                        className="space-y-4 lg:space-y-3 xl:space-y-4 2xl:space-y-5 text-left"
                      >
                        {/* Selected space sticky badge and Back controller */}
                        <div className="flex items-center justify-between pb-3 lg:pb-2 xl:pb-3 border-b border-white/[0.04]">
                          <button
                            type="button"
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1.5 text-xs text-stone-400 hover:text-white cursor-pointer select-none transition-colors"
                          >
                            <ArrowLeft className="w-3.5 h-3.5" />
                            <span>Back to Spaces</span>
                          </button>
                          
                          <div className="text-[10px] uppercase font-mono tracking-widest bg-[#8D9981]/15 text-[#8D9981] px-2.5 py-1 rounded-full border border-[#8D9981]/30 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#8D9981] animate-pulse" />
                            <span>Target: {formData.selectedSpace}</span>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <span className="text-[10px] uppercase tracking-wider text-[#8D9981] font-bold">Step 2 &bull; Contact Filing</span>
                          <h3 className="text-white text-lg xl:text-xl font-bold font-sans tracking-tight">Interactive Request Blueprint</h3>
                        </div>

                        {/* Field Row 1: First Name & Last Name */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-3 xl:gap-4">
                          <div className="space-y-1.5 lg:space-y-1">
                            <label htmlFor="firstName" className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-mono">First Name *</label>
                            <input
                              type="text"
                              id="firstName"
                              required
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              placeholder="John"
                              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 lg:px-3 lg:py-2.5 xl:px-4 xl:py-3 text-sm lg:text-xs xl:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981] transition-all"
                            />
                          </div>

                          <div className="space-y-1.5 lg:space-y-1">
                            <label htmlFor="lastName" className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-mono">Last Name *</label>
                            <input
                              type="text"
                              id="lastName"
                              required
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              placeholder="Voss"
                              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 lg:px-3 lg:py-2.5 xl:px-4 xl:py-3 text-sm lg:text-xs xl:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981] transition-all"
                            />
                          </div>
                        </div>

                        {/* Field Row 2: Email & Phone */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-3 xl:gap-4">
                          <div className="space-y-1.5 lg:space-y-1">
                            <label htmlFor="email" className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-mono">Email Address *</label>
                            <input
                              type="email"
                              id="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              placeholder="john.voss@estate.com"
                              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 lg:px-3 lg:py-2.5 xl:px-4 xl:py-3 text-sm lg:text-xs xl:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981] transition-all"
                            />
                          </div>

                          <div className="space-y-1.5 lg:space-y-1">
                            <label htmlFor="phone" className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-mono">Phone Number *</label>
                            <input
                              type="tel"
                              id="phone"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              placeholder="+1 (555) 0123"
                              className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 lg:px-3 lg:py-2.5 xl:px-4 xl:py-3 text-sm lg:text-xs xl:text-sm text-white placeholder-stone-600 focus:outline-none focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981] transition-all"
                            />
                          </div>
                        </div>

                        {/* Field Row 3: Appointment Date Selection */}
                        <div className="space-y-1.5 lg:space-y-1">
                          <label htmlFor="appointmentDate" className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-mono flex items-center gap-2">
                            <Calendar className="w-3.5 h-3.5 text-[#8D9981]" />
                            <span>Preferred Appointment Date *</span>
                          </label>
                          <input
                            type="date"
                            id="appointmentDate"
                            required
                            value={formData.appointmentDate}
                            onChange={(e) => setFormData({...formData, appointmentDate: e.target.value})}
                            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 lg:px-3 lg:py-2.5 xl:px-4 xl:py-3 text-sm lg:text-xs xl:text-sm text-white focus:outline-none focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981] transition-all cursor-pointer"
                          />
                        </div>

                        {/* Field Row 4: Message Box */}
                        <div className="space-y-1.5 lg:space-y-1">
                          <label htmlFor="message" className="text-[10px] uppercase tracking-widest text-stone-400 font-bold font-mono">Commission Details & Vision *</label>
                          <textarea
                            id="message"
                            required
                            rows={3}
                            value={formData.message}
                            onChange={(e) => setFormData({...formData, message: e.target.value})}
                            placeholder={`Describe your specific parameters for the ${formData.selectedSpace} design layout...`}
                            className="w-full bg-[#111] border border-white/10 rounded-xl px-4 py-3 lg:px-3 lg:py-2 text-sm lg:text-xs xl:text-sm text-white placeholder-stone-700 focus:outline-none focus:border-[#8D9981] focus:ring-1 focus:ring-[#8D9981] transition-all resize-none h-[100px] lg:h-[65px] xl:h-[80px] 2xl:h-[100px]"
                          />
                        </div>

                        {/* Symmetrical Catalog Option */}
                        <div className="flex items-center gap-3 lg:gap-2 select-none pt-1">
                          <input
                            type="checkbox"
                            id="catalogOption"
                            checked={formData.catalogOption}
                            onChange={(e) => setFormData({...formData, catalogOption: e.target.checked})}
                            className="w-4 h-4 bg-stone-900 accent-[#8D9981] rounded border-white/10 border cursor-pointer shrink-0"
                          />
                          <label htmlFor="catalogOption" className="text-[10px] text-stone-400 tracking-wide cursor-pointer font-sans leading-snug">
                            Request physical copy of printed <span className="text-[#8D9981] font-semibold">"ANAAMII Atelier Catalog 2026/2027"</span> directly to my estate coordinate.
                          </label>
                        </div>

                        {/* Form Submission Premium Action */}
                        <div className="pt-2 lg:pt-1">
                          <button
                            type="submit"
                            className="w-full bg-[#8D9981] hover:bg-white text-black font-sans text-xs font-bold uppercase tracking-[0.2em] py-4 lg:py-2.5 xl:py-3.5 2xl:py-4 rounded-[4px] cursor-pointer shadow-lg hover:shadow-[0_20px_45px_rgba(141,153,129,0.35)] transition-all duration-300"
                          >
                            Authorize & Lodge Consultation Request
                          </button>
                        </div>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                 /* Success View State */
                <motion.div
                  key="success-form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", damping: 25 }}
                  className="space-y-8 py-10 text-center flex flex-col items-center justify-center h-full"
                >
                  <div className="w-16 h-16 bg-[#8D9981]/15 border border-[#8D9981]/30 rounded-full flex items-center justify-center text-[#8D9981] shrink-0">
                    <CheckCircle className="w-8 h-8 stroke-[1.5]" />
                  </div>

                  <div className="space-y-3">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#8D9981] font-bold block">Lodge Successful</span>
                    <h3 className="text-white text-2xl sm:text-3xl font-bold font-serif">Awaiting Atelier Clearance</h3>
                    <p className="text-stone-400 text-xs sm:text-xs max-w-md mx-auto leading-relaxed">
                      Thank you, <span className="text-white font-semibold">{formData.firstName} {formData.lastName}</span>. Your private <b className="text-[#8D9981]">{formData.selectedSpace}</b> millwork blueprint request has been successfully registered on our servers for <span className="text-[#8D9981] font-mono font-semibold">{formData.appointmentDate}</span>. Our Chief Estimator will contact your coordinates within 24 hours to clear blueprints.
                    </p>
                  </div>

                  <div className="bg-[#0b0b0b] border border-white/5 p-5 rounded-2xl w-full max-w-md text-left font-sans text-xs space-y-3 shadow-inner">
                    <div className="flex justify-between border-b border-white/[0.04] pb-2 text-stone-500 font-mono text-[10px]">
                      <span>TRANSACTION REFERENCE</span>
                      <span className="text-[#8D9981]">AMG-2026-064{Math.floor(Math.random() * 90) + 10}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Registered Email:</span>
                      <span className="text-white font-medium">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Secure Line:</span>
                      <span className="text-white font-medium">{formData.phone}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Target Segment:</span>
                      <span className="text-[#8D9981] font-medium font-mono text-[11px]">{formData.selectedSpace}</span>
                    </div>
                    {formData.catalogOption && (
                      <div className="flex items-center gap-1.5 text-[#8D9981] text-[10px] uppercase font-bold pt-1.5">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>Catalog requested for delivery</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleReset}
                    className="bg-transparent text-stone-400 hover:text-white underline text-xs font-mono tracking-widest cursor-pointer mt-4"
                  >
                    Reset & Submit another Blueprint form
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Column: Atelier Contact Details & Map (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-12 lg:space-y-5 xl:space-y-6 2xl:space-y-12 text-left">
            
            {/* Atelier Contacts Card */}
            <div className="space-y-8 lg:space-y-4 xl:space-y-6 bg-[#070707] border border-white/[0.04] p-8 sm:p-10 lg:p-5 xl:p-7 2xl:p-10 rounded-[2.5rem] relative overflow-hidden flex-grow shadow-2xl">
              <span className="text-[10px] uppercase tracking-widest text-[#8D9981] font-bold block">
                Atelier Directory
              </span>
              <h3 className="text-white text-2xl lg:text-lg xl:text-xl 2xl:text-2xl font-bold font-sans tracking-tight">Our Global Coordinates</h3>
              <div className="h-[1px] w-12 bg-white/10" />

              <div className="space-y-6 lg:space-y-4 xl:space-y-5 2xl:space-y-6">
                
                {/* Copenhagen Headquarters */}
                <div className="flex gap-4 lg:gap-3 items-start">
                  <div className="w-10 h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-xl bg-[#8D9981]/15 border border-[#8D9981]/25 flex items-center justify-center text-[#8D9981] shrink-0">
                    <MapPin className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8D9981] font-bold block">Copenhagen HQ</span>
                    <strong className="text-white text-sm lg:text-xs xl:text-sm font-sans block mt-1">ANAAMII Millwork Group ApS</strong>
                    <p className="text-stone-450 text-xs lg:text-[11px] xl:text-xs font-light mt-0.5 leading-relaxed">Amaliengade 32C, Copenhagen K, 1256 Denmark</p>
                    <span className="text-stone-500 font-mono text-[9px] mt-1 block">Coordinate: 55.6761° N, 12.5683° E</span>
                  </div>
                </div>

                {/* Munich Showroom Loft */}
                <div className="flex gap-4 lg:gap-3 items-start">
                  <div className="w-10 h-10 lg:w-9 lg:h-9 xl:w-10 xl:h-10 rounded-xl bg-[#8D9981]/15 border border-[#8D9981]/25 flex items-center justify-center text-[#8D9981] shrink-0">
                    <MapPin className="w-4 h-4 lg:w-3.5 lg:h-3.5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#8D9981] font-bold block">Munich Atelier</span>
                    <strong className="text-white text-sm lg:text-xs xl:text-sm font-sans block mt-1">Staatliche Millwork Loft</strong>
                    <p className="text-stone-450 text-xs lg:text-[11px] xl:text-xs font-light mt-0.5 leading-relaxed">Prinzregentenstraße 12, 80538 Munich, Germany</p>
                  </div>
                </div>

                {/* Secure Connections */}
                <div className="border-t border-white/[0.05] pt-6 lg:pt-4 xl:pt-5 2xl:pt-6 space-y-4 lg:space-y-2 xl:space-y-3.5 2xl:space-y-4">
                  <div className="flex gap-3 items-center text-stone-300 hover:text-white transition-colors">
                    <Phone className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-[#8D9981] shrink-0" />
                    <span className="text-xs sm:text-sm lg:text-xs xl:text-sm font-mono tracking-wide">+45 88 43 21 00</span>
                  </div>
                  <div className="flex gap-3 items-center text-stone-300 hover:text-white transition-colors">
                    <Mail className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-[#8D9981] shrink-0" />
                    <span className="text-xs sm:text-sm lg:text-xs xl:text-sm font-mono tracking-wide">atelier@anaamii.com</span>
                  </div>
                  <div className="flex gap-3 items-center text-stone-300 font-sans">
                    <Clock className="w-4 h-4 lg:w-3.5 lg:h-3.5 text-[#8D9981] shrink-0" />
                    <span className="text-xs lg:text-[11px] xl:text-xs font-light">Monday to Friday: 09:00 — 17:00 (CET)</span>
                  </div>
                </div>

              </div>
            </div>

            {/* EMBEDDED HIGH QUALITY AESTHETIC MAP GRAPHIC REPRESENTATION */}
            <div className="bg-[#070707] border border-white/[0.04] p-5 lg:p-4 xl:p-5 rounded-[2.5rem] relative overflow-hidden group aspect-[16/10] sm:aspect-[2/1] lg:aspect-[2.3/1] xl:aspect-[2/1] 2xl:aspect-[16/10] shadow-xl flex flex-col justify-center">
              {/* Radial gradient representing clean Swiss architectural planning grids */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:20px_20px] opacity-100 pointer-events-none" />
              <div className="absolute inset-0 bg-stone-950/40 pointer-events-none z-0" />

              {/* Glowing Coordinate Dot center */}
              <div className="relative z-10 flex flex-col items-center justify-center text-center p-4 lg:p-2 xl:p-4">
                <div className="w-10 h-10 lg:w-8 lg:h-8 xl:w-10 xl:h-10 rounded-full bg-[#8D9981]/15 border border-[#8D9981]/30 flex items-center justify-center relative animate-pulse mb-3 lg:mb-2 xl:mb-3">
                  <div className="w-3 animate-ping absolute inset-0 rounded-full bg-[#8D9981]/10 border border-[#8D9981]/20" />
                  <MapPin className="w-5 h-5 lg:w-4 lg:h-4 xl:w-5 xl:h-5 text-[#8D9981] absolute animate-bounce" />
                </div>
                
                <h4 className="text-white text-xs lg:text-[10px] xl:text-xs font-bold uppercase tracking-widest leading-none font-sans">Amaliengade CorridorHQ</h4>
                <p className="text-stone-400 font-mono text-[9.5px] lg:text-[8px] xl:text-[9.5px] mt-1.5 uppercase tracking-wider">Copenhagen Hub • Closed Cabinet Vaults</p>
                
                <div className="h-[1px] w-20 bg-stone-800 my-3 lg:my-2" />
                
                <span className="text-[#8D9981] font-mono text-[9px] tracking-widest font-bold">55.6885° N, 12.5936° E</span>
              </div>

              {/* Edge Map Accents */}
              <div className="absolute bottom-4 right-4 text-white/30 font-mono text-[8.5px] tracking-widest hidden xl:block">MAP COORDINATES GRID 4.0</div>
              <div className="absolute top-4 left-4 text-[#8D9981]/55 font-mono text-[8.5px] tracking-widest flex items-center gap-1.5 uppercase font-bold">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Local server online</span>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 3. Luxury NDA Confidentiality Footer Stripe */}
      <section className="w-full py-10 bg-[#090909] border-t border-white/[0.04]">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-3">
          <ShieldCheck className="w-7 h-7 text-[#8D9981]" />
          <h4 className="text-white text-xs font-bold uppercase tracking-widest">Private Consultant Non-Disclosure commitment</h4>
          <p className="text-stone-500 text-[11px] font-light max-w-xl leading-relaxed">
            All blueprints, architectural plans, dimensional parameters, personal coordinate addresses, and design correspondence remain highly guarded secrets. ANAAMII maintains double-layer data encryption standards and strictly honors general non-disclosure stipulations.
          </p>
        </div>
      </section>
    </div>
  );
}
