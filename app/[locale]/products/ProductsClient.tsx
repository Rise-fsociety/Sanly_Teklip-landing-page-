"use client";

import { Heart } from "lucide-react";
import { Product } from "@/context/cart-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductDetailModal } from "@/components/productDetailModal";
import { WishlistDrawer } from "@/components/wishlistDrawer";
import { AddToCart } from "@/components/products/AddToCart";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { PromoCarousel } from "@/components/products/PromoCarousel";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { StoreHeader } from "@/components/store-header";
import TourPage from "@/components/tour/tourPage";

interface ProductsClientProps {
  initialProducts: any[];
  initialCategories: any[];
  initialTotalPages: number;
}

const ProductImage = ({ product, onClick }: { product: any, onClick: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="cursor-pointer relative w-full h-32 sm:h-48 md:h-64"
      onClick={onClick}
    >
      {isLoading && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:600px_100%] animate-shimmer" />
      )}
      <Image
        src={product.image}
        alt={product.name}
        width={500}
        height={500}
        unoptimized={true}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)}
        className={cn(
          "w-full h-full object-contain p-2 transition-opacity duration-300",
          isLoading ? "opacity-0" : "opacity-100"
        )}
      />
    </div>
  );
};

export function ProductsClient({ initialProducts, initialCategories, initialTotalPages }: ProductsClientProps) {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);
  const [categories, setCategories] = useState<any[]>(initialCategories);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const locale = useLocale();
  const t = useTranslations("ProductsPage");
  const h = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const ASSET_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

  useEffect(() => {
    const savedWishlist = localStorage.getItem("wishlist");
    if (savedWishlist) {
      try {
        setWishlist(JSON.parse(savedWishlist));
      } catch (e) {
        console.error("Failed to parse wishlist", e);
      }
    }
    setIsWishlistLoaded(true);
  }, []);

  useEffect(() => {
    if (isWishlistLoaded) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist, isWishlistLoaded]);

  const plugin = useRef(Autoplay({ delay: 4000, stopOnInteraction: true }));

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId],
    );
  };

  const handleLanguageChange = (newLocale: any) => {
    router.replace(pathname, { locale: newLocale, scroll: false });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [rawApiProducts, setRawApiProducts] = useState<any[]>(initialProducts);
  const [isLoading, setIsLoading] = useState(false); // initially false because we have SSR data
  const [isInitialMount, setIsInitialMount] = useState(true);

  useEffect(() => {
    if (isInitialMount) {
      setIsInitialMount(false);
      return; // Skip fetch on first mount to use SSR data
    }

    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const params = new URLSearchParams();
        params.append("page", page.toString());
        if (searchQuery) params.append("search", searchQuery);
        if (activeCategory !== "All Products") params.append("categoryId", activeCategory);

        const response = await fetch(`${API_URL}/public/product?${params.toString()}`, {
          method: "GET",
        });
        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data)) {
          setRawApiProducts(
            data.data.filter((item: any) => item.id && item.isActive),
          );
          if (data.pagination) {
            setTotalPages(data.pagination.pages || 1);
          } else {
            setTotalPages(1);
          }
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [page, activeCategory, searchQuery, API_URL]);

  useEffect(() => {
    if (categories.length > 0) return; 
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/public/category`, {
          method: "GET",
        });
        const data = await response.json();
        if (data.status === "success" && Array.isArray(data.data)) {
          const uniqueCats = data.data.reduce((acc: any[], curr: any) => {
            if (!acc.find((item: any) => item.id === curr.id)) {
              acc.push(curr);
            }
            return acc;
          }, []);
          setCategories(uniqueCats);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const getProductImageUrl = (imagePath: string) => {
    if (!imagePath) return "/Logo.png";
    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = ASSET_URL?.endsWith("/")
      ? ASSET_URL.slice(0, -1)
      : ASSET_URL;
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    return `${baseUrl}${cleanPath}`;
  };

  const mappedApiProducts: Product[] = rawApiProducts.map((item: any) => {
    const discountPrice =
      typeof item.boughtPrice === "number" && item.boughtPrice > 0
        ? item.boughtPrice
        : undefined;
    return {
      id: String(item.id),
      categoryName: String(item.categoryId),
      name:
        locale === "ru"
          ? item.nameRu
          : locale === "en"
            ? item.nameEn
            : item.nameTm,
      price: item.sellPrice || 0,
      discountPrice,
      image: item.images?.[0]?.url
        ? getProductImageUrl(item.images[0].url)
        : "/Logo.png",
      description:
        (locale === "ru"
          ? item.descRu
          : locale === "en"
            ? item.descEn
            : item.descTm) || "-",
      originalData: item,
    };
  });

  const allProducts = mappedApiProducts;
  const wishlistItems = allProducts.filter((p) => wishlist.includes(p.id));

  const filteredProducts = allProducts;

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StoreHeader
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          setPage(1);
        }}
        showSearch={true}
        wishlistCount={wishlist.length}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      <div>
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <PromoCarousel />
          <TourPage />
          </div>
        </div>

        <div id="products-grid" className="relative bg-[#0157A4] border-b border-gray-200">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                {activeCategory === "All Products"
                  ? t("allProducts")
                  : categories.find((c) => String(c.id) === activeCategory)?.[
                  locale === "tk" ? "nameTm" : locale === "ru" ? "nameRu" : "nameEn"
                  ] || activeCategory}
              </h1>
              <p className="text-base sm:text-lg text-white font-light">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        <div id="category-section" className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
              <button
                onClick={() => {
                  setActiveCategory("All Products");
                  setPage(1);
                }}
                className={`whitespace-nowrap px-5 py-2 text-sm font-medium transition-all ${activeCategory === "All Products"
                  ? "text-[#0157A4] border-b-2 border-[#0157A4]"
                  : "text-gray-500 hover:text-black"
                  }`}
              >
                {t("allProducts")}
              </button>
              {categories.map((cat) => {
                const catName =
                  locale === "ru"
                    ? cat.nameRu
                    : locale === "en"
                      ? cat.nameEn
                      : cat.nameTm;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(String(cat.id));
                      setPage(1);
                    }}
                    className={`whitespace-nowrap px-5 py-2 text-sm font-medium transition-all ${activeCategory === String(cat.id)
                      ? "text-[#0157A4] border-b-2 border-[#0157A4]"
                      : "text-gray-500 hover:text-black"
                      }`}
                  >
                    {catName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {Array.from({ length: 10 }).map((_, i) => (
                <div
                  key={i}
                  className="text-sm border border-gray-200 rounded-lg bg-white flex flex-col overflow-hidden"
                >
                  <div className="bg-gray-50 relative overflow-hidden">
                    <div className="h-64 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:600px_100%] animate-shimmer" />
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:600px_100%] animate-shimmer" />
                  </div>
                  <div className="p-4 flex flex-col flex-grow gap-2">
                    <div className="h-5 w-4/5 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:600px_100%] animate-shimmer" />
                    <div className="h-4 w-full rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:600px_100%] animate-shimmer" />
                    <div className="h-4 w-3/5 rounded bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:600px_100%] animate-shimmer" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 ">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="text-sm border-[1px] rounded-lg border-gray-200 group bg-white flex flex-col overflow-hidden"
                >
                  <div className="relative group overflow-hidden">
                    {product?.image && (
                      <ProductImage 
                        product={product} 
                        onClick={() => handleOpenDetails(product)} 
                      />
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm transition-all hover:bg-gray-100 active:scale-90 z-10"
                    >
                      <Heart
                        className={cn(
                          "w-4 h-4 transition-colors",
                          wishlist.includes(product.id)
                            ? "fill-red-500 text-red-500"
                            : "text-gray-600",
                        )}
                      />
                    </button>
                  </div>

                  <div className="p-4 flex flex-col flex-grow justify-between gap-4 bg-white">
                    <div className="space-y-1.5">
                      <h3 className="text-sm md:text-base font-semibold tracking-tight text-gray-900 line-clamp-2 break-words">
                        {product?.name}
                      </h3>

                      {product?.description &&
                        product.description !== "null" &&
                        product.description !== "none" && (
                          <p className="text-xs md:text-sm text-gray-500 leading-relaxed whitespace-pre-line break-words line-clamp-3">
                            {product.description}
                          </p>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 pt-3">
                      <div className="flex items-center gap-2">
                        {product.discountPrice && (
                          <span className="text-sm line-through text-gray-500">
                            {product.discountPrice} TMT
                          </span>
                        )}
                        <span
                          className={`font-bold ${product.discountPrice
                            ? "text-base text-gray-900"
                            : "text-base text-gray-900"
                            }`}
                        >
                          {product.price} TMT
                        </span>
                      </div>
                      <AddToCart product={product} size="sm" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (() => {
            const getPageNumbers = () => {
              const pages: (number | string)[] = [];
              if (totalPages <= 7) {
                for (let i = 1; i <= totalPages; i++) pages.push(i);
              } else {
                pages.push(1);
                if (page > 3) pages.push("...");
                const start = Math.max(2, page - 1);
                const end = Math.min(totalPages - 1, page + 1);
                for (let i = start; i <= end; i++) pages.push(i);
                if (page < totalPages - 2) pages.push("...");
                pages.push(totalPages);
              }
              return pages;
            };

            return (
              <div className="flex justify-center items-center gap-1.5 mt-8 md:mt-12">
                <button
                  disabled={page === 1}
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 disabled:opacity-40 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
                  aria-label={t("previous")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
                </button>

                {getPageNumbers().map((p, idx) =>
                  typeof p === "string" ? (
                    <span key={`ellipsis-${idx}`} className="w-9 h-9 flex items-center justify-center text-sm text-gray-400 select-none">
                      …
                    </span>
                  ) : (
                    <button
                      key={p}
                      onClick={() => {
                        setPage(p);
                        document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${p === page
                          ? "bg-[#0157A4] text-white shadow-sm"
                          : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                    >
                      {p}
                    </button>
                  )
                )}

                <button
                  disabled={page === totalPages}
                  onClick={() => {
                    setPage((p) => Math.min(totalPages, p + 1));
                    document.getElementById("products-grid")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-300 disabled:opacity-40 bg-white hover:bg-gray-50 text-gray-600 transition-colors shadow-sm"
                  aria-label={t("next")}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
                </button>
              </div>
            );
          })()}
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        items={wishlistItems}
        onRemove={toggleWishlist}
        onViewProduct={(product) => {
          setIsWishlistOpen(false);
          setSelectedProduct(product);
        }}
      />
    </div>
  );
}
