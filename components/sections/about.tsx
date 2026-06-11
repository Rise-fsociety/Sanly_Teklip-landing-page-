"use client";

import { useEffect, useRef } from "react";
import {
  Terminal,
  AnimatedSpan,
  TypingAnimation,
} from "@/components/ui/terminal";
import { useTranslations } from "next-intl";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function About() {
  const t = useTranslations('About');
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(leftColRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: leftColRef.current,
            start: "top 85%",
          }
        }
      );

      gsap.fromTo(rightColRef.current,
        { opacity: 0, scale: 0.9, y: 100 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: rightColRef.current,
            start: "top 85%",
          }
        }
      );
      
      gsap.to(rightColRef.current, {
        y: -100,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        }
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
          <div
            ref={leftColRef}
            className="lg:sticky lg:top-24 opacity-0"
          >
            <h2 className="text-6xl  md:text-8xl font-black text-brand-blue mb-10 tracking-tighter leading-[0.9]">
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
          </div>

          <div
            ref={rightColRef}
            className="flex justify-center opacity-0"
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
          </div>
        </div>
      </div>
    </section>
  );
}
