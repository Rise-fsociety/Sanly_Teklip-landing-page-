"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect } from "react";

interface IntroAnimationProps {
  onComplete: () => void;
}

const text = "Sanly Teklip";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2700);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        scale: 1.1, 
        filter: "blur(20px)", 
        transition: { duration: 1.2, ease: [0.22, 1, 0.36, 1] } 
      }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-linear-to-br from-white via-blue-50 to-[#dbeafe]"
    >
      <div className="flex flex-col items-center gap-8 md:flex-row md:gap-16">
        <motion.div
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative size-24 md:size-40"
        >
          <Image
            src="/Logo.png"
            alt="Sanly Teklip Logo"
            fill
            className="object-contain mix-blend-multiply"
            priority
          />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-wrap justify-center overflow-hidden"
        >
          {text.split("").map((char, index) => (
            <motion.span
              key={`${char}-${index}`}
              variants={letterVariants}
              className="inline-block text-4xl font-extrabold tracking-tight text-slate-900 md:text-8xl"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
