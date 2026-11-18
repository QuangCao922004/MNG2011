"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Heart, ArrowRight, X, Mail } from "lucide-react";
import { triggerFireworks, triggerHeartBurst } from "@/lib/confetti";
import { sfx } from "@/lib/audio";

interface MotionLetterExperienceProps {
  initialOpen?: boolean;
  onClose?: () => void;
}

export default function MotionLetterExperience({
  initialOpen = false,
  onClose,
}: MotionLetterExperienceProps) {
  // States: 'sealed' | 'unsealing' | 'reading'
  // The special link always lands on the sealed envelope so the recipient gets
  // the ritual of breaking the wax seal, not a pre-opened letter.
  const [phase, setPhase] = useState<"sealed" | "unsealing" | "reading">("sealed");
  const [isVisible, setIsVisible] = useState(initialOpen);

  // Let the in-page letter section reopen the sealed envelope instead of
  // printing a second copy of the letter text.
  useEffect(() => {
    const openLetter = () => {
      setIsVisible(true);
      setPhase("sealed");
    };
    window.addEventListener("open-motion-letter", openLetter);
    return () => window.removeEventListener("open-motion-letter", openLetter);
  }, []);

  const handleOpenEnvelope = () => {
    if (phase !== "sealed") return;

    // 1. Play tactile wax pop sound & confetti
    sfx.playSealBreak();
    triggerHeartBurst();
    setPhase("unsealing");

    // 2. Play paper rustle after flap opens
    setTimeout(() => {
      sfx.playPaperRustle();
    }, 450);

    // 3. Slide letter out & expand
    setTimeout(() => {
      setPhase("reading");
    }, 900);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  return (
    <>
      {/* Floating Re-Open Button on Main Page (Always accessible even if bypassed) */}
      {!isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            setIsVisible(true);
            setPhase("sealed");
          }}
          className="fixed bottom-24 right-6 z-40 group flex items-center gap-3 px-4 py-2.5 rounded-full bg-gradient-to-r from-rose-900/90 via-rose-800/90 to-stone-900/90 text-amber-100 border border-amber-300/40 shadow-2xl backdrop-blur-md transition-all hover:border-amber-400 hover:shadow-rose-950/40"
        >
          {/* Wax seal mini icon */}
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-700 via-rose-900 to-amber-900 flex items-center justify-center text-amber-200 border border-amber-400/50 shadow-inner group-hover:rotate-12 transition-transform">
            <Mail className="w-4 h-4" />
          </div>
          <div className="text-left">
            <p className="text-[10px] uppercase tracking-wider text-amber-300 font-medium">Bức Thư Tri Ân</p>
            <p className="text-xs font-serif font-bold text-white">Gửi riêng Cô Ngân Giang</p>
          </div>
        </motion.button>
      )}

      {/* Cinematic Fullscreen Experience */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 overflow-y-auto bg-stone-950/90 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 md:p-8"
          >
            {/* Background subtle noise and golden ambient lighting */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-rose-900/20 rounded-full blur-[140px]" />
              <div className="absolute bottom-1/4 left-1/3 w-[450px] h-[450px] bg-amber-600/10 rounded-full blur-[120px]" />
            </div>

            {/* Close / Skip button */}
            <button
              onClick={handleDismiss}
              className="absolute top-6 right-6 text-stone-400 hover:text-white p-2.5 rounded-full bg-stone-900/60 border border-white/10 hover:border-white/30 backdrop-blur-md transition-all z-20"
              title="Đóng / Vào trang chủ"
            >
              <X className="w-5 h-5" />
            </button>

            {/* STAGE 1 & 2: 3D Origami Envelope Presentation */}
            {phase !== "reading" && (
              <div className="relative flex flex-col items-center justify-center text-center max-w-lg w-full">
                
                {/* Header Subtitle */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-8 space-y-2"
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-medium tracking-widest uppercase">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    Thư Riêng 20/11
                  </span>
                  <h2 className="font-playfair text-2xl sm:text-3xl text-amber-100 font-semibold tracking-wide">
                    Kính Gửi Cô Ma Ngân Giang
                  </h2>
                  <p className="text-stone-400 text-xs sm:text-sm font-sans max-w-sm mx-auto">
                    Một phong thư đặc biệt được niêm phong trang trọng gửi đến cô nhân ngày Nhà giáo Việt Nam.
                  </p>
                </motion.div>

                {/* 3D Envelope Container */}
                <motion.div
                  initial={{ scale: 0.9, opacity: 0, y: 30 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", damping: 20 }}
                  className="relative w-full max-w-[420px] aspect-[1.45/1] [perspective:1200px] cursor-pointer group"
                  onClick={handleOpenEnvelope}
                >
                  {/* Envelope Body (Back pocket) */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-rose-950 via-[#3a0a14] to-stone-900 border border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden">
                    {/* Metallic Gold Lining Pattern */}
                    <div className="absolute inset-2 border border-dashed border-amber-400/20 rounded-xl" />
                    
                    {/* Inside folded letter edge showing */}
                    <div className="absolute bottom-4 left-6 right-6 h-32 bg-[#fffdf9] rounded-lg shadow-md border border-amber-100" />
                  </div>

                  {/* Envelope Front Bottom Fold */}
                  <div 
                    className="absolute inset-0 pointer-events-none rounded-2xl z-10"
                    style={{
                      background: "linear-gradient(135deg, transparent 48%, rgba(58,10,20,0.95) 50%, #25060d 100%)",
                    }}
                  />

                  {/* Envelope 3D Top Flap */}
                  <motion.div
                    className="absolute top-0 left-0 right-0 h-1/2 origin-top z-20 rounded-t-2xl [transform-style:preserve-3d]"
                    animate={{
                      rotateX: phase === "unsealing" ? -175 : 0,
                    }}
                    transition={{
                      duration: 0.75,
                      ease: [0.4, 0, 0.2, 1],
                    }}
                    style={{
                      background: "linear-gradient(to bottom, #4a0d1a, #340711)",
                      clipPath: "polygon(0 0, 100% 0, 50% 100%)",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.4)",
                    }}
                  />

                  {/* Red & Gold Wax Seal (Center) */}
                  <motion.div
                    animate={{
                      scale: phase === "unsealing" ? [1, 1.25, 0] : [1, 1.04, 1],
                      opacity: phase === "unsealing" ? 0 : 1,
                    }}
                    transition={{
                      scale: phase === "unsealing" 
                        ? { duration: 0.45, times: [0, 0.5, 1] } 
                        : { repeat: Infinity, duration: 3, ease: "easeInOut" },
                    }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center justify-center"
                  >
                    {/* Wax Stamp Body */}
                    <div className="relative w-20 h-20 rounded-full bg-gradient-to-tr from-rose-900 via-rose-700 to-amber-700 p-1 shadow-[0_8px_25px_rgba(225,29,72,0.4)] border-2 border-amber-300/70 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-dashed border-amber-200/80 flex flex-col items-center justify-center text-amber-100 bg-rose-950/80">
                        <span className="text-[10px] font-mono tracking-widest text-amber-300">20·11</span>
                        <Heart className="w-4 h-4 fill-amber-300 text-amber-300 mt-0.5" />
                      </div>
                      
                      {/* Wax drip imperfections for tactile look */}
                      <div className="absolute -bottom-1 -left-1 w-4 h-4 bg-rose-900 rounded-full" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-rose-800 rounded-full" />
                    </div>

                    <div className="mt-3 px-3 py-1 rounded-full bg-black/60 border border-white/10 backdrop-blur-sm">
                      <span className="text-[11px] text-amber-200 font-sans tracking-wide">
                        Chạm để gỡ niêm phong ✨
                      </span>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Direct Bypass Link */}
                <button
                  onClick={handleDismiss}
                  className="mt-8 text-xs text-stone-400 hover:text-amber-200 underline underline-offset-4 transition-colors"
                >
                  Bỏ qua, vào thẳng trang web tri ân →
                </button>
              </div>
            )}

            {/* STAGE 3: Unfolded Tactile Letter Modal */}
            {phase === "reading" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 220 }}
                className="relative max-w-3xl w-full my-auto bg-[#fffdfa] rounded-3xl p-6 sm:p-10 md:p-14 shadow-2xl border border-amber-200/80 text-stone-800 overflow-hidden"
              >
                {/* Subtle paper background texture & gold ribbon */}
                <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-rose-700 via-amber-500 to-rose-700" />
                <div className="absolute -top-16 -right-16 w-36 h-36 bg-amber-100/40 rounded-full blur-2xl pointer-events-none" />

                {/* Letter Header */}
                <div className="flex items-start justify-between border-b border-amber-200/70 pb-6 mb-8">
                  <div>
                    <span className="font-sans text-xs uppercase tracking-widest text-rose-800 font-semibold block mb-1">
                      Kính Tặng Cô Ma Ngân Giang
                    </span>
                    <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-stone-900">
                      Bức Thư Tri Ân 20/11
                    </h3>
                  </div>

                  {/* Vintage Postal Seal */}
                  <div className="w-16 h-20 border-2 border-dashed border-rose-400/80 rounded-xl p-1 flex flex-col items-center justify-center text-center bg-rose-50/70 rotate-2">
                    <span className="text-[10px] font-bold text-rose-800 uppercase leading-none">20.11</span>
                    <span className="text-[8px] text-stone-500 my-0.5">VIETNAM</span>
                    <span className="text-sm">💌</span>
                  </div>
                </div>

                {/* Letter Body */}
                <div className="space-y-6 text-stone-700 font-serif leading-relaxed text-base sm:text-lg">
                  <p className="font-dancing text-3xl sm:text-4xl text-rose-800 font-bold">
                    Cô Ma Ngân Giang kính mến,
                  </p>

                  <p>
                    Tháng 11 về mang theo những làn gió dịu mát, cũng là lúc triệu trái tim học trò trên khắp mọi miền đất nước hướng về những người thầy, người cô kính yêu. Hòa chung không khí rộn ràng ấy, chúng em xin được gửi tới cô Ma Ngân Giang lời chúc mừng nồng nhiệt và chân thành nhất nhân ngày <strong>Nhà giáo Việt Nam 20/11</strong>!
                  </p>

                  <p>
                    Dưới mái trường Đại học Sư phạm TP.HCM thân thương, cô luôn là hình ảnh mẫu mực của sự tận tâm, nhiệt huyết và lòng yêu nghề sâu sắc. Dù ở bục giảng truyền thụ kiến thức hay những phút giây đời thường giản dị, cô luôn mang đến nguồn năng lượng tràn đầy lạc quan, thắp sáng niềm tin và niềm đam mê học tập cho bao lớp học trò.
                  </p>

                  {/* Highlighted wishes card */}
                  <div className="p-6 rounded-2xl bg-amber-50/80 border-l-4 border-rose-600 font-sans text-stone-800 space-y-3">
                    <p className="font-bold text-rose-800 text-base sm:text-lg flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-amber-500" />
                      <span>Những Lời Chúc Trân Trọng Nhất Dành Tặng Cô:</span>
                    </p>
                    <ul className="space-y-2 text-sm sm:text-base list-disc list-inside text-stone-700">
                      <li><strong>Thành Công Vang Dội:</strong> Chúc cô luôn gặt hái thêm nhiều thành tựu rực rỡ trong công tác giảng dạy, nghiên cứu và sự nghiệp trồng người cao quý.</li>
                      <li><strong>Mãi Mãi Trẻ Đẹp:</strong> Chúc cô giữ mãi vẻ đẹp tươi tắn, nụ cười tỏa nắng và một tâm hồn thanh xuân không tuổi!</li>
                      <li><strong>Hạnh Phúc Trọn Vẹn:</strong> Chúc cô mỗi ngày trôi qua đều ngập tràn niềm vui, sức khỏe dồi dào, vạn sự cát tường và luôn được yêu thương bởi gia đình, đồng nghiệp và học trò!</li>
                    </ul>
                  </div>

                  <p>
                    Cảm ơn cô vì đã luôn là ngọn đuốc dịu dàng soi sáng và truyền cảm hứng sống đẹp cho chúng em. Kính chúc cô một ngày 20/11 thật trọn vẹn và hạnh phúc!
                  </p>

                  {/* Sign-off */}
                  <div className="pt-6 flex flex-col items-end text-right">
                    <p className="text-sm font-sans text-stone-500">Kính chúc với tất cả lòng biết ơn và kính trọng,</p>
                    <p className="font-dancing text-3xl sm:text-4xl text-rose-700 font-bold mt-1">
                      Học trò &amp; Những người yêu quý Cô
                    </p>
                    <p className="text-xs text-stone-400 font-sans mt-0.5">TP. Hồ Chí Minh • 20/11</p>
                  </div>
                </div>

                {/* Bottom Navigation CTA */}
                <div className="mt-10 pt-6 border-t border-amber-200/70 flex flex-wrap items-center justify-between gap-4">
                  <button
                    onClick={() => {
                      triggerFireworks();
                      sfx.playSealBreak();
                    }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-800 font-semibold text-xs sm:text-sm transition-all active:scale-95"
                  >
                    <Sparkles className="w-4 h-4 text-rose-600" />
                    <span>Bắn Pháo Hoa Tri Ân 🎉</span>
                  </button>

                  <button
                    onClick={handleDismiss}
                    className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-800 to-amber-700 hover:from-rose-900 hover:to-amber-800 text-amber-100 font-medium text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all active:scale-95 group"
                  >
                    <span>Khám phá không gian tri ân 20/11</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}

          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
