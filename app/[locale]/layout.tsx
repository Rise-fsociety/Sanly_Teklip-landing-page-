import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { SmoothScrollProvider } from "@/context/smooth-scroll-context";
import { CartProvider } from "@/context/cart-context";
import { CartDrawer } from "@/components/cartDrawer";
import { Footer } from "@/components/sections/footer";
import { Toaster } from "react-hot-toast";
import { Header } from "@/components/header";
import { RocketToTop } from "@/components/RocketToTop";
import AkymChatWidget from "@/components/AkymChat";

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
          <AkymChatWidget />
          <Header />
          {children}
          <Footer />
          <CartDrawer />
          <RocketToTop />
        </SmoothScrollProvider>
      </CartProvider>
    </NextIntlClientProvider>
  );
}
