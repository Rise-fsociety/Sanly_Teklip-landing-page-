"use client";

import { Heart } from "lucide-react";
import { Product} from "@/context/cart-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductDetailModal } from "@/components/productDetailModal";
import { WishlistDrawer } from "@/components/wishlistDrawer";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { PromoCarousel } from "@/components/products/PromoCarousel";
import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { StoreHeader } from "@/components/store-header";

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const locale = useLocale();
  const t = useTranslations("ProductsPage");
  const h = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();

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

  const [rawApiProducts, setRawApiProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "/api/excell/select/27",
        );
        const data = await response.json();

        if (data.status === "success" && data.data?.tbl_mg_materials) {
          setRawApiProducts(
            data.data.tbl_mg_materials.filter((item: any) => item.material_id),
          );
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/Maincategory/select/join/gurlushyk");
        const data = await response.json();
        if (data.status === "success" && data.data?.mainCategorySelectJoin) {
          // Filter unique categories by name to avoid duplicates
          const uniqueCats = data.data.mainCategorySelectJoin.reduce((acc: any[], curr: any) => {
            if (!acc.find(item => item.category_id === curr.category_id)) {
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

  const mappedApiProducts: Product[] = rawApiProducts.map((item: any) => ({
    id: String(item.material_id),
    categoryName: item.category_id?.trim(), // Trim for better matching
    name:
      locale === "ru"
        ? item.material_name_ru
        : locale === "en"
          ? item.material_name_en
          : item.material_name_tm,
    price: item.sale_price1 || 0,
    image: item.image_path
      ? `${process.env.NEXT_PUBLIC_ADMIN_URL}/public/products/apkCard/${encodeURIComponent(item.image_path)}`
      : "/Logo.png", // Use Logo.png as placeholder if image is missing
    description:
      (locale === "ru"
        ? item.main_desc_ru
        : locale === "en"
          ? item.main_desc_en
          : item.main_desc_tm) || "-",
    originalData: item // Keep original data for advanced filtering
  }));

  const allProducts = mappedApiProducts;
  const wishlistItems = allProducts.filter((p) => wishlist.includes(p.id));

  const filteredProducts = allProducts.filter((product) => {
    const matchesSearch = product.name
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === "All Products" || 
      product.categoryName === activeCategory;

    return matchesSearch && matchesCategory;
  });

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <StoreHeader
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        showSearch={true}
        wishlistCount={wishlist.length}
        onWishlistClick={() => setIsWishlistOpen(true)}
      />
      <div>
        <div className="bg-gray-50 py-8 md:py-12">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <PromoCarousel />
          </div>
        </div>

        <div className="relative bg-[#0157A4] border-b border-gray-200">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="max-w-3xl">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
                {activeCategory === "All Products" 
                  ? t("allProducts") 
                  : (categories.find(c => c.category_name_tm === activeCategory)?.[`category_name_${locale}`] || activeCategory)}
              </h1>
              <p className="text-base sm:text-lg text-white font-light">
                {t("description")}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
              <button
                onClick={() => setActiveCategory("All Products")}
                className={`whitespace-nowrap px-5 py-2 text-sm font-medium transition-all ${
                  activeCategory === "All Products"
                    ? "text-[#0157A4] border-b-2 border-[#0157A4]"
                    : "text-gray-500 hover:text-black"
                }`}
              >
                {t("allProducts")}
              </button>
              {categories.map((cat) => {
                const catName = locale === "ru" ? cat.category_name_ru : locale === "en" ? cat.category_name_en : cat.category_name_tm;
                // Note: The product's category_id seems to contain the TM name of the category in the raw data
                return (
                  <button
                    key={cat.category_id}
                    onClick={() => setActiveCategory(cat.category_name_tm)}
                    className={`whitespace-nowrap px-5 py-2 text-sm font-medium transition-all ${
                      activeCategory === cat.category_name_tm
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
      <div key={i} className="text-sm border border-gray-200 rounded-lg bg-white flex flex-col overflow-hidden">
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
                      <div
                        className="cursor-pointer"
                        onClick={() => handleOpenDetails(product)}
                      >
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={500}
                          height={500}
                          unoptimized={true}
                          referrerPolicy="no-referrer"
                          className="w-full h-64 object-contain"
                        />
                      </div>
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

                  <div className="p-4 flex flex-col flex-grow gap-2">
                    <h3 className="text-base font-semibold line-clamp-1 text-gray-900">
                      {product?.name}
                    </h3>
                    
                    {product?.description && (
                   <p className="text-gray-600 leading-relaxed">
                    {product.description === "null" ? "-" : product.description}
                  </p>
                  )}
                  </div>
                </div>
              ))}
            </div>
          )}
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
