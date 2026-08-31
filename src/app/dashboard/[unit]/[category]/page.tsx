"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TechChecklistTable from "@/components/TechChecklistTable";

export default function ChecklistPage() {
  const params = useParams();
  const categoryParam = params?.category as string;

  return (
    <div className="w-full h-full bg-gradient-to-b from-[#EBF3FC] via-[#F1F6FD] to-[#E6F0FA] p-6 md:p-10 overflow-y-auto text-slate-800 pb-20 pt-6">
      <TechChecklistTable categoryId={categoryParam} />
    </div>
  );
}
