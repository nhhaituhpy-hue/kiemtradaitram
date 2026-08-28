"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Settings, Plus, FileSignature, Home } from "lucide-react";
import { CategoryData, defaultCategories } from "@/data/categories";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [categories, setCategories] = useState<CategoryData[]>(defaultCategories);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const saved = localStorage.getItem("adminCategories");
    if (saved) {
      try {
        let parsed: CategoryData[] = JSON.parse(saved);
        let updated = false;
        
        // Ensure new default categories (like SMS) are added if missing
        defaultCategories.forEach((defCat, index) => {
          if (!parsed.find(c => c.id === defCat.id)) {
            parsed.splice(index, 0, defCat);
            updated = true;
          }
        });
        
        if (updated) {
          localStorage.setItem("adminCategories", JSON.stringify(parsed));
        }
        setCategories(parsed);
      } catch (e) {
        setCategories(defaultCategories);
      }
    } else {
      setCategories(defaultCategories);
    }
  }, []);

  const handleAddTemplate = () => {
    const title = window.prompt("Nhập tên lĩnh vực mới (VD: Quản lý an toàn SMS):");
    if (!title) return;
    
    const newId = title.toLowerCase().replace(/[^a-z0-9đ]+/g, '-').replace(/(^-|-$)/g, '') || `template-${Date.now()}`;
    
    const newCat: CategoryData = {
      id: newId,
      title: title,
      shortTitle: title.substring(0, 5).toUpperCase(),
      subtitle: "NEW TEMPLATE",
      iconName: "FileSignature",
      color: "bg-[#F4F3EF]",
      hoverColor: "bg-[#C3CFA2]/30",
      gradient: "from-[#F4F3EF] to-transparent",
      bgImage: "", // default empty
    };
    
    const updated = [...categories, newCat];
    setCategories(updated);
    localStorage.setItem("adminCategories", JSON.stringify(updated));
    router.push(`/admin/templates/${newId}`);
  };

  return (
    <div className="min-h-screen bg-[#F4F3EF] flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-[#E0DED5] flex flex-col h-auto md:h-screen sticky top-0">
        <div className="p-6 border-b border-[#E0DED5] flex items-center gap-3">
          <Settings className="text-[#7A8A4B]" size={28} />
          <div>
            <h1 className="font-bold text-lg text-zinc-800 leading-tight">Admin</h1>
            <p className="text-xs text-zinc-500 font-medium">Hệ thống quản trị</p>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <div className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-3 px-4 mt-2">
            Danh mục Templates
          </div>
          
          {isMounted && categories.map((cat) => {
            const href = `/admin/templates/${cat.id}`;
            const isActive = pathname === href;
            return (
              <Link
                key={cat.id}
                href={href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-colors ${
                  isActive
                    ? "bg-[#EBE9E1] text-[#7A8A4B]"
                    : "text-zinc-600 hover:bg-[#F9F8F6] hover:text-zinc-900"
                }`}
              >
                <FileSignature size={18} />
                <span className="truncate">{cat.shortTitle || cat.title} Template</span>
              </Link>
            );
          })}

          <button
            onClick={handleAddTemplate}
            className="w-full mt-4 flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-[#7A8A4B] hover:bg-[#F9F8F6] transition-colors border border-dashed border-[#C3CFA2]"
          >
            <Plus size={18} />
            Thêm Template
          </button>
        </nav>

        <div className="p-4 border-t border-[#E0DED5] space-y-2">
          <Link
            href="/dashboard/tuh"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-zinc-600 hover:bg-[#F9F8F6] hover:text-[#7A8A4B] transition-colors"
          >
            <Home size={20} />
            Về Landing Page
          </Link>
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-zinc-600 hover:bg-[#F9F8F6] hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
            Đăng xuất
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 h-screen overflow-hidden relative">
        <div className="h-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
