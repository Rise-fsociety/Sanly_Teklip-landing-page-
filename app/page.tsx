"use client";

import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Tools } from "@/components/sections/tools";
import { About } from "@/components/sections/about";
import { Pricing } from "@/components/sections/pricing";
import { Footer } from "@/components/sections/footer";
import { IntroAnimation } from "@/components/intro-animation";
import { Particles } from "@/components/ui/particles";
import Lenis from "lenis";
import { SmoothScrollProvider, useSmoothScroll } from "@/context/smooth-scroll-context";

function HomeContent() {
  const [showIntro, setShowIntro] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const { setLenis } = useSmoothScroll();

  useEffect(() => {
    // Initialize Lenis
    const lenis = new Lenis({
      lerp: 0.07, // Silky smooth interpolation
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

    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
    setIsRendered(true);

    return () => {
      lenis.destroy();
      setLenis(null);
    };
  }, [setLenis]);

  const handleComplete = () => {
    setShowIntro(false);
    localStorage.setItem("hasSeenIntro", "true");
  };

  if (!isRendered) return null;

  return (
    <AnimatePresence mode="wait">
      {showIntro ? (
        <IntroAnimation key="intro" onComplete={handleComplete} />
      ) : (
        <motion.div 
          key="main-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="relative min-h-screen"
        >
          <Header />
          <main className="relative">
            <Particles
              className="absolute inset-0 -z-10"
              quantity={550}
              staticity={20}
              ease={40}
              size={1}
              vx={0.2}
              vy={0.2}
              color="#0ea5e9"
              refresh
            />
            <Hero />
            <About />
            <Services />
            <Tools />
            <Pricing />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function Home() {
  return (
    <SmoothScrollProvider>
      <HomeContent />
    </SmoothScrollProvider>
  );
}

