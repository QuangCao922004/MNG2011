"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, TrendingUp, HeartHandshake, History, Award, Check } from "lucide-react";
import { triggerFireworks } from "@/lib/confetti";

export default function JourneySection() {
  const [activeTab, setActiveTab] = useState<"then" | "now" | "both">("both");

  return (
    <section id="journey" className="py-24 bg-gradient-to-b from-stone-50 via-rose-50/30 to-white relative overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-1/2 left-0 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-teal-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-wider">
            <History className="w-3.5 h-3.5 text-rose-600" />
            <span>Hành Trình Thanh Xuân &amp; Trưởng Thành</span>
          </div>
          
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            Từ Nhiệt Huyết Tuổi Trẻ Đến <br className="hidden sm:block" />
            Bản Lĩnh Người Phụ Nữ Tri Thức Rạng Ngời
          </h2>
          
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Mỗi chặng đường đi qua đều là một dấu ấn tuyệt đẹp. Nhìn lại hành trình của cô Ma Ngân Giang, người ta không khỏi khâm phục sự nỗ lực không ngừng nghỉ và vẻ đẹp ngày một mặn mà, tự tin và quyến rũ theo năm tháng.
          </p>
        </div>

        {/* Transformation Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Side-by-side or Featured Comparison Image */}
          <div className="lg:col-span-6 flex flex-col items-center">
            
            <div className="relative w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white group">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/giangma6.jpg"
                  alt="Hành trình thanh xuân của Cô Ma Ngân Giang"
                  fill
                  className="object-cover group-hover:scale-102 transition-transform duration-500"
                />

                {/* Badges on the image */}
                <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-medium border border-white/20 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
                  <span>Kỷ Niệm Ngày Ấy</span>
                </div>

                <div className="absolute top-4 right-4 bg-teal-600/90 backdrop-blur-md px-3 py-1.5 rounded-full text-white text-xs font-medium border border-white/20 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  <span>Rực Rỡ Hôm Nay</span>
                </div>
              </div>

              {/* Bottom bar explaining the photo */}
              <div className="p-5 bg-gradient-to-r from-stone-900 to-stone-800 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-playfair text-base sm:text-lg font-bold text-amber-300">
                      Sự Chuyển Mình Tuyệt Vời
                    </h4>
                    <p className="text-xs text-stone-300 mt-0.5">
                      Vẫn giữ trọn nụ cười chân thành, nhưng thăng hạng khí chất và nhan sắc!
                    </p>
                  </div>
                  <button
                    onClick={() => triggerFireworks()}
                    className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-rose-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white text-xs font-semibold shadow-md active:scale-95 transition-all flex items-center gap-1"
                  >
                    <span>Thả Tim</span>
                    <span>✨</span>
                  </button>
                </div>
              </div>
            </div>

            <p className="text-xs text-stone-500 italic mt-3 text-center">
              Bức ảnh ghi dấu ấn thanh xuân rực rỡ và sự thăng hoa nhan sắc của cô Giang
            </p>
          </div>

          {/* Right Column: Key Evolution Points */}
          <div className="lg:col-span-6 space-y-6">
            
            <div className="p-6 rounded-2xl bg-white border border-rose-100 shadow-md space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-rose-100/60 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center text-rose-600 font-bold">
                  🌱
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Thuở Ban Đầu Tươi Trẻ &amp; Đầy Bão Táp</h3>
                  <p className="text-xs text-stone-500">Nhiệt huyết tình nguyện, lăn xả mọi phong trào</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Những năm tháng sinh viên năng nổ với chiếc thẻ đeo tình nguyện viên, chiếc áo đồng phục giản dị và nụ cười không hề ngại khó, ngại khổ. Đó là nền tảng tôi luyện nên một cô giáo bản lĩnh, kiên cường như hôm nay.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-teal-100 shadow-md space-y-3 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-teal-100/60 rounded-full blur-xl pointer-events-none" />
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-teal-600 font-bold">
                  💎
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 text-base">Hiện Tại: Bản Lĩnh, Tự Tin &amp; Trí Tuệ</h3>
                  <p className="text-xs text-teal-600 font-medium">Khí chất thanh lịch của một giảng viên trẻ</p>
                </div>
              </div>
              <p className="text-stone-600 text-sm leading-relaxed">
                Người phụ nữ hiện đại với nụ cười tự tin, phong thái chững chạc, gu thời trang năng động và tinh thần học hỏi không ngừng. Cô Ma Ngân Giang chính là minh chứng sống cho câu nói: <em>&quot;Phụ nữ đẹp nhất khi vừa có tri thức, vừa có trái tim nhân hậu và biết yêu thương bản thân!&quot;</em>
              </p>
            </div>

            {/* Checklist of wishes for youth & beauty */}
            <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-2.5">
              <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide flex items-center gap-2">
                <Award className="w-4 h-4 text-amber-600" />
                <span>Bí Quyết Để &quot;Luôn Trẻ Đẹp&quot; Của Cô Giang</span>
              </h4>
              <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Nụ cười lạc quan, luôn nhìn cuộc sống bằng lăng kính tích cực và yêu đời.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Tâm hồn trẻ trung, hòa đồng và gần gũi với thế hệ học trò.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>Đam mê du lịch, trải nghiệm những vùng đất mới để tâm hồn luôn rộng mở.</span>
                </li>
              </ul>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

