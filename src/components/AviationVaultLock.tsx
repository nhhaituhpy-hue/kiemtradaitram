"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Lock, Unlock, Database, Cpu } from "lucide-react";

interface AviationVaultLockProps {
  isTriggered: boolean;
  onUnlocked: () => void;
}

export default function AviationVaultLock({
  isTriggered,
  onUnlocked,
}: AviationVaultLockProps) {
  // Stages: "idle" | "zooming" | "dial_turn_1" | "dial_turn_2" | "dial_turn_3" | "unlocked" | "doors_opening"
  const [stage, setStage] = useState<
    "idle" | "zooming" | "dial_turn_1" | "dial_turn_2" | "dial_turn_3" | "unlocked" | "doors_opening"
  >("idle");

  const [dialRotation, setDialRotation] = useState(0);
  const [statusMessage, setStatusMessage] = useState("TUH LOCKED SYSTEM");

  useEffect(() => {
    if (!isTriggered) {
      setStage("idle");
      setDialRotation(0);
      return;
    }

    // Sequence execution
    setStage("zooming");
    setStatusMessage("Đang kết nối đến tủ hồ sơ TUH...");

    // Step 1: Turn Dial Right (e.g. 85 deg)
    const t1 = setTimeout(() => {
      setStage("dial_turn_1");
      setDialRotation(85);
      setStatusMessage("Xác minh mã đài/trạm: TUH [OK]");
    }, 600);

    // Step 2: Turn Dial Left (e.g. -140 deg)
    const t2 = setTimeout(() => {
      setStage("dial_turn_2");
      setDialRotation(-140);
      setStatusMessage("Xác minh tài khoản đăng nhập: TUH [OK]");
    }, 1300);

    // Step 3: Turn Dial Right to target (e.g. 45 deg)
    const t3 = setTimeout(() => {
      setStage("dial_turn_3");
      setDialRotation(45);
      setStatusMessage("Xác minh mã bảo mật: [OK]");
    }, 2000);

    // Step 4: Unlock latches
    const t4 = setTimeout(() => {
      setStage("unlocked");
      setStatusMessage("Truy cập hợp lệ: Unlocked");
    }, 2700);

    // Step 5: Doors swing open
    const t5 = setTimeout(() => {
      setStage("doors_opening");
    }, 3300);

    // Step 6: Complete & route
    const t6 = setTimeout(() => {
      onUnlocked();
    }, 4300);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
      clearTimeout(t6);
    };
  }, [isTriggered, onUnlocked]);

  if (!isTriggered) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E293B]/40 backdrop-blur-md overflow-hidden select-none">
      {/* 3D Scene Wrapper with Perspective */}
      <div
        className="relative w-full max-w-4xl h-[580px] flex items-center justify-center"
        style={{ perspective: "1500px" }}
      >
        {/* Inside Vault Core (Revealed when doors swing open) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{
            opacity: stage === "doors_opening" ? 1 : 0.4,
            scale: stage === "doors_opening" ? 1.05 : 0.95,
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="absolute inset-x-8 inset-y-6 rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0A0F1D] border-2 border-blue-500/30 shadow-[0_0_80px_rgba(37,99,235,0.4)] flex flex-col items-center justify-center p-8 overflow-hidden z-0"
        >
          {/* Glowing tech grid inside database archive */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2)_0%,transparent_70%)]" />
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#3b82f6_1px,transparent_1px),linear-gradient(to_bottom,#3b82f6_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Internal Glowing Core Graphics */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="w-72 h-72 rounded-full border border-dashed border-blue-400/30 flex items-center justify-center"
          >
            <div className="w-56 h-56 rounded-full border border-blue-400/20 flex items-center justify-center">
              <div className="w-40 h-40 rounded-full bg-blue-500/10 backdrop-blur-sm border border-blue-400/40" />
            </div>
          </motion.div>

          <div className="absolute flex flex-col items-center gap-3 text-center z-10">
            <div className="p-4 rounded-2xl bg-blue-500/20 border border-blue-400/50 text-blue-400 shadow-[0_0_30px_rgba(59,130,246,0.5)]">
              <Database size={44} className="animate-pulse" />
            </div>
            <div>
              <h3 className="text-xl md:text-2xl font-cormorant font-medium tracking-wider text-white">
                TỦ HỒ SƠ KỸ THUẬT ĐÀI TRẠM
              </h3>
              <p className="text-xs font-mono text-blue-300/80 mt-1 uppercase tracking-widest">
                ĐÀI DVOR/DME TUY HÒA // KHỞI ĐỘNG HỆ THỐNG
              </p>
            </div>
          </div>
        </motion.div>

        {/* Left Cabinet Vault Door (Soft Navy Aviation Finish) */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{
            rotateY: stage === "doors_opening" ? -105 : 0,
            x: stage === "doors_opening" ? -30 : 0,
          }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          style={{ transformOrigin: "left center" }}
          className="absolute left-8 inset-y-6 w-[calc(50%-2rem)] rounded-l-3xl bg-gradient-to-b from-[#1E2D4A] via-[#152238] to-[#0D1829] border-4 border-r-2 border-[#334B73] shadow-[inset_0_2px_10px_rgba(147,197,253,0.25),-10px_20px_45px_rgba(0,0,0,0.6)] z-20 flex flex-col justify-between p-6 overflow-hidden"
        >
          {/* Rivets and mechanical panel lines */}
          <div className="flex justify-between items-center opacity-80">
            <div className="w-3 h-3 rounded-full bg-[#2A3E60] border border-[#4A6B9D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
            <div className="text-[10px] font-mono font-medium text-cyan-300/80 tracking-wider">
              DVOR 1150A - TUH // ATTECH
            </div>
            <div className="w-3 h-3 rounded-full bg-[#2A3E60] border border-[#4A6B9D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Mechanical Hinges Visual */}
          <div className="space-y-12 opacity-90">
            <div className="h-14 w-4 bg-gradient-to-r from-blue-900 to-cyan-700 rounded-r border border-cyan-500/40 shadow-lg shadow-cyan-500/20" />
            <div className="h-14 w-4 bg-gradient-to-r from-blue-900 to-cyan-700 rounded-r border border-cyan-500/40 shadow-lg shadow-cyan-500/20" />
          </div>

          <div className="flex justify-between items-center opacity-70">
            <div className="w-3 h-3 rounded-full bg-[#2A3E60] border border-[#4A6B9D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
            <span className="text-[9px] font-mono text-cyan-400/70">DOCUMENT UNLOCKED</span>
            <div className="w-3 h-3 rounded-full bg-[#2A3E60] border border-[#4A6B9D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
          </div>
        </motion.div>

        {/* Right Cabinet Vault Door (Soft Navy Aviation Finish) */}
        <motion.div
          initial={{ rotateY: 0 }}
          animate={{
            rotateY: stage === "doors_opening" ? 105 : 0,
            x: stage === "doors_opening" ? 30 : 0,
          }}
          transition={{ duration: 1.1, ease: [0.25, 1, 0.5, 1] }}
          style={{ transformOrigin: "right center" }}
          className="absolute right-8 inset-y-6 w-[calc(50%-2rem)] rounded-r-3xl bg-gradient-to-b from-[#1E2D4A] via-[#152238] to-[#0D1829] border-4 border-l-2 border-[#334B73] shadow-[inset_0_2px_10px_rgba(147,197,253,0.25),10px_20px_45px_rgba(0,0,0,0.6)] z-20 flex flex-col justify-between p-6 items-end overflow-hidden"
        >
          {/* Rivets and mechanical panel lines */}
          <div className="flex justify-between items-center w-full opacity-80">
            <div className="w-3 h-3 rounded-full bg-[#2A3E60] border border-[#4A6B9D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
            <div className="text-[10px] font-mono font-medium text-cyan-300/80 tracking-wider">
              DME 1119A - TUH // ATTECH
            </div>
            <div className="w-3 h-3 rounded-full bg-[#2A3E60] border border-[#4A6B9D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
          </div>

          {/* Mechanical Hinges Visual */}
          <div className="space-y-12 opacity-90 self-end">
            <div className="h-14 w-4 bg-gradient-to-l from-blue-900 to-cyan-700 rounded-l border border-cyan-500/40 shadow-lg shadow-cyan-500/20" />
            <div className="h-14 w-4 bg-gradient-to-l from-blue-900 to-cyan-700 rounded-l border border-cyan-500/40 shadow-lg shadow-cyan-500/20" />
          </div>

          <div className="flex justify-between items-center w-full opacity-70">
            <div className="w-3 h-3 rounded-full bg-[#2A3E60] border border-[#4A6B9D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
            <span className="text-[9px] font-mono text-cyan-400/70">PNEUMATIC SEALED</span>
            <div className="w-3 h-3 rounded-full bg-[#2A3E60] border border-[#4A6B9D] shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)]" />
          </div>
        </motion.div>

        {/* Center Mechanical Combination Rotary Dial Unit in Navy Metallic */}
        <AnimatePresence>
          {stage !== "doors_opening" && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{
                scale: stage === "unlocked" ? 1.08 : 1,
                opacity: 1,
                y: 0,
              }}
              exit={{ scale: 1.3, opacity: 0, transition: { duration: 0.4 } }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative z-30 flex flex-col items-center"
            >
              {/* Outer Navy Dial Bezel Plate */}
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full bg-gradient-to-b from-[#243B60] via-[#1A2C49] to-[#0F1B2E] p-3 shadow-[0_20px_50px_rgba(0,0,0,0.6),inset_0_3px_8px_rgba(147,197,253,0.4),inset_0_-4px_10px_rgba(0,0,0,0.8)] border-4 border-[#3B5D8C] flex items-center justify-center">

                {/* Mechanical Outer Gear Teeth Ring */}
                <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyan-400/30 pointer-events-none" />

                {/* Top Alignment Needle / Pointer */}
                <div className="absolute -top-3 z-30 flex flex-col items-center">
                  <div className="w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[12px] border-t-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                </div>

                {/* Rotating Inner Wheel with Markings */}
                <motion.div
                  animate={{ rotate: dialRotation }}
                  transition={{
                    type: "spring",
                    stiffness: 70,
                    damping: 14,
                  }}
                  className="relative w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-tr from-[#0B1528] via-[#13233D] to-[#1C3254] shadow-[inset_0_4px_14px_rgba(0,0,0,0.9),0_0_20px_rgba(56,189,248,0.2)] border-4 border-cyan-500/50 flex items-center justify-center"
                >
                  {/* Graduations / Marks (0, 10, 20, 30, 40, 50, 60, 70, 80, 90) */}
                  {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(
                    (deg, idx) => (
                      <div
                        key={deg}
                        style={{ transform: `rotate(${deg}deg)` }}
                        className="absolute inset-0 flex justify-center p-2 text-[10px] font-mono font-medium text-cyan-200/90"
                      >
                        <span className="transform -rotate-0">
                          {idx * 10 < 10 ? `0${idx * 10}` : idx * 10}
                        </span>
                      </div>
                    )
                  )}

                  {/* Center Metal Knob Handle in Navy */}
                  <div className="w-24 h-24 rounded-full bg-gradient-to-b from-[#334E77] via-[#203656] to-[#101F35] p-2 shadow-[0_8px_16px_rgba(0,0,0,0.6),inset_0_2px_4px_rgba(147,197,253,0.4)] border-2 border-cyan-400/50 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#060D1A] to-[#0E1A2E] flex items-center justify-center text-white shadow-inner border border-blue-900/60">
                      {stage === "unlocked" ? (
                        <Unlock size={28} className="text-emerald-400 animate-bounce drop-shadow-[0_0_10px_rgba(52,211,153,0.8)]" />
                      ) : (
                        <Lock size={28} className="text-cyan-400 drop-shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                      )}
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Status Display Below Lock */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 px-6 py-2.5 rounded-full bg-[#0A162B]/90 backdrop-blur-md border border-cyan-500/40 shadow-[0_0_20px_rgba(6,182,212,0.25)] flex items-center gap-3"
              >
                <div
                  className={`w-2.5 h-2.5 rounded-full ${stage === "unlocked"
                    ? "bg-emerald-400 animate-ping"
                    : "bg-cyan-400 animate-pulse"
                    }`}
                />
                <span className="text-xs font-mono font-medium tracking-widest text-cyan-200">
                  {statusMessage}
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
