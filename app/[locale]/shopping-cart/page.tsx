"use client";

import { useCart } from "@/context/cart-context";
import { ArrowLeft } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { CheckoutForm } from "@/components/cart/CheckoutForm";
import { CartSummary } from "@/components/cart/CartSummary";

export default function ShoppingCartPage() {
  const { totalPrice } = useCart();
  const delivery = 20;
  const total = totalPrice + delivery;

  return (
    <div className="min-h-screen bg-white selection:bg-orange-600 selection:text-white">
      <main className="max-w-[1600px] mx-auto px-4 md:px-12 pt-5 sm:pt-14">
        <div className="flex flex-col sm:flex-row justify-between gap-12 min-h-[80vh]">
          <div className="flex flex-col gap-4 w-full sm:max-w-[700px]">
          <Link 
            href="/products"
              className="inline-flex items-center text-sm font-bold uppercase tracking-widest text-gray-400 hover:text-orange-600 transition-all group mb-4"
          >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Shop
          </Link>
            <div className="relative">
              <CheckoutForm />
        </div>
          </div>

          <div className="flex flex-col gap-8 w-full sm:max-w-[400px]">
            <div className="min-w-full sm:min-w-80">
            <CartSummary
              totalPrice={totalPrice}
              delivery={delivery}
              total={total}
            />
          </div>
        </div>
        </div>
      </main>
      <div className="h-24" />
    </div>
  );
}
