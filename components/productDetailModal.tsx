"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { Product } from "@/context/cart-context";
import { useEffect, useState, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";

const ASSET_URL = process.env.NEXT_PUBLIC_ADMIN_URL;

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({
  product,
  isOpen,
  onClose,
}: ProductDetailModalProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, duration: 30 });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const getProductImageUrl = (imagePath: string) => {
    if (!imagePath) return "/Logo.png";
    if (imagePath.startsWith("http")) return imagePath;

    const baseUrl = ASSET_URL?.endsWith("/")
      ? ASSET_URL.slice(0, -1)
      : ASSET_URL;
    const cleanPath = imagePath.startsWith("/") ? imagePath : `/${imagePath}`;

    return `${baseUrl}${cleanPath}`;
  };

  const apiImages = product?.originalData?.images || [];
  const finalImages =
    apiImages.length > 0
      ? apiImages.map((img: any) => getProductImageUrl(img.url))
      : product?.image
        ? [product.image]
        : ["/Logo.png"];

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    setScrollSnaps(emblaApi.scrollSnapList());
  }, [emblaApi, onSelect, finalImages]);

  const scrollPrev = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi && emblaApi.scrollPrev();
    },
    [emblaApi],
  );

  const scrollNext = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emblaApi && emblaApi.scrollNext();
    },
    [emblaApi],
  );

  if (!product) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-md z-[100] transition-all"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="fixed inset-x-0 bottom-0 top-[8%] sm:inset-x-4 sm:top-[12%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-5xl h-[92vh] sm:h-auto sm:max-h-[76vh] bg-white rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl z-[101] overflow-hidden flex flex-col md:flex-row border border-gray-100"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2.5 bg-white/80 dark:bg-gray-900/10 hover:bg-gray-100 rounded-full backdrop-blur-md transition-all active:scale-95 z-50 shadow-sm border border-gray-200/50"
            >
              <X className="w-5 h-5 text-gray-800" />
            </button>

            <div className="w-full md:w-1/2 bg-gray-50/70 flex flex-col items-center justify-center relative overflow-hidden select-none border-b md:border-b-0 md:border-r border-gray-100 min-h-[340px] md:min-h-0">
              <div className="absolute inset-0 bg-gradient-to-br from-[#0157A4]/5 via-transparent to-transparent pointer-events-none" />
              <div className="w-full h-full overflow-hidden" ref={emblaRef}>
                <div className="flex h-full">
                  {finalImages.map((imgSrc: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex-shrink-0 w-full h-full flex items-center justify-center p-8 md:p-12 relative"
                    >
                      <div className="relative w-full h-full max-h-[280px] md:max-h-[420px] aspect-square">
                        <Image
                          src={imgSrc}
                          alt={`${product.name} gallery image ${idx + 1}`}
                          fill
                          unoptimized={true}
                          priority={idx === 0}
                          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)] transition-transform duration-300 hover:scale-105"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {finalImages.length > 1 && (
                <>
                  <button
                    onClick={scrollPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-white active:scale-90 transition-all opacity-0 md:group-hover:opacity-100 md:opacity-100 z-10"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={scrollNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md border border-gray-100 flex items-center justify-center text-gray-700 hover:bg-white active:scale-90 transition-all opacity-0 md:group-hover:opacity-100 md:opacity-100 z-10"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              {finalImages.length > 1 && (
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
                  {scrollSnaps.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => emblaApi && emblaApi.scrollTo(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        idx === selectedIndex
                          ? "bg-[#0157A4] w-5 shadow-sm"
                          : "bg-gray-300 w-1.5 hover:bg-gray-400"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col justify-between bg-white">
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight break-words">
                    {product.name}
                  </h2>
                </div>
                <div className="h-[1px] w-full bg-gray-100" />
                <div className="space-y-4">
                  {product.description &&
                  product.description !== "null" &&
                  product.description !== "none" ? (
                    <p className="text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line break-words">
                      {product.description}
                    </p>
                  ) : (
                    <p className="text-sm sm:text-base text-gray-400 italic">
                      -
                    </p>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
