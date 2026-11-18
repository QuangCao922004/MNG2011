"use client";

import React from "react";
import { Mail, Sparkles, Heart, Feather, Flower2 } from "lucide-react";
import { triggerHeartBurst } from "@/lib/confetti";
import { sfx } from "@/lib/audio";

/**
 * Gate back to the sealed letter.
 *
 * The letter itself lives in exactly one place (MotionLetterExperience). This
 * section deliberately does NOT reprint it: two near-identical letters on one
 * page reads as broken, and the whole point of this gift is the ritual of
 * breaking the wax seal.
 */
export default function LetterSection() {
  const reopen = () => {
    sfx.playSealBreak();
    triggerHeartBurst();
    window.dispatchEvent(new Event("open-motion-letter"));
  };

  return (
    <section id="letter" className="py-24 bg-gradient-to-b from-white via-rose-50/40 to-amber-50/30 relative overflow-hidden">

      {/* Decorative floral background */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 pointer-events-none select-none">🌹</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10 pointer-events-none select-none">🌸</div>
      <div className="absolute top-1/2 right-5 text-4xl opacity-15 pointer-events-none select-none animate-float-slow">✨</div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Header */}
        <div className="text-center mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-wider">
            <Feather className="w-3.5 h-3.5 text-rose-600" />
            <span>Tâm Thư Tri Ân</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Bức Thư Gửi Riêng Cô Ma Ngân Giang
          </h2>

          <p className="text-stone-600 text-base max-w-xl mx-auto">
            Bức thư đã được niêm phong bằng con dấu sáp 20·11. Con dấu vẫn còn nguyên — mời cô gỡ ra để đọc.
          </p>
        </div>

        {/* Sealed envelope invitation */}
        <div className="relative bg-[#fffdf9] rounded-3xl p-8 sm:p-12 shadow-2xl border-2 border-amber-200/80 text-center overflow-hidden">

          {/* Gold ribbon */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-rose-700 via-amber-500 to-rose-700" />

          {/* Wax seal */}
          <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-gradient-to-tr from-rose-900 via-rose-700 to-amber-700 p-1 shadow-[0_10px_30px_rgba(225,29,72,0.35)] border-2 border-amber-300/70 flex items-center justify-center">
            <div className="w-[76px] h-[76px] rounded-full border border-dashed border-amber-200/80 flex flex-col items-center justify-center text-amber-100 bg-rose-950/80">
              <span className="text-[11px] font-mono tracking-widest text-amber-300">20·11</span>
              <Heart className="w-5 h-5 fill-amber-300 text-amber-300 mt-0.5" />
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 mb-2">
            <Flower2 className="w-5 h-5 text-rose-500" />
            <span className="font-serif text-xs uppercase tracking-widest text-amber-800">
              Thư Tri Ân 20/11
            </span>
            <Flower2 className="w-5 h-5 text-rose-500" />
          </div>

          <p className="font-playfair text-xl sm:text-2xl font-bold text-stone-800 mb-6">
            Kính Gửi Cô Ma Ngân Giang
          </p>

          <button
            onClick={reopen}
            className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-amber-100 font-medium text-sm shadow-lg hover:shadow-xl transition-all active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Mở lại phong thư niêm phong</span>
          </button>

          <p className="mt-5 text-xs text-stone-500 font-sans">
            Bức thư mở ra toàn màn hình, kèm tiếng bóc con dấu sáp.
          </p>

          <div className="mt-8 pt-6 border-t border-amber-200/60 flex items-center justify-center gap-2 text-xs text-stone-500">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span>Viết riêng tặng Cô Ma Ngân Giang • ĐH Sư Phạm TP.HCM</span>
          </div>
        </div>

      </div>
    </section>
  );
}
