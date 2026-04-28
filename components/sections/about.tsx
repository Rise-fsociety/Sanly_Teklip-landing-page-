"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "@/components/ui/terminal";
import { useTranslations } from "next-intl";

export function About() {
  const t = useTranslations('About');
  return (
    <section id="about" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24"
          >
            <h2 className="text-6xl md:text-8xl font-black text-brand-blue mb-10 tracking-tighter leading-[0.9]">
              Sanly Teklip
            </h2>
            <div className="space-y-8">
              <p className="text-2xl md:text-3xl font-bold text-slate-900 leading-tight tracking-tight">
                {t('subtitle')}
              </p>
              <div className="space-y-6 text-xl md:text-2xl text-slate-600 leading-relaxed max-w-lg">
                <p>
                  {t.rich('desc1', { blue: (chunks) => <span className="text-brand-blue font-bold">{chunks}</span> })}
                </p>
                <p>
                  {t.rich('desc2', { blue: (chunks) => <span className="text-brand-blue font-bold">{chunks}</span> })}
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <Terminal className="w-full h-auto min-h-fit max-w-2xl bg-white text-slate-900 border-2 border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl p-2">
               <TypingAnimation>&gt; npm run dev</TypingAnimation>

              <AnimatedSpan
                delay={200}
                className="text-xl md:text-3xl font-bold text-slate-900"
              >
                <span>{t('terminal_title')}</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={400}
                className="text-lg text-slate-500 font-mono mt-4 italic"
              >
                <span>{t('mission_label')}</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={600}
                className="text-xl text-slate-800 leading-snug"
              >
                <span>
                  {t('mission_text')}
                </span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={800}
                className="text-lg text-slate-500 font-mono mt-4 italic"
              >
                <span>{t('services_label')}</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={1000}
                className="text-xl text-brand-blue font-bold"
              >
                <span>{t('service1')}</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={1200}
                className="text-xl text-brand-blue font-bold"
              >
                <span>{t('service2')}</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={1400}
                className="text-xl text-brand-blue font-bold"
              >
                <span>{t('service3')}</span>
              </AnimatedSpan>

              <TypingAnimation
                delay={1600}
                duration={30}
                className="text-xl font-black text-indigo-600 mt-8 leading-tight"
              >
                {t('footer')}
              </TypingAnimation>
            </Terminal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
