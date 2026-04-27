"use client";

import { X, Eye, EyeOff } from "lucide-react";
import { useEffect, useState } from "react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<"login" | "register" | "forgot">("login");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center bg-black/50 overflow-y-auto">
      <div className="min-h-screen w-full flex items-start justify-center p-4 py-5">
        <div 
          className="w-full max-w-[560px] bg-white rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
        >
          <button
            onClick={onClose}
            className="absolute right-6 top-6 p-1.5 text-gray-400 hover:text-gray-600 transition-colors z-10"
          >
            <X className="h-7 w-7" strokeWidth={2} />
          </button>
          <div className="pt-10 pb-8 px-10">
            <h1 className="text-4xl font-bold text-brand-blue">Sanly Teklip</h1>
          </div>
          <div className="flex px-10 gap-10 border-b-2 border-gray-200">
            <button
              onClick={() => setActiveTab("login")}
              className={`pb-4 text-lg font-semibold transition-all relative ${
                activeTab === "login"
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
            >
              Girmek
              {activeTab === "login" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`pb-4 text-lg font-semibold transition-all relative ${
                activeTab === "register"
                  ? "text-gray-900"
                  : "text-gray-400"
              }`}
            >
              Agza bolmak
              {activeTab === "register" && (
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900"></div>
              )}
            </button>
          </div>

          <div className="p-10">
            {activeTab === "login" && (
              <form className="space-y-6">
                <div>
                  <label className="block text-base text-gray-500 mb-3">
                    Telefon belgisi:
                  </label>
                  <input
                    type="tel"
                    defaultValue="+993  63407574"
                    className="w-full px-5 py-4 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-base text-gray-500 mb-3">
                    Parol:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      defaultValue="examplepassword"
                      className="w-full px-5 py-4 pr-14 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                      style={{ letterSpacing: showPassword ? 'normal' : '0.1em' }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <Eye className="h-6 w-6" />
                      ) : (
                        <EyeOff className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>

                <div className="flex items-start pt-2">
                  <div className="flex items-center h-6">
                    <input
                      id="remember"
                      type="checkbox"
                      className="w-5 h-5 border-2 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 text-blue-600"
                    />
                  </div>
                  <label htmlFor="remember" className="ml-3 text-base text-gray-700">
                    Howpsuzlyk barlagy
                  </label>
                </div>

                <div className="text-center pt-3">
                  <p className="text-base text-gray-700">
                    Parolyňyzy unutdyňyzmy?{" "}
                    <button 
                      type="button"
                      onClick={() => setActiveTab("forgot")}
                      className="text-green-600 font-medium hover:text-green-700"
                    >
                      Çalyşmak
                    </button>
                  </p>
                </div>

                <button
                  type="button"
                  className="w-full py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all mt-8"
                >
                  Girmek
                </button>
              </form>
            )}

            {/* Register Form */}
            {activeTab === "register" && (
              <form className="space-y-6">
                <div>
                  <label className="block text-base text-gray-500 mb-3">
                    Adyňyz:
                  </label>
                  <input
                    type="text"
                    className="w-full px-5 py-4 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                    placeholder="Adyňyzy giriziň"
                  />
                </div>

                <div>
                  <label className="block text-base text-gray-500 mb-3">
                    Telefon belgisi:
                  </label>
                  <div className="flex gap-3">
                    <div className="w-24 px-4 py-4 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-bold flex items-center justify-center">
                      +993
                    </div>
                    <input
                      type="tel"
                      className="flex-1 px-5 py-4 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                      placeholder="XX XX XX XX"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-base text-gray-500 mb-3">
                    Parol:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-5 py-4 pr-14 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                      placeholder="Parol giriziň"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <Eye className="h-6 w-6" />
                      ) : (
                        <EyeOff className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-base text-gray-500 mb-3">
                    Paroly gaýtalaň:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      className="w-full px-5 py-4 pr-14 text-base border border-gray-200 rounded-xl bg-gray-50 text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all"
                      placeholder="Paroly gaýtalaň"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <Eye className="h-6 w-6" />
                      ) : (
                        <EyeOff className="h-6 w-6" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="w-full py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-bold text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all mt-8"
                >
                  Agza bolmak
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}