import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import JourneySection from "@/components/JourneySection";
import GallerySection from "@/components/GallerySection";
import LetterSection from "@/components/LetterSection";
import CakeSection from "@/components/CakeSection";
import WishesSection from "@/components/WishesSection";
import Footer from "@/components/Footer";
import MusicPlayer from "@/components/MusicPlayer";

export default function Home() {
  return (
    <main className="min-h-screen relative bg-[#fffdfb]">
      {/* Navigation Header */}
      <Navbar />

      {/* Hero Presentation */}
      <HeroSection />

      {/* About Section - HCMUE & Teacher Dedication */}
      <AboutSection />

      {/* Journey Section - Youth, Growth & Ageless Glow */}
      <JourneySection />

      {/* Gallery Section - All 7 Photos with Lightbox */}
      <GallerySection />

      {/* Interactive Letter / Card Section */}
      <LetterSection />

      {/* Interactive Virtual 20/11 Cake */}
      <CakeSection />

      {/* Guestbook & Wishes Wall */}
      <WishesSection />

      {/* Footer */}
      <Footer />

      {/* Background Soothing Piano Music Player */}
      <MusicPlayer />
    </main>
  );
}

