"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STAGGER = 0.035;

interface TextRollProps {
  children: string;
  className?: string;
  center?: boolean;
}

export const TextRoll: React.FC<TextRollProps> = ({
  children,
  className,
  center = false,
}) => {
  const characters = children.split("");
  const [activeVariant, setActiveVariant] = useState("initial");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveVariant((prev) => (prev === "initial" ? "hovered" : "initial"));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      initial="initial"
      animate={activeVariant}
      whileHover="hovered"
      className={cn(
        "relative block overflow-hidden select-none cursor-pointer",
        className
      )}
    >
      {/* Top Layer (Slides up and out) */}
      <div className="flex whitespace-pre">
        {characters.map((char, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (characters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: 0 },
                hovered: { y: "-100%" },
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.3,
                delay,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>

      {/* Bottom Layer (Slides up and in) */}
      <div className="absolute inset-0 flex whitespace-pre">
        {characters.map((char, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (characters.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              key={i}
              className="inline-block"
              variants={{
                initial: { y: "100%" },
                hovered: { y: 0 },
              }}
              transition={{
                ease: "easeInOut",
                duration: 0.3,
                delay,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};