"use client";

import {
  Search,
  Grid,
  Home,
  Heart,
  Star,
} from "lucide-react";
import { Product } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import { Footer } from "@/components/sections/footer";
import { ProductDetailModal } from "@/components/productDetailModal";
import { WishlistDrawer } from "@/components/wishlistDrawer";
import { cn } from "@/lib/utils";

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
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId) 
        : [...prev, productId]
    );
  };

  const wishlistItems = staticProducts.filter(p => wishlist.includes(p.id));

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
    <div className="min-h-screen bg-white">
      {/* Top Navigation Bar */}
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

            <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black transition-colors"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button 
                onClick={() => setIsWishlistOpen(true)}
                className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Heart className={cn(
                  "w-5 h-5",
                  wishlist.length > 0 ? "fill-red-500 text-red-500" : "text-gray-900"
                )} />
                {wishlist.length > 0 && (
                  <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                    {wishlist.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full text-sm focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16 md:pt-16">
        {/* Hero Section */}
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

        {/* Category Filter */}
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

        {/* Products Grid */}
        <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 bg-gray-50">
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group cursor-pointer transition-transform duration-300 hover:-translate-y-1"
                  onMouseEnter={() => setHoveredProduct(product.id)}
                  onMouseLeave={() => setHoveredProduct(null)}
                  onClick={() => handleOpenDetails(product)}
                >
                  {/* Product Image */}
                  <div className="relative aspect-[3/4] mb-3 overflow-hidden bg-gray-50">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* View Details Overlay - Shows on Hover */}
                    <div
                      className={`absolute inset-x-4 bottom-4 transition-all duration-300 ${
                        hoveredProduct === product.id
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 translate-y-4"
                      }`}
                    >
                      <Button
                        className="w-full bg-white text-black hover:bg-black hover:text-white border-0 rounded-none h-12 font-medium transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenDetails(product);
                        }}
                      >
                        View Details
                      </Button>
                    </div>

                    {/* Wishlist Icon */}
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className="absolute top-3 right-3 p-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-100 active:scale-90"
                    >
                      <Heart 
                        className={cn(
                          "w-4 h-4 transition-colors",
                          wishlist.includes(product.id) ? "fill-red-500 text-red-500" : "text-gray-600"
                        )} 
                      />
                    </button>
                  </div>

                  <div className="space-y-1">
                    <h3 className="text-sm font-medium text-gray-900 line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="text-xs text-gray-500 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex items-center gap-1 py-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className="w-3 h-3 fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="text-xs text-gray-500 ml-1">(24)</span>
                    </div>

                    <p className="text-base font-semibold text-gray-900">
                      ${product.price.toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Load More Button */}
        {filteredProducts.length > 0 && (
          <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 flex justify-center">
            <button className="px-8 py-3 border border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors text-sm font-medium">
              Load More Products
            </button>
          </div>
        )}
      </div>

     <Footer />

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