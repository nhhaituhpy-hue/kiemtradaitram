# Quản lý hồ sơ đài trạm (ATTECH)
> Hệ thống quản lý và kiểm tra hồ sơ kỹ thuật, an toàn và bảo trì đài trạm hàng không.

## Overview
Ứng dụng quản lý hồ sơ kỹ thuật dành cho Công ty TNHH Kỹ thuật Quản lý bay (ATTECH). Cho phép cán bộ, kỹ thuật viên truy cập hồ sơ kiểm tra đài trạm (DVOR/DME Tuy Hòa, Tân Sơn Nhất,...) với giao diện hiện đại phong cách tủ hồ sơ hàng không và hiệu ứng lắp ghép cơ khí.

## Architecture & Stack
- Frontend: Next.js 16 (App Router), React 19, Tailwind CSS v4, Framer Motion
- Icons & UI: Lucide React, Canvas 2D/3D Parallax & Global Flight Maps
- Backend: Next.js API Routes, Prisma ORM, AWS S3 Client
- Hosting: Docker / Cloudflare / Node server

## Directory Structure
```
kiemtra/
├── src/
│   ├── app/
│   │   ├── page.tsx               # Login Page với nền 3D & hiệu ứng mở tủ
│   │   ├── dashboard/             # Dashboard đài trạm (Theme Xanh Navy)
│   │   └── admin/                 # Quản trị biểu mẫu & template
│   ├── components/
│   │   ├── TechnicalArchiveBackground.tsx   # Nền 3D tủ hồ sơ kỹ thuật (Trà nâu)
│   │   ├── AviationVaultLock.tsx            # Ổ khóa xoay vặn & cửa tủ 3D
│   │   ├── AviationFlightMapBackground.tsx  # Nền đường bay toàn cầu & lưới kinh vĩ độ
│   │   └── TechChecklistTable.tsx
│   └── data/
├── public/
└── README.md
```

## Progress
| Phase | Summary | Status |
|---|---|---|
| 1 | Global Continents Vector Map & Intercontinental Flight Routes | ✅ Done |
| 2 | Aviation Vault Combination Lock & 3D Doors in Soft Navy theme | ✅ Done |
| 3 | Login Page with Transparent Navy Glassmorphism Card & Flight Map theme | ✅ Done |
| 4 | Dashboard Constellation Network (Dedicated SEVEN_GON_LINE_POINTS for 7-gon wire) | ✅ Done |
| 5 | Clean Light Blue & White Theme for Checklist (Compact Sleek Buttons, Font Normal) | ✅ Done |

## Session Log
- [2026-08-31] Hoàn thành nâng cấp giao diện toàn diện: Tách riêng bảng SEVEN_GON_LINE_POINTS (Dòng 19-29) độc lập chuyên để vẽ đường 7 cạnh; bảng FIELD_CARD_POSITIONS để định vị thẻ; bỏ pill bọc tên đài trạm; trang Checklist xanh lam - trắng thanh lịch với các nút chức năng gọn gàng; thẻ login kính mờ; mở khóa tủ 3D.
