"use client";

import React, { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { FileText, Image as ImageIcon, X, Save, Check, Pen, Trash2, RefreshCw, Maximize, ArrowLeft, ChevronLeft, ChevronRight, Plus, Copy, ClipboardPaste, Link as LinkIcon } from "lucide-react";
import { EvidenceSourceRef, TechChecklistGroup, mockTechChecklist } from "@/data/techChecklist";
import { mockSmsChecklist } from "@/data/smsChecklist";
import { mockAtvsldChecklist } from "@/data/atvsldChecklist";
import { mockPcccChecklist } from "@/data/pcccChecklist";
import { mockPcttChecklist } from "@/data/pcttChecklist";
import { mockAtttChecklist } from "@/data/atttChecklist";
import { mockBtctChecklist } from "@/data/btctChecklist";
import ChecklistTableSkeleton from "@/components/ChecklistTableSkeleton";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

type UploadResponse = {
  success?: boolean;
  error?: string;
  details?: string;
  url?: string;
  key?: string;
};

const getInitialChecklistData = (categoryId: string): TechChecklistGroup[] => {
  if (categoryId === "quan-ly-ky-thuat") return mockTechChecklist;
  if (categoryId === "quan-ly-an-toan-sms") return mockSmsChecklist;
  if (categoryId === "an-toan-ve-sinh") return mockAtvsldChecklist;
  if (categoryId === "phong-chay-chua-chay") return mockPcccChecklist;
  if (categoryId === "phong-chong-thien-tai") return mockPcttChecklist;
  if (categoryId === "an-toan-thong-tin") return mockAtttChecklist;
  if (categoryId === "bao-tri-cong-trinh") return mockBtctChecklist;
  return mockTechChecklist;
};

// Legacy templates use newlines to separate reference rows. Edited rows are
// stored with an explicit prefix so newlines inside one row remain content.
const REFERENCE_LIST_PREFIX = "checklist-reference-list:v1:";

const serializeReferenceList = (references: string[]) =>
  `${REFERENCE_LIST_PREFIX}${JSON.stringify(references)}`;

export default function TechChecklistTable({ categoryId = "quan-ly-ky-thuat" }: { categoryId?: string }) {
  const [data, setData] = useState<TechChecklistGroup[]>(() => getInitialChecklistData(categoryId));
  const [isLoading, setIsLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"pdf" | "img" | null>(null);
  const [activeItem, setActiveItem] = useState<any>(null);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [activeRefIdx, setActiveRefIdx] = useState<number | null>(null);
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingRef, setEditingRef] = useState<{ id: string, idx: number, value: string } | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadPhase, setUploadPhase] = useState<"preparing" | "sending" | "saving" | "complete" | null>(null);
  const [activeFileIndex, setActiveFileIndex] = useState(0);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [pastedLink, setPastedLink] = useState("");
  const [linkError, setLinkError] = useState("");
  const [copiedLink, setCopiedLink] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const uploadProgressTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const uploadProgressValueRef = useRef(0);
  const params = useParams();
  const router = useRouter();
  const shouldReduceMotion = useReducedMotion();
  const unitParam = params?.unit as string;

  useEffect(() => {
    return () => {
      if (uploadProgressTimerRef.current !== null) {
        clearTimeout(uploadProgressTimerRef.current);
      }
    };
  }, []);

  const openModal = (group: any, item: any, type: "pdf" | "img", refIdx: number) => {
    setActiveGroupId(group.id);
    setActiveItem(item);
    setModalType(type);
    setActiveRefIdx(refIdx);
    setActiveFileIndex(0);
    setShowLinkInput(false);
    setPastedLink("");
    setLinkError("");
    setCopiedLink(false);
    setModalOpen(true);
  };

  const storageKey = `checklistData-${categoryId}`;

  useEffect(() => {
    let cancelled = false;
    const fallbackData = getInitialChecklistData(categoryId);

    const fetchTemplateAndData = async () => {
      let initialData: TechChecklistGroup[] = fallbackData;
      try {
        // 1. Lấy cấu trúc form (Template) từ DB do Admin định nghĩa
        const tplRes = await fetch(`/api/templates/load?categoryId=${categoryId}`);
        if (tplRes.ok) {
          const tplResult = await tplRes.json();
          if (tplResult.data && tplResult.data.length > 0) {
            initialData = tplResult.data;
          }
        }
      } catch (err) {
        console.warn("Dùng template mặc định:", err);
      }

      try {
        // 2. Lấy dữ liệu đánh giá thực tế (Có/Không, Ảnh...) từ DB
        const dataRes = await fetch(`/api/inspections/load?categoryId=${categoryId}&unitParam=${unitParam || ''}`);
        if (dataRes.ok) {
          const dataResult = await dataRes.json();
          if (dataResult.data && dataResult.data.length > 0) {
            const newData = JSON.parse(JSON.stringify(initialData)); // Deep clone
            dataResult.data.forEach((dbItem: any) => {
              for (const group of newData) {
                const itemIndex = group.items.findIndex((i: any) => i.id === dbItem.checklistItemId);
                if (itemIndex !== -1) {
                  const item = group.items[itemIndex];
                  if (dbItem.status) item.status = dbItem.status;
                  if (dbItem.note) item.note = dbItem.note;
                  if (dbItem.reference) item.reference = dbItem.reference;
                  if (dbItem.evidencePdf) item.evidencePdfs = dbItem.evidencePdf;
                  if (dbItem.evidenceImg) item.evidenceImgs = dbItem.evidenceImg;
                  break;
                }
              }
            });
            if (!cancelled) setData(newData);
            return;
          }
        }
      } catch (err) {
        console.warn("Dùng dữ liệu mặc định:", err);
      }

      if (!cancelled) setData(initialData);
    };

    void fetchTemplateAndData().finally(() => {
      if (!cancelled) setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [categoryId, unitParam]);

  const handleStatusChange = (groupId: string, itemId: string, refIdx: number, status: string) => {
    setData((prevData) => {
      const newData = [...prevData];
      const groupIndex = newData.findIndex(g => g.id === groupId);
      if (groupIndex !== -1) {
        const itemIndex = newData[groupIndex].items.findIndex(i => i.id === itemId);
        if (itemIndex !== -1) {
          const item = newData[groupIndex].items[itemIndex];
          if (typeof item.status === 'string' || item.status === null) {
            item.status = item.status ? { 0: item.status } : {};
          }
          item.status = { ...item.status, [refIdx]: status };
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
          // Keep Shift+Enter line breaks inside this reference row instead of
          // letting the renderer interpret them as new rows.
          item.reference = serializeReferenceList(refs);
        }
      }
      return newData;
    });
    setEditingRef(null);
  };

  const closeModal = () => {
    setModalOpen(false);
    setShowLinkInput(false);
    setPastedLink("");
    setLinkError("");
    setCopiedLink(false);
    setTimeout(() => {
      setActiveItem(null);
      setActiveGroupId(null);
      setModalType(null);
      setActiveRefIdx(null);
      setActiveFileIndex(0);
    }, 200);
  };

  const stopUploadProgressSimulation = () => {
    if (uploadProgressTimerRef.current !== null) {
      clearTimeout(uploadProgressTimerRef.current);
      uploadProgressTimerRef.current = null;
    }
  };

  const updateUploadProgress = (value: number) => {
    uploadProgressValueRef.current = value;
    setUploadProgress(value);
  };

  const animateUploadProgressTo = (target: number, intervalMs: number) => {
    stopUploadProgressSimulation();

    return new Promise<void>((resolve) => {
      const tick = () => {
        const next = Math.min(target, uploadProgressValueRef.current + 1);
        updateUploadProgress(next);

        if (next >= target) {
          uploadProgressTimerRef.current = null;
          resolve();
          return;
        }

        uploadProgressTimerRef.current = setTimeout(tick, intervalMs);
      };

      if (uploadProgressValueRef.current >= target) {
        resolve();
        return;
      }

      uploadProgressTimerRef.current = setTimeout(tick, intervalMs);
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !activeItem || !activeGroupId || !modalType || activeRefIdx === null) return;
    
    stopUploadProgressSimulation();
    updateUploadProgress(0);
    setUploadPhase("preparing");
    setCopiedLink(false);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('categoryId', categoryId);
      formData.append('itemId', activeItem.id);
      formData.append('fileType', modalType);

      // Keep the preparation state visible before the upload starts.
      await new Promise<void>((resolve) => setTimeout(resolve, 120));
      setUploadPhase("sending");
      void animateUploadProgressTo(85, 40);

      const result = await new Promise<UploadResponse>((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open('POST', '/api/upload');

        xhr.upload.onload = () => {
          setUploadPhase("saving");
          void animateUploadProgressTo(90, 20);
        };

        xhr.onload = () => {
          let response: UploadResponse = {};

          try {
            response = JSON.parse(xhr.responseText);
          } catch {
            // The API normally returns JSON; keep a safe fallback for malformed responses.
          }

          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(response);
          } else {
            reject(new Error(response.error || response.details || 'Upload thất bại'));
          }
        };

        xhr.onerror = () => reject(new Error('Lỗi kết nối khi tải file lên.'));
        xhr.onabort = () => reject(new Error('Upload đã bị hủy.'));
        xhr.send(formData);
      });

      const uploadedUrl = result.url;
      const uploadedKey = result.key;

      if (!result.success || !uploadedUrl || !uploadedKey) {
        alert('Upload thất bại: ' + (result.error || 'Phản hồi từ server không hợp lệ'));
        return;
      }

      setUploadPhase("saving");
      await animateUploadProgressTo(90, 10);
      updateUploadProgress(100);
      setUploadPhase("complete");
      await new Promise<void>((resolve) => setTimeout(resolve, 350));

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
            
            let existingFiles = currentData[activeRefIdx] || [];
            if (!Array.isArray(existingFiles)) {
                existingFiles = [existingFiles];
            }
            const newFile = { url: uploadedUrl, key: uploadedKey, uploadedAt: timestamp };
            
            newData[groupIndex].items[itemIndex][field] = {
              ...currentData,
              [activeRefIdx]: [...existingFiles, newFile]
            };
            
            setActiveItem(newData[groupIndex].items[itemIndex]);
            setActiveFileIndex(existingFiles.length); // Chuyển sang xem file vừa upload
          }
        }
        return newData;
      });
    } catch (err) {
      console.error('Upload error:', err);
      alert(err instanceof Error ? err.message : 'Lỗi kết nối khi tải file lên.');
    } finally {
      stopUploadProgressSimulation();
      setUploading(false);
      setUploadPhase(null);
    }
  };

  const handleRemoveFile = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!activeItem || !activeGroupId || !modalType || activeRefIdx === null) return;
    
    const field = modalType === "pdf" ? "evidencePdfs" : "evidenceImgs";
    let existingFiles = activeItem[field]?.[activeRefIdx] || [];
    if (!Array.isArray(existingFiles)) {
        existingFiles = [existingFiles];
    }
    
    if (existingFiles.length === 0) return;
    const fileData = existingFiles[activeFileIndex];

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
          
          const newFiles = [...existingFiles];
          newFiles.splice(activeFileIndex, 1);
          
          if (newFiles.length === 0) {
             delete currentData[activeRefIdx];
          } else {
             currentData[activeRefIdx] = newFiles;
          }
          
          newData[groupIndex].items[itemIndex][field] = currentData;
          setActiveItem(newData[groupIndex].items[itemIndex]);
          
          if (activeFileIndex >= newFiles.length && newFiles.length > 0) {
              setActiveFileIndex(newFiles.length - 1);
          }
        }
      }
      return newData;
    });
  };

  const renderStatusRadios = (group: TechChecklistGroup, item: any, refIdx: number) => {
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

    let currentStatus = null;
    if (item.status && typeof item.status === 'object') {
       currentStatus = item.status[refIdx];
    } else if (refIdx === 0 && typeof item.status === 'string') {
       currentStatus = item.status;
    }

    return (
      <div className="flex flex-col gap-2">
        {opts.map((opt: string) => (
          <label key={opt} className="flex items-center gap-2 cursor-pointer group w-full">
            <input 
              type="radio" 
              name={`status-${item.id}-${refIdx}`} 
              value={opt} 
              checked={currentStatus === opt}
              onChange={() => handleStatusChange(group.id, item.id, refIdx, opt)}
              className={`w-4 h-4 bg-white border-slate-300 focus:ring-2 cursor-pointer shrink-0 ${
                opt.startsWith("Không") 
                  ? "text-red-600 focus:ring-red-500 accent-red-600" 
                  : "text-blue-600 focus:ring-blue-500 accent-blue-600"
              }`}
            />
            <span className={`text-sm font-normal transition-colors ${
              currentStatus === opt
                ? (opt.startsWith("Không") ? "text-red-700 font-medium" : "text-blue-700 font-medium")
                : "text-slate-700 group-hover:text-blue-700"
            }`}>
              {opt}
            </span>
          </label>
        ))}
      </div>
    );
  };

  const getReferences = (refString: string) => {
    if (!refString) return [];

    if (refString.startsWith(REFERENCE_LIST_PREFIX)) {
      try {
        const parsed: unknown = JSON.parse(refString.slice(REFERENCE_LIST_PREFIX.length));
        if (Array.isArray(parsed) && parsed.every((reference): reference is string => typeof reference === "string")) {
          return parsed.map((reference) => reference.trim()).filter(Boolean);
        }
      } catch {
        // Fall back to the legacy newline-separated format below.
      }
    }

    return refString.split('\n').map(r => r.trim()).filter(Boolean);
  };

  const extractUrl = (data: any) => {
    if (!data) return null;
    const rawUrl = typeof data === 'string' ? data : data.url;
    if (typeof rawUrl !== 'string') return null;

    try {
      const parsedUrl = new URL(rawUrl, window.location.origin);
      if (parsedUrl.pathname.startsWith('/api/files/') || parsedUrl.pathname === '/api/evidence-link') {
        return `${parsedUrl.pathname}${parsedUrl.search}${parsedUrl.hash}`;
      }
    } catch {
      // Keep the original value so legacy records can still be inspected.
    }

    return rawUrl;
  };

  const extractTimestamp = (data: any) => {
    if (!data || typeof data === 'string') return null;
    return data.uploadedAt;
  };

  const createEvidenceReferenceUrl = (sourceRef: EvidenceSourceRef, absolute = true) => {
    const url = new URL("/api/evidence-link", window.location.origin);
    url.searchParams.set("unitParam", sourceRef.unitParam);
    url.searchParams.set("categoryId", sourceRef.categoryId);
    url.searchParams.set("itemId", sourceRef.itemId);
    url.searchParams.set("fileType", sourceRef.fileType);
    url.searchParams.set("refIdx", String(sourceRef.refIdx));
    url.searchParams.set("fileIndex", String(sourceRef.fileIndex));

    return absolute ? url.href : `${url.pathname}${url.search}`;
  };

  const parseEvidenceReference = (url: URL): EvidenceSourceRef | null => {
    if (url.pathname !== "/api/evidence-link") return null;

    const unitParam = url.searchParams.get("unitParam")?.trim();
    const categoryId = url.searchParams.get("categoryId")?.trim();
    const itemId = url.searchParams.get("itemId")?.trim();
    const fileType = url.searchParams.get("fileType");
    const refIdx = Number(url.searchParams.get("refIdx"));
    const fileIndex = Number(url.searchParams.get("fileIndex"));

    if (
      !unitParam ||
      !categoryId ||
      !itemId ||
      (fileType !== "pdf" && fileType !== "img") ||
      !Number.isInteger(refIdx) ||
      refIdx < 0 ||
      !Number.isInteger(fileIndex) ||
      fileIndex < 0
    ) {
      return null;
    }

    return { unitParam, categoryId, itemId, fileType, refIdx, fileIndex };
  };

  const handleCopyLink = async (url: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(url);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = url;
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        if (!document.execCommand("copy")) {
          throw new Error("Clipboard fallback failed");
        }
        textArea.remove();
      }

      setCopiedLink(true);
    } catch (err) {
      console.error("Không thể sao chép link dòng bằng chứng:", err);
      alert("Không thể sao chép link dòng bằng chứng. Vui lòng chọn và copy thủ công.");
    }
  };

  const handleAddPastedLink = () => {
    if (!activeItem || !activeGroupId || !modalType || activeRefIdx === null) return;

    const value = pastedLink.trim();
    if (!value) {
      setLinkError("Vui lòng dán link tài liệu.");
      return;
    }

    let parsedUrl: URL;
    try {
      parsedUrl = new URL(value, window.location.origin);
    } catch {
      setLinkError("Link tài liệu không hợp lệ.");
      return;
    }

    if (!["http:", "https:"].includes(parsedUrl.protocol)) {
      setLinkError("Link dòng bằng chứng không hợp lệ.");
      return;
    }

    const sourceRef = parseEvidenceReference(parsedUrl);
    if (!sourceRef) {
      setLinkError("Hãy dán link dòng bằng chứng được sao chép từ hệ thống.");
      return;
    }

    if (sourceRef.fileType !== modalType) {
      setLinkError(`Link này dành cho ${sourceRef.fileType === "pdf" ? "tài liệu PDF" : "hình ảnh"}.`);
      return;
    }

    const reusableUrl = createEvidenceReferenceUrl(sourceRef, false);
    const now = new Date();
    const timestamp = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')} - ${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;
    const newFile = { url: reusableUrl, uploadedAt: timestamp, source: "reference" as const, sourceRef };

    setData((prevData) => {
      const newData = [...prevData];
      const groupIndex = newData.findIndex(g => g.id === activeGroupId);
      if (groupIndex !== -1) {
        const itemIndex = newData[groupIndex].items.findIndex(i => i.id === activeItem.id);
        if (itemIndex !== -1) {
          const field = modalType === "pdf" ? "evidencePdfs" : "evidenceImgs";
          const item = newData[groupIndex].items[itemIndex];
          const currentData = { ...(item[field] || {}) };
          let existingFiles = currentData[activeRefIdx] || [];

          if (!Array.isArray(existingFiles)) {
            existingFiles = [existingFiles];
          }

          const nextFiles = [...existingFiles, newFile];
          item[field] = {
            ...currentData,
            [activeRefIdx]: nextFiles,
          };

          setActiveItem(item);
          setActiveFileIndex(existingFiles.length);
        }
      }
      return newData;
    });

    setShowLinkInput(false);
    setPastedLink("");
    setLinkError("");
    setCopiedLink(false);
  };

  const getEvidenceCount = (data: unknown) => {
    if (!data) return 0;
    if (Array.isArray(data)) {
      return data.filter((file) => Boolean(extractUrl(file))).length;
    }
    return extractUrl(data) ? 1 : 0;
  };

  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const res = await fetch('/api/inspections/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          categoryId,
          unitParam,
          data
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || "Lỗi lưu kết quả");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      console.error("Lỗi lưu DB", err);
      alert(err.message || "Đã xảy ra lỗi khi lưu vào cơ sở dữ liệu!");
    } finally {
      setIsSaving(false);
    }
  };

  const renderLinkInputForm = () => (
    <form
      id="evidence-pasted-link-form"
      onSubmit={(event) => {
        event.preventDefault();
        handleAddPastedLink();
      }}
      className="mt-3 rounded-xl border border-blue-200 bg-blue-50/40 p-3"
    >
      <label htmlFor="evidence-pasted-link" className="sr-only">
        Dán link dòng bằng chứng
      </label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          id="evidence-pasted-link"
          type="text"
          value={pastedLink}
          onChange={(event) => {
            setPastedLink(event.target.value);
            if (linkError) setLinkError("");
          }}
          placeholder="Dán link tài liệu đã có..."
          autoFocus
          disabled={uploading}
          aria-invalid={Boolean(linkError)}
          aria-describedby={linkError ? "evidence-pasted-link-error" : undefined}
          className="min-h-10 min-w-0 flex-1 rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 outline-none transition-colors placeholder:text-slate-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
        />
        <button
          type="submit"
          disabled={uploading}
          className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3 text-xs font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <LinkIcon size={14} aria-hidden="true" />
          Thêm link
        </button>
        <button
          type="button"
          onClick={() => {
            setShowLinkInput(false);
            setPastedLink("");
            setLinkError("");
          }}
          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Hủy
        </button>
      </div>
      {linkError && (
        <p id="evidence-pasted-link-error" role="alert" className="mt-2 text-xs text-red-500">
          {linkError}
        </p>
      )}
    </form>
  );

  if (isLoading) {
    return <ChecklistTableSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.22, ease: "easeOut" }}
    >
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={() => router.push(`/dashboard/${unitParam}`, { transitionTypes: ["checklist-navigation"] })}
          className="flex items-center gap-1.5 text-xs text-slate-700 hover:text-blue-600 font-medium px-3.5 py-1.5 rounded-lg bg-white hover:bg-slate-50 border border-slate-200/90 shadow-sm transition-all duration-200 cursor-pointer"
        >
          <ArrowLeft size={14} className="text-slate-500" />
          <span>Quay lại bảng điều khiển</span>
        </button>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-1.5 text-xs font-medium text-white px-4 py-1.5 rounded-lg bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-700 hover:to-sky-700 transition-all duration-200 shadow-sm shadow-blue-500/20 disabled:opacity-60 cursor-pointer"
        >
          {isSaving ? (
             <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : saveSuccess ? (
             <Check size={14} className="text-emerald-200" />
          ) : (
             <Save size={14} />
          )}
          <span>{isSaving ? "Đang lưu..." : saveSuccess ? "Đã lưu thành công" : "Lưu thay đổi"}</span>
        </button>
      </div>

      <div className="bg-white border border-blue-200/80 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-blue-200 bg-[#E3EFFB]">
                <th className="px-4 py-3.5 text-sm font-normal text-blue-900 w-16 text-center">TT</th>
                <th className="px-4 py-3.5 text-sm font-normal text-blue-900 w-64">Nội dung, yêu cầu</th>
                <th className="px-4 py-3.5 text-sm font-normal text-blue-900 w-32">{categoryId === "an-toan-thong-tin" ? "Mức độ tuân thủ" : (categoryId === "bao-tri-cong-trinh" ? "Tình trạng" : "Hiện trạng")}</th>
                {categoryId !== "an-toan-thong-tin" && categoryId !== "bao-tri-cong-trinh" && (
                  <th className="px-4 py-3.5 text-sm font-normal text-blue-900 w-64">Tài liệu tham chiếu</th>
                )}
                <th className={`px-4 py-3.5 text-sm font-normal text-blue-900 ${(categoryId === "an-toan-thong-tin" || categoryId === "bao-tri-cong-trinh") ? "w-[28rem]" : "w-48"}`}>Ghi chú</th>
                <th className="px-4 py-3.5 text-sm font-normal text-blue-900 w-24 text-center">Bằng chứng</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/70">
              {data.map((group) => (
                <React.Fragment key={group.id}>
                  {/* Main Category Row - font-normal, NOT BOLD */}
                  {group.title && (
                    <tr className="bg-[#EDF5FD] border-b border-blue-200/80">
                      <td className="px-4 py-3 font-normal text-blue-900 text-center border-r border-blue-200/60">{group.order}</td>
                      <td colSpan={5} className="px-4 py-3 font-normal text-blue-950 text-[15px]">
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
                          <tr key={`${item.id}-${idx}`} className="group border-b border-slate-200/70 last:border-0 hover:bg-sky-50/50 transition-colors">
                            {idx === 0 && (
                              <>
                                <td rowSpan={numRows} className="px-4 py-3 text-sm text-blue-700 font-normal text-center align-top pt-4 border-r border-slate-200/70">
                                  {item.orderIndex}
                                </td>
                                <td rowSpan={numRows} className="px-4 py-3 text-sm text-slate-800 font-normal align-top pt-4 border-r border-slate-200/70">
                                  <div className="font-normal mb-1 whitespace-pre-wrap leading-relaxed">{item.title}</div>
                                </td>
                              </>
                            )}
                            
                            <td className="px-4 py-3 align-top pt-4 border-r border-slate-200/70">
                              {renderStatusRadios(group, item, idx)}
                            </td>
                            
                            {categoryId !== "an-toan-thong-tin" && categoryId !== "bao-tri-cong-trinh" && (
                              <td className="px-4 py-3 text-xs text-slate-600 font-normal align-top group/ref relative min-w-[200px] border-l border-slate-200/70">
                                {editingRef?.id === item.id && editingRef?.idx === idx ? (
                                  <div className="flex flex-col gap-2">
                                    <textarea
                                      autoFocus
                                      value={editingRef.value}
                                      onChange={(e) => setEditingRef({ ...editingRef, value: e.target.value })}
                                      className="w-full bg-white border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[60px] resize-y text-xs text-slate-800 font-normal"
                                    />
                                    <div className="flex justify-end gap-2">
                                      <button 
                                        onClick={() => setEditingRef(null)}
                                        className="text-[11px] font-normal text-slate-500 hover:text-slate-700 px-2 py-1.5 transition-colors"
                                      >
                                        Hủy
                                      </button>
                                      <button 
                                        onClick={() => saveReferenceLine(group.id, item.id, idx)}
                                        className="text-[11px] font-normal bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
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
                                      className="absolute bottom-2 right-2 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded opacity-0 group-hover/ref:opacity-100 transition-all"
                                      title="Chỉnh sửa tài liệu"
                                    >
                                      <Pen size={14} />
                                    </button>
                                  </div>
                                )}
                              </td>
                            )}
                            
                            {idx === 0 && (
                              <td rowSpan={numRows} className={`px-4 py-3 text-xs text-slate-600 font-normal align-top border-l border-slate-200/70 group/note relative ${(categoryId === "an-toan-thong-tin" || categoryId === "bao-tri-cong-trinh") ? "min-w-[400px]" : "min-w-[200px]"}`}>
                                {editingNoteId === item.id ? (
                                  <div className="flex flex-col gap-2">
                                    <textarea
                                      autoFocus
                                      value={item.note || ""}
                                      onChange={(e) => handleNoteChange(group.id, item.id, e.target.value)}
                                      className="w-full bg-white border border-blue-300 rounded-lg p-2 focus:outline-none focus:ring-1 focus:ring-blue-500 min-h-[80px] resize-y text-xs text-slate-800 font-normal"
                                    />
                                    <div className="flex justify-end">
                                      <button 
                                        onClick={() => setEditingNoteId(null)}
                                        className="text-[11px] font-normal bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors"
                                      >
                                        Lưu ghi chú
                                      </button>
                                    </div>
                                  </div>
                                ) : (
                                  <div className="whitespace-pre-wrap leading-relaxed min-h-[40px] pb-6">
                                    {item.note || <span className="text-slate-400 italic">Chưa có ghi chú...</span>}
                                    <button 
                                      onClick={() => setEditingNoteId(item.id)}
                                      className="absolute bottom-2 right-2 p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded opacity-0 group-hover/note:opacity-100 transition-all"
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
                                const pdfCount = getEvidenceCount(pdfData);
                                const imgCount = getEvidenceCount(imgData);

                                return (
                                  <td className="px-4 py-2 text-center align-top border-l border-slate-200/70">
                                    <div className="flex items-center justify-center gap-2 mt-1">
                                      <button 
                                        title={`Tải lên / Xem PDF${pdfCount > 0 ? ` (${pdfCount} tài liệu)` : ''}`}
                                        aria-label={`Tải lên hoặc xem PDF${pdfCount > 0 ? `, hiện có ${pdfCount} tài liệu` : ''}`}
                                        onClick={() => openModal(group, item, "pdf", idx)}
                                        className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                                          pdfUrl 
                                            ? "bg-red-50 text-red-600 border-red-200 hover:bg-red-100" 
                                            : "bg-slate-50 text-red-500 hover:bg-red-50 border-slate-200"
                                        }`}
                                      >
                                        <FileText size={16} />
                                        {pdfCount > 0 && (
                                          <span
                                            aria-hidden="true"
                                            className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center whitespace-nowrap rounded-full border-2 border-white bg-red-600 px-1 text-[10px] font-medium leading-none text-white shadow-sm"
                                          >
                                            {pdfCount > 99 ? '99+' : pdfCount}
                                          </span>
                                        )}
                                      </button>
                                      <button 
                                        title={`Tải lên / Xem Ảnh${imgCount > 0 ? ` (${imgCount} tài liệu)` : ''}`}
                                        aria-label={`Tải lên hoặc xem hình ảnh${imgCount > 0 ? `, hiện có ${imgCount} tài liệu` : ''}`}
                                        onClick={() => openModal(group, item, "img", idx)}
                                        className={`relative w-8 h-8 rounded-lg flex items-center justify-center transition-colors border ${
                                          imgUrl 
                                            ? "bg-sky-50 text-sky-600 border-sky-200 hover:bg-sky-100"
                                            : "bg-slate-50 text-sky-600 hover:bg-sky-50 border-slate-200"
                                        }`}
                                      >
                                        <ImageIcon size={16} />
                                        {imgCount > 0 && (
                                          <span
                                            aria-hidden="true"
                                            className="absolute -right-1.5 -top-1.5 flex h-[18px] min-w-[18px] items-center justify-center whitespace-nowrap rounded-full border-2 border-white bg-sky-600 px-1 text-[10px] font-medium leading-none text-white shadow-sm"
                                          >
                                            {imgCount > 99 ? '99+' : imgCount}
                                          </span>
                                        )}
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
      {typeof document !== "undefined" && createPortal(
        <AnimatePresence>
          {modalOpen && activeItem && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto overscroll-contain p-2 sm:p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: "easeOut" }}
              onClick={closeModal}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.2, ease: "easeOut" }}
              role="dialog"
              aria-modal="true"
              aria-labelledby="evidence-modal-title"
              className="relative flex max-h-[calc(100dvh-1rem)] w-full max-w-lg flex-col overflow-hidden rounded-xl border border-blue-100 bg-white text-slate-800 shadow-2xl sm:max-h-[calc(100dvh-2rem)] sm:rounded-2xl"
            >
              <div className="flex shrink-0 items-center justify-between border-b border-blue-100 bg-[#E8F1FB] px-4 py-3 sm:px-5">
                <h3 id="evidence-modal-title" className="text-sm font-medium text-blue-950 sm:text-base">
                  {modalType === "pdf" ? "Tài liệu PDF đính kèm" : "Hình ảnh đính kèm"}
                </h3>
                <button
                  type="button"
                  onClick={closeModal}
                  aria-label="Đóng cửa sổ bằng chứng"
                  title="Đóng"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full text-slate-500 transition-colors hover:bg-blue-100 hover:text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5">
                {/* File Input */}
                <input 
                  type="file" 
                  ref={fileRef} 
                  onChange={handleFileUpload} 
                  className="hidden" 
                  accept={modalType === "pdf" ? ".pdf" : "image/*"}
                />

                {(() => {
                  const rawPdfData = activeItem.evidencePdfs?.[activeRefIdx as number] || (activeRefIdx === 0 && typeof activeItem.evidencePdf === 'string' ? activeItem.evidencePdf : null);
                  const rawImgData = activeItem.evidenceImgs?.[activeRefIdx as number] || (activeRefIdx === 0 && typeof activeItem.evidenceImg === 'string' ? activeItem.evidenceImg : null);
                  const rawData = modalType === "pdf" ? rawPdfData : rawImgData;
                  
                  let fileList = rawData || [];
                  if (rawData && !Array.isArray(rawData)) {
                      fileList = typeof rawData === 'string' ? [{url: rawData}] : [rawData];
                  }

                  const hasFiles = fileList.length > 0;
                  const currentFile = hasFiles ? fileList[activeFileIndex] : null;
                  const currentUrl = extractUrl(currentFile) || "";
                  const uploadedAt = extractTimestamp(currentFile);
                  const currentFileIsLink = Boolean(
                    currentFile &&
                    typeof currentFile !== "string" &&
                    (currentFile.source === "link" || currentFile.source === "reference")
                  );
                  const currentSourceRef: EvidenceSourceRef | null =
                    currentFile && typeof currentFile !== "string" && currentFile.sourceRef
                      ? currentFile.sourceRef
                      : activeItem?.id && modalType && activeRefIdx !== null
                        ? {
                            unitParam: unitParam || "tuh",
                            categoryId,
                            itemId: activeItem.id,
                            fileType: modalType,
                            refIdx: activeRefIdx,
                            fileIndex: activeFileIndex,
                          }
                        : null;
                  const evidenceReferenceUrl = hasFiles && currentSourceRef
                    ? createEvidenceReferenceUrl(currentSourceRef)
                    : "";

                   return (
                     <div>
                       {uploading && (
                         <div
                           className="mb-4 rounded-xl border border-blue-200 bg-blue-50/60 p-4"
                         >
                           <div className="flex items-center justify-between gap-3 text-sm">
                             <span className="font-normal text-blue-900" role="status" aria-live="polite">
                               {uploadPhase === "preparing"
                                 ? "Đang chuẩn bị tài liệu..."
                                 : uploadPhase === "saving"
                                   ? "Đang lưu tài liệu vào CSDL..."
                                   : uploadPhase === "complete"
                                     ? "Tải lên hoàn tất"
                                    : "Đang truyền tài liệu..."}
                             </span>
                             <span className="font-medium text-blue-700">{uploadProgress}%</span>
                           </div>
                           <div
                             className="mt-3 h-2 overflow-hidden rounded-full bg-blue-100"
                             role="progressbar"
                             aria-label="Tiến trình tải file lên CSDL"
                             aria-valuemin={0}
                             aria-valuemax={100}
                             aria-valuenow={uploadProgress}
                           >
                             <div
                               className="h-full rounded-full bg-gradient-to-r from-blue-500 to-sky-500"
                               style={{ width: `${uploadProgress}%` }}
                             />
                           </div>
                            <div className="mt-2 text-xs text-slate-500 font-normal">
                              {uploadPhase === "preparing"
                                ? "Đang tạo yêu cầu tải lên..."
                                : uploadPhase === "saving"
                                  ? "Đã gửi file, hệ thống đang lưu vào CSDL..."
                                  : uploadPhase === "complete"
                                    ? "Tài liệu đã được lưu thành công."
                                    : "Đang truyền dữ liệu..."}
                            </div>
                         </div>
                       )}

                       {hasFiles ? (
                     <div className="flex flex-col h-full w-full animate-in fade-in zoom-in-95 duration-200">
                      
                      {fileList.length > 1 && (
                        <div className="flex items-center justify-between mb-3 bg-slate-50 p-2 rounded-xl border border-slate-200">
                          <button
                             type="button"
                             onClick={() => {
                               setActiveFileIndex(prev => Math.max(0, prev - 1));
                               setCopiedLink(false);
                             }}
                             disabled={activeFileIndex === 0}
                             aria-label="Xem tài liệu trước"
                             title="Tài liệu trước"
                             className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40"
                          >
                             <ChevronLeft size={18} aria-hidden="true" />
                          </button>
                          <span className="text-sm font-normal text-slate-700">Tài liệu {activeFileIndex + 1} / {fileList.length}</span>
                          <button
                             type="button"
                             onClick={() => {
                               setActiveFileIndex(prev => Math.min(fileList.length - 1, prev + 1));
                               setCopiedLink(false);
                             }}
                             disabled={activeFileIndex === fileList.length - 1}
                             aria-label="Xem tài liệu tiếp theo"
                             title="Tài liệu tiếp theo"
                             className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-40"
                          >
                             <ChevronRight size={18} aria-hidden="true" />
                          </button>
                        </div>
                      )}

                      <div className="group relative mb-4 flex h-[clamp(220px,42dvh,360px)] w-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-slate-100">
                        {modalType === "pdf" ? (
                          <iframe src={currentUrl} className="w-full h-full" title="PDF Preview" />
                        ) : (
                          <img src={currentUrl} alt="Bằng chứng" className="w-full h-full object-contain" />
                        )}
                        <button
                          type="button"
                          onClick={() => window.open(currentUrl, '_blank')}
                          aria-label="Mở tài liệu trong cửa sổ mới"
                          title="Phóng to"
                          className="absolute right-2 top-2 inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white/90 text-slate-700 opacity-100 shadow-sm transition-colors hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 sm:opacity-0 sm:group-hover:opacity-100 sm:focus-visible:opacity-100"
                        >
                          <Maximize size={16} aria-hidden="true" />
                        </button>
                        {uploadedAt && (
                          <div className="absolute bottom-2 right-2 px-2.5 py-1 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] rounded-lg flex items-center gap-1.5 shadow-sm">
                            <Check size={12} className="text-emerald-400" />
                            {currentFileIsLink ? "Đã liên kết lúc:" : "Đã tải lên lúc:"} {uploadedAt}
                          </div>
                        )}
                      </div>

                      {evidenceReferenceUrl && (
                        <div className="mb-4">
                          <div className="flex items-center gap-2">
                            <input
                              id="evidence-current-link"
                              type="text"
                              readOnly
                              value={evidenceReferenceUrl}
                              onFocus={(event) => event.currentTarget.select()}
                              aria-label="Link dòng bằng chứng hiện tại"
                              className="min-h-10 min-w-0 flex-1 rounded-lg border border-slate-300 bg-slate-50 px-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                            />
                            <button
                              type="button"
                              onClick={() => void handleCopyLink(evidenceReferenceUrl)}
                              aria-label={copiedLink ? "Đã sao chép link bằng chứng" : "Sao chép link bằng chứng"}
                              title={copiedLink ? "Đã sao chép" : "Sao chép link"}
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                              {copiedLink ? (
                                <Check size={16} className="text-emerald-600" aria-hidden="true" />
                              ) : (
                                <Copy size={16} aria-hidden="true" />
                              )}
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowLinkInput((visible) => !visible);
                                setLinkError("");
                              }}
                              disabled={uploading}
                              aria-label={showLinkInput ? "Ẩn ô dán link bằng chứng" : "Dán link dòng bằng chứng"}
                              aria-expanded={showLinkInput}
                              aria-controls="evidence-pasted-link-form"
                              title="Dán link dòng bằng chứng"
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <ClipboardPaste size={16} aria-hidden="true" />
                            </button>
                          </div>
                          {showLinkInput && renderLinkInputForm()}
                        </div>
                      )}
                      
                      <div className="flex flex-nowrap items-center justify-center gap-2">
                        <button 
                          onClick={() => !uploading && fileRef.current?.click()}
                          disabled={uploading}
                          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {uploading ? (
                            <RefreshCw size={14} className="animate-spin" aria-hidden="true" />
                          ) : (
                            <Plus size={14} aria-hidden="true" />
                          )}
                          Tải thêm
                        </button>
                        <button 
                          onClick={handleRemoveFile}
                          className="inline-flex min-h-9 items-center justify-center gap-1.5 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 shadow-sm transition-colors hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          <Trash2 size={14} aria-hidden="true" />
                          Xóa bằng chứng
                        </button>
                      </div>
                    </div>
                       ) : (
                         <>
                           <div
                            onClick={() => !uploading && fileRef.current?.click()}
                            className={`border-2 border-dashed border-blue-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center bg-blue-50/40 transition-colors ${uploading ? 'opacity-60 cursor-wait' : 'hover:bg-blue-50/80 cursor-pointer group'}`}
                          >
                            {uploading ? (
                              <>
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-blue-200 flex items-center justify-center mb-3 animate-spin">
                                  <RefreshCw className="text-blue-600" size={24} />
                                </div>
                                <p className="text-sm font-normal text-blue-900">
                                  Đang tải lên CSDL...
                                </p>
                              </>
                            ) : (
                              <>
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm border border-blue-200 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                  {modalType === "pdf" ? (
                                    <FileText className="text-red-500" size={24} />
                                  ) : (
                                    <ImageIcon className="text-sky-500" size={24} />
                                  )}
                                </div>
                                <p className="text-sm font-normal text-slate-800">
                                  Nhấn để tải lên {modalType === "pdf" ? "file PDF" : "hình ảnh"}
                                </p>
                                <p className="text-xs text-slate-500 font-normal mt-1">
                                  File sẽ được lưu trữ trên hệ thống CSDL
                                </p>
                              </>
                            )}
                          </div>
                          <div className="mt-4 flex items-center justify-center gap-2">
                            <button
                              type="button"
                              onClick={() => !uploading && fileRef.current?.click()}
                              disabled={uploading}
                              className="inline-flex min-h-10 items-center justify-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {uploading ? (
                                <RefreshCw size={14} className="animate-spin" aria-hidden="true" />
                              ) : (
                                <Plus size={14} aria-hidden="true" />
                              )}
                              Tải tài liệu mới
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setShowLinkInput((visible) => !visible);
                                setLinkError("");
                              }}
                              disabled={uploading}
                              aria-label={showLinkInput ? "Ẩn ô dán link bằng chứng" : "Dán link dòng bằng chứng"}
                              aria-expanded={showLinkInput}
                              aria-controls="evidence-pasted-link-form"
                              title="Dán link dòng bằng chứng"
                              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-sm transition-colors hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              <ClipboardPaste size={16} aria-hidden="true" />
                            </button>
                          </div>
                          {showLinkInput && renderLinkInputForm()}
                         </>
                       )}
                     </div>
                   );
                 })()}
              </div>
            </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </motion.div>
  );
}
