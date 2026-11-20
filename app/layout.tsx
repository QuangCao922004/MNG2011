import type { Metadata } from "next";
import { Playfair_Display, Plus_Jakarta_Sans, Dancing_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const dancingScript = Dancing_Script({
  subsets: ["latin", "vietnamese"],
  variable: "--font-dancing",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://chuc-mung-co-giang-20-11.vercel.app"),
  title: "Tri Ân 20/11 - Kính Chúc Cô Ma Ngân Giang | Mãi Trẻ Đẹp & Thành Công",
  description: "Trang web đặc biệt chúc mừng Ngày Nhà Giáo Việt Nam 20/11 gửi tới cô Ma Ngân Giang. Kính chúc cô thật nhiều sức khỏe, hạnh phúc, luôn trẻ trung và gặt hái ngàn vạn thành công rực rỡ!",
  keywords: ["Ma Ngân Giang", "Chúc mừng 20/11", "Ngày Nhà Giáo Việt Nam", "Tri ân cô giáo", "HCMUE"],
  openGraph: {
    title: "Tri Ân 20/11 - Kính Chúc Cô Ma Ngân Giang",
    description: "Kính chúc cô Ma Ngân Giang thật nhiều sức khỏe, hạnh phúc, thành công và mãi luôn trẻ đẹp!",
    images: ["/images/co-giang-50-nam.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${plusJakarta.variable} ${playfair.variable} ${dancingScript.variable} antialiased selection:bg-rose-500 selection:text-white`}
      >
        {children}
      </body>
    </html>
  );
}
