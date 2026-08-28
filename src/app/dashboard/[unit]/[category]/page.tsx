"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import TechChecklistTable from "@/components/TechChecklistTable";

export default function ChecklistPage() {
  const params = useParams();
  const categoryParam = params?.category as string;

  return (
    <div className="w-full h-full bg-[#F4F3EF] p-6 md:p-10 overflow-y-auto text-zinc-900 pb-20">

      <TechChecklistTable categoryId={categoryParam} />
    </div>
  );
}
