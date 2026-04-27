import { useTranslations } from 'next-intl';
import { useState } from "react";

interface CartSummaryProps {
  totalPrice: number;
  delivery: number;
  total: number;
}

export function CartSummary({ totalPrice, delivery, total }: CartSummaryProps) {
  const [method, setMethod] = useState("cod");
  const t = useTranslations('Cart');

  return (
    <div className="w-full">
      <div className="mb-3">
        <div className="inline-flex gap-2 items-center mb-3">
          <p className="text-gray-500 uppercase text-lg md:text-xl lg:text-2xl">
            {t('items')} <span className="text-gray-700 font-medium">{t('total')}</span>
          </p>
          <p className="w-8 sm:w-12 h-[1px] sm:h-[2px] bg-gray-700"></p>
        </div>
      </div>

      <div className="flex flex-col gap-2 mt-2 text-xs md:text-sm lg:text-base">
        <div className="flex justify-between">
          <p>{t('total')}</p>
          <p>${totalPrice.toLocaleString()}</p>
        </div>
        <hr className="border-gray-200" />
        <div className="flex justify-between">
          <p>{t('delivery')}</p>
          <p>${delivery}</p>
        </div>
        <hr className="border-gray-200" />

        <div className="flex justify-between text-sm md:text-base lg:text-lg">
          <b>{t('total')}</b>
          <b>${total.toLocaleString()}</b>
        </div>
      </div>

      <div className="w-full text-end mt-8">
        <button
          className="bg-brand-blue font-bold text-white px-10 md:px-16 py-3 rounded-sm hover:bg-brand-blue/90 transition-colors uppercase text-xs md:text-sm lg:text-base"
        >
          {t('checkout')}
        </button>
      </div>
    </div>
  );
}

