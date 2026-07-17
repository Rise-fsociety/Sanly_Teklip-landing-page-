"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { useTranslations } from "next-intl";

gsap.registerPlugin(ScrollTrigger);

function applySplitWordAnim(el: HTMLElement) {
  const split = new SplitType(el, { types: "words" });
  if (!split.words?.length) return split;
  gsap.fromTo(
    split.words,
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.05,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
        toggleActions: "play none none reverse",
      },
    },
  );
  return split;
}

function applyScrubTextAnim(el: HTMLElement) {
  const split = new SplitType(el, { types: "words" });
  if (!split.words?.length) return split;
  gsap.fromTo(
    split.words,
    { opacity: 0.2 },
    {
      opacity: 1,
      stagger: 0.1,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 78%",
        scrub: true,
      },
    },
  );
  return split;
}

export default function About() {
  const t = useTranslations("About");
  const sectionRef = useRef<HTMLDivElement>(null);
  const bg1Ref = useRef<HTMLDivElement>(null);
  const bg2Ref = useRef<HTMLDivElement>(null);
  const bg3Ref = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    [bg1Ref, bg2Ref, bg3Ref].forEach((ref) => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current,
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.8,
          ease: "power3.inOut",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        },
      );
    });

    const splitEls = sectionRef.current?.querySelectorAll("[data-split]");
    splitEls?.forEach((el) => applySplitWordAnim(el as HTMLElement));

    const scrubEls = sectionRef.current?.querySelectorAll("[data-scrub-text]");
    scrubEls?.forEach((el) => applyScrubTextAnim(el as HTMLElement));

    const fadeEls = sectionRef.current?.querySelectorAll("[data-animate]");
    if (fadeEls?.length) {
      gsap.fromTo(
        fadeEls,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }
  });

  return (
    <section
      ref={sectionRef}
      className="flex flex-col-reverse p-4 md:flex-row-reverse md:h-screen md:max-h-[1080px] w-full relative">
      <div className="w-full md:w-1/2 pb-10 lg:pb-0 lg:min-h-[70vh] md:min-h-0 md:h-full text-center lg:text-start flex flex-col justify-center overflow-hidden md:rounded-none will-change-transform gap-4 md:border-l md:border-slate-100 md:pl-12">
        <div
          ref={bg1Ref}
          className="w-full flex flex-col justify-center py-6 border-b border-black  will-change-[clip-path]">
          <p className="text-slate-400 text-black tracking-[0.3em] uppercase mb-2 font-semibold">
            Fullstack
          </p>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-soft-gray leading-[0.9] tracking-tighter">
            Fullstack Web
          </h3>
        </div>

        {/* Item 2 */}
        <div
          ref={bg2Ref}
          className="w-full flex flex-col justify-center py-6 border-b border-black will-change-[clip-path]">
          <p className="text-slate-400 text-[10px] tracking-[0.3em] uppercase mb-2 font-semibold">
            App
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-brand-blue leading-[1.1] tracking-tighter">
            Mobile Apps
          </h3>
        </div>

        <div
          ref={bg3Ref}
          className="w-full flex flex-col justify-center py-6 will-change-[clip-path]">
          <p className="text-slate-400 text-[10px] tracking-[0.3em] uppercase mb-2 font-semibold">
            Services
          </p>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-soft-gray leading-[1.1] tracking-tighter">
            Akhasap
          </h3>
        </div>
      </div>

      {/* Right side column: Clean presentation on white background */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-6 md:px-12 lg:px-4 py-12 md:py-0 md:h-full md:overflow-y-auto gap-8 relative z-10">
        <h2
          data-split
          className="text-4xl md:text-[4.7vw] font-[750] text-brand-blue leading-[120%] tracking-tighter">
          Sanly Teklip
        </h2>

        <div className="flex flex-col gap-6 lg:mt-4 text-black">
          <p
            data-animate
            className="text-2xl md:text-3xl font-bold text-soft-gray leading-tight tracking-tight">
            {t("subtitle")}
          </p>

          <p
            data-scrub-text
            className="text-slate-600 text-xl md:text-2xl leading-relaxed font-medium">
            {t.rich("desc1", {
              blue: (chunks) => (
                <span className="text-brand-blue font-bold">{chunks}</span>
              ),
            })}
          </p>

          <p
            data-scrub-text
            className="text-slate-600 text-xl md:text-2xl leading-relaxed max-w-2xl font-medium">
            {t.rich("desc2", {
              blue: (chunks) => (
                <span className="text-brand-blue font-bold">{chunks}</span>
              ),
            })}
          </p>
        </div>
      </div>
    </section>
  );
}
