"use client";

import { ViewTransition } from "react";
import { LogOut, Settings } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import AviationFlightMapBackground from "@/components/AviationFlightMapBackground";

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

  const unitParam = params?.unit as string;
  const categoryParam = params?.category as string;
  const isChecklistPage = Boolean(categoryParam);
  const unitCode = unitParam?.toLowerCase() || "tuh";
  const unitName = unitNames[unitCode] || `Đài DVOR/DME ${unitCode.toUpperCase()}`;

  const handleLogout = () => {
    document.cookie = "auth_token=; path=/; max-age=0";
    router.push("/");
  };

  return (
    <div className={`h-screen flex flex-col ${isChecklistPage ? "bg-[#F0F5FA]" : "bg-[#070D1E]"} text-slate-800 font-sans overflow-hidden relative`}>
      {/* Global Flight Map Background only for main Dashboard, not for Checklist */}
      {!isChecklistPage && (
        <ViewTransition
          enter={{ "checklist-navigation": "checklist-page-fade", default: "none" }}
          exit={{ "checklist-navigation": "checklist-page-fade", default: "none" }}
          default="none"
        >
          <AviationFlightMapBackground />
        </ViewTransition>
      )}

      {/* Header with Dark Navy Glassmorphism */}
      <header className="dashboard-stable-header h-16 border-b border-blue-900/40 bg-[#070D1E]/85 backdrop-blur-xl flex items-center justify-between px-6 z-50 absolute top-0 w-full shadow-lg shadow-black/20">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-cormorant font-medium tracking-wide drop-shadow-md flex items-center">
            <span className="text-[#e63946] drop-shadow">A</span>
            <span className="text-blue-400 drop-shadow">TTECH</span>
          </h1>
          <span className="hidden sm:inline-block ml-3 text-xs font-medium text-blue-200/80 uppercase tracking-wider border-l border-blue-800/60 pl-3">
            Trung tâm Bảo đảm kỹ thuật
          </span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs font-mono font-medium text-cyan-300 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{unitName}</span>
          </div>
          <button
            onClick={() => router.push('/admin/templates')}
            className="p-2 rounded-full hover:bg-blue-900/40 text-blue-300 hover:text-white transition-all border border-transparent hover:border-blue-700/40 cursor-pointer"
            title="Quản trị hệ thống"
          >
            <Settings size={18} />
          </button>
          <button
            onClick={handleLogout}
            className="p-2 rounded-full hover:bg-red-950/40 text-blue-300 hover:text-red-400 transition-all border border-transparent hover:border-red-800/40 cursor-pointer"
            title="Đăng xuất"
          >
            <LogOut size={18} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="h-[calc(100vh-4rem)] w-full relative mt-16 overflow-hidden z-10">
        {children}
      </main>
    </div>
  );
}
