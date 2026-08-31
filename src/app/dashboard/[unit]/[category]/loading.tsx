import { ViewTransition } from "react";
import ChecklistTableSkeleton from "@/components/ChecklistTableSkeleton";

export default function ChecklistLoading() {
  return (
    <ViewTransition
      enter={{ "checklist-navigation": "checklist-page-fade", default: "none" }}
      exit={{ "checklist-navigation": "checklist-page-fade", default: "none" }}
      default="none"
    >
      <div className="h-full w-full overflow-y-auto bg-gradient-to-b from-[#EBF3FC] via-[#F1F6FD] to-[#E6F0FA] p-6 pb-20 pt-6 text-slate-800 md:p-10">
        <ChecklistTableSkeleton />
      </div>
    </ViewTransition>
  );
}
