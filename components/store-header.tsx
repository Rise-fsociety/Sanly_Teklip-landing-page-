"use client";

import { Search, Home, Heart, ShoppingCart, User } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { LoginModal } from "./login-modal";

interface StoreHeaderProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  showSearch?: boolean;
  wishlistCount?: number;
  onWishlistClick?: () => void;
}

export function StoreHeader({
  searchQuery = "",
  onSearchChange,
  showSearch = true,
  wishlistCount = 0,
  onWishlistClick,
}: StoreHeaderProps) {
  const { setIsOpen: setIsCartOpen, totalItems } = useCart();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale, scroll: false });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link
              href="/"
              className="flex items-center gap-2 text-sm font-medium text-gray-900 hover:text-gray-600 transition-colors"
            >
              <Home className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>

            {showSearch && (
              <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => onSearchChange?.(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleLanguageChange("tm")}
                  className={cn(
                    "text-xs font-black transition-all hover:scale-110",
                    locale === "tm" ? "text-brand-blue" : "text-slate-400",
                  )}
                >
                  TM
                </button>
                <button
                  onClick={() => handleLanguageChange("ru")}
                  className={cn(
                    "text-xs font-black transition-all hover:scale-110",
                    locale === "ru" ? "text-brand-blue" : "text-slate-400",
                  )}
                >
                  RU
                </button>
                <button
                  onClick={() => handleLanguageChange("en")}
                  className={cn(
                    "text-xs font-black transition-all hover:scale-110",
                    locale === "en" ? "text-brand-blue" : "text-slate-400",
                  )}
                >
                  EN
                </button>
              </div>
              <button
                onClick={onWishlistClick}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart
                  className={cn(
                    "w-5 h-5",
                    wishlistCount > 0
                      ? "fill-red-500 text-red-500"
                      : "text-gray-900",
                  )}
                />
                {wishlistCount > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {wishlistCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setIsLoginModalOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <User className="w-5 h-5 text-slate-600" />
              </button>

              <button
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ShoppingCart className="w-5 h-5 text-slate-600" />
                {totalItems > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-[#0157A4] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {showSearch && (
            <div className="md:hidden pb-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>
          )}
        </div>
      </nav>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
