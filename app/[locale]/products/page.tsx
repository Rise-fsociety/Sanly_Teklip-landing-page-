"use client";

import { Search, Home, Heart, ShoppingCart } from "lucide-react";
import { Product, useCart } from "@/context/cart-context";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ProductDetailModal } from "@/components/productDetailModal";
import { WishlistDrawer } from "@/components/wishlistDrawer";
import { cn } from "@/lib/utils";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { PromoCarousel } from "@/components/products/PromoCarousel";
import { AddToCart } from "@/components/products/AddToCart";
import { useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";
import { StoreHeader } from "@/components/store-header";

const categories = [
  "All Products",
  "Software",
  "Hardware",
  "Cloud",
  "Security",
];

const staticProducts: Product[] = [
  {
    id: "1",
    name: "Akar ERP System",
    price: 1200,
    image: "/Akar.png",
    description:
      "Enterprise resource planning solution for modern businesses with advanced analytics.",
  },
  {
    id: "2",
    name: "Akhasap Cloud",
    price: 450,
    image: "/Akhasap.png",
    description:
      "Secure and scalable cloud accounting software for financial management.",
  },
  {
    id: "3",
    name: "Archalyk Security",
    price: 800,
    image: "/Archalyk.webp",
    description:
      "Advanced cybersecurity suite for enterprise protection and threat detection.",
  },
  {
    id: "4",
    name: "Gosha Chynar Network",
    price: 1500,
    image: "/GoshaChynar.png",
    description:
      "High-performance networking hardware and software for seamless connectivity.",
  },
  {
    id: "5",
    name: "Akar Pro Suite",
    price: 2200,
    image: "/Akar.png",
    description:
      "Professional edition with advanced features and premium support included.",
  },
  {
    id: "6",
    name: "Akhasap Enterprise",
    price: 850,
    image: "/Akhasap.png",
    description:
      "Enterprise-grade cloud solution with unlimited storage and users.",
  },
  {
    id: "7",
    name: "Archalyk Premium",
    price: 1400,
    image: "/Archalyk.webp",
    description:
      "Premium security package with 24/7 monitoring and instant alerts.",
  },
  {
    id: "8",
    name: "Gosha Chynar Pro",
    price: 2100,
    image: "/GoshaChynar.png",
    description:
      "Professional networking solution with enterprise-level performance.",
  },
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isWishlistLoaded, setIsWishlistLoaded] = useState(false);
  const { addToCart, setIsOpen: setIsCartOpen, totalItems } = useCart();
  const locale = useLocale();
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

  const wishlistItems = staticProducts.filter((p) => wishlist.includes(p.id));

  const filteredProducts = staticProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesSearch;
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
                {activeCategory}
              </h1>
              <p className="text-base sm:text-lg text-white font-light">
                Discover our premium collection of enterprise-grade software and
                hardware solutions designed to accelerate your business growth.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "text-black border-b-2 border-black"
                      : "text-gray-500 hover:text-black"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          {filteredProducts.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <Search className="w-16 h-16 text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-900 mb-2">
                No products found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search or filter
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 ">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="text-sm border-[1px] rounded-lg border-gray-200 group bg-white flex flex-col overflow-hidden"
                >
                  <div className="relative group overflow-hidden bg-gray-50">
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
                          priority
                          className="w-full h-64 object-contain transition-transform duration-500 group-hover:scale-105"
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

                  <div className="p-4 flex flex-col flex-grow gap-3">
                    <h3 className="text-base font-semibold line-clamp-1 text-gray-900">
                      {product?.name}
                    </h3>

                    <div className="flex-grow" />

                    <p className="text-xl font-bold text-gray-900 whitespace-nowrap">
                      ${product.price.toLocaleString()}
                    </p>
                    <div className="w-full mt-2">
                      <AddToCart product={product} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {filteredProducts.length > 0 && (
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
            <button className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-sm font-medium">
              Load More Products
            </button>
          </div>
        )}
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
