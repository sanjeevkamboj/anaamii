import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import ServicesSection from "./components/ServicesSection";
import PremiumShowcase from "./components/PremiumShowcase";
import ProjectsSection from "./components/ProjectsSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactCTA from "./components/ContactCTA";
import Footer from "./components/Footer";

// Immersive Dedicated Views
import AboutView from "./components/AboutView";
import ServicesView from "./components/ServicesView";
import ProjectsView from "./components/ProjectsView";
import ContactView from "./components/ContactView";
import ErrorBoundary from "./components/ErrorBoundary";

export default function App() {
  const [wishlistCount, setWishlistCount] = useState(0);
  const [currentPage, setCurrentPage] = useState<string>("home");

  const handleIncrementWishlist = () => {
    setWishlistCount((prev) => prev + 1);
  };

  const handlePageChange = (page: string) => {
    document.documentElement.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    setCurrentPage(page);
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = "";
    }, 50);
  };

  return (
    <div className="min-h-screen bg-[#000000] text-white overflow-x-hidden selection:bg-white/10 selection:text-white">
      {/* 1. Transparent absolute top header - present on all pages */}
      <Header 
        wishlistCount={wishlistCount} 
        currentPage={currentPage} 
        onPageChange={handlePageChange} 
      />

      {/* Main Dynamically Swapped Content */}
      <main className="w-full">
        <ErrorBoundary fallbackName="Main App View Switcher">
          {currentPage === "home" && (
            <>
              {/* 2. Fullscreen (100vh) Hero Banner with luxury text & cinematic video */}
              <Hero onWishlistInc={handleIncrementWishlist} />

              {/* 3. Luxury multi-scroll expanding horizontal services carousel */}
              <ServicesSection />

              {/* 4. Complete new full-width premium portfolio showcase section */}
              <PremiumShowcase />

              {/* 5. Custom premium masonry portfolio with interactive before/after metamorphosis popups */}
              <ProjectsSection />

              {/* 6. Luxury Client Reviews Slider section */}
              <TestimonialsSection />

              {/* 6.5. Elegant Pure White Contact CTA */}
              <ContactCTA />
            </>
          )}

          {currentPage === "about" && (
            <ErrorBoundary fallbackName="About View">
              <AboutView onPageChange={handlePageChange} />
            </ErrorBoundary>
          )}

          {currentPage === "services" && (
            <ErrorBoundary fallbackName="Services View">
              <ServicesView />
            </ErrorBoundary>
          )}

          {currentPage === "projects" && (
            <ErrorBoundary fallbackName="Projects View">
              <ProjectsView />
            </ErrorBoundary>
          )}

          {currentPage === "contact" && (
            <ErrorBoundary fallbackName="Contact View">
              <ContactView />
            </ErrorBoundary>
          )}
        </ErrorBoundary>
      </main>

      {/* 7. Beautiful high-contrast brand footer - present on all pages */}
      <Footer onPageChange={handlePageChange} />
    </div>
  );
}
