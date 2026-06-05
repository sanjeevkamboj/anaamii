import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { VIDEO_SCENES } from "../constants";

interface HeroProps {
  onExploreClick?: () => void;
  onWishlistInc?: () => void;
}

export default function Hero({ onExploreClick, onWishlistInc }: HeroProps) {
  const [videoReady, setVideoReady] = useState(false);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const scene = VIDEO_SCENES[0]; // Keep only the primary premium video

  // Entrance timelines for texts
  useEffect(() => {
    if (!subtitleRef.current || !headingRef.current || !buttonGroupRef.current) return;

    const ctx = gsap.context(() => {
      gsap.killTweensOf([subtitleRef.current, headingRef.current, buttonGroupRef.current]);

      gsap.set([subtitleRef.current, headingRef.current, buttonGroupRef.current], {
        opacity: 0,
        y: 45,
      });

      const entranceTl = gsap.timeline({ delay: 0.1 });
      
      entranceTl
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: "power3.out",
        })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.1,
            ease: "power3.out",
          },
          "-=0.6"
        )
        .to(
          buttonGroupRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 1.0,
            ease: "power3.out",
          },
          "-=0.6"
        );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroContainerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-stone-950 flex flex-col justify-between"
    >
      {/* 1. Cinematic Background Video Frame */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <div className="absolute inset-0 w-full h-full opacity-100 z-10 animate-fade-in">
          {/* High resolution backdrop image while loading */}
          <img
            src={scene.poster}
            alt={scene.title}
            className={`absolute inset-0 w-full h-full object-cover filter brightness-[0.65] transition-opacity duration-1000 ease-in-out ${
              videoReady ? "opacity-0" : "opacity-100"
            }`}
            style={{ transform: "scale(1.02)" }}
          />

          {/* Autoplay premium background video */}
          <video
            ref={videoRef}
            className={`absolute inset-0 w-full h-full object-cover filter brightness-[0.65] saturate-[0.9] transition-opacity duration-1000 ease-in-out`}
            style={{ transform: "scale(1.04)" }}
            src={scene.url}
            loop
            muted
            playsInline
            autoPlay
            onLoadedData={() => setVideoReady(true)}
            onPlay={() => setVideoReady(true)}
          />
        </div>

        {/* Ambient Dark Overlay to keep high text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-stone-900/5 to-black/20 z-20 pointer-events-none" />
      </div>

      {/* Top Margin Spacer */}
      <div className="h-20 sm:h-28 flex-shrink-0" />

      {/* 2. Hero Context Alignment */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex items-end pb-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Symmetrical Left Empty Space */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* Right Text Block (Right text aligned) */}
          <div className="lg:col-span-9 flex flex-col items-end text-right">
            
            {/* Fine Subtitle */}
            <p
              ref={subtitleRef}
              className="text-[#f5f2ed] mb-4 text-right"
              style={{
                fontSize: "max(1.375rem, min(.63452vw + .96891rem, 2rem))",
                fontFamily: "var(--font-baskerville)",
                letterSpacing: "-.02em",
                fontWeight: 400,
                lineHeight: "94%",
              }}
            >
              {scene.subtitle}
            </p>

            {/* Giant Bold Luxury Headline */}
            <h1
              ref={headingRef}
              className="text-white mb-8 max-w-4xl text-right"
              style={{
                fontSize: "max(2.25rem, min(1.77665vw + 1.11294rem, 4rem))",
                fontFamily: "var(--font-helvetica)",
                letterSpacing: "-.035em",
                fontWeight: 700,
                lineHeight: "100%",
                textShadow: "0 4px 30px rgba(0,0,0,0.6)",
              }}
            >
              {scene.heading}
            </h1>

            {/* Premium CTA Button Pack */}
            <div
              ref={buttonGroupRef}
              className="flex flex-row flex-wrap justify-end items-center gap-4 w-full sm:w-auto mt-2"
            >
              {/* Premium Button 1: Solid Light */}
              <button
                id="btn-main"
                onClick={onExploreClick}
                className="group relative inline-flex items-center justify-center gap-3 bg-[#f5f2ed] border border-[#f5f2ed] text-[#000000] cursor-pointer hover:bg-white hover:border-white transition-all duration-300 w-full sm:w-auto text-center"
                style={{
                  paddingLeft: "20px",
                  paddingRight: "16px",
                  fontSize: "14px",
                  lineHeight: "40px",
                  height: "42px",
                  fontFamily: "var(--font-helvetica)",
                  borderRadius: "4px",
                }}
              >
                <span className="font-sans font-medium text-[#000000]">
                  Explore the axo dining series
                </span>
                <div className="w-5 h-5 rounded-full border border-stone-300 flex items-center justify-center transition-transform group-hover:scale-105 overflow-hidden">
                  <div className="arrow-slide-container">
                    <ArrowRight className="arrow-1 w-3 h-3 text-[#000000]" />
                    <ArrowRight className="arrow-2 w-3 h-3 text-[#000000]" />
                  </div>
                </div>
              </button>

              {/* Premium Button 2: Curated Outline */}
              <button
                id="btn-sub"
                onClick={onWishlistInc}
                className="group inline-flex items-center justify-center gap-3 bg-transparent border border-white/50 text-white cursor-pointer hover:border-white hover:bg-white/5 transition-all duration-300 w-full sm:w-auto text-center"
                style={{
                  paddingLeft: "20px",
                  paddingRight: "16px",
                  fontSize: "14px",
                  lineHeight: "40px",
                  height: "42px",
                  fontFamily: "var(--font-helvetica)",
                  borderRadius: "4px",
                }}
              >
                <span className="font-sans font-medium text-white">
                  Read more about Danish dining
                </span>
                <div className="w-5 h-5 rounded-full border border-white/30 flex items-center justify-center transition-colors group-hover:border-white/60 group-hover:scale-105 overflow-hidden">
                  <div className="arrow-slide-container">
                    <ArrowRight className="arrow-1 w-3 h-3 text-white" />
                    <ArrowRight className="arrow-2 w-3 h-3 text-white" />
                  </div>
                </div>
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
