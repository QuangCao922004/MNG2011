import React from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import { ArrowLeft, Code2, Sparkles, Heart, GraduationCap, Users } from "lucide-react";

import hcmueImg from "./hcmue.jpeg";
import datpgImg from "./datpg.jpeg";
import thaidqImg from "./thaidq.jpeg";

interface NttuMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: StaticImageData;
}

const nttuMembers: NttuMember[] = [
  {
    id: "datpg",
    name: "Đạt Phùng",
    role: "Phát triển & Triển khai",
    bio: "Phụ trách kiến trúc trang web, tối ưu hiệu năng và triển khai sản phẩm lên GitHub Pages.",
    image: datpgImg,
  },
  {
    id: "thaidq",
    name: "Thái Đinh",
    role: "Giao diện & Hiệu ứng",
    bio: "Chăm chút trải nghiệm tương tác, hiệu ứng chuyển động và hoàn thiện từng chi tiết hiển thị.",
    image: thaidqImg,
  },
];

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-rose-50/70 via-[#fffdfb] to-amber-50/40 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Top Navigation */}
        <div className="mb-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white hover:bg-rose-50 text-stone-700 hover:text-rose-600 text-sm font-medium border border-stone-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Quay lại trang chúc mừng 20/11</span>
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold uppercase tracking-wider">
            <Code2 className="w-3.5 h-3.5" />
            <span>Behind The Scenes</span>
          </div>

          <h1 className="font-playfair text-3xl sm:text-5xl font-bold text-stone-900">
            Đội Ngũ{" "}
            <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-amber-600 bg-clip-text text-transparent">
              Phát Triển
            </span>
          </h1>

          <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
            Sự kết hợp giữa hai nhóm <strong className="text-stone-800">HCMUE</strong> và{" "}
            <strong className="text-stone-800">NTTU</strong> cùng thực hiện món quà nhỏ nhân dịp Ngày Nhà Giáo Việt Nam 20/11 gửi tặng cô Ma Ngân Giang.
          </p>
        </div>

        {/* 2-Team Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Group 1: HCMUE */}
          <section className="lg:col-span-5 bg-white rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300 overflow-hidden">
            <div className="p-6 border-b border-stone-100 flex items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-700 border border-teal-200/70 text-xs font-semibold">
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>HCMUE</span>
                </span>
                <h2 className="font-playfair text-2xl font-bold text-stone-900 mt-2">
                  Nhóm Trường ĐH Sư Phạm TP.HCM
                </h2>
              </div>
            </div>

            <div className="p-5 bg-gradient-to-b from-stone-50/70 to-white">
              <div className="relative aspect-[9/16] max-h-[520px] mx-auto w-full rounded-2xl overflow-hidden border border-stone-200/70 bg-stone-100 shadow-inner group">
                <Image
                  src={hcmueImg}
                  alt="Nhóm HCMUE - ĐH Sư Phạm TP.HCM"
                  fill
                  className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              <div className="mt-5 space-y-1.5">
                <p className="text-xs font-semibold text-teal-700 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Ý tưởng, Nội dung &amp; Hình ảnh kỷ niệm</span>
                </p>
                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  Tuyển chọn những khoảnh khắc đẹp nhất của cô Giang, lên ý tưởng chủ đạo và viết từng lời tri ân chân thành.
                </p>
              </div>
            </div>
          </section>

          {/* Group 2: NTTU */}
          <section className="lg:col-span-7 bg-white rounded-3xl border border-stone-200/80 shadow-sm p-6 space-y-6">
            <div className="border-b border-stone-100 pb-5 flex flex-wrap items-center justify-between gap-3">
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200/70 text-xs font-semibold">
                  <Users className="w-3.5 h-3.5" />
                  <span>NTTU</span>
                </span>
                <h2 className="font-playfair text-2xl font-bold text-stone-900 mt-2">
                  Nhóm Trường ĐH Nguyễn Tất Thành
                </h2>
              </div>
              <p className="text-xs text-stone-500">
                Thiết kế kỹ thuật &amp; hoàn thiện website
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {nttuMembers.map((member) => (
                <div
                  key={member.id}
                  className="group bg-stone-50/60 rounded-2xl border border-stone-200/80 hover:bg-white hover:shadow-lg hover:border-rose-200 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="relative aspect-square w-full bg-white border-b border-stone-100 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-5 flex-1 flex flex-col space-y-2">
                    <div>
                      <h3 className="font-playfair text-xl font-bold text-stone-900">
                        {member.name}
                      </h3>
                      <p className="text-xs font-semibold text-rose-600 mt-0.5 flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>{member.role}</span>
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed pt-1">
                      {member.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-14 text-center text-xs text-stone-500 flex items-center justify-center gap-1.5">
          <span>Thực hiện với tất cả sự trân trọng gửi tặng Cô Ma Ngân Giang</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        </div>
      </div>
    </main>
  );
}
