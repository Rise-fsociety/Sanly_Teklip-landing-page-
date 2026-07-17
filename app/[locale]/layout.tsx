import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { SmoothScrollProvider } from "@/context/smooth-scroll-context";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cartDrawer";
import { Footer } from "@/components/sections/footer";
import { Toaster } from "react-hot-toast";
import { RocketToTop } from "@/components/RocketToTop";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  
  const t = await getTranslations({ locale, namespace: "SEO" });

  return {
    metadataBase: new URL("https://sanlyteklip.com.tm"), 
    title: {
      default: t("title"),
      template: "%s | Sanly Teklip",
    },
    description: t("description"),
    keywords: [
      "Sanly Teklip", 
      "Akhasap", 
      "Akhasap ERP", 
      "Software Development Turkmenistan", 
      "IT Company", 
      "Enterprise Automation"
    ],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ru: "/ru",
        tk: "/tk",
      },
    },
    openGraph: {
      type: "website",
      locale: locale,
      url: `https://sanlyteklip.com.tm/${locale}`,
      title: t("title"),
      description: t("description"),
      siteName: "Sanly Teklip",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <CartProvider>
        <SmoothScrollProvider>
          <Toaster position="top-center" />
          {children}
          <Footer />
          <CartDrawer />
          <RocketToTop />
        </SmoothScrollProvider>
      </CartProvider>
    </NextIntlClientProvider>
  );
}