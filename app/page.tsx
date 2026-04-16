"use client";

import  { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/header";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Services } from "@/components/sections/services";
import { Pricing } from "@/components/sections/pricing";
import { About } from "@/components/sections/about";
import { Footer } from "@/components/sections/footer";
import { IntroAnimation } from "@/components/intro-animation";

export default function Home() {
  const [showIntro, setShowIntro] = useState(false);
  const [isRendered, setIsRendered] = useState(false);

  useEffect(() => {
    const hasSeenIntro = localStorage.getItem("hasSeenIntro");
    if (!hasSeenIntro) {
      setShowIntro(true);
    }
    setIsRendered(true);
  }, []);

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
        >
          <Header />
          <main>
            <Hero />
            <Features />
            <Services />
            <Pricing />
            <About />
          </main>
          <Footer />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
