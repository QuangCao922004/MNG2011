"use client";

import React from "react";
import { Heart, Flower2, Sparkles, ArrowUp } from "lucide-react";
import { triggerFireworks } from "@/lib/confetti";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 relative overflow-hidden border-t-4 border-rose-500">
      
      {/* Background glowing circles */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-stone-800">
          
          {/* Brand & Dedication */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 to-amber-400 p-0.5 flex items-center justify-center">
                <div className="w-full h-full bg-stone-900 rounded-full flex items-center justify-center">
                  <Flower2 className="w-5 h-5 text-rose-400" />
                </div>
              </div>
              <span className="font-playfair text-2xl font-bold text-white">
                Cô Ma Ngân Giang
              </span>
            </div>

            <p className="text-stone-400 text-sm max-w-md leading-relaxed">
              Trang web đặc biệt tri ân Ngày Nhà Giáo Việt Nam 20/11. Kính chúc cô Ma Ngân Giang luôn dồi dào sức khỏe, tràn ngập hạnh phúc, gặt hái ngàn vạn thành công và mãi luôn trẻ trung, xinh đẹp!
            </p>

            <div className="pt-2">
              <button
                onClick={() => triggerFireworks()}
                className="px-4 py-2 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 text-xs font-semibold border border-rose-500/40 transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bắn pháo hoa chúc mừng cô</span>
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Chuyên Mục</h4>
            <ul className="space-y-2 text-sm text-stone-400">
              <li><a href="#hero" className="hover:text-rose-400 transition-colors">Lời Chào Tri Ân</a></li>
              <li><a href="#about" className="hover:text-rose-400 transition-colors">Về Cô Giang (HCMUE)</a></li>
              <li><a href="#journey" className="hover:text-rose-400 transition-colors">Hành Trình Thanh Xuân</a></li>
              <li><a href="#gallery" className="hover:text-rose-400 transition-colors">Bộ Sưu Tập Kỷ Niệm</a></li>
              <li><a href="#letter" className="hover:text-rose-400 transition-colors">Tâm Thư 20/11</a></li>
              <li><a href="#wishes" className="hover:text-rose-400 transition-colors">Sổ Lưu Bút</a></li>
            </ul>
          </div>

          {/* Teacher's Day Quote */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider">Thông Điệp 20/11</h4>
            <blockquote className="p-4 rounded-2xl bg-stone-800/80 border border-stone-700 text-xs sm:text-sm italic text-stone-300 leading-relaxed">
              &quot;Người thầy bình thường giải thích, người thầy tốt chứng minh, người thầy vĩ đại truyền cảm hứng.&quot;
              <span className="block not-italic font-semibold text-rose-400 text-xs mt-2">— William Arthur Ward</span>
            </blockquote>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p className="flex items-center gap-1.5 text-center sm:text-left">
            <span>Thiết kế &amp; Tri ân gửi tặng Cô Ma Ngân Giang với tất cả tình cảm</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 inline" />
          </p>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs transition-colors"
          >
            <span>Lên đầu trang</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}

