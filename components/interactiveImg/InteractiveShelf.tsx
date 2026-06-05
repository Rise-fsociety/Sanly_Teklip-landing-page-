"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

// ── Set these to your productShelf.png natural dimensions ──────────────────────
const IMAGE_W = 4000;
const IMAGE_H = 6000;

const products = [
  {
    id: "gok-kagyz",
    name: "Gök Kağyz",
    price: "$12.99",
    x1: 1627, y1: 4914, x2: 2399, y2: 5663,
  },
  {
    id: "terezi",
    name: "Terezi",
    price: "$8.49",
    x1: 1631, y1: 4142, x2: 2441, y2: 4638,
  },
  {
    id: "printer",
    name: "Printer",
    price: "$249.00",
    x1: 2865, y1: 3824, x2: 3268, y2: 4608,
  },
];

// ─── Tooltip card — pure white, price above name, no image ───────────────────
function Tooltip({ name, price }: { name: string; price: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, y: 6 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 4 }}
      transition={{ type: "spring", stiffness: 420, damping: 26 }}
      className="absolute left-[calc(100%+14px)] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
      style={{ minWidth: 160 }}
    >
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[7px] w-3.5 h-3.5 rotate-45 rounded-sm"
        style={{ background: "#fff", boxShadow: "-2px 2px 6px rgba(0,0,0,0.08)" }}
      />

      {/* White card */}
      <div
        className="relative rounded-2xl px-5 py-4 flex flex-col gap-0.5"
        style={{
          background: "#ffffff",
          boxShadow: "0 8px 40px rgba(0,0,0,0.18)",
        }}
      >
        <p className="text-[15px] text-gray-500 font-medium leading-tight">{price}</p>
        <p className="text-[17px] text-gray-900 font-bold leading-tight">{name}</p>
      </div>
    </motion.div>
  );
}

// ─── Hotspot — dot centered on product, tooltip to its right ─────────────────
function Hotspot({ product }: { product: typeof products[0] }) {
  const [hovered, setHovered] = useState(false);

  // Center point of the product zone in %
  const cx = ((product.x1 + product.x2) / 2 / IMAGE_W) * 100;
  const cy = ((product.y1 + product.y2) / 2 / IMAGE_H) * 100;

  return (
    <div
      className="absolute z-10"
      style={{
        left: `${cx}%`,
        top: `${cy}%`,
        transform: "translate(-50%, -50%)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Outer pulse ring */}
      <motion.div
        animate={
          hovered
            ? { scale: 1.4, opacity: 0 }
            : { scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }
        }
        transition={
          hovered
            ? { duration: 0.25 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        className="absolute inset-0 rounded-full"
        style={{ background: "rgba(255,255,255,0.6)" }}
      />

      {/* Dot button */}
      <motion.div
        animate={{ scale: hovered ? 1.15 : 1 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className="relative w-8 h-8 rounded-full cursor-pointer flex items-center justify-center"
        style={{
          background: "#ffffff",
          boxShadow: hovered
            ? "0 0 0 3px rgba(255,255,255,0.5), 0 4px 20px rgba(0,0,0,0.35)"
            : "0 0 0 2px rgba(255,255,255,0.4), 0 2px 12px rgba(0,0,0,0.25)",
        }}
      >
        {/* Inner filled circle */}
        <div
          className="w-3 h-3 rounded-full"
          style={{ background: hovered ? "#111" : "#888" }}
        />
      </motion.div>

      {/* Tooltip */}
      <AnimatePresence>
        {hovered && <Tooltip key="tip" name={product.name} price={product.price} />}
      </AnimatePresence>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function ProductShelf() {
  return (
    <div className="relative ">
      <Image
        src="/leftShelf.png"
        alt="Product Shelf"
        width={IMAGE_W}
        height={IMAGE_H}
        className="w-full  block"
        priority
      />
      {products.map((p) => (
        <Hotspot key={p.id} product={p} />
      ))}
    </div>
  );
}