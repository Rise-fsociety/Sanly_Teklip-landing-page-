"use client";

import React, { forwardRef, useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import {
  SiNextdotjs,
  SiVuedotjs,
  SiFlutter,
  SiNodedotjs,
  SiPostgresql,
  SiDocker,
} from "react-icons/si";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full border-2 bg-white p-2 shadow-[0_0_20px_-12px_rgba(0,0,0,0.8)]",
        className,
      )}
    >
      {children}
    </div>
  );
});

Circle.displayName = "Circle";

const Icons = {
  nextjs: (props: any) => (
    <SiNextdotjs className="w-full h-full text-black" {...props} />
  ),
  vue: (props: any) => (
    <SiVuedotjs className="w-full h-full text-[#42b883]" {...props} />
  ),
  flutter: (props: any) => (
    <SiFlutter className="w-full h-full text-[#02569B]" {...props} />
  ),
  nodejs: (props: any) => (
    <SiNodedotjs className="w-full h-full text-[#339933]" {...props} />
  ),
  postgresql: (props: any) => (
    <SiPostgresql className="w-full h-full text-[#336791]" {...props} />
  ),
  docker: (props: any) => (
    <SiDocker className="w-full h-full text-[#2496ed]" {...props} />
  ),
};

export function Tools() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const flutterRef = useRef<HTMLDivElement>(null);
  const vueRef = useRef<HTMLDivElement>(null);
  const nodeRef = useRef<HTMLDivElement>(null);
  const pgRef = useRef<HTMLDivElement>(null);
  const dockerRef = useRef<HTMLDivElement>(null);
  const akhasapRef = useRef<HTMLDivElement>(null);

  return (
    <section id="tools" className="py-24 bg-transparent overflow-hidden relative">
      <div className="container mx-auto px-4 relative z-10 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-black mb-6 text-slate-900 tracking-tight">
            Tehnologiýalarymyz
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-slate-600 font-medium">
            Biz döwrebap Frontend we Backend tehnologiýalaryny ulanmak bilen iň
            oňat çözgütleri döredýäris.
          </p>
        </motion.div>

        {/* Responsive Container */}
        <div
          className="relative flex h-auto min-h-[500px] md:h-[600px] w-full items-center justify-center overflow-hidden rounded-3xl border bg-slate-50/50 p-4 md:p-10 md:shadow-inner"
          ref={containerRef}
        >
          <div className="absolute z-10 top-10 flex flex-col items-center justify-center gap-2">
            <Circle
              ref={akhasapRef}
              className="size-12 md:size-16 shadow-slate-200 p-2 md:p-3 bg-white"
            >
              <Image
                src="/Akhasap.png"
                alt="Akhasap"
                width={80}
                height={80}
                className="w-full h-auto object-contain"
              />
            </Circle>
            <span className="text-[10px] md:text-xs font-bold text-slate-500 tracking-widest">
              Akhasap
            </span>
          </div>

          <div className="flex size-full items-center justify-between gap-4 md:gap-10 max-w-4xl mt-16 md:mt-12">
            <div className="flex flex-col justify-between h-full py-4 md:py-10">
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Circle ref={nextRef} className="size-10 md:size-16 shadow-slate-200 p-2 md:p-3">
                  <Icons.nextjs className="w-full h-full" />
                </Circle>
                <span className="text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Next.js</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Circle ref={flutterRef} className="size-10 md:size-16 shadow-blue-100 p-2 md:p-3">
                  <Icons.flutter className="w-full h-full text-[#02569B]" />
                </Circle>
                <span className="text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Flutter</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Circle ref={vueRef} className="size-10 md:size-16 shadow-emerald-100 p-2 md:p-3">
                  <Icons.vue className="w-full h-full text-[#42b883]" />
                </Circle>
                <span className="text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Vue.js</span>
              </div>
            </div>
            <div
              ref={centerRef}
              className="z-10 flex size-20 md:size-40 items-center justify-center rounded-full border-4 border-brand-blue bg-white p-3 md:p-6 shadow-2xl shadow-blue-200/50"
            >
              <Image
                src="/Logo.png"
                alt="Sanly Teklip"
                width={120}
                height={120}
                className="w-full h-auto object-contain"
              />
            </div>

            <div className="flex flex-col justify-between h-full py-4 md:py-10">
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Circle ref={nodeRef} className="size-10 md:size-16 shadow-green-100 p-2 md:p-3">
                  <Icons.nodejs className="w-full h-full text-[#339933]" />
                </Circle>
                <span className="text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Node.js</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Circle ref={pgRef} className="size-10 md:size-16 shadow-indigo-100 p-2 md:p-3">
                  <Icons.postgresql className="w-full h-full text-[#336791]" />
                </Circle>
                <span className="text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">PostgreSQL</span>
              </div>
              <div className="flex flex-col items-center gap-1 md:gap-2">
                <Circle ref={dockerRef} className="size-10 md:size-16 shadow-blue-100 p-2 md:p-3">
                  <Icons.docker className="w-full h-full text-[#2496ed]" />
                </Circle>
                <span className="text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-widest">Docker</span>
              </div>
            </div>
          </div>
          <AnimatedBeam containerRef={containerRef} fromRef={akhasapRef} toRef={centerRef} duration={3} delay={0.5} />
          <AnimatedBeam containerRef={containerRef} fromRef={nextRef} toRef={centerRef} duration={3} />
          <AnimatedBeam containerRef={containerRef} fromRef={flutterRef} toRef={centerRef} duration={3} delay={1} />
          <AnimatedBeam containerRef={containerRef} fromRef={vueRef} toRef={centerRef} duration={3} delay={2} />
          <AnimatedBeam containerRef={containerRef} fromRef={nodeRef} toRef={centerRef} duration={3} reverse />
          <AnimatedBeam containerRef={containerRef} fromRef={pgRef} toRef={centerRef} duration={3} delay={1.5} reverse />
          <AnimatedBeam containerRef={containerRef} fromRef={dockerRef} toRef={centerRef} duration={3} delay={0.5} reverse />
        </div>
      </div>
    </section>
  );
}