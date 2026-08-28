"use client";

import React, { useState, useEffect, useRef } from "react";
import { FileText, Image as ImageIcon, X, Save, Check, Pen, Trash2, RefreshCw, Maximize, ArrowLeft } from "lucide-react";
import { TechChecklistGroup, mockTechChecklist } from "@/data/techChecklist";
import { mockSmsChecklist } from "@/data/smsChecklist";
import { mockAtvsldChecklist } from "@/data/atvsldChecklist";
import { mockPcccChecklist } from "@/data/pcccChecklist";
import { mockPcttChecklist } from "@/data/pcttChecklist";
import { mockAtttChecklist } from "@/data/atttChecklist";
import { mockBtctChecklist } from "@/data/btctChecklist";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

export default function TechChecklistTable({ categoryId = "quan-ly-ky-thuat" }: { categoryId?: string }) {
  const [data, setData] = useState<TechChecklistGroup[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"pdf" | "img" | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [activeRef, setActiveRef] = useState<string | null>(null);
  const [activeRefIdx, setActiveRefIdx] = useState<number | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingRef, setEditingRef] = useState<{ id: string, idx: number, value: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const params = useParams();
  const router = useRouter();
  const unitParam = params?.unit as string;

  const openModal = (group: any, item: any, type: "pdf" | "img", refText: string | undefined, refIdx: number) => {
    setActiveGroupId(group.id);
    setActiveItem(item);
    setModalType(type);
    setActiveRef(refText || null);
    setActiveRefIdx(refIdx);
    setModalOpen(true);
  };

  const storageKey = `checklistData-${categoryId}`;

  useEffect(() => {
    let saved = localStorage.getItem(storageKey);
    // fallback for the first demo compatibility
    if (!saved && categoryId === "quan-ly-ky-thuat") {
      saved = localStorage.getItem("techChecklistData");
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length === 0) {
          if (categoryId === "quan-ly-ky-thuat") setData(mockTechChecklist);
          else if (categoryId === "quan-ly-an-toan-sms") setData(mockSmsChecklist);
          else if (categoryId === "an-toan-ve-sinh") setData(mockAtvsldChecklist);
          else if (categoryId === "phong-chay-chua-chay") setData(mockPcccChecklist);
          else if (categoryId === "phong-chong-thien-tai") setData(mockPcttChecklist);
          else if (categoryId === "an-toan-thong-tin") setData(mockAtttChecklist);
          else if (categoryId === "bao-tri-cong-trinh") setData(mockBtctChecklist);
          else setData([]);
        } else {
          setData(parsed);
        }
      } catch (e) {
        console.error("Failed to parse saved data", e);
      }
    } else if (categoryId === "quan-ly-ky-thuat") {
      setData(mockTechChecklist);
    } else if (categoryId === "quan-ly-an-toan-sms") {
      setData(mockSmsChecklist);
    } else if (categoryId === "an-toan-ve-sinh") {
      setData(mockAtvsldChecklist);
    } else if (categoryId === "phong-chay-chua-chay") {
      setData(mockPcccChecklist);
    } else if (categoryId === "phong-chong-thien-tai") {
      setData(mockPcttChecklist);
    } else if (categoryId === "an-toan-thong-tin") {
      setData(mockAtttChecklist);
    } else if (categoryId === "bao-tri-cong-trinh") {
      setData(mockBtctChecklist);
    } else {
      setData([]);
    }
  }, [categoryId, storageKey]);

  const handleStatusChange = (groupId: string, itemId: string, status: string) => {
    setData((prevData) => {
      const newData = [...prevData];
      const groupIndex = newData.findIndex(g => g.id === groupId);
      if (groupIndex !== -1) {
        const itemIndex = newData[groupIndex].items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
          newData[groupIndex].items[itemIndex].status = status;
        }
      }
      return newData;
    });
  };

  const handleNoteChange = (groupId: string, itemId: string, newNote: string) => {
    setData((prevData) => {
      const newData = [...prevData];
      const groupIndex = newData.findIndex(g => g.id === groupId);
      if (groupIndex !== -1) {
        const itemIndex = newData[groupIndex].items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
          newData[groupIndex].items[itemIndex].note = newNote;
        }
      }
      return newData;
    });
  };

  const saveReferenceLine = (groupId: string, itemId: string, refIdx: number) => {
    if (!editingRef) return;
    setData((prevData) => {
      const newData = [...prevData];
      const groupIndex = newData.findIndex(g => g.id === groupId);
      if (groupIndex !== -1) {
        const itemIndex = newData[groupIndex].items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
          const item = newData[groupIndex].items[itemIndex];
          const refs = getReferences(item.reference);
          refs[refIdx] = editingRef.value;
          item.reference = refs.join('\n');
        }
      }
      return newData;
    });
    setEditingRef(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setTimeout(() => {
      setActiveItem(null);
      setActiveGroupId(null);
      setModalType(null);
      setActiveRef(null);
      setActiveRefIdx(null);
    }, 200);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeItem || !activeGroupId || !modalType || activeRefIdx === null) return;
    
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('categoryId', categoryId);
      formData.append('itemId', activeItem.id);
      formData.append('fileType', modalType);

      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const result = await res.json();

      if (!result.success) {
        alert('Upload thất bại: ' + (result.error || 'Unknown error'));
        return;
      }

      const now = new Date();
      const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

      setData((prevData) => {
        const newData = [...prevData];
        const groupIndex = newData.findIndex(g => g.id === activeGroupId);
        if (groupIndex !== -1) {
          const itemIndex = newData[groupIndex].items.findIndex(i => i.id === activeItem.id);
          if (itemIndex !== -1) {
            const field = modalType === "pdf" ? "evidencePdfs" : "evidenceImgs";
            const currentData = newData[groupIndex].items[itemIndex][field] || {};
            newData[groupIndex].items[itemIndex][field] = {
              ...currentData,
              [activeRefIdx]: { url: result.url, key: result.key, uploadedAt: timestamp }
            };
            setActiveItem(newData[groupIndex].items[itemIndex]);
          }
        }
        return newData;
      });
    } catch (err) {
      console.error('Upload error:', err);
      alert('Lỗi kết nối khi tải file lên.');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveFile = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeItem || !activeGroupId || !modalType || activeRefIdx === null) return;
    
    // Try to delete from MinIO if there's a storage key
    const field = modalType === "pdf" ? "evidencePdfs" : "evidenceImgs";
    const fileData = activeItem[field]?.[activeRefIdx];
    if (fileData?.key) {
      try {
        await fetch('/api/delete-file', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ key: fileData.key }),
        });
      } catch (err) {
        console.error('Delete from storage failed:', err);
      }
    }

    setData((prevData) => {
      const newData = [...prevData];
      const groupIndex = newData.findIndex(g => g.id === activeGroupId);
      if (groupIndex !== -1) {
        const itemIndex = newData[groupIndex].items.findIndex(i => i.id === activeItem.id);
        if (itemIndex !== -1) {
          const currentData = { ...(newData[groupIndex].items[itemIndex][field] || {}) };
          delete currentData[activeRefIdx];
          newData[groupIndex].items[itemIndex][field] = currentData;
          setActiveItem(newData[groupIndex].items[itemIndex]);
        }
      }
      return newData;
    });
  };

  const renderStatusRadios = (group: TechChecklistGroup, item: any) => {
    let opts = item.statusOptions 
      ? item.statusOptions.split('\n').map((o: string) => o.trim()).filter(Boolean) 
      : ["Có", "Không"];

    // Chuẩn hóa dữ liệu lỗi từ parse file docx
    const rawStatus = (item.statusOptions || "").toLowerCase().replace(/\s+/g, '');
    if (rawStatus.includes("cókhông") && rawStatus.includes("đủk.đủ")) {
      opts = ["Có", "Không", "Đủ", "Không đủ"];
    } else if (rawStatus.includes("cókhông")) {
      opts = ["Có", "Không"];
    }

    if (!item.statusOptions && categoryId === "an-toan-thong-tin") {
      opts = ["Đạt", "Không đạt"];
    }

    return (
      <div className="flex flex-col gap-2">
        {opts.map((opt: string) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group w-full">
            <input 
              type="radio" 
              name={`status-${item.id}`} 
              value={opt} 
              checked={item.status === opt}
              onChange={() => handleStatusChange(group.id, item.id, opt)}
              className="w-4 h-4 text-[#8a9a5b] bg-[#F4F3EF] border-[#E0DED5] focus:ring-[#C3CFA2] focus:ring-2 cursor-pointer shrink-0"
            />
            <span className="text-sm text-zinc-700 group-hover:text-zinc-900">{opt}</span>
          </label>
        ))}
      </div>
    );
  };

  const getReferences = (refString: string) => {
    if (!refString) return [];
    return refString.split('\n').map(r => r.trim()).filter(Boolean);
  };

  const extractUrl = (data: any) => {
    if (!data) return null;
    if (typeof data === 'string') return data;
    return data.url;
  };

  const extractTimestamp = (data: any) => {
    if (!data || typeof data === 'string') return null;
    return data.uploadedAt;
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    // Lưu vào localStorage để không mất khi F5
    localStorage.setItem(storageKey, JSON.stringify(data));
    if (categoryId === "quan-ly-ky-thuat") {
      localStorage.setItem("techChecklistData", JSON.stringify(data));
    }
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 1000);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button 
          onClick={() => router.push(`/dashboard/${unitParam}`)}
          className="flex items-center gap-2 text-zinc-600 hover:text-zinc-900 transition-colors font-medium"
        >
          <ArrowLeft size={20} />
          Quay lại bảng điều khiển
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-[#C3CFA2] hover:bg-[#B3C092] text-zinc-900 px-5 py-2.5 rounded-lg font-semibold transition-colors shadow-sm disabled:opacity-70"
        >
          {isSaving ? (
             <div className="w-5 h-5 border-2 border-zinc-900 border-t-transparent rounded-full animate-spin" />
          ) : saveSuccess ? (
             <Check size={18} className="text-emerald-700" />
          ) : (
             <Save size={18} />
          )}
          {isSaving ? "Đang lưu..." : saveSuccess ? "Đã lưu thành công" : "Lưu thay đổi"}
        </button>
      </div>

      <div className="bg-white border border-[#E0DED5] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-[#E0DED5] bg-[#F9F8F6]">
                <th className="px-4 py-4 text-sm font-semibold text-zinc-600 w-16 text-center">TT</th>
                <th className="px-4 py-4 text-sm font-semibold text-zinc-600 w-64">Nội dung, yêu cầu</th>
                <th className="px-4 py-4 text-sm font-semibold text-zinc-600 w-32">{categoryId === "an-toan-thong-tin" ? "Mức độ tuân thủ" : (categoryId === "bao-tri-cong-trinh" ? "Tình trạng" : "Hiện trạng")}</th>
                {categoryId !== "an-toan-thong-tin" && categoryId !== "bao-tri-cong-trinh" && (
                  <th className="px-4 py-4 text-sm font-semibold text-zinc-600 w-64">Tài liệu tham chiếu</th>
                )}
                <th className={`px-4 py-4 text-sm font-semibold text-zinc-600 ${(categoryId === "an-toan-thong-tin" || categoryId === "bao-tri-cong-trinh") ? "w-[28rem]" : "w-48"}`}>Ghi chú</th>
                <th className="px-4 py-4 text-sm font-semibold text-zinc-600 w-24 text-center">Bằng chứng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E0DED5]">
              {data.map((group) => (
                <React.Fragment key={group.id}>
                  {/* Main Category Row */}
                  {group.title && (
                    <tr className="bg-[#EBE9E1]/50">
                      <td className="px-4 py-3 font-bold text-zinc-800 text-center border-r border-[#E0DED5]/30">{group.order}</td>
                      <td colSpan={5} className="px-4 py-3 font-bold text-zinc-800">
                        {group.title}
                      </td>
                    </tr>
                  )}

                  {/* Sub Items */}
                  {group.items.map((item) => {
                    const refs = getReferences(item.reference);
                    const numRows = Math.max(1, refs.length);

                    return (
                      <React.Fragment key={item.id}>
                        {Array.from({ length: numRows }).map((_, idx) => (
                          <tr key={`${item.id}-${idx}`} className="group border-b border-[#E0DED5] last:border-0">
                            {idx === 0 && (
                              <>
                                <td rowSpan={numRows} className="px-4 py-3 text-sm text-zinc-500 font-medium text-center align-top pt-4 border-r border-[#E0DED5]/30">
                                  {item.orderIndex}
                                </td>
                                <td rowSpan={numRows} className="px-4 py-3 text-sm text-zinc-800 align-top pt-4 border-r border-[#E0DED5]/30">
                                  <div className="font-medium mb-1 whitespace-pre-wrap leading-relaxed">{item.title}</div>
                                </td>
                                <td rowSpan={numRows} className="px-4 py-3 align-top pt-4 border-r border-[#E0DED5]/30">
                                  {renderStatusRadios(group, item)}
                                </td>
                              </>
                            )}
                            
                            {categoryId !== "an-toan-thong-tin" && categoryId !== "bao-tri-cong-trinh" && (
                              <td className="px-4 py-3 text-xs text-zinc-600 align-top group/ref relative min-w-[200px] border-l border-[#E0DED5]/30">
                                {editingRef?.id === item.id && editingRef?.idx === idx ? (
                                  <div className="flex flex-col gap-2">
                                    <textarea
                                      autoFocus
                                      value={editingRef.value}
                                      onChange={(e) => setEditingRef({ ...editingRef, value: e.target.value })}
                                      className="w-full bg-white border border-[#C3CFA2] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#C3CFA2] min-h-[60px] resize-y text-xs text-zinc-800"
                                    />
                                    <div className="flex justify-end gap-2">
                                      <button 
                                        onClick={() => setEditingRef(null)}
                                        className="text-[11px] font-semibold text-zinc-500 hover:text-zinc-800 px-2 py-1.5 transition-colors"
                                      >
                                        Hủy
                                      </button>
                                      <button 
                                        onClick={() => saveReferenceLine(group.id, item.id, idx)}
                                        className="text-[11px] font-semibold bg-[#C3CFA2] text-zinc-900 px-3 py-1.5 rounded hover:bg-[#B3C092] transition-colors"
                                      >
                                        Lưu
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="whitespace-pre-wrap leading-relaxed min-h-[40px] pb-6">
                                    {refs[idx] || item.reference}
                                    <button 
                                      onClick={() => setEditingRef({ id: item.id, idx, value: refs[idx] || item.reference })}
                                      className="absolute bottom-2 right-2 p-1.5 text-zinc-400 hover:text-[#7A8A4B] hover:bg-[#EBE9E1] rounded opacity-0 group-hover/ref:opacity-100 transition-all"
                                      title="Chỉnh sửa tài liệu"
                                    >
                                      <Pen size={14} />
                                    </button>
                                  </div>
                                )}
                              </td>
                            )}
                            
                            {idx === 0 && (
                              <td rowSpan={numRows} className={`px-4 py-3 text-xs text-zinc-600 align-top border-l border-[#E0DED5]/30 group/note relative ${(categoryId === "an-toan-thong-tin" || categoryId === "bao-tri-cong-trinh") ? "min-w-[400px]" : "min-w-[200px]"}`}>
                                {editingNoteId === item.id ? (
                                  <div className="flex flex-col gap-2">
                                    <textarea
                                      autoFocus
                                      value={item.note || ""}
                                      onChange={(e) => handleNoteChange(group.id, item.id, e.target.value)}
                                      className="w-full bg-white border border-[#C3CFA2] rounded p-2 focus:outline-none focus:ring-1 focus:ring-[#C3CFA2] min-h-[80px] resize-y text-xs text-zinc-800"
                                    />
                                    <div className="flex justify-end">
                                      <button 
                                        onClick={() => setEditingNoteId(null)}
                                        className="text-[11px] font-semibold bg-[#C3CFA2] text-zinc-900 px-3 py-1.5 rounded hover:bg-[#B3C092] transition-colors"
                                      >
                                        Lưu ghi chú
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="whitespace-pre-wrap leading-relaxed min-h-[40px] pb-6">
                                    {item.note || <span className="text-zinc-400 italic">Chưa có ghi chú...</span>}
                                    <button 
                                      onClick={() => setEditingNoteId(item.id)}
                                      className="absolute bottom-2 right-2 p-1.5 text-zinc-400 hover:text-[#7A8A4B] hover:bg-[#EBE9E1] rounded opacity-0 group-hover/note:opacity-100 transition-all"
                                      title="Chỉnh sửa ghi chú"
                                    >
                                      <Pen size={14} />
                                    </button>
                                  </div>
                                )}
                              </td>
                            )}
                            
                            {(() => {
                                const pdfData = item.evidencePdfs?.[idx] || (idx === 0 && typeof item.evidencePdf === 'string' ? item.evidencePdf : null);
                                const imgData = item.evidenceImgs?.[idx] || (idx === 0 && typeof item.evidenceImg === 'string' ? item.evidenceImg : null);
                                const pdfUrl = extractUrl(pdfData);
                                const imgUrl = extractUrl(imgData);
                                  
                                return (
                                  <td className="px-4 py-2 text-center align-top border-l border-[#E0DED5]/30">
                                    <div className="flex items-center justify-center gap-2 mt-1">
                                      <button 
                                        title="Tải lên / Xem PDF" 
                                        onClick={() => openModal(group, item, "pdf", refs[idx], idx)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                                          pdfUrl 
                                            ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" 
                                            : "bg-[#F4F3EF] text-red-500 hover:bg-[#E0DED5] border-transparent hover:border-[#D6D4CB]"
                                        }`}
                                      >
                                        <FileText size={16} />
                                      </button>
                                      <button 
                                        title="Tải lên / Xem Ảnh" 
                                        onClick={() => openModal(group, item, "img", refs[idx], idx)}
                                        className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                                          imgUrl 
                                            ? "bg-blue-50 text-blue-600 border-blue-200 hover:bg-blue-100" 
                                            : "bg-[#F4F3EF] text-blue-500 hover:bg-[#E0DED5] border-transparent hover:border-[#D6D4CB]"
                                        }`}
                                      >
                                        <ImageIcon size={16} />
                                      </button>
                                    </div>
                                  </td>
                                );
                            })()}
                          </tr>
                        ))}
                      </React.Fragment>
                    );
                  })}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modalOpen && activeItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="absolute inset-0 bg-zinc-900/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl border border-[#E0DED5] overflow-hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0DED5] bg-[#F9F8F6]">
                <h3 className="font-semibold text-zinc-800">
                  {modalType === "pdf" ? "Tài liệu PDF đính kèm" : "Hình ảnh đính kèm"}
                </h3>
                <button 
                  onClick={closeModal}
                  className="p-1.5 rounded-full hover:bg-[#E0DED5] text-zinc-500 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="p-6">
                <div className="mb-4">
                  <div className="text-xs text-zinc-500 font-medium mb-1">Mục kiểm tra:</div>
                  <div className="text-sm font-medium text-zinc-800 bg-[#F4F3EF] p-3 rounded-lg border border-[#E0DED5]">
                    <div>{activeItem.orderIndex}. {activeItem.title}</div>
                    {activeRef && (
                      <div className="mt-2 pt-2 border-t border-[#E0DED5] text-xs text-zinc-600 font-normal">
                        Tài liệu: {activeRef}
                      </div>
                    )}
                  </div>
                </div>
                
                {/* File Input */}
                <input 
                  type="file" 
                  ref={fileRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept={modalType === "pdf" ? ".pdf" : "image/*"}
                />

                {(() => {
                  const activePdfData = activeItem.evidencePdfs?.[activeRefIdx as number] || (activeRefIdx === 0 && typeof activeItem.evidencePdf === 'string' ? activeItem.evidencePdf : null);
                  const activeImgData = activeItem.evidenceImgs?.[activeRefIdx as number] || (activeRefIdx === 0 && typeof activeItem.evidenceImg === 'string' ? activeItem.evidenceImg : null);
                  const currentData = modalType === "pdf" ? activePdfData : activeImgData;
                  const currentUrl = extractUrl(currentData);
                  const uploadedAt = extractTimestamp(currentData);

                  return currentUrl ? (
                    <div className="flex flex-col h-full w-full animate-in fade-in zoom-in-95 duration-200">
                      <div className="relative w-full h-[300px] bg-zinc-100 rounded-lg overflow-hidden border border-[#E0DED5] mb-4 flex flex-col group">
                        {modalType === "pdf" ? (
                          <iframe src={currentUrl} className="w-full h-full" title="PDF Preview" />
                        ) : (
                          <img src={currentUrl} alt="Bằng chứng" className="w-full h-full object-contain" />
                        )}
                        <button 
                          onClick={() => window.open(currentUrl, '_blank')}
                          className="absolute top-2 right-2 p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm border border-black/10 text-zinc-700 opacity-0 group-hover:opacity-100 transition-all flex items-center gap-2"
                          title="Phóng to"
                        >
                          <Maximize size={16} />
                        </button>
                        {uploadedAt && (
                          <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-black/60 backdrop-blur-sm text-white text-[11px] rounded flex items-center gap-1.5 shadow-sm">
                            <Check size={12} className="text-[#C3CFA2]" />
                            Đã tải lên lúc: {uploadedAt}
                          </div>
                        )}
                      </div>
                      <div className="flex justify-center gap-3">
                        <button 
                          onClick={() => fileRef.current?.click()}
                          className="flex items-center gap-2 px-4 py-2 bg-[#F4F3EF] hover:bg-[#E0DED5] text-zinc-700 rounded-lg font-medium text-sm transition-colors border border-[#D6D4CB]"
                        >
                          <RefreshCw size={16} />
                          Thay đổi
                        </button>
                        <button 
                          onClick={handleRemoveFile}
                          className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-medium text-sm transition-colors border border-red-200"
                        >
                          <Trash2 size={16} />
                          Xóa tài liệu
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      onClick={() => !uploading && fileRef.current?.click()}
                      className={`border-2 border-dashed border-[#D6D4CB] rounded-xl p-8 flex flex-col items-center justify-center text-center bg-[#F9F8F6] transition-colors ${uploading ? 'opacity-60 cursor-wait' : 'hover:bg-[#F4F3EF] cursor-pointer group'}`}
                    >
                      {uploading ? (
                        <>
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-[#E0DED5] flex items-center justify-center mb-3 animate-spin">
                            <RefreshCw className="text-zinc-500" size={24} />
                          </div>
                          <p className="text-sm font-medium text-zinc-700">
                            Đang tải lên MinIO Storage...
                          </p>
                        </>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-[#E0DED5] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                            {modalType === "pdf" ? (
                              <FileText className="text-red-500" size={24} />
                            ) : (
                              <ImageIcon className="text-blue-500" size={24} />
                            )}
                          </div>
                          <p className="text-sm font-medium text-zinc-700">
                            Nhấn để tải lên {modalType === "pdf" ? "file PDF" : "hình ảnh"}
                          </p>
                          <p className="text-xs text-zinc-500 mt-1">
                            File sẽ được lưu trữ trên hệ thống MinIO Storage
                          </p>
                        </>
                      )}
                    </div>
                  );
                })()}
              </div>
              
              <div className="px-6 py-4 border-t border-[#E0DED5] bg-[#F9F8F6] flex justify-end">
                <button 
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg font-medium text-zinc-600 hover:bg-[#E0DED5] transition-colors text-sm"
                >
                  Đóng
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
