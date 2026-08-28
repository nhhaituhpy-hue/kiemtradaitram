export interface CategoryData {
  id: string;
  title: string;
  shortTitle: string;
  subtitle: string;
  iconName: string;
  color: string;
  hoverColor: string;
  gradient: string;
  bgImage: string;
}

export const defaultCategories: CategoryData[] = [
  {
    id: "quan-ly-ky-thuat",
    title: "Quản lý kỹ thuật",
    shortTitle: "QLKT",
    subtitle: "TECHNICAL MANAGEMENT",
    iconName: "ShieldCheck",
    color: "bg-[#F4F3EF]",
    hoverColor: "bg-[#C3CFA2]/30",
    gradient: "from-[#F4F3EF] to-transparent",
    bgImage: "/images/tech_management.jpg",
  },
  {
    id: "quan-ly-an-toan-sms",
    title: "Quản lý an toàn (SMS)",
    shortTitle: "SMS",
    subtitle: "SAFETY MANAGEMENT SYSTEM",
    iconName: "ShieldAlert",
    color: "bg-[#F4F3EF]",
    hoverColor: "bg-[#C3CFA2]/30",
    gradient: "from-[#F4F3EF] to-transparent",
    bgImage: "/images/safety_management.jpg",
  },
  {
    id: "an-toan-ve-sinh",
    title: "An toàn - Vệ sinh - Lao động",
    shortTitle: "ATVSLĐ",
    subtitle: "OCCUPATIONAL HEALTH & SAFETY",
    iconName: "HardHat",
    color: "bg-[#F4F3EF]",
    hoverColor: "bg-[#C3CFA2]/30",
    gradient: "from-[#F4F3EF] to-transparent",
    bgImage: "/images/occupational_safety.jpg",
  },
  {
    id: "phong-chay-chua-chay",
    title: "Phòng cháy chữa cháy - Cứu nạn cứu hộ",
    shortTitle: "PCCC-CNCH",
    subtitle: "FIRE FIGHTING & RESCUE",
    iconName: "Flame",
    color: "bg-[#F4F3EF]",
    hoverColor: "bg-[#C3CFA2]/30",
    gradient: "from-[#F4F3EF] to-transparent",
    bgImage: "/images/fire_rescue.jpg",
  },
  {
    id: "phong-chong-thien-tai",
    title: "Phòng chống thiên tai",
    shortTitle: "PCTT",
    subtitle: "DISASTER PREVENTION",
    iconName: "Waves",
    color: "bg-[#F4F3EF]",
    hoverColor: "bg-[#C3CFA2]/30",
    gradient: "from-[#F4F3EF] to-transparent",
    bgImage: "/images/disaster_prevention.jpg",
  },
  {
    id: "an-toan-thong-tin",
    title: "An toàn an ninh thông tin",
    shortTitle: "ATANTT",
    subtitle: "INFORMATION SECURITY",
    iconName: "Shield",
    color: "bg-[#F4F3EF]",
    hoverColor: "bg-[#C3CFA2]/30",
    gradient: "from-[#F4F3EF] to-transparent",
    bgImage: "/images/information_security.jpg",
  },
  {
    id: "bao-tri-cong-trinh",
    title: "Quản lý & Bảo trì công trình hàng không",
    shortTitle: "Bảo trì",
    subtitle: "AVIATION INFRASTRUCTURE MAINTENANCE",
    iconName: "Building2",
    color: "bg-[#F4F3EF]",
    hoverColor: "bg-[#C3CFA2]/30",
    gradient: "from-[#F4F3EF] to-transparent",
    bgImage: "/images/aviation_construction.jpg"
  }
];
