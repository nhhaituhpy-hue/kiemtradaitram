"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div className="min-h-screen flex w-full bg-white">
      {/* Left Panel - Brand (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 flex-col justify-between p-12 lg:p-20 relative overflow-hidden">
        {/* Subtle background pattern/gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-slate-900 pointer-events-none" />
        
        <div className="relative z-10">
          <h1 className="text-4xl font-extrabold tracking-tight uppercase flex items-center">
            <span className="text-red-500">A</span>
            <span className="text-white">TTECH</span>
          </h1>
        </div>

        <div className="relative z-10 max-w-lg">
          <h2 className="text-3xl md:text-4xl font-semibold text-white tracking-tight leading-tight mb-6">
            Hệ thống quản lý<br />hồ sơ đài trạm CNS
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Nền tảng số hóa nghiệp vụ kỹ thuật, giám sát tình trạng hoạt động và quản lý tài liệu lưu trữ tập trung.
          </p>
        </div>

        <div className="relative z-10 text-slate-500 text-sm">
          &copy; {new Date().getFullYear()} ATTECH. All rights reserved.
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-white">
        <div className="w-full max-w-sm space-y-8">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 space-y-2">
            <h1 className="text-3xl font-extrabold tracking-tight uppercase flex items-center">
              <span className="text-red-600">A</span>
              <span className="text-blue-800">TTECH</span>
            </h1>
            <p className="text-slate-500 font-medium text-sm tracking-wide">
              Hệ thống quản lý hồ sơ đài trạm CNS
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Đăng nhập</h2>
            <p className="text-sm text-slate-500 mt-2">
              Vui lòng nhập thông tin tài khoản để truy cập hệ thống.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700 block">Tài khoản</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full px-3 py-2.5 border border-slate-200 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-shadow text-sm"
                placeholder="Nhập tên đăng nhập"
                required
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-slate-700 block">Mật khẩu</label>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2.5 border border-slate-200 rounded-md bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 transition-shadow text-sm"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="text-sm text-red-600 font-medium">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md shadow-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Đăng nhập"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
