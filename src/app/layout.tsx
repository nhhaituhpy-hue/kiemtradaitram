import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Cormorant Garamond Gnosis — Bản Việt hóa (self-hosted)
 * 
 * Weights đang dùng:
 *   - Light 300       → tiêu đề phụ, slogan, nội dung nhẹ
 *   - Light 300 Italic → nhấn mạnh thanh lịch
 *   - Regular 400     → tiêu đề chính
 *   - Regular 400 Italic → trích dẫn, chú thích
 *   - Medium 500      → thay thế Bold cho heading cần nhấn nhẹ
 *   - SemiBold 600    → dự phòng cho heading nổi bật
 * 
 * CSS variable: var(--font-cormorant)
 * Tailwind class: font-cormorant
 */
const cormorantGaramond = localFont({
  src: [
    {
      path: "../fonts/CormorantGaramondGnosis-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../fonts/CormorantGaramondGnosis-LightItalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "../fonts/CormorantGaramondGnosis-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/CormorantGaramondGnosis-Italic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "../fonts/CormorantGaramondGnosis-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../fonts/CormorantGaramondGnosis-MediumItalic.ttf",
      weight: "500",
      style: "italic",
    },
    {
      path: "../fonts/CormorantGaramondGnosis-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../fonts/CormorantGaramondGnosis-SemiBoldItalic.ttf",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-cormorant",
  display: "swap",
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const metadata: Metadata = {
  title: "Quản lý hồ sơ đài trạm",
  description: "Hệ thống quản lý hồ sơ đài trạm CNS",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${geistSans.variable} ${geistMono.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
