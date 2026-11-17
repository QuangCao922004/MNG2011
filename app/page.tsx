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
import SmoothScroll from "@/components/SmoothScroll";
import MotionLetterExperience from "@/components/MotionLetterExperience";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function Home({ searchParams }: PageProps) {
  const params = await searchParams;

  // Special link triggers:
  // Examples:
  // http://localhost:3000/?to=giangma
  // http://localhost:3000/?letter=1
  // http://localhost:3000/?vip=1
  const isSpecialLink = Boolean(
    params.to ||
    params.letter ||
    params.vip ||
    params.for ||
    params.secret
  );

  return (
    <main className="min-h-screen relative bg-[#fffdfb]">
      {/* Smooth Inertia Scrolling */}
      <SmoothScroll />

      {/* Special Motion Graphic Letter Experience */}
      <MotionLetterExperience initialOpen={isSpecialLink} />

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
