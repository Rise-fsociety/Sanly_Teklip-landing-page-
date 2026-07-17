"use client";

import { useState, useCallback } from "react";
import { SmoothScrollInit } from "@/components/smooth-scroll-init";
import Hero from "@/components/sections/hero";
import About from "@/components/sections/about";
import Intro from "@/components/intro/Intro";
import AkymChatWidget from "@/components/AkymChat";
import { Header } from "@/components/header";

import { IntroductionVideo } from "@/components/sections/introduction";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { FeaturedProducts } from "@/components/sections/featuredProducts";
import { Tools } from "@/components/sections/tools";
import { Partners } from "@/components/sections/partners";

export default function HomeClient() {
  const [silkReady, setSilkReady] = useState(false);
  const [introComplete, setIntroComplete] = useState(false);

  const handleSilkReady = useCallback(() => {
    setSilkReady(true);
  }, []);

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true);
  }, []);

  return (
    <section className="relative min-h-screen w-full">
      <SmoothScrollInit />

      {!introComplete && (
        <Intro isReady={silkReady} onComplete={handleIntroComplete} />
      )}

      <main>
        <AkymChatWidget onComplete={introComplete} />
        <Header />
        <Hero onReady={handleSilkReady} introComplete={introComplete} />

        <div id="light-bg-wrapper" className="relative z-30 w-full bg-[#f0f4f1] rounded-t-[3rem] md:rounded-none">
          <section id="about" className="max-w-[1580px] mx-auto">
            <About />
          </section>

          <section id="introduction" className="max-w-[1580px] p-4 mx-auto w-full">
            <IntroductionVideo />
          </section>

          <section id="services" className="max-w-[1580px] p-4 mx-auto w-full">
            <Services />
          </section>

          <section id="work" className="max-w-[1580px] p-4 mx-auto w-full">
            <Work />
          </section>

          <section id="products" className="max-w-[1580px] p-4 mx-auto w-full">
            <FeaturedProducts />
          </section>

          <section id="tools" className="max-w-[1580px] p-4 mx-auto w-full">
            <Tools />
          </section>

          <section id="partners">
            <Partners />
          </section>
        </div>
      </main>
    </section>
  );
}