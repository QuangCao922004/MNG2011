"use client";

import React from "react";
import Image from "next/image";
import { GraduationCap, Heart, Compass, Lightbulb, Sparkles, Star } from "lucide-react";

export default function AboutSection() {
  const highlights = [
    {
      icon: <GraduationCap className="w-6 h-6 text-teal-600" />,
      title: "Chất Lượng & Tri Thức",
      desc: "Nền tảng kiến thức vững vàng, sự chỉn chu và chuẩn mực của một nhà giáo tiêu biểu dưới mái trường Đại học Sư phạm TP.HCM.",
      bgColor: "bg-teal-50",
      borderColor: "border-teal-200",
    },
    {
      icon: <Lightbulb className="w-6 h-6 text-amber-600" />,
      title: "Sáng Tạo & Đổi Mới",
      desc: "Luôn mang tư duy đổi mới, bài giảng sinh động, truyền cảm hứng tìm tòi và mở mang thế giới quan cho sinh viên và học trò.",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
    {
      icon: <Heart className="w-6 h-6 text-rose-600" />,
      title: "Nhân Văn & Tâm Huyết",
      desc: "Dành trọn sự ân cần, lắng nghe và thấu hiểu học trò. Một trái tim ấm áp, luôn trao niềm tin và động lực cho mọi người xung quanh.",
      bgColor: "bg-rose-50",
      borderColor: "border-rose-200",
    },
    {
      icon: <Sparkles className="w-6 h-6 text-indigo-600" />,
      title: "Trẻ Trung & Tràn Đầy Sức Sống",
      desc: "Phong thái tươi vui, nụ cười rạng rỡ và tinh thần thanh xuân luôn hiện hữu trong từng khoảnh khắc đời thường lẫn trên bục giảng.",
      bgColor: "bg-indigo-50",
      borderColor: "border-indigo-200",
    },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-50 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-100 text-teal-800 text-xs font-semibold uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-teal-600 text-teal-600" />
            <span>Chân Dung Người Truyền Lửa</span>
          </div>
          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 leading-tight">
            Cô Ma Ngân Giang: <br className="hidden sm:block" />
            Tâm Huyết, Trí Tuệ &amp; Nét Đẹp Duyên Dáng
          </h2>
          <p className="text-stone-600 text-base sm:text-lg leading-relaxed">
            Dưới mái trường Đại học Sư phạm TP. Hồ Chí Minh với truyền thống 50 năm tự hào, hình ảnh cô Ma Ngân Giang trong tà áo dài xanh ngọc luôn là biểu tượng của sự tận tụy, tri thức và nét đẹp dịu dàng của người phụ nữ Việt Nam.
          </p>
        </div>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left: Featured Image composition */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative mx-auto max-w-md rounded-3xl overflow-hidden shadow-2xl border-4 border-rose-100 bg-white group">
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/co-giang-50-nam.jpg"
                  alt="Cô Ma Ngân Giang trong tà áo dài sư phạm"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Caption banner inside photo */}
              <div className="p-5 bg-gradient-to-r from-teal-900/90 to-blue-900/90 text-white backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-teal-200 font-semibold">Tự Hào Truyền Thống</p>
                    <p className="font-playfair text-lg font-bold text-white">Kiến Tạo Tương Lai</p>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-teal-500/30 text-teal-200 text-xs font-medium border border-teal-400/40">
                    HCMUE
                  </span>
                </div>
              </div>
            </div>

            <div className="text-center">
              <p className="text-xs text-stone-500 italic">
                Tà áo dài xanh ngọc thanh tao cùng nụ cười hiền hậu của cô Ma Ngân Giang
              </p>
            </div>
          </div>

          {/* Right: Pillars & Highlight Cards */}
          <div className="lg:col-span-7 space-y-6">
            <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed text-base sm:text-lg">
              <p>
                Nghề dạy học là nghề cao quý bậc nhất trong các nghề cao quý. Để thắp sáng được ước mơ của bao lớp học trò, người thầy không chỉ trao truyền kiến thức mà còn dùng chính tình yêu thương, sự kiên nhẫn và tấm lòng chân thành để uốn nắn và đồng hành.
              </p>
              <p>
                Ở cô <strong className="text-rose-600 font-semibold">Ma Ngân Giang</strong>, mọi người luôn cảm nhận được một nguồn năng lượng ấm áp, sự gần gũi và nụ cười rạng ngời luôn nở trên môi. Cô không chỉ giỏi chuyên môn mà còn là người truyền cảm hứng sống đẹp, sống tích cực đến tất cả mọi người.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`p-5 rounded-2xl ${item.bgColor} border ${item.borderColor} shadow-sm hover:shadow-md transition-all hover:-translate-y-1`}
                >
                  <div className="mb-3">{item.icon}</div>
                  <h3 className="font-bold text-stone-900 text-base mb-1.5">{item.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>

            <div className="p-4 rounded-xl bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-200/80 flex items-center gap-4">
              <span className="text-3xl">🌸</span>
              <p className="text-sm text-stone-700 italic">
                &quot;Thầy cô như ánh trăng thanh, soi sáng từng bước đường học trò khôn lớn. Chúc cô luôn giữ mãi ngọn lửa đam mê và sự trẻ đẹp trong lòng bao thế hệ!&quot;
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

