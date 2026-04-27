"use client";

import Image from "next/image";
import { CartItem } from "@/context/cart-context";

interface CartItemsProps {
  items: CartItem[];
}

export function CartItems({ items }: CartItemsProps) {
  if (items.length === 0) {
    return <p className="text-gray-400 font-bold italic text-xl">Your cart is currently empty.</p>;
  }

  return (
    <div className="space-y-8">
      {items.map((item) => (
        <div key={item.id} className="flex items-center gap-8 py-6 border-b border-gray-100 last:border-0 group">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-3xl p-4 flex-shrink-0 flex items-center justify-center overflow-hidden">
            <Image 
              src={item.image} 
              alt={item.name} 
              width={100} 
              height={100} 
              className="object-contain group-hover:scale-110 transition-transform duration-500"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="text-xl md:text-2xl lg:text-3xl font-black text-gray-900 truncate mb-2 leading-tight">
              {item.name}
            </h4>
            <p className="text-gray-400 text-sm md:text-base font-black uppercase tracking-widest">
              Quantity: {item.quantity} <span className="mx-2 text-gray-200">|</span> ${item.price.toLocaleString()} each
            </p>
          </div>
          <p className="text-2xl md:text-3xl font-black text-gray-900 tracking-tighter">
            ${(item.price * item.quantity).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
