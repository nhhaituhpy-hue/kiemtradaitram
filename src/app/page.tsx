"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import AviationFlightMapBackground from "@/components/AviationFlightMapBackground";
import AviationVaultLock from "@/components/AviationVaultLock";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 600)); // simulate network

      if (username.trim().toUpperCase() === "TUH" && password === "12345678") {
        document.cookie = `auth_token=mock-token-${username.trim().toUpperCase()}; path=/; max-age=86400`;
        // Trigger the vault unlocking sequence
        setIsUnlocking(true);
      } else {
        setError("Tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVaultComplete = () => {
    router.push("/dashboard/tuh?entrance=transformer");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#070D1E] p-4 relative overflow-hidden font-sans">
      {/* Global Flight Map Background with Latitude, Longitude & Air Routes */}
      <AviationFlightMapBackground />

      {/* Atmospheric Navy & Cyan Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-[90px] pointer-events-none"></div>

      {/* Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-overlay"></div>

      {/* Main Login Card - Transparent Glassmorphism (~355px) */}
      <AnimatePresence>
        {!isUnlocking && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{
              opacity: 0,
              scale: 0.9,
              filter: "blur(8px)",
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="w-full max-w-[355px] bg-[#0C1836]/65 backdrop-blur-2xl rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(56,189,248,0.15)] border border-cyan-400/30 p-6 sm:p-7 relative z-10"
          >
            {/* Brand & Heading */}
            <div className="flex flex-col items-center mb-4 text-center">
              <div>
                <h1 className="text-3xl sm:text-3xl font-cormorant font-medium tracking-wide flex items-center justify-center">
                  <span className="text-[#e63946] drop-shadow-[0_0_12px_rgba(230,57,70,0.5)]">A</span>
                  <span className="text-cyan-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.5)]">TTECH</span>
                </h1>
                <p className="text-[11px] font-cormorant font-light italic text-cyan-200/80 tracking-widest mt-1.5">
                  Sáng tạo và Thích nghi
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-5" autoComplete="off">
              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-cyan-200/90 uppercase tracking-wider block">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/80">
                    <User size={17} />
                  </div>
                  <input
                    type="text"
                    name="username_tech"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="block w-full pl-10 pr-3.5 py-2.5 bg-[#060E22]/70 border border-[#254170] rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-sm font-medium shadow-inner"
                    placeholder="Nhập tài khoản"
                    autoComplete="off"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-medium text-cyan-200/90 uppercase tracking-wider block">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-cyan-400/80">
                    <Lock size={17} />
                  </div>
                  <input
                    type="text"
                    name="passcode_sec"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ WebkitTextSecurity: "disc" } as React.CSSProperties}
                    className="block w-full pl-10 pr-3.5 py-2.5 bg-[#060E22]/70 border border-[#254170] rounded-xl text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400 transition-all text-sm font-medium shadow-inner"
                    placeholder="••••••••"
                    autoComplete="new-password"
                    data-1p-ignore="true"
                    data-lpignore="true"
                    required
                  />
                </div>
              </div>

              {error && (
                <div className="text-xs text-red-400 font-medium bg-red-950/40 border border-red-500/40 px-3.5 py-2.5 rounded-xl flex items-center justify-center animate-in fade-in slide-in-from-top-1">
                  {error}
                </div>
              )}

              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full flex items-center justify-center py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 active:scale-[0.98] text-white text-sm font-medium tracking-wide rounded-xl shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase cursor-pointer"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    "Đăng nhập"
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8 text-center">
              <p className="text-[10px] font-medium text-slate-400/70">
                2026 © Trung tâm Bảo đảm kỹ thuật
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3D Aviation Vault Combination Lock & Opening Doors Animation */}
      <AviationVaultLock
        isTriggered={isUnlocking}
        onUnlocked={handleVaultComplete}
      />
    </div>
  );
}
