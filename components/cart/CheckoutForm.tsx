import { useTranslations } from 'next-intl';

export function CheckoutForm() {
  const t = useTranslations('Cart');

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
          {t('placeholderName')}
        </label>
        <input
          type="text"
          placeholder={t('placeholderName')}
          className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-0 text-base font-medium transition-all shadow-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
          {t('placeholderPhone')}
        </label>
        <input
          type="tel"
          placeholder="+993 -- --- ---"
          className="w-full h-14 px-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-0 text-base font-medium transition-all shadow-sm"
        />
      </div>

      <div className="md:col-span-2 space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
          {t('placeholderAddress')}
        </label>
        <textarea
          placeholder={t('placeholderAddress')}
          rows={3}
          className="w-full p-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-0 text-base font-medium transition-all resize-none shadow-sm"
        />
      </div>

      <div className="md:col-span-2 space-y-2">
        <label className="text-xs font-bold uppercase tracking-widest text-gray-400 ml-1">
          {t('placeholderNotes')}
        </label>
        <textarea
          placeholder={t('placeholderNotes')}
          rows={2}
          className="w-full p-6 rounded-2xl bg-gray-50 border border-transparent focus:bg-white focus:border-brand-blue focus:ring-0 text-base font-medium transition-all resize-none shadow-sm"
        />
      </div>
    </div>
  );
}

