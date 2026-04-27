"use client";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";
import { useSmoothScroll } from "@/context/smooth-scroll-context";
import { useCart } from "@/context/cart-context";
import { ShoppingCart } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

export const navLinks = [
  {
    key: "about",
    href: "/#about",
  },
  {
    key: "services",
    href: "/#services",
  },
  {
    key: "tools",
    href: "/#tools",
  },
  {
    key: "products",
    href: "/products",
  },
];

export function Header() {
  const scrolled = useScroll(10);
  const { scrollTo } = useSmoothScroll();
  const activeSection = useActiveSection(
    navLinks.map((link) => link.href.replace("/#", "")),
  );
  const { totalItems, setIsOpen: setIsCartOpen } = useCart();

  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");

  const handleLanguageChange = (newLocale: any) => {
    router.replace(pathname, { locale: newLocale, scroll: false });
  };

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: any,
  ) => {
    const targetHash = link.href.includes("#") ? link.href.split("#")[1] : null;
    const isTargetHome = link.href.startsWith("/#") || link.href === "/";

    const isCurrentHome = pathname === "/";

    if (isTargetHome && isCurrentHome && targetHash) {
      e.preventDefault();
      scrollTo(`#${targetHash}`);
      window.history.pushState(null, "", `#${targetHash}`);
    }
  };

  return (
    <header className="sticky md:top-2 z-40 container md:px-4 mx-auto transition-all duration-300">
      <div
        className={cn(
          "mx-auto w-full border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
          {
            "max-w-8xl border-brand-blue bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:shadow":
              scrolled,
          },
        )}
      >
        <nav
          className={cn(
            "flex h-14 w-full items-center justify-between px-4 md:h-12 md:transition-all md:ease-out",
            {
              "md:px-2": scrolled,
            },
          )}
        >
          <Link href="/" onClick={(e) => handleNavClick(e, { href: "/#" })}>
            <Image
              src="/TransparentLogo.webp"
              alt="Logo"
              width={90}
              height={80}
              priority={true}
              className="mb-2"
            />
          </Link>
          <div className="hidden items-center gap-2 md:flex">
            <div className="flex items-center">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("/#", "");
                return (
                  <Button
                    asChild
                    key={link.key}
                    variant="ghost"
                    className={cn(
                      "text-base font-semibold hover:text-brand-blue transition-colors",
                      isActive ? "text-brand-blue" : "text-slate-600",
                    )}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => handleNavClick(e, link)}
                    >
                      {t(link.key)}
                    </Link>
                  </Button>
                );
              })}
            </div>
            <div className="flex items-center gap-3 ml-4 border-l pl-4">
              <button
                onClick={() => handleLanguageChange("tm")}
                className={cn(
                  "text-xs font-black transition-all hover:scale-110",
                  locale === "tm" ? "text-brand-blue" : "text-slate-400",
                )}
              >
                TM
              </button>
              <button
                onClick={() => handleLanguageChange("ru")}
                className={cn(
                  "text-xs font-black transition-all hover:scale-110",
                  locale === "ru" ? "text-brand-blue" : "text-slate-400",
                )}
              >
                RU
              </button>
              <button
                onClick={() => handleLanguageChange("en")}
                className={cn(
                  "text-xs font-black transition-all hover:scale-110",
                  locale === "en" ? "text-brand-blue" : "text-slate-400",
                )}
              >
                EN
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-5 h-5 text-slate-600" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#0157A4] text-white text-[10px] font-bold flex items-center justify-center rounded-full border-2 border-white">
                  {totalItems}
                </span>
              )}
            </button>
            <MobileNav />
          </div>
        </nav>
      </div>
    </header>
  );
}
