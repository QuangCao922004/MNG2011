"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, Heart, Award, BookOpen, Send, Calendar, CheckCircle2 } from "lucide-react";
import { triggerFireworks, triggerHeartBurst } from "@/lib/confetti";
import { assetPath } from "@/lib/assets";

export default function HeroSection() {
  const [likes, setLikes] = useState(1120);
  const [liked, setLiked] = useState(false);

  const handleHeartClick = () => {
    triggerHeartBurst();
    if (!liked) {
      setLikes((prev) => prev + 1);
      setLiked(true);
    } else {
      setLikes((prev) => prev + 1);
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-[92vh] pt-28 pb-16 flex items-center justify-center overflow-hidden bg-gradient-to-b from-rose-50/80 via-amber-50/40 to-white"
    >
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-rose-200/40 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-teal-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-amber-200/30 rounded-full blur-2xl pointer-events-none" />

      {/* Floating Petals / sparkles decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-[10%] text-2xl animate-float-slow opacity-60">🌸</div>
        <div className="absolute top-1/2 left-[5%] text-xl animate-float-slow [animation-delay:2s] opacity-60">✨</div>
        <div className="absolute top-1/3 right-[8%] text-3xl animate-float-slow [animation-delay:1.5s] opacity-70">🌺</div>
        <div className="absolute bottom-20 right-[15%] text-2xl animate-float-slow [animation-delay:3s] opacity-60">💐</div>
        <div className="absolute bottom-32 left-[18%] text-xl animate-float-slow [animation-delay:2.5s] opacity-50">💖</div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Greeting & Typography */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-100/80 border border-rose-200 text-rose-700 text-xs sm:text-sm font-semibold tracking-wide shadow-sm animate-fade-in">
              <Sparkles className="w-4 h-4 text-rose-500 animate-spin" style={{ animationDuration: "6s" }} />
              <span>KỶ NIỆM NGÀY NHÀ GIÁO VIỆT NAM 20/11</span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline font-bold">TRI ÂN CÔ GIÁO</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.18]">
              Kính Chúc Cô{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
                  Ma Ngân Giang
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-400 to-amber-300 rounded-full opacity-80" />
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl font-medium text-stone-800 mt-2 block font-playfair">
                Vạn Sự Thành Công &amp; Mãi Trẻ Đẹp!
              </span>
            </h1>

            {/* Subtitle / Heartfelt Quote */}
            <p className="text-base sm:text-lg text-stone-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Nhân dịp <strong className="text-rose-600 font-semibold">20/11</strong>, kính chúc cô một ngày lễ ngập tràn niềm vui, hoa và nụ cười. 
              Cảm ơn cô vì sự tận tụy, trái tim nhiệt huyết và năng lượng tươi trẻ đầy tích cực mà cô luôn trao gửi đến cuộc đời và các thế hệ học trò.
            </p>

            {/* Quick Feature Badges */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-50 text-teal-800 text-xs font-medium border border-teal-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                Tâm Huyết &amp; Sáng Tạo
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-50 text-rose-800 text-xs font-medium border border-rose-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-rose-600" />
                Luôn Trẻ Trung &amp; Rạng Rỡ
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 text-xs font-medium border border-amber-200">
                <CheckCircle2 className="w-3.5 h-3.5 text-amber-600" />
                Sự Nghiệp Thăng Hoa
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-4">
              <button
                onClick={() => triggerFireworks()}
                className="px-6 py-3.5 rounded-full bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white font-semibold text-sm sm:text-base shadow-lg shadow-rose-300/60 hover:shadow-rose-400/80 transition-all hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2 group"
              >
                <Sparkles className="w-5 h-5 text-amber-200 group-hover:rotate-45 transition-transform" />
                <span>Bắn Pháo Hoa Chúc Mừng 🎊</span>
              </button>

              <button
                onClick={handleHeartClick}
                className="px-5 py-3.5 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-semibold text-sm sm:text-base border border-rose-200 shadow-md hover:shadow-rose-100 transition-all flex items-center gap-2 hover:scale-105 active:scale-95"
              >
                <Heart className={`w-5 h-5 fill-rose-500 text-rose-500 transition-transform ${liked ? "scale-125" : ""}`} />
                <span>Thả Tim ({likes})</span>
              </button>

              <a
                href="#letter"
                className="px-5 py-3.5 rounded-full bg-amber-100/80 hover:bg-amber-200 text-amber-900 font-semibold text-sm sm:text-base transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-amber-700" />
                <span>Xem Bức Thư Tri Ân</span>
              </a>
            </div>

          </div>

          {/* Right Column: Hero Visual Portrait */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Glowing ring backdrop */}
              <div className="absolute inset-0 bg-gradient-to-tr from-rose-400 via-amber-300 to-teal-400 rounded-3xl blur-2xl opacity-40 animate-pulse-glow" />

              {/* Main Photo Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
                {/* Square, because the commemorative frame is 1:1. The previous
                    asset was a 1284x2778 export with black bars top and bottom, so a
                    3/4 box showed 744px of black and cut 316px off the frame. */}
                <div className="relative aspect-square w-full overflow-hidden">
                  <Image
                    src={assetPath("/images/co-giang-50-nam.jpg")}
                    alt="Cô Ma Ngân Giang - ĐH Sư Phạm TP.HCM"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                </div>

                {/* Caption sits below the artwork: the frame already prints its own
                    text along the top and bottom, so nothing is laid over it. */}
                <div className="p-5 bg-gradient-to-r from-teal-900 to-blue-900 text-white">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-xs font-medium mb-1.5">
                    ĐH Sư Phạm TP.HCM • HCMUE
                  </div>
                  <h3 className="font-playfair text-xl font-bold leading-tight">
                    Cô Ma Ngân Giang
                  </h3>
                  {/* No quote line here: the artwork already prints
                      "CHẤT LƯỢNG - SÁNG TẠO - NHÂN VĂN" along its own arc, and the
                      repeated line collided with the floating badge. */}
                </div>
              </div>

              {/* Floating Badge 1: 20/11 Special */}
              <div className="absolute -top-4 -right-4 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-rose-100 flex items-center gap-3 animate-float-slow">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-pink-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  20/11
                </div>
                <div>
                  <p className="text-xs text-stone-500 uppercase tracking-wider font-semibold">Ngày Nhà Giáo</p>
                  <p className="text-sm font-bold text-stone-900">Tri Ân &amp; Yêu Thương</p>
                </div>
              </div>

              {/* Floating Badge 2: Timeless Charm — bottom-RIGHT so it clears the
                  left-aligned caption text underneath the artwork. */}
              <div className="absolute -bottom-5 -right-5 bg-white/95 backdrop-blur-md rounded-2xl p-3 shadow-xl border border-rose-100 flex items-center gap-3 animate-float-slow [animation-delay:2s]">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white shadow-md">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-amber-700 font-semibold uppercase">Lời Chúc Đặc Biệt</p>
                  <p className="text-sm font-bold text-stone-900">Mãi Xinh Đẹp &amp; Tươi Trẻ</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

