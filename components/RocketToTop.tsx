"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Rocket } from "lucide-react";
import { useSmoothScroll } from "@/context/smooth-scroll-context";

const isDarkTheme = true;
const isOpen = false;
const isModalOpen = false;

export function RocketToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollY } = useScroll();
  const { scrollTo } = useSmoothScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsVisible(latest > 300);
  });

  const handleScrollToTop = () => {
    if (scrollTo) {
      try {
        scrollTo(0, { duration: 1.2 });
      } catch (e) {
        console.error("Smooth scroll failed", e);
      }
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && !isModalOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className={`fixed z-50 flex flex-col items-center justify-center transition-all duration-500 ease-in-out backdrop-blur-md border rounded-full cursor-pointer w-12 h-12 md:w-16 md:h-16 bottom-6 left-6 md:left-7 shadow-lg ${isDarkTheme && !isOpen
            ? "bg-black/10 border-black/20"
            : "bg-[#fefefe]/10 border-[#fefefe]/20"
            }`}
          style={{ colorScheme: "light" }}
          onClick={handleScrollToTop}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <Rocket
            className={`w-5 h-5 transition-colors duration-500 -rotate-45 text-brand-blue `}
            strokeWidth={2}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}