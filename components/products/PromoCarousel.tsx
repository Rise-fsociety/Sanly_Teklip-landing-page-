"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/context/cart-context";

const promoSlides = [
  {
    id: "1",
    name: "Akar ERP System",
    price: 1200,
    image: "/Akar.png",
    description: "Enterprise resource planning solution for modern businesses with advanced analytics.",
  },
  {
    id: "2",
    name: "Akhasap Cloud",
    price: 450,
    image: "/Akhasap.png",
    description: "Secure and scalable cloud accounting software for financial management.",
  },
  {
    id: "3",
    name: "Archalyk Security",
    price: 800,
    image: "/Archalyk.webp",
    description: "Advanced cybersecurity suite for enterprise protection and threat detection.",
  },
  {
    id: "4",
    name: "Gosha Chynar Network",
    price: 1500,
    image: "/GoshaChynar.png",
    description: "High-performance networking hardware and software for seamless connectivity.",
  },
];

interface PromoCarouselProps {
  onProductClick?: (product: Product) => void;
}

export function PromoCarousel({ onProductClick }: PromoCarouselProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = promoSlides.length;

  const goTo = useCallback(
    (index: number) => {
      setCurrent(((index % total) + total) % total);
    },
    [total]
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
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

  const handleNav = (dir: number) => {
    goTo(current + dir);
    resetTimer();
  };

  return (
    <div className="relative w-full overflow-hidden rounded-xl group select-none">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {promoSlides.map((slide) => (
          <div
            key={slide.id}
            className="relative min-w-full cursor-pointer"
            style={{ aspectRatio: "21/7" }}
            onClick={() => onProductClick?.(slide)}
          >
            <Image
              src={slide.image}
              alt={slide.name}
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
        className="
          absolute left-3 top-1/2 -translate-y-1/2 z-20
          w-8 h-8 sm:w-10 sm:h-10
          rounded-full
          bg-black/30 hover:bg-black/50
          backdrop-blur-sm
          border border-white/20
          flex items-center justify-center
          transition-all duration-200
          opacity-0 group-hover:opacity-100
        "
      >
        <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      <button
        onClick={() => handleNav(1)}
        aria-label="Next slide"
        className="
          absolute right-3 top-1/2 -translate-y-1/2 z-20
          w-8 h-8 sm:w-10 sm:h-10
          rounded-full
          bg-black/30 hover:bg-black/50
          backdrop-blur-sm
          border border-white/20
          flex items-center justify-center
          transition-all duration-200
          opacity-0 group-hover:opacity-100
        "
      >
        <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
      </button>

      <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
        {promoSlides.map((_, i) => (
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