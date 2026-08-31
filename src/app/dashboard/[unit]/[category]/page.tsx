"use client";

import { ViewTransition } from "react";
import { useParams } from "next/navigation";
import TechChecklistTable from "@/components/TechChecklistTable";

export default function ChecklistPage() {
  const params = useParams();
  const unitParam = params?.unit as string;
  const categoryParam = params?.category as string;

  return (
    <ViewTransition
      enter={{ "checklist-navigation": "checklist-page-fade", default: "none" }}
      exit={{ "checklist-navigation": "checklist-page-fade", default: "none" }}
      default="none"
    >
      <div className="w-full h-full bg-gradient-to-b from-[#EBF3FC] via-[#F1F6FD] to-[#E6F0FA] p-6 md:p-10 overflow-y-auto text-slate-800 pb-20 pt-6">
        <TechChecklistTable key={`${unitParam}-${categoryParam}`} categoryId={categoryParam} />
      </div>
    </ViewTransition>
  );
}
