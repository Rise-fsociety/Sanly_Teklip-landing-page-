"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Heart } from "lucide-react";
import { type Product } from "@/context/cart-context";
import { AddToCart } from "@/components/products/AddToCart";
import { ProductDetailModal } from "@/components/productDetailModal";
import { cn } from "@/lib/utils";

const ProductImage = ({ product, onClick }: { product: any, onClick: () => void }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      className="cursor-pointer relative w-full h-64"
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

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const locale = useLocale();
  const t = useTranslations("More");
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
  }, []);

  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
  }, [wishlist]);

  const getProductImageUrl = (imagePath: string) => {
    if (!imagePath) return "/Logo.png";
    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = ASSET_URL?.endsWith("/")
      ? ASSET_URL.slice(0, -1)
      : ASSET_URL;
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    return `${baseUrl}${cleanPath}`;
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${API_URL}/public/product?page=1`, {
          method: "GET",
        });
        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data)) {
          const activeProducts = data.data
            .filter((item: any) => item.id && item.isActive)
            .slice(0, 5);

          const mapped = activeProducts.map((item: any) => {
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

          setProducts(mapped);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [API_URL, locale]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleOpenDetails = (product: Product) => {
    setSelectedProduct(product);
  };

  if (loading) {
    return (
      <section className="py-8 md:py-12 xl:py-24 mt-24 container mx-auto px-4">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
            {Array.from({ length: 5 }).map((_, i) => (
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
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-12 xl:py-24 bg-white container mx-auto px-4">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {products.map((product) => (
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
                    <span className="font-bold text-base text-gray-900">
                      {product.price} TMT
                    </span>
                  </div>
                  <AddToCart product={product} size="sm" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-8 md:mt-12">
          <Link
            href="/products"
            className="px-8 py-3 bg-[#0157A4] text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold text-sm md:text-base"
          >
            {t("seeMore")}
          </Link>
        </div>
      </div>

      <ProductDetailModal
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </section>
  );
}
