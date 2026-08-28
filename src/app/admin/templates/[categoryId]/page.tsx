"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Save, GripVertical, FileText, CheckCircle, X, Eye } from "lucide-react";
import { TechChecklistGroup, TechChecklistItem, mockTechChecklist } from "@/data/techChecklist";
import { mockSmsChecklist } from "@/data/smsChecklist";
import { defaultCategories } from "@/data/categories";
import { useParams, useRouter } from "next/navigation";

export default function TemplateBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const categoryId = params.categoryId as string;
  const storageKey = `checklistData-${categoryId}`;

  const [groups, setGroups] = useState<TechChecklistGroup[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [catTitle, setCatTitle] = useState("");

  useEffect(() => {
    // Lookup title for header
    const savedCats = localStorage.getItem("adminCategories");
    const allCats = savedCats ? JSON.parse(savedCats) : defaultCategories;
    const found = allCats.find((c: any) => c.id === categoryId);
    if (found) setCatTitle(found.title);

    const loadTemplate = async () => {
      try {
        const res = await fetch(`/api/templates/load?categoryId=${categoryId}`);
        const result = await res.json();
        
        let initialData: TechChecklistGroup[] = [];
        if (result.data && result.data.length > 0) {
          initialData = result.data;
        } else {
          // Fallback to mock data if DB is empty
          if (categoryId === "quan-ly-ky-thuat") initialData = [...mockTechChecklist];
          else if (categoryId === "quan-ly-an-toan-sms") initialData = [...mockSmsChecklist];
          else if (categoryId === "an-toan-ve-sinh") initialData = [...mockAtvsldChecklist];
          else if (categoryId === "phong-chay-chua-chay") initialData = [...mockPcccChecklist];
          else if (categoryId === "phong-chong-thien-tai") initialData = [...mockPcttChecklist];
          else if (categoryId === "an-toan-thong-tin") initialData = [...mockAtttChecklist];
          else if (categoryId === "bao-tri-cong-trinh") initialData = [...mockBtctChecklist];
        }
        
        // Auto-migrate old string formats to new newline-separated format
        const migratedData = initialData.map(group => ({
          ...group,
          items: group.items.map(item => {
            let opts = item.statusOptions || "";
            if (opts.toLowerCase() === "có không") opts = "Có\nKhông";
            else if (opts.toLowerCase() === "đạt không đạt" || opts.toLowerCase() === "đạt k.đạt") opts = "Đạt\nKhông đạt";
            else if (opts.toLowerCase() === "tốt chưa tốt") opts = "Tốt\nChưa tốt";
            else if (opts.toLowerCase() === "đáp ứng chưa đáp ứng") opts = "Đáp ứng\nChưa đáp ứng";
            else if (opts.toLowerCase() === "đáp ứng thừa") opts = "Đáp ứng\nThừa\nThiếu";
            else if (opts.toLowerCase() === "đủ k.đủ") opts = "Đủ\nKhông đủ";
            else if (opts.toLowerCase() === "hợp lý chưa hợp lý") opts = "Hợp lý\nChưa hợp lý";
            
            return { ...item, statusOptions: opts };
          })
        }));

        setGroups(migratedData);
      } catch (err) {
        console.error("Lỗi khi load template từ DB", err);
      }
    };

    loadTemplate();
  }, [categoryId, storageKey]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const res = await fetch('/api/templates/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          categoryId,
          groups
        })
      });

      if (!res.ok) throw new Error("Lỗi khi lưu DB");

      // Cập nhật localStorage để tương thích ngược cho một số trang chưa kịp đổi API
      localStorage.setItem(storageKey, JSON.stringify(groups));
      if (categoryId === "quan-ly-ky-thuat") {
        localStorage.setItem("techChecklistData", JSON.stringify(groups));
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error("Lỗi lưu mẫu DB:", err);
      alert("Đã xảy ra lỗi khi lưu biểu mẫu vào cơ sở dữ liệu!");
    } finally {
      setIsSaving(false);
    }
  };

  const addGroup = () => {
    const newGroup: TechChecklistGroup = {
      id: `group-${Date.now()}`,
      order: groups.length + 1,
      title: "Nhóm kiểm tra mới",
      items: []
    };
    setGroups([...groups, newGroup]);
  };

  const deleteGroup = (groupId: string) => {
    if (confirm("Bạn có chắc muốn xóa toàn bộ nhóm này và các hạng mục bên trong?")) {
      setGroups(groups.filter(g => g.id !== groupId));
    }
  };

  const updateGroupTitle = (groupId: string, newTitle: string) => {
    setGroups(groups.map(g => g.id === groupId ? { ...g, title: newTitle } : g));
  };

  const addItem = (groupId: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        const newItem: TechChecklistItem = {
          id: `item-${Date.now()}`,
          orderIndex: `${g.order}.${g.items.length + 1}`,
          title: "Hạng mục kiểm tra mới",
          statusOptions: "có\nkhông",
          status: null,
          reference: "",
          note: "",
          evidencePdf: null,
          evidenceImg: null
        };
        return { ...g, items: [...g.items, newItem] };
      }
      return g;
    }));
  };

  const deleteItem = (groupId: string, itemId: string) => {
    if (confirm("Bạn có chắc muốn xóa hạng mục này?")) {
      setGroups(groups.map(g => {
        if (g.id === groupId) {
          return { ...g, items: g.items.filter(i => i.id !== itemId) };
        }
        return g;
      }));
    }
  };

  const updateItem = (groupId: string, itemId: string, field: keyof TechChecklistItem, value: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(i => i.id === itemId ? { ...i, [field]: value } : i)
        };
      }
      return g;
    }));
  };

  const addRef = (groupId: string, itemId: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(i => {
            if (i.id === itemId) {
              const currentRefs = i.reference ? i.reference.split('\n') : [];
              return { ...i, reference: [...currentRefs, "- Tài liệu mới"].join('\n') };
            }
            return i;
          })
        };
      }
      return g;
    }));
  };

  const updateRef = (groupId: string, itemId: string, index: number, value: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(i => {
            if (i.id === itemId) {
              const currentRefs = i.reference ? i.reference.split('\n') : [];
              currentRefs[index] = value;
              return { ...i, reference: currentRefs.join('\n') };
            }
            return i;
          })
        };
      }
      return g;
    }));
  };

  const removeRef = (groupId: string, itemId: string, index: number) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(i => {
            if (i.id === itemId) {
              const currentRefs = i.reference ? i.reference.split('\n') : [];
              currentRefs.splice(index, 1);
              return { ...i, reference: currentRefs.join('\n') };
            }
            return i;
          })
        };
      }
      return g;
    }));
  };

  const addStatusOpt = (groupId: string, itemId: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(i => {
            if (i.id === itemId) {
              const currentOpts = i.statusOptions ? i.statusOptions.split('\n') : [];
              return { ...i, statusOptions: [...currentOpts, "Tùy chọn mới"].join('\n') };
            }
            return i;
          })
        };
      }
      return g;
    }));
  };

  const updateStatusOpt = (groupId: string, itemId: string, index: number, value: string) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(i => {
            if (i.id === itemId) {
              const currentOpts = i.statusOptions ? i.statusOptions.split('\n') : [];
              currentOpts[index] = value;
              return { ...i, statusOptions: currentOpts.join('\n') };
            }
            return i;
          })
        };
      }
      return g;
    }));
  };

  const removeStatusOpt = (groupId: string, itemId: string, index: number) => {
    setGroups(groups.map(g => {
      if (g.id === groupId) {
        return {
          ...g,
          items: g.items.map(i => {
            if (i.id === itemId) {
              const currentOpts = i.statusOptions ? i.statusOptions.split('\n') : [];
              currentOpts.splice(index, 1);
              return { ...i, statusOptions: currentOpts.join('\n') };
            }
            return i;
          })
        };
      }
      return g;
    }));
  };

  return (
    <div className="p-6 md:p-10 pb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold text-zinc-900 tracking-tight mb-2">Quản trị biểu mẫu</h1>
          <p className="text-zinc-600 font-medium">Đang chỉnh sửa: <span className="font-bold text-red-600">{catTitle || categoryId}</span></p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => router.push(`/dashboard/tuh/${categoryId}`)}
            className="flex items-center gap-2 bg-white border border-[#E0DED5] hover:bg-[#F9F8F6] text-zinc-700 px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm"
          >
            <Eye size={20} />
            Xem thực tế
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[#C3CFA2] hover:bg-[#B3C092] text-zinc-900 px-6 py-3 rounded-xl font-semibold transition-colors shadow-sm disabled:opacity-70"
          >
            {isSaving ? (
               <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
            ) : saveSuccess ? (
               <CheckCircle size={20} className="text-emerald-700" />
            ) : (
               <Save size={20} />
            )}
            {isSaving ? "Đang lưu..." : saveSuccess ? "Đã lưu!" : "Lưu cấu hình"}
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {groups.map((group, groupIndex) => (
          <div key={group.id} className="bg-white border border-[#E0DED5] rounded-2xl shadow-sm overflow-hidden">
            {/* Group Header */}
            <div className="bg-[#EBE9E1] px-6 py-4 flex items-center gap-4">
              <GripVertical className="text-zinc-400 cursor-grab" size={20} />
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white font-bold text-zinc-800 shadow-sm border border-[#E0DED5]">
                {group.order}
              </div>
              <input 
                type="text" 
                value={group.title}
                onChange={(e) => updateGroupTitle(group.id, e.target.value)}
                className="flex-1 bg-transparent font-bold text-lg text-zinc-900 border-b border-transparent focus:border-[#C3CFA2] focus:outline-none px-2 py-1"
                placeholder="Tên nhóm đầu mục chính..."
              />
              <button 
                onClick={() => deleteGroup(group.id)}
                className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors"
                title="Xóa nhóm"
              >
                <Trash2 size={18} />
              </button>
            </div>

            {/* Items List */}
            <div className="divide-y divide-[#E0DED5]">
              {group.items.map((item, itemIndex) => (
                <div key={item.id} className="p-6 flex flex-col xl:flex-row gap-6 hover:bg-[#F9F8F6] transition-colors">
                  <div className="flex items-start gap-4 xl:w-1/4">
                    <div className="font-semibold text-zinc-500 mt-2 min-w-[28px]">{item.orderIndex}</div>
                    <div className="flex-1">
                      <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1 block">Tên hạng mục</label>
                      <textarea 
                        value={item.title}
                        onChange={(e) => updateItem(group.id, item.id, 'title', e.target.value)}
                        className="w-full bg-white border border-[#E0DED5] rounded-xl px-4 py-2 font-medium text-zinc-900 focus:border-[#C3CFA2] focus:ring-1 focus:ring-[#C3CFA2] outline-none min-h-[100px] resize-y leading-relaxed"
                        placeholder="VD: ANNEX 10..."
                      />
                    </div>
                  </div>
                  
                  <div className="xl:w-1/4">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Tùy chọn hiện trạng</label>
                    <div className="space-y-2">
                      {(item.statusOptions ? item.statusOptions.split('\n') : []).map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input 
                            value={opt}
                            onChange={(e) => updateStatusOpt(group.id, item.id, idx, e.target.value)}
                            className="flex-1 bg-white border border-[#E0DED5] rounded-lg px-3 py-1.5 text-sm text-zinc-700 focus:border-[#C3CFA2] focus:ring-1 focus:ring-[#C3CFA2] outline-none"
                          />
                          <button 
                            onClick={() => removeStatusOpt(group.id, item.id, idx)}
                            className="text-red-400 hover:text-red-600 transition-colors p-1 shrink-0"
                            title="Xóa tùy chọn"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => addStatusOpt(group.id, item.id)}
                        className="text-xs font-medium text-[#7A8A4B] hover:text-zinc-900 flex items-center gap-1 mt-2 transition-colors py-1"
                      >
                        <Plus size={14} /> Thêm tùy chọn
                      </button>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 block">Tài liệu tham chiếu</label>
                    <div className="space-y-2">
                      {(item.reference ? item.reference.split('\n') : []).map((ref, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <input 
                            value={ref}
                            onChange={(e) => updateRef(group.id, item.id, idx, e.target.value)}
                            className="flex-1 bg-white border border-[#E0DED5] rounded-lg px-3 py-1.5 text-sm text-zinc-700 focus:border-[#C3CFA2] focus:ring-1 focus:ring-[#C3CFA2] outline-none"
                          />
                          <button 
                            onClick={() => removeRef(group.id, item.id, idx)}
                            className="text-red-400 hover:text-red-600 transition-colors p-1 shrink-0"
                            title="Xóa tài liệu"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => addRef(group.id, item.id)}
                        className="text-xs font-medium text-[#7A8A4B] hover:text-zinc-900 flex items-center gap-1 mt-2 transition-colors py-1"
                      >
                        <Plus size={14} /> Thêm tài liệu
                      </button>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <button 
                      onClick={() => deleteItem(group.id, item.id)}
                      className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-colors mt-6 shrink-0"
                      title="Xóa hạng mục"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}

              <div className="p-4 bg-[#F9F8F6] flex justify-center">
                <button 
                  onClick={() => addItem(group.id)}
                  className="flex items-center gap-2 text-[#7A8A4B] hover:bg-[#EBE9E1] px-4 py-2 rounded-lg font-semibold transition-colors"
                >
                  <Plus size={18} />
                  Thêm hạng mục phụ
                </button>
              </div>
            </div>
          </div>
        ))}

        <button 
          onClick={addGroup}
          className="w-full border-2 border-dashed border-[#C3CFA2] text-[#7A8A4B] rounded-2xl p-6 flex flex-col items-center justify-center gap-2 hover:bg-[#F9F8F6] transition-colors"
        >
          <div className="w-12 h-12 rounded-full bg-[#EBE9E1] flex items-center justify-center">
            <Plus size={24} />
          </div>
          <span className="font-bold text-lg">Thêm nhóm đầu mục mới</span>
        </button>
      </div>
    </div>
  );
}
