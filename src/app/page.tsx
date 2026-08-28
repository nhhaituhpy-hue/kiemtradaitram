"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User } from "lucide-react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 800)); // simulate network

      if (username.trim().toUpperCase() === "TUH" && password === "12345678") {
        document.cookie = `auth_token=mock-token-${username.trim().toUpperCase()}; path=/; max-age=86400`;
        router.push("/dashboard/tuh");
      } else {
        setError("Tài khoản hoặc mật khẩu không chính xác");
      }
    } catch (err) {
      setError("Đã có lỗi xảy ra, vui lòng thử lại sau.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#060a12] p-4 relative overflow-hidden font-sans">
      {/* Background Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-red-600/10 rounded-full blur-[80px] pointer-events-none"></div>
      
      {/* Texture Overlay (Optional) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 pointer-events-none mix-blend-overlay"></div>

      <div className="w-full max-w-[420px] bg-[#0c1322]/80 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/10 p-8 sm:p-10 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Brand & Heading */}
        <div className="flex flex-col items-center mb-10 text-center">
          <div className="mb-2">
            <h1 className="text-4xl font-black tracking-tight flex items-center justify-center">
              <span className="text-[#e63946] drop-shadow-sm">A</span>
              <span className="text-blue-500 drop-shadow-sm">TTECH</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1 opacity-80">
              Sáng tạo và Thích nghi
            </p>
          </div>
          
          <h2 className="text-2xl font-bold text-white tracking-wide mt-4 drop-shadow-md">
            SIRMS
          </h2>
          <p className="mt-1 text-xs font-semibold text-blue-300/80 uppercase tracking-widest">
            Hệ thống quản lý hồ sơ đài trạm
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Tên đăng nhập
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium"
                placeholder="Nhập tài khoản"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all text-sm font-medium"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-400 font-medium bg-red-950/40 border border-red-900/50 px-4 py-3 rounded-xl flex items-center justify-center animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 active:scale-[0.98] text-white text-sm font-bold tracking-wide rounded-xl shadow-lg shadow-blue-900/30 transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </div>
        </form>
        
        <div className="mt-10 text-center">
          <p className="text-[11px] font-medium text-slate-500/80">
            © 2026 Công ty TNHH Kỹ thuật Quản lý bay
          </p>
        </div>
      </div>
    </div>
  );
}
