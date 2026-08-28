"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { User, Lock } from "lucide-react";

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
    <div className="min-h-screen flex items-center justify-center bg-[#F4F3EF]">
      <div className="w-full max-w-md p-8 md:p-10 bg-white rounded-xl shadow-sm border border-[#E0DED5]">
        <div className="mb-8 text-center space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight uppercase flex items-center justify-center">
            <span className="text-red-600">A</span>
            <span className="text-blue-800">TTECH</span>
          </h1>
          <p className="text-gray-500 font-medium text-sm uppercase tracking-wide">Hệ thống quản lý hồ sơ đài trạm CNS</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-4">
            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3 border border-[#E0DED5] rounded-lg bg-[#F4F3EF]/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 focus:bg-white transition-colors text-sm"
                  placeholder="Tên đăng nhập"
                  required
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-400">
                  <Lock size={18} />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-3 py-3 border border-[#E0DED5] rounded-lg bg-[#F4F3EF]/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-600 focus:border-blue-600 focus:bg-white transition-colors text-sm"
                  placeholder="Mật khẩu"
                  required
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center font-medium">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center py-3 px-4 bg-blue-700 hover:bg-blue-800 text-white text-sm font-semibold rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
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
  );
}
