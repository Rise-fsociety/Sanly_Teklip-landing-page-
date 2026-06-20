import { Metadata } from "next";
import { Hero } from "@/components/sections/hero";
import { Services } from "@/components/sections/services";
import { Partners } from "@/components/sections/partners";
import { Tools } from "@/components/sections/tools";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { FeaturedProducts } from "@/components/sections/featuredProducts";
import { SmoothScrollInit } from "@/components/smooth-scroll-init";
import { IntroductionVideo } from "@/components/sections/introduction";

const baseUrl = "https://sanlyteklip.com.tm";

export const metadata: Metadata = {
  title: "Sanly Teklip | Web-saýtlaryň, programmalaryň we IT çözgütleriň işlenip düzülmegi",
  description: "Biz biznes üçin ýokary tehnologiýaly web-saýtlary, dolandyryş panellerini (dashboard) we toplumlaýyn IT çözgütlerini döredýäris. Döwrebap stek: React, Next.js, UI/UX dizaýn.",
  keywords: "Web-saýtlaryň işlenip düzülmegi, IT kompaniýa, Sanly Teklip, saýt sargyt etmek, Next.js programmist, biznesi awtomatlaşdyrmak",

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  alternates: {
    canonical: baseUrl,
    languages: {
      en: `${baseUrl}/en`,
      ru: `${baseUrl}/ru`,
      tk: `${baseUrl}/tm`,
    },
  },

  openGraph: {
    title: "Sanly Teklip — Sanly çözgütler we IT hyzmatlar",
    description: "Professional web-saýtlar, mobil programmalar we IT konsultasiýa hyzmatlary.",
    url: baseUrl,
    siteName: "Sanly Teklip",
    images: [
      {
        url: `${baseUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Sanly Teklip IT Services",
      },
    ],
    locale: "tk_TM",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanly Teklip — Sanly çözgütler we IT hyzmatlar",
    description: "Professional web-saýtlar, mobil programmalar we IT konsultasiýa hyzmatlary.",
    images: [`${baseUrl}/og-image.jpg`],
  },
};

export default function Home() {
  return (
    <main>
      <SmoothScrollInit />
      <Hero />
      <About />
      <IntroductionVideo/>
      <Services />
      <Work />
      <FeaturedProducts />
      <Tools /> 
      <Partners />
    </main>
  );
}