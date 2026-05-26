"use client";

import { useState } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Rocket } from "lucide-react";
import { useSmoothScroll } from "@/context/smooth-scroll-context";

export function RocketToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const { scrollY } = useScroll();
  const { scrollTo } = useSmoothScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 300) {
      setIsVisible(true);
    } else {
      if (!isLaunching) {
        setIsVisible(false);
      }
    }
  });

  const handleScrollToTop = () => {
    if (isLaunching) return;
    setIsLaunching(true);
    
    // Use Lenis smooth scroll
    if (scrollTo) {
      try {
        scrollTo(0, { duration: 1.5 });
      } catch (e) {
        console.error("Lenis scroll error", e);
      }
    }
    
    // Fallback native scroll in case Lenis is not active on this page
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Reset state after launch finishes
    setTimeout(() => {
      setIsLaunching(false);
      if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    }, 1500);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.5 }}
          animate={
            isLaunching
              ? { 
                  y: -window.innerHeight, 
                  opacity: [1, 0], // Плавно исчезает (opacity в 0) во время движения вверх
                  scale: 1, 
                  transition: { duration: 1.5, ease: "easeInOut" } 
                }
              : { opacity: 1, y: 0, scale: 1 }
          }
          exit={{ opacity: 0, y: 50, scale: 0.5, transition: { duration: 0.3 } }}
          className="fixed bottom-6 left-6 z-[99] cursor-pointer"
          onClick={handleScrollToTop}
          whileHover={!isLaunching ? { scale: 1.05, y: -2 } : {}}
          whileTap={!isLaunching ? { scale: 0.95 } : {}}
        >
          <div className="relative group">
            <div className="absolute inset-0 bg-blue-600/10 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="relative bg-blue-600 hover:bg-blue-500 active:bg-blue-700 p-3.5 rounded-full shadow-sm hover:shadow-md border border-blue-400/20 flex items-center justify-center transition-colors duration-200">
              <Rocket className="w-5 h-5 text-white -rotate-45" strokeWidth={2} />
              
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}