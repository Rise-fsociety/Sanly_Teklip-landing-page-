"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import Image from "next/image";
import { Product } from "@/context/cart-context";
import { Button } from "@/components/ui/button";

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: Product[];
  onRemove: (id: string) => void;
  onViewProduct: (product: Product) => void;
}

export function WishlistDrawer({ isOpen, onClose, items, onRemove, onViewProduct }: WishlistDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[150]"
          />

          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-[151] flex flex-col"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500 fill-red-500" />
                <h2 className="text-xl font-bold text-gray-900">My Favorites</h2>
                <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-full">
                  {items.length}
                </span>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                    <Heart className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Your wishlist is empty</h3>
                    <p className="text-gray-500 text-sm mt-1">
                      Save items you love here to find them later.
                    </p>
                  </div>
                  <Button 
                    onClick={onClose}
                    className="bg-gray-900 text-white hover:bg-black rounded-xl"
                  >
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div 
                        className="relative w-24 h-24 bg-gray-50 rounded-2xl overflow-hidden flex-shrink-0 cursor-pointer"
                        onClick={() => onViewProduct(item)}
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-contain p-2 transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div className="flex-1 flex flex-col justify-between py-1">
                        <div>
                          <h4 
                            className="font-bold text-gray-900 group-hover:text-brand-blue transition-colors cursor-pointer"
                            onClick={() => onViewProduct(item)}
                          >
                            {item.name}
                          </h4>
                          <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="font-black">${item.price.toLocaleString()}</span>
                          <button
                            onClick={() => onRemove(item.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
