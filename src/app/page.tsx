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
    <div className="min-h-screen flex items-center justify-center bg-[#F4F3EF] p-4 relative overflow-hidden font-sans">
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-red-100/50 rounded-full blur-[80px] pointer-events-none"></div>
      
      {/* Texture Overlay (Optional) */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] pointer-events-none mix-blend-multiply"></div>

      <div className="w-full max-w-[420px] bg-white/70 backdrop-blur-2xl rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white p-8 sm:p-10 relative z-10 animate-in fade-in zoom-in-95 duration-500">
        
        {/* Brand & Heading */}
        <div className="flex flex-col items-center mb-8 text-center">
          <div>
            <h1 className="text-4xl font-black tracking-tight flex items-center justify-center">
              <span className="text-[#e63946] drop-shadow-sm">A</span>
              <span className="text-blue-700 drop-shadow-sm">TTECH</span>
            </h1>
            <p className="text-[10px] font-bold text-zinc-500 tracking-widest uppercase mt-1">
              Sáng tạo và Thích nghi
            </p>
          </div>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block">
              Tên đăng nhập
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <User size={18} />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E0DED5] rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C3CFA2] focus:border-[#C3CFA2] transition-all text-sm font-medium shadow-sm"
                placeholder="Nhập tài khoản"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-600 uppercase tracking-wider block">
              Mật khẩu
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                <Lock size={18} />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-3 bg-white border border-[#E0DED5] rounded-xl text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#C3CFA2] focus:border-[#C3CFA2] transition-all text-sm font-medium shadow-sm"
                placeholder="••••••••"
                autoComplete="current-password"
                required
              />
            </div>
          </div>

          {error && (
            <div className="text-xs text-red-600 font-medium bg-red-50 border border-red-100 px-4 py-3 rounded-xl flex items-center justify-center animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}

          <div className="pt-2">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3.5 px-4 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white text-sm font-bold tracking-wide rounded-xl shadow-md shadow-blue-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed uppercase"
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
          <p className="text-[11px] font-medium text-zinc-500">
            © 2026 Công ty TNHH Kỹ thuật Quản lý bay
          </p>
        </div>
      </div>
    </div>
  );
}
