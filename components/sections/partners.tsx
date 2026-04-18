"use client";

import { motion } from "framer-motion";
import LogoLoop from "../logoLoop/LogoLoop";

const partnerLogos = [
  { src: "/Akhasap.png",     alt: "Akhasap",      title: "Akhasap"      },
  { src: "/GoshaChynar.png", alt: "Goşa Çynar",   title: "Goşa Çynar"   },
  { src: "/logoTut.svg",         alt: "Tut",           title: "Tut"          },
  { src: "/Akar.png",        alt: "Akar",          title: "Akar"         },
  { src: "/Archalyk.webp",   alt: "Archalyk",      title: "Archalyk"     },
];

export function Partners() {
  return (
    <section id="partners" className="py-24 overflow-hidden">
      <div className="container mx-auto px-4 mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            Biz bilen işleýänler
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 font-medium">
            Ygtybarly hyzmatdaşlarymyz bilen tanyşyň.
          </p>
        </motion.div>
      </div>

      <LogoLoop
        logos={partnerLogos}
        speed={80}
        direction="right"
        logoHeight={80}
        gap={80}
        hoverSpeed={20}
        scaleOnHover
        fadeOut
        fadeOutColor="#ffffff"
        ariaLabel="Hyzmatdaşlar"
      />
    </section>
  );
}