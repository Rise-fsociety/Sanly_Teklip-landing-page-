"use client";

import { useTranslations } from "next-intl";
import { Integrations } from "@/components/integrations";

export function Work() {
  const t = useTranslations('Work');

  return (
    <section id="work" className=" bg-transparent overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-5 md:mb-20">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black md:3 md:mb-6 text-slate-900 tracking-tight">
            {t('title')}
          </h2>
          <p className="max-w-2xl mx-auto text-base md:text-lg lg:text-xl text-slate-600 font-medium">
            {t('subtitle')}
          </p>
        </div>
          <Integrations />
      </div>
    </section>
  );
}
