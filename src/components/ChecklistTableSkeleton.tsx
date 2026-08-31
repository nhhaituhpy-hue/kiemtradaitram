const skeletonRows = [
  { title: "w-11/12", status: "w-20", reference: "w-10/12", note: "w-8/12" },
  { title: "w-9/12", status: "w-16", reference: "w-11/12", note: "w-10/12" },
  { title: "w-10/12", status: "w-24", reference: "w-8/12", note: "w-7/12" },
  { title: "w-8/12", status: "w-20", reference: "w-full", note: "w-9/12" },
  { title: "w-11/12", status: "w-16", reference: "w-9/12", note: "w-8/12" },
  { title: "w-9/12", status: "w-24", reference: "w-11/12", note: "w-10/12" },
];

function SkeletonLine({ className = "w-full" }: { className?: string }) {
  return <div className={`h-3 rounded-full bg-slate-200/90 ${className}`} />;
}

export default function ChecklistTableSkeleton() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Đang tải danh sách kiểm tra"
      className="motion-safe:animate-pulse"
    >
      <span className="sr-only">Đang tải danh sách kiểm tra...</span>

      <div aria-hidden="true" className="mb-3 flex items-center justify-between gap-4">
        <div className="h-8 w-48 rounded-lg border border-slate-200/80 bg-white/90 shadow-sm" />
        <div className="h-8 w-36 rounded-lg bg-blue-300/70 shadow-sm" />
      </div>

      <div
        aria-hidden="true"
        className="overflow-hidden rounded-2xl border border-blue-200/80 bg-white shadow-[0_10px_35px_rgba(0,0,0,0.05)]"
      >
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-blue-200 bg-[#E3EFFB]">
                <th className="w-16 px-4 py-4"><SkeletonLine className="mx-auto w-5 bg-blue-200/90" /></th>
                <th className="w-64 px-4 py-4"><SkeletonLine className="w-36 bg-blue-200/90" /></th>
                <th className="w-32 px-4 py-4"><SkeletonLine className="w-20 bg-blue-200/90" /></th>
                <th className="w-64 px-4 py-4"><SkeletonLine className="w-32 bg-blue-200/90" /></th>
                <th className="w-48 px-4 py-4"><SkeletonLine className="w-20 bg-blue-200/90" /></th>
                <th className="w-24 px-4 py-4"><SkeletonLine className="mx-auto w-14 bg-blue-200/90" /></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
              <tr className="bg-[#EDF5FD]">
                <td className="border-r border-blue-200/60 px-4 py-4">
                  <SkeletonLine className="mx-auto w-4 bg-blue-200/80" />
                </td>
                <td colSpan={5} className="px-4 py-4">
                  <SkeletonLine className="w-72 bg-blue-200/80" />
                </td>
              </tr>

              {skeletonRows.map((row, index) => (
                <tr key={index} className="border-b border-slate-200/70 last:border-0">
                  <td className="border-r border-slate-200/70 px-4 py-5">
                    <SkeletonLine className="mx-auto w-4" />
                  </td>
                  <td className="border-r border-slate-200/70 px-4 py-5">
                    <div className="space-y-2.5">
                      <SkeletonLine className={row.title} />
                      <SkeletonLine className="w-7/12" />
                    </div>
                  </td>
                  <td className="border-r border-slate-200/70 px-4 py-5">
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded-full bg-slate-200/90" />
                      <SkeletonLine className={row.status} />
                    </div>
                  </td>
                  <td className="border-r border-slate-200/70 px-4 py-5">
                    <div className="space-y-2.5">
                      <SkeletonLine className={row.reference} />
                      <SkeletonLine className="w-7/12" />
                    </div>
                  </td>
                  <td className="border-r border-slate-200/70 px-4 py-5">
                    <SkeletonLine className={row.note} />
                  </td>
                  <td className="px-4 py-5">
                    <div className="mx-auto h-8 w-8 rounded-lg bg-slate-200/90" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
