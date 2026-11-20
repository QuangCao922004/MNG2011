"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Heart, Menu, X, Flower2 } from "lucide-react";
import { triggerFireworks } from "@/lib/confetti";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Trang Đầu", href: "#hero" },
    { name: "Về Cô Giang", href: "#about" },
    { name: "Hành Trình & Kỷ Niệm", href: "#journey" },
    { name: "Góc Ảnh Rạng Rỡ", href: "#gallery" },
    { name: "Tâm Thư Tri Ân", href: "#letter" },
    { name: "Bánh Kem 20/11", href: "#cake" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-white/85 backdrop-blur-md shadow-sm py-3 border-b border-rose-100"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        <a href="#hero" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 shadow-md group-hover:scale-105 transition-transform shrink-0">
            <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
              <Flower2 className="w-5 h-5 text-rose-500 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div className="whitespace-nowrap">
            <span className="font-playfair text-lg sm:text-xl font-bold tracking-tight bg-gradient-to-r from-rose-700 via-rose-600 to-teal-700 bg-clip-text text-transparent block leading-tight">
              Cô Ma Ngân Giang
            </span>
            <span className="text-[11px] font-medium uppercase tracking-widest text-rose-500 block">
              Tri Ân 20/11 • HCMUE
            </span>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-7">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-stone-700 hover:text-rose-600 text-[13px] xl:text-sm font-medium whitespace-nowrap transition-colors relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-0.5 after:bg-rose-500 hover:after:w-full after:transition-all"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Action Button */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => triggerFireworks()}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap text-white bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 shadow-md hover:shadow-rose-200 transition-all hover:scale-105 active:scale-95"
          >
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>Chúc Mừng Cô 🎉</span>
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2 shrink-0">
          <button
            onClick={() => triggerFireworks()}
            className="p-2 rounded-full text-white bg-rose-500 shadow-sm"
            aria-label="Chúc mừng"
          >
            <Sparkles className="w-4 h-4" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-stone-700 hover:text-rose-600 focus:outline-none"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-rose-100 px-6 py-4 shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-stone-800 hover:text-rose-600 font-medium py-1.5 border-b border-stone-100 last:border-none text-base"
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

