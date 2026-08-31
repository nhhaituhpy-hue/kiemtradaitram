"use client";

import React, { useState, useEffect, ViewTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useParams } from "next/navigation";
import { ArrowRight } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { CategoryData, defaultCategories } from "@/data/categories";

// =========================================================================================
// 📐 1️⃣ BẢNG TỌA ĐỘ 7 ĐIỂM ĐỂ VẼ ĐƯỜNG 7 CẠNH (BẠN CHỈNH TỌA ĐỘ ĐƯỜNG KẺ TẠI ĐÂY)
// =========================================================================================
// 📍 HỆ TRỤC TỌA ĐỘ (Lấy tâm màn hình TUH làm gốc 0, 0):
// - x > 0 : Dịch sang PHẢI (pixel)   |  x < 0 : Dịch sang TRÁI (pixel)
// - y > 0 : Dịch xuống DƯỚI (pixel)  |  y < 0 : Dịch lên TRÊN (pixel)
// =========================================================================================
export const SEVEN_GON_LINE_POINTS: { label: string; x: number; y: number }[] = [
  { label: "Điểm 1 (Đỉnh trên 12h00)", x: 0, y: -250 }, // 👈 Chỉnh tọa độ Điểm 1
  { label: "Điểm 2 (Phía trên bên phải)", x: 335, y: -100 }, // 👈 Chỉnh tọa độ Điểm 2
  { label: "Điểm 3 (Phía dưới bên phải)", x: 335, y: 20 }, // 👈 Chỉnh tọa độ Điểm 3
  { label: "Điểm 4 (Đáy bên phải)", x: 220, y: 240 }, // 👈 Chỉnh tọa độ Điểm 4
  { label: "Điểm 5 (Đáy bên trái)", x: -140, y: 240 }, // 👈 Chỉnh tọa độ Điểm 5
  { label: "Điểm 6 (Phía dưới bên trái)", x: -340, y: 50 }, // 👈 Chỉnh tọa độ Điểm 6
  { label: "Điểm 7 (Phía trên bên trái)", x: -340, y: -100 }, // 👈 Chỉnh tọa độ Điểm 7
];

// =========================================================================================
// 🗂️ 2️⃣ BẢNG TỌA ĐỘ VỊ TRÍ 7 THẺ LĨNH VỰC (CHỈNH VỊ TRÍ ĐẶT THẺ TẠI ĐÂY)
// =========================================================================================
export const FIELD_CARD_POSITIONS: Record<string, { label: string; x: number; y: number }> = {
  "quan-ly-ky-thuat": { label: "1. Quản lý kỹ thuật", x: -120, y: -310 },
  "quan-ly-an-toan-sms": { label: "2. Quản lý an toàn (SMS)", x: 215, y: -180 },
  "an-toan-ve-sinh": { label: "3. An toàn vệ sinh lao động", x: 200, y: -20 },
  "phong-chay-chua-chay": { label: "4. PCCC & Cứu nạn cứu hộ", x: 80, y: 140 },
  "phong-chong-thien-tai": { label: "5. Phòng chống thiên tai", x: -280, y: 160 },
  "an-toan-thong-tin": { label: "6. An toàn an ninh thông tin", x: -440, y: -10 },
  "bao-tri-cong-trinh": { label: "7. Quản lý & Bảo trì", x: -480, y: -180 },
};

// 3️⃣ TÙY CHỌN BẬT / TẮT ĐỒ HỌA ĐƯỜNG KẺ:
export const NETWORK_DISPLAY_CONFIG = {
  showConnections: true, // true: Bật đường 7 cạnh nối quanh 7 điểm
  showCenterSpokes: true, // true: Bật tia nối từ tâm TUH tới 7 điểm
  showAnchorDots: true, // true: Bật chấm tròn LED định vị tại 7 điểm
  fillPolygonArea: true, // true: Bật vùng màu mờ phát sáng bên trong hình 7 cạnh
};

export default function DashboardPage() {
  const params = useParams();
  const unitParam = (params?.unit as string) || "tuh";
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [categories, setCategories] = useState<CategoryData[]>(defaultCategories);

  useEffect(() => {
    const savedCats = localStorage.getItem("adminCategories");
    if (savedCats) {
      try {
        const parsed = JSON.parse(savedCats) as CategoryData[];
        if (parsed.length > 0) setCategories(parsed);
      } catch {
        // use default
      }
    }
  }, []);

  // Lấy danh sách 7 thẻ kèm vị trí thẻ
  const cardNodes = categories.slice(0, 7).map((category, index) => {
    const pos = FIELD_CARD_POSITIONS[category.id] || { x: 0, y: 0, label: category.title };
    return {
      category,
      index,
      x: pos.x,
      y: pos.y,
    };
  });

  // Đường Path hình 7 cạnh nối 7 điểm theo SEVEN_GON_LINE_POINTS
  const sevenGonSvgPath = SEVEN_GON_LINE_POINTS.map((pt) => `${pt.x},${pt.y}`).join(" L ");

  return (
    <ViewTransition
      enter={{ "checklist-navigation": "checklist-page-fade", default: "none" }}
      exit={{ "checklist-navigation": "checklist-page-fade", default: "none" }}
      default="none"
    >
    <div className="w-full h-full flex flex-col overflow-hidden bg-transparent items-center justify-center select-none relative">
      {/* Regular Heptagon Stage Centered on Screen */}
      <div className="relative w-full h-[calc(100vh-80px)] min-h-[580px] flex items-center justify-center">
        {/* SVG Network Connections & Center Spokes */}
        <svg
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 overflow-visible"
          width="1000"
          height="1000"
          viewBox="-500 -500 1000 1000"
        >
          <defs>
            <linearGradient id="networkGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.9" />
            </linearGradient>
            <filter id="netGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="glow" />
              <feComposite in="SourceGraphic" in2="glow" operator="over" />
            </filter>
          </defs>

          {/* Vùng mờ đa giác phát sáng nhẹ */}
          {NETWORK_DISPLAY_CONFIG.fillPolygonArea && sevenGonSvgPath && (
            <motion.path
              d={`M ${sevenGonSvgPath} Z`}
              fill="rgba(6, 182, 212, 0.04)"
              stroke="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
            />
          )}

          {/* Các tia Spoke nối từ tâm TUH (0,0) tới 7 điểm đỉnh */}
          {NETWORK_DISPLAY_CONFIG.showCenterSpokes &&
            SEVEN_GON_LINE_POINTS.map((pt, index) => (
              <line
                key={`spoke-point-${index}`}
                x1="0"
                y1="0"
                x2={pt.x}
                y2={pt.y}
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="1.2"
                strokeDasharray="3 4"
                className="transition-colors duration-300"
              />
            ))}

          {/* Đường kẻ 7 cạnh nối liền 7 điểm */}
          {NETWORK_DISPLAY_CONFIG.showConnections && sevenGonSvgPath && (
            <motion.path
              d={`M ${sevenGonSvgPath} Z`}
              fill="none"
              stroke="url(#networkGlow)"
              strokeWidth="2.4"
              filter="url(#netGlow)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          )}

          {/* Chấm tròn LED định vị tại 7 điểm đỉnh của đường kẻ */}
          {NETWORK_DISPLAY_CONFIG.showAnchorDots &&
            SEVEN_GON_LINE_POINTS.map((pt, index) => (
              <g key={`anchor-point-${index}`}>
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={5}
                  fill="none"
                  stroke="rgba(56, 189, 248, 0.4)"
                  strokeWidth="1"
                  strokeDasharray="2 2"
                />
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={3.5}
                  fill="#06b6d4"
                  stroke="#fff"
                  strokeWidth="1.2"
                  className="transition-all duration-300"
                />
              </g>
            ))}
        </svg>

        {/* Central Radar Navigation Hub: TUH 7 LĨNH VỰC */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none flex flex-col items-center justify-center text-center">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-cyan-400/40 bg-[#07132C]/90 backdrop-blur-xl flex flex-col items-center justify-center p-3 shadow-[0_0_35px_rgba(6,182,212,0.3)] relative">
            <div
              className="absolute inset-1 rounded-full border border-dashed border-cyan-500/30 animate-spin"
              style={{ animationDuration: "35s" }}
            />
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] mb-1 animate-pulse" />
            <span className="text-sm sm:text-base font-black tracking-widest text-white uppercase leading-none">
              {unitParam.toUpperCase()}
            </span>
            <span className="text-[8px] font-mono font-bold text-cyan-300 tracking-wider mt-1.5 uppercase">
              7 LĨNH VỰC
            </span>
          </div>
        </div>

        {/* 7 Thẻ lĩnh vực đặt tại 7 tọa độ cấu hình */}
        {cardNodes.map(({ category, index, x, y }) => {
          const isHovered = hoveredId === category.id;
          const Icon = (
            LucideIcons[category.iconName as keyof typeof LucideIcons] ||
            LucideIcons.Folder
          ) as React.ElementType;

          return (
            <motion.div
              key={category.id}
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: "spring",
                stiffness: 150,
              }}
              onMouseEnter={() => setHoveredId(category.id)}
              onMouseLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(category.id)}
              onBlur={() => setHoveredId(null)}
              className="absolute z-30"
            >
              {/* Equidistant Heptagon Vertex Card */}
              <Link
                href={`/dashboard/${unitParam}/${category.id}`}
                transitionTypes={["checklist-navigation"]}
                aria-label={`Mở danh mục kiểm tra ${category.title}`}
                className="block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07132C]"
              >
                <motion.div
                  animate={{
                    scale: isHovered ? 1.06 : 1,
                    y: isHovered ? -4 : 0,
                  }}
                  transition={{ duration: 0.2 }}
                  className={`relative w-52 sm:w-60 md:w-[250px] overflow-hidden rounded-2xl border ${isHovered
                    ? "border-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.55)]"
                    : "border-cyan-500/40 shadow-[0_10px_25px_rgba(0,0,0,0.6)]"
                    } p-3 transition-all duration-300 cursor-pointer group`}
                >
                  {/* Background Image of Category - Clear & Vivid */}
                  <div className="absolute inset-0 overflow-hidden bg-[#0A162D] pointer-events-none">
                    {category.bgImage && (
                      <Image
                        src={category.bgImage}
                        alt=""
                        fill
                        sizes="260px"
                        draggable={false}
                        className={`object-cover object-center transition-[opacity,transform] duration-500 ease-out ${isHovered ? "scale-110 opacity-90" : "scale-100 opacity-75"
                          }`}
                      />
                    )}
                  </div>

                  {/* Clear Vignette Overlay - Keeps Photo Vivid While Ensuring 100% Text Readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20 pointer-events-none" />

                  {/* Card Content Container */}
                  <div className="relative z-10">
                    {/* Top Badge: Short Code Tag */}
                    <div className="flex items-center justify-end mb-1 text-[9px] font-mono font-bold">
                      <span className="px-2 py-0.5 rounded bg-blue-950/80 border border-cyan-500/40 text-cyan-200 uppercase tracking-wider">
                        {category.shortTitle || `LĨNH VỰC ${index + 1}`}
                      </span>
                    </div>

                    {/* Icon & Category Title */}
                    <div className="flex items-start gap-2.5">
                      <div className="p-2 rounded-xl bg-blue-950/90 border border-cyan-500/40 text-cyan-300 shrink-0 group-hover:scale-110 transition-transform mt-0.5 shadow-sm">
                        <Icon size={17} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xs sm:text-[12.5px] font-bold text-white leading-snug drop-shadow group-hover:text-cyan-200 transition-colors">
                          {category.title}
                        </h3>
                        <p className="text-[8px] font-mono text-blue-300/85 uppercase tracking-wider mt-1 leading-tight">
                          {category.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Action Link Button */}
                    <div className="mt-2 pt-1.5 border-t border-blue-900/60 flex items-center justify-between text-[9.5px] font-bold text-cyan-300 group-hover:text-cyan-200">
                      <span>Kiểm tra danh mục</span>
                      <ArrowRight
                        size={12}
                        className="transform group-hover:translate-x-1 transition-transform"
                      />
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          );
        })}
      </div>
    </div>
    </ViewTransition>
  );
}
