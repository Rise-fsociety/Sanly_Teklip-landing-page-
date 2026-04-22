"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Partners } from "@/components/sections/partners";
import { Tools } from "@/components/sections/tools";
import { About } from "@/components/sections/about";
import { Pricing } from "@/components/sections/pricing";
import { Footer } from "@/components/sections/footer";
import Lenis from "lenis";
import { useSmoothScroll } from "@/context/smooth-scroll-context";

function HomeContent() {
  const [isRendered, setIsRendered] = useState(false);
  const { setLenis } = useSmoothScroll();

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07,
      syncTouch: true,
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
      infinite: false,
    });

    setLenis(lenis);

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    setIsRendered(true);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [setLenis]);

  if (!isRendered) return null;

  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Partners />
        <Tools />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}

export default function Home() {
  return <HomeContent />;
}
