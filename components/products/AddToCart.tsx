"use client";

import { useCart } from "@/context/cart-context";
import { Button } from "@/components/ui/button";
import { Plus, Minus, ShoppingCart } from "lucide-react";
import { Product } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

interface AddToCartProps {
  product: Product;
  className?: string;
  size?: "default" | "sm" | "lg";
}

export function AddToCart({ product, className, size = "lg" }: AddToCartProps) {
  const { cart, addToCart, updateQuantity } = useCart();
  const t = useTranslations("Products");

  const cartItem = cart.find((item) => item.id === product.id);

  return (
    <div className={cn("relative overflow-hidden w-full", className)}>
      <AnimatePresence mode="wait">
        {!cartItem ? (
          <motion.div
            key="add-button"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <Button
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
                toast.success(t("added"), {
                  style: {
                    borderRadius: "8px",
                    background: "#059669",
                    color: "#fff",
                    fontWeight: "500",
                    fontSize: "14px",
                    padding: "12px 24px",
                  },
                  iconTheme: {
                    primary: "#fff",
                    secondary: "#059669",
                  },
                });
              }}
              size={size}
              className={cn(
                "w-full rounded-xl bg-brand-blue text-white hover:bg-blue-600 transition-all active:scale-95 flex items-center justify-center gap-2 font-bold",
                size === "sm" ? "h-10 text-sm" : "h-14 text-lg",
              )}
            >
              <ShoppingCart
                className={cn(size === "sm" ? "w-4 h-4" : "w-5 h-5")}
              />
              <span className="hidden sm:block">{t("add")}</span>
            </Button>
          </motion.div>
        ) : (
          <motion.div
            key="quantity-selector"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={cn(
              "flex items-center justify-between w-full bg-gray-100 rounded-xl border border-gray-200",
              size === "sm" ? "h-10" : "h-14",
            )}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(product.id, cartItem.quantity - 1);
              }}
              className="h-full px-3 hover:bg-white rounded-lg transition-all active:scale-90 text-gray-500 hover:text-black flex items-center justify-center group"
            >
              <Minus
                className={cn(
                  size === "sm" ? "w-4 h-4" : "w-5 h-5",
                  "group-hover:scale-110 transition-transform",
                )}
              />
            </button>

            <div className="flex flex-col items-center justify-center select-none">
              <motion.span
                key={cartItem.quantity}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="font-black text-gray-900 text-lg leading-none"
              >
                {cartItem.quantity}
              </motion.span>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                updateQuantity(product.id, cartItem.quantity + 1);
                toast.success(t("added"), {
                  style: {
                    borderRadius: "8px",
                    background: "#059669",
                    color: "#fff",
                    fontWeight: "500",
                    fontSize: "14px",
                    padding: "12px 24px",
                  },
                  iconTheme: {
                    primary: "#fff",
                    secondary: "#059669",
                  },
                });
              }}
              className="h-full px-3 hover:bg-white rounded-lg transition-all active:scale-90 text-gray-500 hover:text-black flex items-center justify-center group"
            >
              <Plus
                className={cn(
                  size === "sm" ? "w-4 h-4" : "w-5 h-5",
                  "group-hover:scale-110 transition-transform",
                )}
              />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
