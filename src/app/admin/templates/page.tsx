"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { defaultCategories } from "@/data/categories";

export default function AdminIndexRedirect() {
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("adminCategories");
    let cats = defaultCategories;
    if (saved) {
      try {
        cats = JSON.parse(saved);
      } catch (e) {}
    }
    const firstCat = cats[0]?.id || "quan-ly-ky-thuat";
    router.replace(`/admin/templates/${firstCat}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-8 h-8 border-4 border-[#C3CFA2] border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
