"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/context/cart-context";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 
const ASSET_URL = process.env.NEXT_PUBLIC_ADMIN_URL; 

interface SliderItem {
  id: number;
  image: string;
  link: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface PromoCarouselProps {
  onProductClick?: (product: Product) => void;
}

export function PromoCarousel({ onProductClick }: PromoCarouselProps) {
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const total = slides.length;

  const slidesPerView =
    typeof window !== "undefined" && window.innerWidth < 640 ? 1 : 2;
  const maxIndex = Math.max(0, total - slidesPerView);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        setLoading(true);
        
        const res = await fetch(`${API_URL}/public/banner`, {
          method: "GET"
        });

        const json = await res.json();
        
        if (json.status === "success" && Array.isArray(json.data)) {
          setSlides(json.data);
        }
      } catch (err) {
        console.error("Failed to fetch carousel:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSlides();
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total === 0) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4000);
  }, [total, maxIndex]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = useCallback(
    (index: number) => setCurrent(Math.min(Math.max(index, 0), maxIndex)),
    [maxIndex],
  );

  const handleNav = (dir: number) => {
    goTo(current + dir);
    resetTimer();
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = null;
  };
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchEndX.current === null) return;
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 40) handleNav(diff > 0 ? 1 : -1);
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const getImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    
    const baseUrl = ASSET_URL?.endsWith("/") ? ASSET_URL.slice(0, -1) : ASSET_URL;
    const cleanPath = path.startsWith("/") ? path : `/${path}`;
    
    return `${baseUrl}${cleanPath}`; 
  };

  if (loading || slides.length === 0) {
    return (
      <div className="w-full rounded-xl flex gap-3">
        <div
          className="flex-1 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse"
          style={{ aspectRatio: "21/7" }}
        />
        <div
          className="flex-1 rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 animate-pulse hidden sm:block"
          style={{ aspectRatio: "21/7" }}
        />
      </div>
    );
  }

  return (
    <div
      className="relative w-full overflow-hidden rounded-xl group select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-label="Promotional carousel"
    >
      <div
        className="flex my-8 md:my-0 transition-transform duration-500 ease-in-out will-change-transform"
        style={{
          transform: `translateX(-${current * (100 / slidesPerView)}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="flex-shrink-0 px-1.5"
            style={{
              width: `${100 / slidesPerView}%`,
              aspectRatio: "21/7",
            }}
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden">
              <Image
                src={getImageUrl(slide.image)} 
                alt={`Slide ${index + 1}`}
                fill
                priority={index === 0}
                quality={100}
                sizes="(max-width: 640px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => handleNav(-1)}
        disabled={current === 0}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>
      <button
        onClick={() => handleNav(1)}
        disabled={current >= maxIndex}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-0"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => {
              goTo(i);
              resetTimer();
            }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current
                ? "bg-white w-5"
                : "bg-white/50 hover:bg-white/80 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}