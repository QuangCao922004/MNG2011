import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Code2, Sparkles, User, Heart } from "lucide-react";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  bio: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Thành viên 1",
    role: "Frontend & Deploy",
    bio: "Phụ trách dựng khung giao diện, kiểm tra build và đẩy sản phẩm lên Vercel.",
    image: "",
  },
  {
    id: 2,
    name: "Thành viên 2",
    role: "UI/UX & Nội dung",
    bio: "Thiết kế bố cục, chọn màu sắc và chăm chút từng dòng chữ tri ân gửi cô.",
    image: "",
  },
  {
    id: 3,
    name: "Thành viên 3",
    role: "Hình ảnh & Hiệu ứng",
    bio: "Tuyển chọn ảnh kỷ niệm, hiệu ứng pháo hoa và trải nghiệm tương tác.",
    image: "",
  },
  {
    id: 4,
    name: "Thành viên 4",
    role: "Ý tưởng & Kiểm thử",
    bio: "Lên ý tưởng tổng thể, rà soát lỗi hiển thị và hoàn thiện từng chi tiết nhỏ.",
    image: "",
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
            4 thành viên đứng sau món quà nhỏ nhân dịp Ngày Nhà Giáo Việt Nam 20/11 gửi tặng cô Ma Ngân Giang.
          </p>
        </div>

        {/* 4 Member Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member.id}
              className="group bg-white rounded-3xl border border-stone-200/80 shadow-sm hover:shadow-xl hover:border-rose-200 transition-all duration-300 overflow-hidden flex flex-col"
            >
              {/* Blank Avatar / Photo Placeholder */}
              <div className="relative aspect-[3/4] w-full bg-gradient-to-br from-stone-100 via-rose-50/40 to-amber-50/40 flex flex-col items-center justify-center border-b border-stone-100 overflow-hidden">
                {member.image ? (
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-stone-400 p-6 text-center">
                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-stone-300 bg-white/80 flex items-center justify-center mb-3 group-hover:border-rose-300 transition-colors">
                      <User className="w-9 h-9 text-stone-300 group-hover:text-rose-400 transition-colors" />
                    </div>
                    <span className="text-xs font-medium text-stone-400">
                      Chưa có ảnh
                    </span>
                  </div>
                )}
              </div>

              {/* Member Info */}
              <div className="p-5 flex-1 flex flex-col space-y-2">
                <div>
                  <h2 className="font-playfair text-xl font-bold text-stone-900">
                    {member.name}
                  </h2>
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

        {/* Footer Note */}
        <div className="mt-14 text-center text-xs text-stone-500 flex items-center justify-center gap-1.5">
          <span>Thực hiện với tất cả sự trân trọng gửi tặng Cô Ma Ngân Giang</span>
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
        </div>
      </div>
    </main>
  );
}

