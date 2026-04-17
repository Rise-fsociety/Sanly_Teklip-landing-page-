"use client";

import { motion } from "framer-motion";
import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "@/components/ui/terminal";

export function About() {
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
                Dinamiki we innowasion sanly çözgütler merkezi.
              </p>
              <div className="space-y-6 text-xl text-slate-600 leading-relaxed max-w-lg">
                <p>
                  Biz diňe bir programma däl, eýsem täze başlangyçlary
                  döredýäris. Täze nesil tehnologiýalar bilen geljegiňizi bina
                  edeliň.
                </p>
                <p>
                  Ýokary hilli programmalar we döwrebap web-platformalar arkaly
                  biziň hyzmatdaşlarymyz täze üstünliklere ýetýärler.
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
            <Terminal className="w-full max-w-2xl bg-white text-slate-900 border-2 border-slate-100 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] rounded-3xl p-2">
               <TypingAnimation>&gt; npm run dev</TypingAnimation>

              <AnimatedSpan
                delay={200}
                className="text-xl font-bold text-slate-900"
              >
                <span>Sanly Teklip IT Kompaniýasy</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={400}
                className="text-lg text-slate-500 font-mono mt-4 italic"
              >
                <span>// Missiýamyz:</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={600}
                className="text-xl text-slate-800 leading-snug"
              >
                <span>
                  Sanly dünýäde siziň iň ygtybarly hyzmatdaşyňyz bolmak we
                  innowasiýalary durmuşa geçirmek.
                </span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={800}
                className="text-lg text-slate-500 font-mono mt-4 italic"
              >
                <span>// Hyzmatlar:</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={1000}
                className="text-xl text-brand-blue font-bold"
              >
                <span>→ Professional Web Platformalar</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={1200}
                className="text-xl text-brand-blue font-bold"
              >
                <span>→ Innowasion Mobil Goşundylar</span>
              </AnimatedSpan>

              <AnimatedSpan
                delay={1400}
                className="text-xl text-brand-blue font-bold"
              >
                <span>→ Akhasap</span>
              </AnimatedSpan>

              <TypingAnimation
                delay={1600}
                duration={30}
                className="text-xl font-black text-indigo-600 mt-8 leading-tight"
              >
                Geliň, geljege bilelikde ädim ädeliň!
              </TypingAnimation>
            </Terminal>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
