import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Partners } from "@/components/sections/partners";
import { Tools } from "@/components/sections/tools";
import { About } from "@/components/sections/about";
import { Pricing } from "@/components/sections/pricing";
import { SmoothScrollInit } from "@/components/smooth-scroll-init";

export default function Home() {
  return (
    <main>
      <SmoothScrollInit />
      <Hero />
      <About />
      <Services />
      <Partners />
      <Tools />
      <Pricing />
    </main>
  );
}
