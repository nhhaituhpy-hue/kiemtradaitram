"use client";

import { LogOut, Settings } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const params = useParams();

  // Basic map for unit names
  const unitNames: Record<string, string> = {
    tuh: "Đài DVOR/DME Tuy Hòa",
    tsn: "Đài DVOR/DME Tân Sơn Nhất",
    // other units can be added here
  };
  
  // Need to unwrap params in Next.js 15+ if needed, but in 14 it's fine.
  // We'll safely get unit string using useParams.
  const unitParam = params?.unit as string;
  const unitCode = unitParam?.toLowerCase() || "tuh";
  const unitName = unitNames[unitCode] || `Đài DVOR/DME ${unitCode.toUpperCase()}`;

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; max-age=0";
    router.push("/");
  };

  return (
    <div className="h-screen flex flex-col bg-[#F4F3EF] text-zinc-900 font-sans overflow-hidden">
      {/* Header */}
      <header className="h-16 border-b border-[#E0DED5] bg-[#F4F3EF]/90 backdrop-blur-md flex items-center justify-between px-6 z-50 absolute top-0 w-full">
        <div className="flex items-center gap-2">
          <h1 className="text-lg font-semibold tracking-tight drop-shadow-sm">
            <span className="text-red-600">A</span>
            <span className="text-blue-700">TTECH</span>
          </h1>
          <span className="hidden sm:inline-block ml-3 text-sm font-medium text-zinc-600">
            Công ty TNHH Kỹ thuật Quản lý bay
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-sm font-medium px-4 py-1.5 rounded-full bg-white border border-[#E0DED5] text-zinc-800 shadow-sm">
            {unitName}
          </div>
          <button 
            onClick={() => router.push('/admin/templates')}
            className="p-2 rounded-full hover:bg-[#E0DED5] transition-colors text-zinc-500 hover:text-zinc-900"
            title="Quản trị hệ thống"
          >
            <Settings size={18} />
          </button>
          <button 
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-[#E0DED5] transition-colors text-zinc-500 hover:text-zinc-900"
            title="Đăng xuất"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="h-[calc(100vh-4rem)] w-full relative mt-16 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
