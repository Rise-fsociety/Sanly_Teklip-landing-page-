"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/context/cart-context";

interface SliderItem {
  slider_id: number;
  slider_image: string;
  slider_section: number;
  slider_blurhash?: string;
}

interface PromoCarouselProps {
  onProductClick?: (product: Product) => void;
}

export function PromoCarousel({ onProductClick }: PromoCarouselProps) {
  const [slides, setSlides] = useState<SliderItem[]>([]);
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = slides.length;

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch("/api/excell/carusel/select");
        const data = await res.json();
        if (data.status === "success" && data.data?.tbl_mg_slider) {
          setSlides(data.data.tbl_mg_slider);
        }
      } catch (err) {
        console.error("Failed to fetch carousel:", err);
      }
    };
    fetchSlides();
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total === 0) return;
    timerRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % total);
    }, 4000);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const handleNav = (dir: number) => {
    goTo(current + dir);
    resetTimer();
  };

  if (slides.length === 0) {
    return (
      <div
        className="w-full rounded-xl bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:600px_100%] animate-shimmer"
        style={{ aspectRatio: "21/7" }}
      />
    );
  }

  return (
    <div className="relative w-full overflow-hidden rounded-xl group select-none">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.slider_id}
            className="relative min-w-full cursor-pointer"
            style={{ aspectRatio: "21/7" }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_ADMIN_URL}/public/carusel/caruselSharp/${slide.slider_image}`}
              alt={`Slide ${slide.slider_id}`}
              fill
              priority
              className="object-cover"
            />
          </div>
        ))}
      </div>

      <button
        onClick={() => handleNav(-1)}
        aria-label="Previous slide"
        className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      <button
        onClick={() => handleNav(1)}
        aria-label="Next slide"
        className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm border border-white/20 flex items-center justify-center transition-all duration-200 opacity-0 group-hover:opacity-100"
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {slides.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to slide ${i + 1}`}
            onClick={() => { goTo(i); resetTimer(); }}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "bg-white w-5" : "bg-white/50 hover:bg-white/80 w-1.5"
            }`}
          />
        ))}
      </div>
    </div>
  );
}