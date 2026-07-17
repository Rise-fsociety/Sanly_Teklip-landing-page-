"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useLenis } from "lenis/react";
import { ShoppingCart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { Link, useRouter, usePathname } from "@/i18n/navigation";

import { useSmoothScroll } from "@/context/smooth-scroll-context";
import { useCart } from "@/context/cart-context";
import CircularText from "./CircularText";

export const navLinks = [
  { key: "about", href: "/#about", hash: "about" },
  { key: "services", href: "/#services", hash: "services" },
  { key: "work", href: "/#work", hash: "work" },
  { key: "tools", href: "/#tools", hash: "tools" },
  { key: "products", href: "/products", hash: null },
];

export function Header() {
  const { scrollTo } = useSmoothScroll();
  const { totalItems, setIsOpen: setIsCartOpen } = useCart();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Header");

  const navRef = useRef<HTMLElement>(null);
  const linkRef = useRef<(HTMLDivElement | null)[]>([]);
  const contactRef = useRef<(HTMLDivElement | null)[]>([]);
  const socialRef = useRef<HTMLDivElement>(null);
  const navigationRef = useRef<HTMLDivElement>(null);
  const toplineRef = useRef<HTMLSpanElement>(null);
  const bottomlineRef = useRef<HTMLSpanElement>(null);
  const iconTL = useRef<GSAPTimeline | null>(null);
  const tl = useRef<GSAPTimeline | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const lenis = useLenis();

  const handleLanguageChange = (newLocale: any) => {
    router.replace(pathname, { locale: newLocale, scroll: false });
  };

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (isOpen) return;

      if (window.scrollY > lastScrollY && window.scrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      lastScrollY = window.scrollY;

      const themeTriggerSec = document.getElementById("light-bg-wrapper");
      if (themeTriggerSec) {
        const rect = themeTriggerSec.getBoundingClientRect();
        if (rect.top <= 100 && rect.bottom >= 50) {
          setIsDarkTheme(true);
        } else {
          setIsDarkTheme(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  useEffect(() => {
    const handleModalToggle = (e: Event) => {
      const customEvent = e as CustomEvent<{ isOpen: boolean }>;
      setIsModalOpen(customEvent.detail?.isOpen ?? false);
    };

    window.addEventListener("modalToggle", handleModalToggle as EventListener);
    return () =>
      window.removeEventListener("modalToggle", handleModalToggle as EventListener);
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (lenis) lenis.stop();
      document.body.style.overflow = "hidden";
    } else {
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    }
  }, [isOpen, lenis]);

  const toggleMenu = () => {
    if (!tl.current) return;

    if (isOpen) {
      tl.current.reverse();
      iconTL.current?.reverse();
    } else {
      tl.current.play();
      iconTL.current?.play();
    }
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    gsap.set(navRef.current, {
      xPercent: 100,
      display: "none",
      borderTopLeftRadius: "50vh",
      borderBottomLeftRadius: "50vh",
    });
    gsap.set(
      [
        ...linkRef.current.filter(Boolean),
        ...contactRef.current.filter(Boolean),
      ],
      { autoAlpha: 0, x: 30 },
    );
    gsap.set(socialRef.current, { autoAlpha: 0, x: 20 });
    gsap.set(navigationRef.current, { autoAlpha: 0, x: 20 });

    tl.current = gsap
      .timeline({
        paused: true,
        onReverseComplete: () => {
          gsap.set(navRef.current, { display: "none" });
        },
      })
      .set(navRef.current, { display: "flex" })
      .to(navRef.current, { xPercent: 0, ease: "power3.out", duration: 1 })
      .to(
        navRef.current,
        {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
          ease: "power2.inOut",
          duration: 0.6,
        },
        "<",
      )
      .to(
        navigationRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2",
      )
      .to(
        linkRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<",
      )
      .to(
        contactRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<+0.2",
      )
      .to(
        socialRef.current,
        {
          autoAlpha: 1,
          x: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        },
        "<",
      );

    iconTL.current = gsap
      .timeline({ paused: true, defaults: { ease: "power2.inOut" } })
      .to(toplineRef.current, {
        rotation: 45,
        y: 3.3,
        duration: 0.3,
      })
      .to(
        bottomlineRef.current,
        {
          rotation: -45,
          y: -3.3,
          duration: 0.3,
        },
        "<",
      );
  }, []);

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: typeof navLinks[0]
  ) => {
    toggleMenu(); // Close side menu

    const isTargetHome = link.href.startsWith("/#") || link.href === "/";
    const isCurrentHome = pathname === "/";

    if (isTargetHome && isCurrentHome && link.hash) {
      e.preventDefault();
      setTimeout(() => {
        scrollTo(`#${link.hash}`);
        window.history.pushState(null, "", `#${link.hash}`);
      }, 400); // Allow menu closing layout animation delay
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        style={{ display: "none" }}
        className="fixed z-50 bg-black h-[100dvh] w-full py-8 md:py-12 lg:px-20 md:px-10 px-5 text-white/50 flex flex-col justify-between md:w-[62%] md:left-[62%] overflow-y-auto pb-12"
      >
        <div className="flex flex-col justify-center flex-1 py-4">
          <div
            ref={navigationRef}
            className="h-10 flex flex-col justify-between"
          >
            <p className="text-xs uppercase tracking-wider">Navigation</p>
            <div className="bg-white/50 w-full md:w-[200px] lg:w-[315px] h-[1px]"></div>
          </div>
          <div className="text-white md:text-6xl text-5xl gap-4 md:gap-6 flex flex-col mt-8 md:mt-10 mb-8 md:mb-0">
            {navLinks.map((link, index) => (
              <div key={link.key} className="overflow-hidden w-fit">
                <div
                  ref={(el) => {
                    if (el) linkRef.current[index] = el;
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className="hover:text-white/50 transition-all duration-300 cursor-pointer block capitalize"
                  >
                    {t(link.key)}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </nav>
      <div
        className={`fixed z-50 top-6 left-6 md:left-7 scale-28 md:scale-40 origin-top-left transition-all duration-500 ease-in-out ${isVisible && !isModalOpen ? "translate-y-0 opacity-100 pointer-events-auto" : "-translate-y-20 opacity-0 pointer-events-none"}`}
      >
        <CircularText
          text="Sanly*Teklip"
          onHover="speedUp"
          spinDuration={20}
          className={`transition-colors 2xl:text-xl duration-500 ${isDarkTheme ? "text-black!" : "text-white!"}`}
        />
      </div>

      <div
        onClick={toggleMenu}
        className={`fixed z-50 flex flex-col items-center justify-center gap-1.5 transition-all duration-500 ease-in-out backdrop-blur-md border rounded-full cursor-pointer w-12 h-12 md:w-16 md:h-16 top-6 right-6 md:right-7 shadow-lg ${isVisible && !isModalOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-20 opacity-0 pointer-events-none"
          } ${isDarkTheme && !isOpen
            ? "bg-black/10 border-black/20"
            : "bg-[#fefefe]/10 border-[#fefefe]/20"
          }`}
        style={{ colorScheme: "light" }}
      >
        <span
          ref={toplineRef}
          className={`block w-6 h-0.5 rounded-full origin-center transition-colors duration-500 ${isDarkTheme && !isOpen ? "bg-black" : "bg-[#fefefe]"
            }`}
        ></span>
        <span
          ref={bottomlineRef}
          className={`block w-6 h-0.5 rounded-full origin-center transition-colors duration-500 ${isDarkTheme && !isOpen ? "bg-black" : "bg-[#fefefe]"
            }`}
        ></span>
      </div>

      <div
        className={`fixed z-50 top-6 right-20 md:right-28 h-12 md:h-16 flex items-center justify-center gap-4 transition-all duration-500 ease-in-out ${isVisible && !isModalOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-20 opacity-0 pointer-events-none"
          }`}
      >
        <button
          onClick={() => setIsCartOpen(true)}
          aria-label={t("cart")}
          className={`relative p-2 rounded-full backdrop-blur-sm border transition-colors ${isDarkTheme && !isOpen
              ? "bg-black/5 border-black/10 text-slate-800 hover:bg-black/10"
              : "bg-white/5 border-white/10 text-slate-200 hover:bg-white/10"
            }`}
        >
          <ShoppingCart className="w-4 h-4 md:w-5 md:h-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 inline-flex h-4 min-w-[1rem] md:h-5 md:min-w-[1.25rem] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] md:text-[10px] font-black text-white">
              {totalItems}
            </span>
          )}
        </button>

        <div className="flex items-center gap-2.5">
          {["tk", "ru", "en"].map((lang, idx, arr) => (
            <div key={lang} className="flex items-center gap-2">
              <button
                onClick={() => handleLanguageChange(lang)}
                className={`text-xs md:text-sm font-bold tracking-widest uppercase transition-colors ${locale === lang
                    ? "text-[#7163F1]"
                    : isDarkTheme && !isOpen
                      ? "text-black/50 hover:text-black"
                      : "text-white/50 hover:text-white"
                  }`}
              >
                {lang === "tk" ? "TM" : lang}
              </button>
              {idx < arr.length - 1 && (
                <span
                  className={`text-xs md:text-sm ${isDarkTheme && !isOpen ? "text-black/30" : "text-white/30"
                    }`}
                >
                  /
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}