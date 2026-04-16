"use client";

import { motion } from "framer-motion";

export function Features() {
  return (
    <section id="features" className="relative z-10 flex min-h-screen items-center justify-center bg-muted-blue px-6 py-24 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, margin: "-10%" }}
        className="relative z-10 max-w-6xl text-center"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          className="inline-block mb-8 px-6 py-2 rounded-full border border-soft-sand/30 bg-soft-sand/10 text-soft-sand text-sm md:text-base font-bold tracking-[0.3em] uppercase"
        >
          Biz Hakda
        </motion.span>
        
        <h2 className="text-6xl md:text-8xl lg:text-9xl font-black text-soft-sand mb-12 tracking-tighter leading-none drop-shadow-sm">
          Sanly Teklip
        </h2>
        
        <div className="space-y-8 md:space-y-12">
          <p className="mx-auto max-w-4xl text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-soft-sand tracking-tight">
            Sanly Teklip IT kompaniýasy – dinamiki we innowasion sanly çözgütler merkezi.
          </p>
          <p className="mx-auto max-w-3xl text-xl md:text-3xl lg:text-4xl font-medium leading-relaxed text-soft-sand/80">
            Biz ýokary hilli programmalar, döwrebap web-platformalar we innowasion mobil goşundylar arkaly geljegiňizi bina edýäris.
          </p>
        </div>
      </motion.div>
    </section>
  );
}