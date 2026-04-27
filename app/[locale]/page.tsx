"use client";

import { useEffect } from "react";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Partners } from "@/components/sections/partners";
import { Tools } from "@/components/sections/tools";
import { About } from "@/components/sections/about";
import { Pricing } from "@/components/sections/pricing";
import Lenis from "lenis";
import { useSmoothScroll } from "@/context/smooth-scroll-context";

function HomeContent() {
  const { setLenis } = useSmoothScroll();

  useEffect(() => {
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    if (isMobile) {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
        }, 400);
      }
      return;
    }

    const lenis = new Lenis({
      lerp: 0.07,
      smoothWheel: true,
      wheelMultiplier: 1,
      infinite: false,
    });

    setLenis(lenis);

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    const hash = window.location.hash;
    if (hash && lenis) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(() => {
            lenis.scrollTo(hash, {
              duration: 3,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }, 400);
        });
      });
    }

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      setLenis(null);
    };
  }, [setLenis]);

  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Partners />
      <Tools />
      <Pricing />
    </main>
  );
}

export default function Home() {
  return <HomeContent />;
}
