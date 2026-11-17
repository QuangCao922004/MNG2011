"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareHeart, Send, Heart, Sparkles, User, Award } from "lucide-react";
import { triggerFireworks, triggerHeartBurst } from "@/lib/confetti";

interface Wish {
  id: string;
  author: string;
  role: string;
  content: string;
  date: string;
  likes: number;
}

const defaultWishes: Wish[] = [
  {
    id: "1",
    author: "Học trò khóa K45 HCMUE",
    role: "Sinh viên",
    content: "Chúc cô Ma Ngân Giang 20/11 thật nhiều niềm vui, luôn giữ nụ cười tươi tắn và năng lượng truyền cảm hứng tuyệt vời như bây giờ cô nhé! Chúng em luôn tự hào vì được là học trò của cô ạ ❤️",
    date: "20/11/2026",
    likes: 89,
  },
  {
    id: "2",
    author: "Tập thể lớp Sư phạm",
    role: "Cựu học trò",
    content: "Chúc cô Giang luôn xinh đẹp như hoa hướng dương, công tác thật tốt và đạt được thêm nhiều thành tựu lớn trong sự nghiệp trồng người. Mong cô mãi trẻ trung và hạnh phúc viên mãn!",
    date: "20/11/2026",
    likes: 64,
  },
  {
    id: "3",
    author: "Đồng nghiệp & Bạn bè",
    role: "Giảng viên",
    content: "Chúc Giang một mùa 20/11 rực rỡ, ngày càng thăng tiến trong học thuật, giảng dạy và luôn giữ vững phong độ nhan sắc không tuổi đáng ngưỡng mộ này nha!",
    date: "19/11/2026",
    likes: 52,
  },
  {
    id: "4",
    author: "Một người hâm mộ thầm lặng",
    role: "Học viên",
    content: "Ảnh cô mặc áo dài xanh ngọc đẹp xuất sắc luôn ạ! Chúc cô 20/11 vạn sự như ý, luôn tươi trẻ, rạng rỡ và thành công trên mọi con đường cô chọn!",
    date: "18/11/2026",
    likes: 71,
  },
];

export default function WishesSection() {
  const [wishes, setWishes] = useState<Wish[]>(defaultWishes);
  const [author, setAuthor] = useState("");
  const [role, setRole] = useState("Học trò");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("giang_wishes_list");
      if (saved) {
        setWishes(JSON.parse(saved));
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSendWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !content.trim()) return;

    setIsSubmitting(true);
    triggerFireworks();

    const newWish: Wish = {
      id: Date.now().toString(),
      author: author.trim(),
      role: role.trim() || "Học trò",
      content: content.trim(),
      date: "Hôm nay",
      likes: 1,
    };

    const updated = [newWish, ...wishes];
    setWishes(updated);
    try {
      localStorage.setItem("giang_wishes_list", JSON.stringify(updated));
    } catch {
      // ignore
    }

    setAuthor("");
    setContent("");
    setIsSubmitting(false);
  };

  const handleLikeWish = (id: string) => {
    triggerHeartBurst();
    const updated = wishes.map((w) =>
      w.id === id ? { ...w, likes: w.likes + 1 } : w
    );
    setWishes(updated);
    try {
      localStorage.setItem("giang_wishes_list", JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <section id="wishes" className="py-24 bg-stone-50 relative overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-xs font-semibold uppercase tracking-wider">
            <MessageSquareHeart className="w-3.5 h-3.5 text-rose-600" />
            <span>Sổ Lưu Bút Tri Ân</span>
          </div>

          <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900">
            Gửi Ngàn Lời Chúc Tới Cô Giang
          </h2>

          <p className="text-stone-600 text-base sm:text-lg">
            Hãy cùng nhau để lại những dòng nhắn gửi thân thương nhất để chúc mừng cô Ma Ngân Giang nhân ngày Nhà giáo Việt Nam 20/11!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left: Input Form */}
          <div className="lg:col-span-5">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-100 shadow-xl sticky top-28 space-y-6">
              
              <div className="flex items-center gap-3 border-b border-stone-100 pb-4">
                <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center shadow-md">
                  <Send className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl font-bold text-stone-900">Viết Lời Chúc Mới</h3>
                  <p className="text-xs text-stone-500">Lời chúc của bạn sẽ xuất hiện ngay trên trang</p>
                </div>
              </div>

              <form onSubmit={handleSendWish} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Tên của bạn / Lớp / Đơn vị
                  </label>
                  <input
                    type="text"
                    required
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="VD: Nguyễn Văn A - Lớp Sư Phạm..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-stone-50/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Mối quan hệ
                  </label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-stone-50/50"
                  >
                    <option value="Học trò">Học trò</option>
                    <option value="Sinh viên HCMUE">Sinh viên HCMUE</option>
                    <option value="Cựu sinh viên">Cựu sinh viên</option>
                    <option value="Đồng nghiệp">Đồng nghiệp</option>
                    <option value="Bạn bè">Bạn bè</option>
                    <option value="Người yêu quý cô">Người yêu quý cô</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                    Nội dung lời chúc 20/11
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Nhập lời chúc chân thành của bạn gửi đến cô Ma Ngân Giang..."
                    className="w-full px-4 py-2.5 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500 text-sm bg-stone-50/50 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 hover:from-rose-600 hover:to-amber-600 text-white font-semibold text-sm shadow-lg shadow-rose-200 transition-all flex items-center justify-center gap-2 active:scale-98"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Gửi Lời Chúc Kèm Pháo Hoa 🎉</span>
                </button>
              </form>

            </div>
          </div>

          {/* Right: Wishes List */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-playfair text-xl font-bold text-stone-800">
                Những Lời Chúc Yêu Thương ({wishes.length})
              </h3>
              <span className="text-xs text-rose-600 font-medium">Bấm tim để thả tim lời chúc</span>
            </div>

            <div className="space-y-4 max-h-[700px] overflow-y-auto pr-2">
              {wishes.map((item) => (
                <div
                  key={item.id}
                  className="p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/80 shadow-sm hover:shadow-md transition-shadow space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-rose-400 to-amber-300 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                        {item.author.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className="font-bold text-stone-900 text-sm">{item.author}</h4>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500">
                          <span className="px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 font-medium border border-rose-100">
                            {item.role}
                          </span>
                          <span>• {item.date}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleLikeWish(item.id)}
                      className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-semibold transition-colors"
                    >
                      <Heart className="w-3.5 h-3.5 fill-rose-500" />
                      <span>{item.likes}</span>
                    </button>
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed font-sans">
                    {item.content}
                  </p>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

