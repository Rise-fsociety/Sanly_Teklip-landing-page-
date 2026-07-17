"use client";

import { useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useTranslations } from "next-intl";
import Button from "../ui/buttonHero";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TextRoll } from "../animationComponents/textRoll/TextRoll";


function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const Silk = dynamic(() => import("../silk/Silk"), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onReady?: () => void;
  introComplete?: boolean;
}

export default function Hero({ onReady, introComplete }: HeroProps) {
  const t = useTranslations("Hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const targets = [
      topBarRef.current,
      headingRef.current,
      roleRef.current,
      ctaRef.current,
      scrollHintRef.current,
    ].filter(Boolean);
    gsap.set(targets, { y: 50, opacity: 0 });
  }, []);

  useEffect(() => {
    if (!introComplete) return;
    gsap.to(
      [
        topBarRef.current,
        headingRef.current,
        roleRef.current,
        ctaRef.current,
        scrollHintRef.current,
      ].filter(Boolean),
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.12,
      },
    );
  }, [introComplete]);

  useEffect(() => {
    const timer = setTimeout(() => {
      onReady?.();
    }, 500);
    return () => clearTimeout(timer);
  }, [onReady]);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        pin: sectionRef.current,
        pinSpacing: false,
      },
    });

    tl.fromTo(
      textRef.current,
      { y: 0, opacity: 1 },
      { y: -100, opacity: 0, ease: "none", duration: 0.5 },
      0,
    );
  });

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative h-screen w-full bg-black overflow-hidden"
    >
      <div
        ref={containerRef}
        className="absolute top-0 left-0 w-full h-full z-0"
      >
        <Silk
          speed={5}
          scale={1}
          color="#7B7481"
          noiseIntensity={1.5}
          rotation={0}
        />
      </div>

      <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] bg-[#7163F1]/15 rounded-full blur-[120px] mix-blend-screen pointer-events-none z-10 will-change-transform" />
      <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] max-w-[500px] max-h-[500px] bg-[#FF4500]/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none z-10 will-change-transform" />

      <div
        className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-size-[80px_80px] md:bg-size-[100px_100px] z-10 pointer-events-none"
        style={{
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 50%, black 10%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 50%, black 10%, transparent 100%)",
        }}
      />

      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-0 bg-black/30 z-10 pointer-events-none" />

      <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] md:text-[10px] tracking-[0.5em] text-white/20 uppercase font-mono z-20 pointer-events-none hidden sm:block origin-left">
        {t("innovate")}
      </div>
      <div className="absolute right-4 md:right-8 top-1/2 translate-y-1/2 rotate-90 text-[9px] md:text-[10px] tracking-[0.5em] text-white/20 uppercase font-mono z-20 pointer-events-none hidden sm:block origin-right">
        {t("engineer")}
      </div>

      <div
        ref={textRef}
        className="relative z-20 h-screen pointer-events-none flex flex-col"
      >
        <div className="max-w-7xl mx-auto w-full px-5 md:px-6 flex flex-col flex-1">
          <div
            ref={topBarRef}
            className="flex flex-col gap-1 md:flex-row md:items-center md:gap-6 pt-28 md:pt-12 shrink-0"
          >
            <div className="flex items-center gap-2 md:contents">
              <span className="text-white/40 text-xs tracking-widest uppercase">
                {t("established")}
              </span>
              <span className="w-4 h-px bg-white/20" />
              <span className="text-white/40 text-xs tracking-widest uppercase">
                {t("productionType")}
              </span>
              <span className="hidden md:inline w-6 h-px bg-white/20" />
            </div>
            <div className="flex items-center gap-2 pointer-events-auto">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
              </span>
              <span className="text-white/60 text-xs tracking-wide">
                Akhasap
              </span>
            </div>
          </div>

          <div className="flex-1 flex items-center justify-between gap-8">
            <div ref={headingRef} className="pointer-events-auto">
              <TextRoll className="text-4xl lg:text-8xl font-extrabold uppercase tracking-[-0.03em] transition-colors text-[#f0f4f1]">
                Sanly Teklip
              </TextRoll>
              <div className="lg:hidden mt-4 flex flex-col gap-2">
                <p className="text-white/70 text-sm font-medium">
                  → {t("mobileFeatureOne")}
                </p>
                <p className="text-white/70 text-sm font-medium">
                  → {t("mobileFeatureTwo")}
                </p>
              </div>
            </div>

            <div
              ref={roleRef}
              className="hidden lg:flex flex-col gap-6 text-right pointer-events-auto"
            >
              <div>
                <p className="text-white/30 text-[10px] uppercase tracking-widest mb-1">
                  {t("expertiseHeader")}
                </p>
                <p className="text-white/80 text-base font-medium">
                  {t("expertiseOne")}
                </p>
                <p className="text-white/80 text-base font-medium">
                  {t("expertiseTwo")}
                </p>
              </div>
              <div className="w-full h-px bg-white/10" />
              <div>
                <p className="text-white/80 text-sm lg:text-xl max-w-sm lg:max-w-lg leading-relaxed">
                  {t("mainDescription")}
                </p>
              </div>
            </div>
          </div>

          <div
            ref={ctaRef}
            className="shrink-0 pb-20 md:pb-10 flex flex-col gap-3 md:flex-row md:flex-wrap md:items-end md:justify-between md:gap-6"
          >
            <p className="text-white/50 text-sm lg:text-xl xl:text-4xl max-w-sm lg:max-w-lg leading-relaxed">
              {t("projectsCount")}
            </p>
            <div className="flex flex-wrap items-center gap-2 pointer-events-auto">
              <Button
                variant="outline"
                className="px-4 h-9 text-xs cursor-pointer"
                onClick={() => window.open("https://www.instagram.com/sanlyteklip/", "_blank", "noopener,noreferrer")}
              >
                Instagram ↗
              </Button>
              <Button
                variant="outline"
                className="px-4 h-9 text-xs cursor-pointer"
                onClick={() => window.open("https://www.tiktok.com/@sanly.teklip8", "_blank", "noopener,noreferrer")}
              >
                Tiktok ↗
              </Button>
            </div>
          </div>

          <div
            ref={scrollHintRef}
            className="shrink-0 pb-28 md:pb-4 flex justify-center"
          >
            <div className="flex flex-col items-center gap-1 opacity-40">
              <span className="text-white text-[10px] tracking-widest uppercase">
                {t("discoverStack")}
              </span>
              <span className="text-white text-xs">↓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}