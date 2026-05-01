"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Shield, Zap, Globe, Check } from "lucide-react";
import Image from "next/image";
import { Product, useCart } from "@/context/cart-context";
import { AddToCart } from "./products/AddToCart";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
  const { addToCart, setIsOpen: setIsCartOpen } = useCart();
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl max-h-[80vh] bg-white rounded-[2rem] shadow-2xl z-[101] overflow-hidden flex flex-col md:flex-row"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full md:w-1/2 bg-gray-50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#3AB4FF]/5 to-transparent" />
              <motion.div 
                layoutId={`product-image-${product.id}`}
                className="relative w-full aspect-square"
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  unoptimized={true}
                  referrerPolicy="no-referrer"
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </div>

            <div className="w-full md:w-1/2 p-8 md:p-12 overflow-y-auto max-h-[80vh]">
              <div className="space-y-6">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                    {product.name}
                  </h2>
                </div>

                <div className="space-y-4">
                  {product.description && (
                   <p className="text-gray-600 leading-relaxed">
                    {product.description === "null" ? "-" : product.description}
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