"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Camera, Heart, Eye, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";
import { triggerHeartBurst } from "@/lib/confetti";

interface PhotoItem {
  id: number;
  src: string;
  title: string;
  category: "all" | "teaching" | "daily" | "travel";
  categoryLabel: string;
  tag: string;
  desc: string;
  aspect: string;
}

const photoData: PhotoItem[] = [
  {
    id: 1,
    src: "/images/giangma1.jpg",
    title: "Tà Áo Dài Sư Phạm Thanh Tao",
    category: "teaching",
    categoryLabel: "Bục Giảng & Tri Thức",
    tag: "HCMUE • 20/11",
    desc: "Hình ảnh cô Ma Ngân Giang trong tà áo dài xanh ngọc truyền thống, dịu dàng và đoan trang dưới mái trường Đại học Sư phạm TP.HCM. Biểu tượng của tri thức, sự tận tụy và lòng nhân ái.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 2,
    src: "/images/giangma2.jpg",
    title: "Nụ Cười Tỏa Nắng Đời Thường",
    category: "daily",
    categoryLabel: "Đời Thường Gần Gũi",
    tag: "Tươi Tắn • Dịu Dàng",
    desc: "Khoảnh khắc mộc mạc với mái tóc ngắn trẻ trung, kính mát cài tóc và nụ cười ngọt ngào khiến ai nhìn vào cũng cảm thấy ấm áp và ngập tràn năng lượng tích cực.",
    aspect: "aspect-[3/4]",
  },
  {
    id: 3,
    src: "/images/giangma3.jpg",
    title: "Khám Phá Thế Giới – Cửu Phần (Jiufen)",
    category: "travel",
    categoryLabel: "Du Lịch & Trải Nghiệm",
    tag: "Du Lịch • Năng Động",
    desc: "Năng lượng tuổi trẻ ngập tràn trên từng nẻo đường trải nghiệm. Cô Giang với phong cách khỏe khoắn, cá tính, hòa mình vào không gian cổ kính tại Jiufen (Đài Loan).",
    aspect: "aspect-[3/4]",
  },
  {
    id: 4,
    src: "/images/giangma4.jpg",
    title: "Chiều Sâu Tâm Hồn Bên Hồ Thơ Mộng",
    category: "travel",
    categoryLabel: "Nghệ Thuật & Chiều Sâu",
    tag: "Thanh Lịch • Sâu Lắng",
    desc: "Góc nghiêng điện ảnh tuyệt đẹp, tựa lan can gỗ phóng tầm mắt ra mặt nước êm đềm. Vẻ đẹp thanh thoát, tĩnh lặng và đầy chiều sâu cảm xúc của một tâm hồn tinh tế.",
    aspect: "aspect-[4/3]",
  },
  {
    id: 5,
    src: "/images/giangma5.jpg",
    title: "Nhan Sắc Không Tuổi & Làn Da Rạng Rỡ",
    category: "daily",
    categoryLabel: "Nhan Sắc Thanh Xuân",
    tag: "Mãi Trẻ Đẹp • Tươi Sáng",
    desc: "Bức ảnh cận cảnh tôn vinh làn da tươi trẻ không tì vết, ánh mắt trong veo và thần thái cuốn hút. Minh chứng hoàn hảo cho lời chúc: 'Luôn Trẻ Đẹp Theo Năm Tháng'!",
    aspect: "aspect-[3/4]",
  },
  {
    id: 6,
    src: "/images/giangma6.jpg",
    title: "Dấu Ấn Trưởng Thành & Bản Lĩnh Tri Thức",
    category: "teaching",
    categoryLabel: "Hành Trình Thanh Xuân",
    tag: "Glow Up • Bản Lĩnh",
    desc: "Từ cô gái sinh viên tình nguyện mộc mạc đến một người phụ nữ tri thức đĩnh đạc, hiện đại, tự tin và luôn rực sáng ở mọi vị trí cô đảm nhiệm.",
    aspect: "aspect-square",
  },
  {
    id: 7,
    src: "/images/giangma7.jpg",
    title: "Khoảnh Khắc Tinh Nghịch & Cute Hóm Hỉnh",
    category: "daily",
    categoryLabel: "Khoảnh Khắc Dễ Thương",
    tag: "Cute • Hồn Nhiên",
    desc: "Biểu cảm hài hước cực kỳ đáng yêu! Một góc nhìn dí dỏm cho thấy cô Giang luôn giữ được nét hồn nhiên, vui vẻ và tinh nghịch của tuổi thanh xuân.",
    aspect: "aspect-[3/4]",
  },
];

export default function GallerySection() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [likesMap, setLikesMap] = useState<{ [key: number]: number }>({
    1: 428,
    2: 312,
    3: 356,
    4: 289,
    5: 395,
    6: 512,
    7: 341,
  });

  const filteredPhotos = selectedCategory === "all"
    ? photoData
    : photoData.filter((p) => p.category === selectedCategory);

  const handleLike = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHeartBurst();
    setLikesMap((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
    }
  };

  const prevLightbox = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
    }
  };

  return (
    <section id="gallery" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-rose-600" />
            <span>Góc Ảnh Kỷ Niệm</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Nét Đẹp Đa Sắc Màu Của Cô Giang
          </h2>

          <p className="text-stone-600 text-base sm:text-lg">
            Dù trên bục giảng nghiêm trang, lúc đắm mình trong chuyến du lịch khám phá hay những giây phút đời thường hóm hỉnh, cô Ma Ngân Giang luôn tỏa ra một sức hút đặc biệt.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: "all", label: "Tất Cả Khoảnh Khắc (7)" },
              { id: "teaching", label: "Bục Giảng & Hành Trình" },
              { id: "daily", label: "Đời Thường & Nụ Cười" },
              { id: "travel", label: "Du Lịch & Phong Cách" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  selectedCategory === tab.id
                    ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                    : "bg-stone-100 text-stone-600 hover:bg-stone-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => openLightbox(index)}
              className="group relative bg-stone-50 rounded-3xl overflow-hidden border border-stone-200/80 shadow-md hover:shadow-2xl transition-all duration-500 hover:-translate-y-1.5 cursor-pointer flex flex-col"
            >
              {/* Image Container */}
              <div className={`relative w-full ${photo.aspect} overflow-hidden bg-stone-200`}>
                <Image
                  src={photo.src}
                  alt={photo.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />

                {/* Tag pill */}
                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-stone-800 shadow-sm border border-stone-200/50">
                  {photo.tag}
                </div>

                {/* View Overlay icon */}
                <div className="absolute inset-0 bg-stone-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                  <span className="w-11 h-11 rounded-full bg-white/90 flex items-center justify-center text-stone-800 shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
                    <Eye className="w-5 h-5" />
                  </span>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-5 flex-1 flex flex-col justify-between bg-white">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-500 block mb-1">
                    {photo.categoryLabel}
                  </span>
                  <h3 className="font-playfair text-lg font-bold text-stone-900 group-hover:text-rose-600 transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 mt-1.5 leading-relaxed">
                    {photo.desc}
                  </p>
                </div>

                {/* Card Interaction bar */}
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-stone-100">
                  <span className="text-xs text-stone-400 font-medium">Bấm để phóng to ảnh</span>
                  <button
                    onClick={(e) => handleLike(photo.id, e)}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors"
                  >
                    <Heart className="w-3.5 h-3.5 fill-rose-500" />
                    <span>{likesMap[photo.id]}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <button
            onClick={closeLightbox}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
            aria-label="Đóng"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation buttons */}
          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10 hidden sm:block"
            aria-label="Ảnh trước"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10 hidden sm:block"
            aria-label="Ảnh kế tiếp"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Modal Content */}
          <div className="max-w-4xl w-full bg-stone-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh]">
            {/* Image side */}
            <div className="relative md:w-3/5 h-80 md:h-[550px] bg-black">
              <Image
                src={filteredPhotos[lightboxIndex].src}
                alt={filteredPhotos[lightboxIndex].title}
                fill
                className="object-contain"
              />
            </div>

            {/* Info side */}
            <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-stone-900 text-white overflow-y-auto">
              <div className="space-y-4">
                <div className="inline-block px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30">
                  {filteredPhotos[lightboxIndex].tag}
                </div>

                <h3 className="font-playfair text-2xl font-bold text-white">
                  {filteredPhotos[lightboxIndex].title}
                </h3>

                <p className="text-stone-300 text-sm leading-relaxed">
                  {filteredPhotos[lightboxIndex].desc}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  onClick={(e) => handleLike(filteredPhotos[lightboxIndex].id, e)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 hover:from-rose-600 hover:to-pink-600 text-white font-medium text-sm shadow-md transition-all active:scale-95"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Thả Tim ({likesMap[filteredPhotos[lightboxIndex].id]})</span>
                </button>

                <span className="text-xs text-stone-400">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

