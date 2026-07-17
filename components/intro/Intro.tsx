"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useLenis } from "lenis/react";

const WORDS = [
  "Hoş Geldiňiz",
  "Добро пожаловать",
  "Welcome",
  "ようこそ",
  "欢迎",
];

interface IntroProps {
  isReady: boolean;
  onComplete: () => void;
}

export default function Intro({ isReady, onComplete }: IntroProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLParagraphElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef({ value: 0 });
  const wordIndexRef = useRef(0);
  const wordTlRef = useRef<GSAPTimeline | null>(null);
  const [currentWord, setCurrentWord] = useState(WORDS[0]);
  const isExiting = useRef(false);
  const lenis = useLenis();

  useEffect(() => {
    const preventDefault = (e: TouchEvent) => e.preventDefault();

    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    document.addEventListener("touchmove", preventDefault, { passive: false });

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      document.removeEventListener("touchmove", preventDefault);
    };
  }, []);

  useEffect(() => {
    if (!lenis) return;
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [lenis]);

  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });
    wordTlRef.current = tl;

    WORDS.forEach((word, i) => {
      tl.to(
        {},
        {
          duration: 0.45,
          onStart: () => {
            wordIndexRef.current = i;
            setCurrentWord(word);
            if (wordRef.current) {
              gsap.fromTo(
                wordRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.25, ease: "power2.out" },
              );
            }
          },
        },
      ).to(wordRef.current, {
        y: -20,
        opacity: 0,
        duration: 0.2,
        ease: "power2.in",
        delay: 0.2,
      });
    });

    return () => {
      tl.kill();
    };
  }, []);

  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const isReadyRef = useRef(false);

  useEffect(() => {
    isReadyRef.current = isReady;

    if (isReady && tweenRef.current?.paused()) {
      tweenRef.current.resume();
    }
  }, [isReady]);

  useEffect(() => {
    const obj = counterRef.current;

    tweenRef.current = gsap.to(obj, {
      value: 100,
      duration: 3.5,
      ease: "power1.inOut",
      onUpdate: () => {
        if (obj.value >= 75 && !isReadyRef.current) {
          tweenRef.current?.pause();
        }

        if (percentRef.current) {
          percentRef.current.textContent = `${Math.floor(obj.value)}%`;
        }
        if (lineRef.current) {
          lineRef.current.style.width = `${obj.value}%`;
        }
      },
      onComplete: () => {
        if (!isExiting.current) {
          isExiting.current = true;
          setTimeout(playExit, 300);
        }
      },
    });

    return () => {
      tweenRef.current?.kill();
    };
  }, []);

  const playExit = () => {
    wordTlRef.current?.kill();

    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    tl.to(wordRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.4,
      ease: "power3.in",
    }).to(
      overlayRef.current,
      {
        yPercent: -100,
        duration: 0.9,
        ease: "power4.inOut",
      },
      "-=0.1",
    );
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-9999 bg-black flex flex-col items-center justify-center overflow-hidden"
    >
      <span className="absolute top-6 left-6 text-white/20 text-[10px] tracking-[0.4em] uppercase font-mono">
        yhlas.dev
      </span>

      <div className="overflow-hidden h-16 md:h-20 flex items-center justify-center">
        <p
          ref={wordRef}
          className="text-white text-3xl md:text-5xl font-light tracking-wider select-none"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          {currentWord}
        </p>
      </div>

      <div className="absolute bottom-8 left-6 right-6 flex flex-col gap-3">
        <div className="w-full h-px bg-white/10 relative overflow-hidden rounded-full">
          <div
            ref={lineRef}
            className="absolute top-0 left-0 h-full bg-white transition-none rounded-full"
            style={{ width: "0%" }}
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-white/30 text-[10px] uppercase tracking-[0.3em] font-mono">
            Loading
          </span>
          <span
            ref={percentRef}
            className="text-white/60 text-[10px] font-mono tabular-nums"
          >
            0%
          </span>
        </div>
      </div>
    </div>
  );
}