"use client";

import React, { useState } from "react";
import { Mail, MailOpen, Sparkles, Heart, Feather, Flower2 } from "lucide-react";
import { triggerFireworks, triggerHeartBurst } from "@/lib/confetti";

export default function LetterSection() {
  const [isOpen, setIsOpen] = useState(true);

  const toggleLetter = () => {
    if (!isOpen) {
      triggerHeartBurst();
    }
    setIsOpen(!isOpen);
  };

  return (
    <section id="letter" className="py-24 bg-gradient-to-b from-white via-rose-50/40 to-amber-50/30 relative overflow-hidden">
      
      {/* Decorative floral background */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 pointer-events-none select-none">🌹</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10 pointer-events-none select-none">🌸</div>
      <div className="absolute top-1/2 right-5 text-4xl opacity-15 pointer-events-none select-none animate-float-slow">✨</div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-wider">
            <Feather className="w-3.5 h-3.5 text-rose-600" />
            <span>Tâm Thư Tri Ân</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Bức Thư Gửi Riêng Cô Ma Ngân Giang
          </h2>

          <p className="text-stone-600 text-base">
            Từng dòng chữ viết bằng tất cả sự kính trọng, lòng biết ơn và những lời chúc tốt đẹp nhất nhân ngày 20/11.
          </p>

          <button
            onClick={toggleLetter}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white hover:bg-rose-50 text-rose-600 font-semibold text-xs sm:text-sm border border-rose-200 shadow-sm transition-all hover:scale-105 active:scale-95"
          >
            {isOpen ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
            <span>{isOpen ? "Thu gọn bức thư" : "Mở phong bì thư tri ân 💌"}</span>
          </button>
        </div>

        {/* Envelope & Letter Container */}
        {isOpen && (
          <div className="relative bg-[#fffdf9] rounded-3xl p-8 sm:p-12 md:p-16 shadow-2xl border-2 border-amber-200/80 transition-all duration-700 animate-in fade-in zoom-in-95">
            
            {/* Vintage Stamp and Seal */}
            <div className="flex items-start justify-between border-b border-amber-200/60 pb-6 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white shadow-md">
                  <Flower2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="font-serif text-xs uppercase tracking-widest text-amber-800 block">Thư Tri Ân 20/11</span>
                  <span className="font-playfair text-base font-bold text-stone-800">Kính Gửi Cô Ma Ngân Giang</span>
                </div>
              </div>

              {/* Postal Stamp Badge */}
              <div className="w-16 h-20 border-2 border-dashed border-rose-400 rounded-lg p-1.5 flex flex-col items-center justify-center text-center bg-rose-50/50 transform rotate-3">
                <span className="text-[10px] font-bold text-rose-700 uppercase leading-none">20.11</span>
                <span className="text-[9px] text-stone-500 block my-0.5">VIETNAM</span>
                <span className="text-sm">💌</span>
              </div>
            </div>

            {/* Letter Content */}
            <div className="space-y-6 text-stone-700 font-serif leading-relaxed sm:text-lg text-base">
              
              <p className="font-playfair text-xl sm:text-2xl font-bold text-rose-800 italic">
                Cô Ma Ngân Giang kính mến,
              </p>

              <p>
                Tháng 11 về mang theo những làn gió dịu mát, cũng là lúc triệu trái tim học trò trên khắp mọi miền đất nước hướng về những người thầy, người cô kính yêu. Hòa chung không khí rộn ràng ấy, chúng em xin được gửi tới cô Ma Ngân Giang lời chúc mừng nồng nhiệt và chân thành nhất nhân ngày <strong>Nhà giáo Việt Nam 20/11</strong>!
              </p>

              <p>
                Dưới mái trường Đại học Sư phạm TP.HCM thân thương, cô luôn là hình ảnh mẫu mực của sự tận tâm, nhiệt huyết và lòng yêu nghề sâu sắc. Dù ở bục giảng truyền thụ kiến thức, trong những hoạt động phong trào sôi nổi hay những phút giây đời thường giản dị, cô luôn mang đến nguồn năng lượng tràn đầy lạc quan, thắp sáng niềm tin và niềm đam mê học tập cho bao lớp học trò.
              </p>

              <div className="p-6 my-6 rounded-2xl bg-amber-50/70 border-l-4 border-rose-500 font-sans text-stone-800 space-y-2">
                <p className="font-bold text-rose-700 text-base sm:text-lg flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <span>Lời Chúc Trân Trọng Nhất Dành Tặng Cô:</span>
                </p>
                <ul className="space-y-2 text-sm sm:text-base list-disc list-inside text-stone-700">
                  <li><strong>Thành Công Vang Dội:</strong> Chúc cô luôn gặt hái thêm nhiều thành tựu rực rỡ trong công tác giảng dạy, nghiên cứu và sự nghiệp trồng người cao quý.</li>
                  <li><strong>Mãi Mãi Trẻ Đẹp:</strong> Chúc cô giữ mãi vẻ đẹp tươi tắn, làn da rạng ngời, nụ cười tỏa nắng và một tâm hồn thanh xuân không tuổi!</li>
                  <li><strong>Hạnh Phúc Trọn Vẹn:</strong> Chúc cô mỗi ngày trôi qua đều ngập tràn niềm vui, sức khỏe dồi dào, vạn sự cát tường và luôn được yêu thương bởi gia đình, đồng nghiệp và học trò!</li>
                </ul>
              </div>

              <p>
                Cảm ơn cô vì đã luôn là ngọn đuốc dịu dàng soi sáng, là nguồn cảm hứng sống đẹp cho chúng em. Chúc cô một ngày 20/11 thật trọn vẹn, nhận được ngàn vạn đóa hoa tươi thắm và những tình cảm ấm áp nhất!
              </p>

              {/* Handwritten signature section */}
              <div className="pt-8 flex flex-col items-end text-right">
                <p className="text-sm font-sans text-stone-500">Kính chúc với tất cả lòng biết ơn và yêu thương,</p>
                <p className="font-dancing text-3xl sm:text-4xl text-rose-600 font-bold mt-2">
                  Học trò &amp; Những người yêu quý Cô
                </p>
                <p className="text-xs text-stone-400 font-sans mt-1">TP. Hồ Chí Minh • 20/11</p>
              </div>

            </div>

            {/* Bottom Actions inside letter */}
            <div className="mt-10 pt-6 border-t border-amber-200/60 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-stone-500">
                <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
                <span>Bức thư tri ân viết riêng tặng Cô Ma Ngân Giang</span>
              </div>

              <button
                onClick={() => triggerFireworks()}
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Bắn Hoa Pháo Kỷ Niệm</span>
              </button>
            </div>

          </div>
        )}

      </div>
    </section>
  );
}

