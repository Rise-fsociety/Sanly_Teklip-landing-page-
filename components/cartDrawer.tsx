"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X, ShoppingCart, Trash2, Plus, Minus, ShoppingBag,
  Zap, Store, Loader2, Sparkles,
} from "lucide-react";
import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { useState, useEffect, useCallback, useRef } from "react";

// ── Category IDs ────────────────────────────────────────────────────────
const CASH_IDS   = [5, 7, 8, 9];   // Thermal Printers, Barcode Scanners, POS/Monobloks, Cash Drawers
const MARKET_IDS = [6, 10, 11, 12, 13]; // Barcode Printers, Mouse/KB, Scales, Thermal Paper, Computers

const API_URL   = process.env.NEXT_PUBLIC_API_URL;
const ASSET_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

function getImg(url?: string) {
  if (!url) return "/Logo.png";
  if (url.startsWith("http")) return url;
  const base = ASSET_URL?.endsWith("/") ? ASSET_URL.slice(0, -1) : ASSET_URL;
  return `${base}${url.startsWith("/") ? url : `/${url}`}`;
}

interface ApiProduct {
  id: number;
  nameTm: string; nameRu: string; nameEn: string;
  sellPrice: number; categoryId: number;
  images?: { url: string }[];
  descTm?: string; descRu?: string; descEn?: string;
  isActive: boolean;
}

// ── Per-category product cache (module-level, survives re-renders) ──────
const catCache = new Map<number, ApiProduct | null>();

async function fetchOneByCat(catId: number): Promise<ApiProduct | null> {
  if (catCache.has(catId)) return catCache.get(catId)!;
  try {
    const res  = await fetch(`${API_URL}/public/product?categoryId=${catId}&page=1`);
    const data = await res.json();
    const found = data.status === "success"
      ? (data.data as ApiProduct[]).find((p) => p.isActive) ?? null
      : null;
    catCache.set(catId, found);
    return found;
  } catch { return null; }
}

// ── Fetch missing-category suggestions in parallel ───────────────────────
async function fetchSuggestions(bundleIds: number[], cartCatIds: number[]) {
  const missing = bundleIds.filter((id) => !cartCatIds.includes(id));
  const results = await Promise.all(missing.map(fetchOneByCat));
  return results.filter(Boolean) as ApiProduct[];
}

export function CartDrawer() {
  const { cart, isOpen, setIsOpen, removeFromCart, updateQuantity, totalPrice, addToCart } = useCart();
  const t      = useTranslations("Cart");
  const locale = useLocale();

  const [suggestions,   setSuggestions]   = useState<ApiProduct[]>([]);
  const [activeBundle,  setActiveBundle]  = useState<"cash" | "market" | null>(null);
  const [loadingBundle, setLoadingBundle] = useState<"cash" | "market" | null>(null);
  const [sugLoading,    setSugLoading]    = useState(false);
  const [addingIds,     setAddingIds]     = useState<Set<number>>(new Set());

  const cartCatIds = cart.map((i) => Number(i.categoryName)).filter(Boolean);
  const hasCash    = cartCatIds.some((id) => CASH_IDS.includes(id));
  const hasMarket  = cartCatIds.some((id) => MARKET_IDS.includes(id));

  const name = useCallback(
    (p: ApiProduct) => locale === "ru" ? p.nameRu : locale === "en" ? p.nameEn : p.nameTm,
    [locale],
  );

  // Auto-detect bundle when drawer opens
  const prevOpen = useRef(false);
  useEffect(() => {
    if (!isOpen) { prevOpen.current = false; return; }
    if (prevOpen.current) return; // already ran for this open
    prevOpen.current = true;

    if (!hasCash && !hasMarket) { setSuggestions([]); setActiveBundle(null); return; }

    const bundle = hasCash ? "cash" : "market";
    const ids    = bundle === "cash" ? CASH_IDS : MARKET_IDS;
    setActiveBundle(bundle);
    setSugLoading(true);
    fetchSuggestions(ids, cartCatIds).then((r) => { setSuggestions(r); setSugLoading(false); });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // Bundle button handler
  const handleBundle = async (bundle: "cash" | "market") => {
    const ids = bundle === "cash" ? CASH_IDS : MARKET_IDS;
    setActiveBundle(bundle);

    if (cart.length === 0) {
      // Empty cart → auto-fill one item per category
      setLoadingBundle(bundle);
      const products = (await Promise.all(ids.map(fetchOneByCat))).filter(Boolean) as ApiProduct[];
      products.forEach((p) =>
        addToCart({
          id: String(p.id),
          name: name(p),
          price: p.sellPrice ?? 0,
          image: getImg(p.images?.[0]?.url),
          description: (locale === "ru" ? p.descRu : locale === "en" ? p.descEn : p.descTm) || "-",
          categoryName: String(p.categoryId),
        })
      );
      setSuggestions([]);
      setLoadingBundle(null);
    } else {
      // Has items → suggest what's missing
      setSugLoading(true);
      const r = await fetchSuggestions(ids, cartCatIds);
      setSuggestions(r);
      setSugLoading(false);
    }
  };

  // Add a suggestion to cart
  const handleAddSug = (product: ApiProduct) => {
    setAddingIds((prev) => new Set(prev).add(product.id));
    addToCart({
      id: String(product.id),
      name: name(product),
      price: product.sellPrice ?? 0,
      image: getImg(product.images?.[0]?.url),
      description: (locale === "ru" ? product.descRu : locale === "en" ? product.descEn : product.descTm) || "-",
      categoryName: String(product.categoryId),
    });
    setTimeout(() => {
      setSuggestions((prev) => prev.filter((p) => p.id !== product.id));
      setAddingIds((prev) => { const n = new Set(prev); n.delete(product.id); return n; });
    }, 350);
  };

  const L = (ru: string, en: string, tk: string) =>
    locale === "ru" ? ru : locale === "en" ? en : tk;

  const isCash = activeBundle === "cash";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 220 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white z-[70] shadow-2xl flex flex-col"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-[#0157A4]/10 flex items-center justify-center">
                  <ShoppingBag className="w-4.5 h-4.5 text-[#0157A4]" />
                </div>
                <h2 className="text-base font-bold uppercase tracking-widest text-gray-900">
                  {t("cartTitle")}
                </h2>
                {cart.length > 0 && (
                  <span className="ml-1 text-xs font-bold bg-[#0157A4] text-white rounded-full px-2 py-0.5">
                    {cart.reduce((s, i) => s + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
              >
                <X className="w-5 h-5" />
              </button>
            </div>


            {/* ── Bundle buttons ── */}
            <div className="px-4 pt-3 pb-2 shrink-0 bg-gray-50/80 border-b border-gray-100">
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2">
                {L("Готовые комплекты", "Complete Setups", "Taýýar toplumlar")}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {/* CASH */}
                <button
                  onClick={() => handleBundle("cash")}
                  disabled={loadingBundle !== null}
                  className={`relative flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden
                    ${activeBundle === "cash"
                      ? "bg-[#0157A4] text-white shadow-lg shadow-blue-200"
                      : "bg-white text-[#0157A4] border border-blue-200 hover:border-[#0157A4]"
                    }`}
                >
                  {loadingBundle === "cash"
                    ? <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    : <Zap className="w-4 h-4 shrink-0" />
                  }
                  <span className="truncate">{L("Касса", "Cash Register", "Kassa")}</span>
                  {activeBundle === "cash" && (
                    <motion.span
                      layoutId="bundle-pill"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                    />
                  )}
                </button>

                {/* MARKET */}
                <button
                  onClick={() => handleBundle("market")}
                  disabled={loadingBundle !== null}
                  className={`relative flex items-center gap-2 py-2.5 px-3 rounded-xl text-sm font-semibold transition-all duration-200 overflow-hidden
                    ${activeBundle === "market"
                      ? "bg-emerald-600 text-white shadow-lg shadow-emerald-200"
                      : "bg-white text-emerald-700 border border-emerald-200 hover:border-emerald-500"
                    }`}
                >
                  {loadingBundle === "market"
                    ? <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    : <Store className="w-4 h-4 shrink-0" />
                  }
                  <span className="truncate">{L("Маркет", "Market", "Market")}</span>
                  {activeBundle === "market" && (
                    <motion.span
                      layoutId="bundle-pill"
                      className="absolute inset-0 bg-white/10 rounded-xl"
                    />
                  )}
                </button>
              </div>
            </div>

            {/* ── Scrollable body ── */}
            <div className="flex-1 overflow-y-auto">

              {/* Cart items */}
              <div className="p-4 space-y-2">
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-16 text-gray-400 gap-4">
                    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center">
                      <ShoppingCart className="w-7 h-7 opacity-40" />
                    </div>
                    <p className="text-sm">{t("emptyMessage")}</p>
                    <Button variant="outline" size="sm" onClick={() => setIsOpen(false)}>
                      {t("startShopping")}
                    </Button>
                  </div>
                ) : (
                  <AnimatePresence initial={false}>
                    {cart.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.18 }}
                        className="flex gap-3 p-3 rounded-xl bg-white border border-gray-100 shadow-sm group"
                      >
                        <div className="w-14 h-14 rounded-lg bg-gray-50 flex items-center justify-center shrink-0 border border-gray-100">
                          <Image
                            src={item.image} alt={item.name}
                            width={48} height={48}
                            className="object-contain" unoptimized
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-gray-900 truncate pr-6 leading-tight">
                            {item.name}
                          </h3>
                          <p className="text-[#0157A4] font-bold text-sm mt-0.5">{item.price} TMT</p>
                          <div className="flex items-center gap-1 mt-1.5">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="w-7 text-center text-sm font-semibold">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-100 transition-colors"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="absolute-ish self-start mt-0.5 p-1.5 rounded-full text-red-600"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* ── Cross-sell suggestions ── */}
              <AnimatePresence>
                {(sugLoading || suggestions.length > 0) && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="px-4 pb-6"
                  >
                    {/* Section header */}
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className={`w-3.5 h-3.5 ${isCash ? "text-[#0157A4]" : "text-emerald-600"}`} />
                      <span className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
                        {L("Часто берут вместе", "Complete Your Setup", "Toplum üçin")}
                      </span>
                      <div className="flex-1 h-px bg-gray-100" />
                    </div>

                    {sugLoading ? (
                      <div className="flex justify-center py-8">
                        <Loader2 className={`w-5 h-5 animate-spin ${isCash ? "text-[#0157A4]" : "text-emerald-600"}`} />
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <AnimatePresence initial={false}>
                          {suggestions.map((product) => (
                            <motion.div
                              key={product.id}
                              layout
                              initial={{ opacity: 0, x: 12 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -12, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className={`flex items-center gap-3 p-2.5 rounded-xl border
                                ${isCash
                                  ? "bg-blue-50/70 border-blue-100"
                                  : "bg-emerald-50/70 border-emerald-100"
                                }`}
                            >
                              {/* Thumbnail */}
                              <div className="w-11 h-11 rounded-lg bg-white border border-white shadow-sm flex items-center justify-center shrink-0">
                                <Image
                                  src={getImg(product.images?.[0]?.url)}
                                  alt={name(product)}
                                  width={36} height={36}
                                  className="object-contain" unoptimized
                                />
                              </div>

                              {/* Info */}
                              <div className="flex-1 min-w-0">
                                <p className="text-xs font-semibold text-gray-800 leading-tight line-clamp-2">
                                  {name(product)}
                                </p>
                                <p className={`text-xs font-bold mt-0.5 ${isCash ? "text-[#0157A4]" : "text-emerald-700"}`}>
                                  {product.sellPrice} TMT
                                </p>
                              </div>

                              {/* Add button */}
                              <button
                                onClick={() => handleAddSug(product)}
                                disabled={addingIds.has(product.id)}
                                className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all active:scale-90
                                  ${isCash
                                    ? "bg-[#0157A4] hover:bg-blue-700 text-white"
                                    : "bg-emerald-600 hover:bg-emerald-700 text-white"
                                  } disabled:opacity-60`}
                              >
                                {addingIds.has(product.id)
                                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                  : <Plus className="w-3.5 h-3.5" />
                                }
                              </button>
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {cart.length > 0 && (
              <div className="px-5 py-4 border-t border-gray-100 bg-white shrink-0">
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-500">{t("total")}</span>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black text-gray-900">{totalPrice.toFixed(2)}</span>
                    <span className="text-sm font-semibold text-gray-500">TMT</span>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}