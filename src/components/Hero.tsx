import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Play, Pause, ArrowRight, ChevronDown, Sparkles, Volume2, VolumeX } from "lucide-react";
import { VIDEO_SCENES } from "../constants";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onExploreClick?: () => void;
  onWishlistInc?: () => void;
}

export default function Hero({ onExploreClick, onWishlistInc }: HeroProps) {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videosReady, setVideosReady] = useState<{ [key: string]: boolean }>({});
  const [scrollProgress, setScrollProgress] = useState(0);

  const heroContainerRef = useRef<HTMLDivElement>(null);
  const titleGroupRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const controllersRef = useRef<HTMLDivElement>(null);
  const indicatorsRef = useRef<HTMLDivElement>(null);

  // References to background video players
  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({});

  const currentScene = VIDEO_SCENES[activeSceneIndex];

  const isMountedRef = useRef(true);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Keep track of the current scene index inside refs so ScrollTrigger can read it safely without recreating
  const activeSceneIndexRef = useRef(activeSceneIndex);
  useEffect(() => {
    activeSceneIndexRef.current = activeSceneIndex;
  }, [activeSceneIndex]);

  // Handle play/pause action
  const togglePlay = () => {
    const nextPlayState = !isPlaying;
    setIsPlaying(nextPlayState);

    const video = videoRefs.current[currentScene.id];
    if (video) {
      if (nextPlayState) {
        video.play().catch((err) => console.log("Video playback paused/interrupted", err));
      } else {
        video.pause();
      }
    }
  };

  // Toggle ambient volume audio levels
  const toggleMute = () => {
    const nextMutedState = !isMuted;
    setIsMuted(nextMutedState);

    VIDEO_SCENES.forEach((scene) => {
      const video = videoRefs.current[scene.id];
      if (video) {
        video.muted = nextMutedState;
      }
    });
  };

  // Prevent flickers by setting a loaded state
  const handleVideoLoaded = (id: string) => {
    setVideosReady((prev) => ({ ...prev, [id]: true }));
  };

  // Swap active video scene with safe scroll coordinates
  const selectScene = (index: number) => {
    if (index === activeSceneIndex) return;

    // Calculate position mapping
    const targetProgress = index === 0 ? 0 : index === 1 ? 0.52 : 0.95;
    const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

    window.scrollTo({
      top: totalScroll * targetProgress,
      behavior: "smooth"
    });
  };

  // Sync stateful play actions for the video elements
  useEffect(() => {
    VIDEO_SCENES.forEach((scene, index) => {
      const video = videoRefs.current[scene.id];
      if (video) {
        if (index === activeSceneIndex) {
          if (isPlaying) {
            video.play().catch((err) => console.log("Auto play prevented", err));
          } else {
            video.pause();
          }
        } else {
          video.pause(); // Hibernate inactive backdrop layers to optimize resources
        }
      }
    });
  }, [activeSceneIndex, isPlaying]);

  // Entrance timelines for active component texts (Triggered automatically when activeSceneIndex changes)
  useEffect(() => {
    if (!subtitleRef.current || !headingRef.current || !buttonGroupRef.current) return;

    const ctx = gsap.context(() => {
      gsap.killTweensOf([subtitleRef.current, headingRef.current, buttonGroupRef.current]);

      gsap.set([subtitleRef.current, headingRef.current, buttonGroupRef.current], {
        opacity: 0,
        y: 45,
      });

      const entranceTl = gsap.timeline({ delay: 0.05 });
      
      entranceTl
        .to(subtitleRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .to(
          headingRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.5"
        )
        .to(
          buttonGroupRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.5"
        );
    });

    return () => ctx.revert();
  }, [activeSceneIndex]);

  // Fade action on indicators & overlays at load time
  useEffect(() => {
    if (!indicatorsRef.current || !controllersRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([indicatorsRef.current, controllersRef.current], {
        opacity: 0,
        y: 20,
      });

      gsap.to([indicatorsRef.current, controllersRef.current], {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.6,
      });
    });

    return () => ctx.revert();
  }, []);

  // MASTER SCROLLTRIGGER:
  // Dynamically monitors page scrolls to determine active video segment and updates progress tracker.
  useEffect(() => {
    const container = heroContainerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // Pin the container for +=220% of the viewport height to accommodate distinct scrolling sections for each video
      ScrollTrigger.create({
        trigger: container,
        start: "top top",
        end: "+=220%",
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!isMountedRef.current) return;
          const progress = self.progress; // ranges from 0 to 1
          setScrollProgress(progress);

          // Map scroll percentage to three distinct scene sections
          let targetIndex = 0;
          if (progress > 0.35 && progress <= 0.70) {
            targetIndex = 1;
          } else if (progress > 0.70) {
            targetIndex = 2;
          }

          // Trigger safe transition only when the domain crosses the boundary
          if (targetIndex !== activeSceneIndexRef.current && isMountedRef.current) {
            activeSceneIndexRef.current = targetIndex;

            if (subtitleRef.current && headingRef.current && buttonGroupRef.current) {
              gsap.timeline()
                .to([subtitleRef.current, headingRef.current, buttonGroupRef.current], {
                  opacity: 0,
                  y: -25,
                  stagger: 0.05,
                  duration: 0.3,
                  ease: "power2.inOut",
                  onComplete: () => {
                    if (isMountedRef.current) {
                      setActiveSceneIndex(targetIndex);
                    }
                  }
                });
            } else {
              if (isMountedRef.current) {
                setActiveSceneIndex(targetIndex);
              }
            }
          }
        },
      });

      ScrollTrigger.refresh();
    });

    return () => {
      ctx.revert();
    };
  }, []); // Run only on mount to prevent scroll jitter and coordinate with React state updates seamlessly

  return (
    <section
      ref={heroContainerRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden bg-stone-950 flex flex-col justify-between"
    >
      {/* 1. Cinematic Background Video Frame Grid */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        {VIDEO_SCENES.map((scene, idx) => {
          const isActive = idx === activeSceneIndex;
          const isReady = videosReady[scene.id];

          return (
            <div
              key={scene.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                isActive ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              {/* High resolution backdrop image while loading */}
              <img
                src={scene.poster}
                alt={scene.title}
                className={`absolute inset-0 w-full h-full object-cover filter brightness-[0.4] transition-opacity duration-1000 ease-in-out ${
                  isReady ? "opacity-0" : "opacity-100"
                }`}
                style={{ transform: isActive ? "scale(1.02)" : "scale(1)" }}
              />

              {/* Loop Cover cinematic MP4 stream */}
              <video
                ref={(el) => { videoRefs.current[scene.id] = el; }}
                className={`absolute inset-0 w-full h-full object-cover filter brightness-[0.4] saturate-[0.8] transition-transform duration-[12s] ease-out ${
                  isReady ? "opacity-100" : "opacity-0"
                }`}
                style={{ transform: isActive && isPlaying ? "scale(1.04)" : "scale(1.01)" }}
                src={scene.url}
                loop
                muted={isMuted}
                playsInline
                autoPlay={isActive}
                onLoadedData={() => handleVideoLoaded(scene.id)}
                onPlay={() => handleVideoLoaded(scene.id)}
              />
            </div>
          );
        })}

        {/* Ambient Dark Overlay to keep high text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/10 to-black/40 z-20 pointer-events-none" />
      </div>

      {/* Top Margin Spacer */}
      <div className="h-20 sm:h-28 flex-shrink-0" />

      {/* 2. Hero Context Alignment */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 flex-grow flex items-end pb-32">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Symmetrical Left Empty Space */}
          <div className="hidden lg:block lg:col-span-3" />

          {/* Right Text Block (Right text aligned) */}
          <div ref={titleGroupRef} className="lg:col-span-9 flex flex-col items-end text-right">
            
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
              {currentScene.subtitle}
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
              {currentScene.heading}
            </h1>

            {/* Premium CTA Button Pack */}
            <div
              ref={buttonGroupRef}
              className="flex flex-row flex-wrap justify-end items-center gap-4 w-full sm:w-auto"
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
                  {activeSceneIndex === 0 ? "Explore the axo dining series" : activeSceneIndex === 1 ? "Explore the nordic kitchen series" : "Explore the skagen lounge series"}
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
                  {activeSceneIndex === 0 ? "Read more about Danish dining" : activeSceneIndex === 1 ? "Read more about Danish design" : "Read more about Danish interior"}
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

      {/* 3. Bottom Controls Bar: Swapping, Volume options & Playback status */}
      <div className="absolute bottom-0 left-0 w-full z-30 bg-gradient-to-t from-stone-950/90 to-transparent pt-12 pb-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Slider Scene Selectors */}
          <div ref={indicatorsRef} className="flex items-center gap-3 sm:gap-6">
            {VIDEO_SCENES.map((scene, idx) => {
              const isActive = idx === activeSceneIndex;

              // Compute custom scrollbar percentage fill for physical indicator feedback
              let barWidthPercentage = 0;
              if (idx === 0) {
                if (scrollProgress >= 0.35) {
                  barWidthPercentage = 100;
                } else {
                  barWidthPercentage = (scrollProgress / 0.35) * 100;
                }
              } else if (idx === 1) {
                if (scrollProgress < 0.35) {
                  barWidthPercentage = 0;
                } else if (scrollProgress >= 0.70) {
                  barWidthPercentage = 100;
                } else {
                  barWidthPercentage = ((scrollProgress - 0.35) / 0.35) * 100;
                }
              } else if (idx === 2) {
                if (scrollProgress < 0.70) {
                  barWidthPercentage = 0;
                } else {
                  barWidthPercentage = ((scrollProgress - 0.70) / 0.30) * 100;
                }
              }

              return (
                <button
                  key={scene.id}
                  onClick={() => selectScene(idx)}
                  className="group flex flex-col items-start text-left focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <span
                      className={`text-[9px] font-mono tracking-widest transition-colors ${
                        isActive ? "text-white font-semibold" : "text-white/40 group-hover:text-white/75"
                      }`}
                    >
                      0{idx + 1}
                    </span>
                    <span
                      className={`text-[10px] uppercase font-sans tracking-[0.15em] transition-colors ${
                        isActive ? "text-white font-semibold" : "text-white/40 group-hover:text-white/75"
                      }`}
                    >
                      {scene.title.split(" ")[0]}
                    </span>
                  </div>
                  
                  {/* Tactical scroll progress filler line */}
                  <div className="w-14 sm:w-24 h-[2px] bg-white/10 rounded-full relative overflow-hidden">
                    <div
                      className="absolute top-0 left-0 h-full bg-white transition-all duration-300 ease-out"
                      style={{ width: `${barWidthPercentage}%` }}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Options Box */}
          <div ref={controllersRef} className="flex items-center justify-between md:justify-end gap-6">
            
            {/* Scroll Indication */}
            <div className="hidden lg:flex items-center gap-1.5 text-white/40 text-[9px] uppercase tracking-[0.2em] select-none">
              <Sparkles className="w-3 h-3 text-amber-100/30 animate-pulse" />
              <span>Scroll down to reveal next video segment</span>
              <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
            </div>

            {/* Mute toggle icon */}
            <button
              onClick={toggleMute}
              className="p-3 rounded-[4px] bg-[#000000]/40 border border-white/10 hover:border-white/30 text-white/70 hover:text-white backdrop-blur-md hover:scale-105 cursor-pointer transition-all duration-300 flex items-center justify-center shadow-lg"
              title={isMuted ? "Unmute Ambient Sound" : "Mute Sound"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-amber-100" />}
            </button>

            {/* High-fidelity circle play/pause control */}
            <button
              onClick={togglePlay}
              className="px-5 py-3 rounded-[4px] bg-white text-stone-950 font-sans text-[10px] font-bold uppercase tracking-widest hover:scale-105 cursor-pointer shadow-lg transition-transform duration-300 flex items-center gap-1.5"
              title={isPlaying ? "Pause background active video play" : "Play backdrop videoloop"}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3 h-3 text-stone-950 fill-stone-950" />
                  <span>Pause Loop</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-stone-950 fill-stone-950" />
                  <span>Play Loop</span>
                </>
              )}
            </button>

          </div>

        </div>
      </div>
    </section>
  );
}
