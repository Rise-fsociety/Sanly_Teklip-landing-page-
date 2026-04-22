"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Star, Shield, Zap, Globe, Check } from "lucide-react";
import Image from "next/image";
import { Product } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductDetailModal({ product, isOpen, onClose }: ProductDetailModalProps) {
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
          {/* Backdrop */}
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
                  <p className="text-2xl font-black text-[#0157A4] mt-2">
                    ${product.price.toLocaleString()}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-widest">
                    Description
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {product.description} This enterprise-grade solution is designed to streamline your business operations and provide deep insights into your data. Built with the latest technologies to ensure maximum performance and security.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 py-6 border-y border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-50 rounded-lg">
                      <Shield className="w-4 h-4 text-green-600" />
                    </div>
                    <span className="text-sm font-medium">Secure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <Zap className="w-4 h-4 text-blue-600" />
                    </div>
                    <span className="text-sm font-medium">Fast</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-50 rounded-lg">
                      <Globe className="w-4 h-4 text-purple-600" />
                    </div>
                    <span className="text-sm font-medium">Scalable</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-50 rounded-lg">
                      <Check className="w-4 h-4 text-orange-600" />
                    </div>
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>

                <div className="pt-4 flex gap-4">
                  <Button className="flex-1 bg-gradient-to-r from-[#0157A4] to-[#3AB4FF] hover:from-[#3AB4FF] hover:to-[#0157A4] text-white h-14 rounded-xl font-bold text-lg border-0">
                    Contact for Inquiry
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}