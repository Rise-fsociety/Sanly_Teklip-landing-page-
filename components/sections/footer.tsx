"use client";

import AppearTitle from '../animationComponents/appearTitle/Index';
import Link from 'next/link';
import LinkText from '../animationComponents/linkText/Index';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import clsx from 'clsx';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import styles from '../styles/footer.module.css';
import useIsMobile from '../../hooks/useMobile';
import { useIsomorphicLayoutEffect } from '../../hooks/useIsomorphicLayoutEffect';
import { useRef, useEffect, useState, ReactNode } from 'react';

import { Mail, Phone, MapPin } from "lucide-react";
import { FaTiktok, FaInstagram } from 'react-icons/fa';
import { useTranslations, useLocale } from "next-intl";
import { usePathname } from 'next/navigation';
import { useSmoothScroll } from '@/context/smooth-scroll-context';

const Silk = dynamic(() => import('../silk/Silk'), { ssr: false });

interface FooterLink {
  label: string;
  href: string;
  icon?: any;
  isExternal?: boolean;
}

export function Footer() {
  const isMobile = useIsMobile();
  const footerRef = useRef<any>(null);

  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();

  const pathname = usePathname();
  const { scrollTo } = useSmoothScroll();

  const [contactsList, setContactsList] = useState<FooterLink[]>([]);

  useEffect(() => {
    const fetchFooterContacts = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/v1/public/translation`);
        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          const phoneMatch = result.data.find((item: any) => item.key === "footer_contact_phone");
          const emailMatch = result.data.find((item: any) => item.key === "footer_contact_email");
          const addressMatch = result.data.find((item: any) => item.key === "footer_contact_address");

          const dynamicContacts: FooterLink[] = [];

          if (phoneMatch) {
            const label = locale === "ru" ? phoneMatch.nameRu : locale === "en" ? phoneMatch.nameEn : phoneMatch.nameTm;
            if (label) {
              dynamicContacts.push({ label, href: `tel:${label.replace(/\s+/g, '')}`, icon: Phone });
            }
          }

          if (emailMatch) {
            const label = locale === "ru" ? emailMatch.nameRu : locale === "en" ? emailMatch.nameEn : emailMatch.nameTm;
            if (label) {
              dynamicContacts.push({ label, href: "mailto:" + label, icon: Mail, isExternal: true });
            }
          }

          if (addressMatch) {
            const label = locale === "ru" ? addressMatch.nameRu : locale === "en" ? addressMatch.nameEn : addressMatch.nameTm;
            if (label) {
              dynamicContacts.push({ label, href: "/products", icon: MapPin });
            }
          }

          if (dynamicContacts.length > 0) {
            setContactsList(dynamicContacts);
          }
        }
      } catch (error) {
        console.error("Failed to fetch footer contacts via admin keys:", error);
      }
    };

    fetchFooterContacts();
  }, [locale]);

  const staticServices = [
    { label: locale === "ru" ? "Веб-разработка" : locale === "en" ? "Web Development" : "Web meýdançalary", href: "/#services" },
    { label: "Android", href: "/#services" },
    { label: "iOS", href: "/#services" },
    { label: locale === "ru" ? "Бухгалтерские услуги" : locale === "en" ? "Accounting Services" : "Akhasap hyzmatlary", href: "/#services" },
    { label: locale === "ru" ? "ИT-консалтинг" : locale === "en" ? "IT Consulting" : "IT Konsultasiýa", href: "/#services" },
  ];

  const fallbackContacts = [
    { label: "sanlyteklip@sanlyteklip.com.tm", href: "mailto:sanlyteklip@sanlyteklip.com.tm", icon: Mail },
    { label: "+99365688442", href: "tel:+99365688442", icon: Phone },
    { label: t("address"), href: "/products", icon: MapPin },
  ];

  const finalContacts = contactsList.length > 0 ? contactsList : fallbackContacts;

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    if (!href.includes('#')) return;

    const targetId = href.includes('#') ? `#${href.split('#')[1]}` : href;
    const onHome = pathname === '/' || pathname === '/ru' || pathname === '/en' || pathname === '/tm';

    if (onHome) {
      e.preventDefault();
      const mobile = window.matchMedia('(max-width: 768px)').matches;
      if (mobile) {
        document.querySelector(targetId)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        scrollTo(targetId, { duration: 1.5 });
      }
    }
  };

  useIsomorphicLayoutEffect(() => {
    const setupFooterAnimation = () => {
      if (!footerRef.current) return;
      gsap.set(footerRef.current, { height: 'auto' });
      const allSections = document.querySelectorAll('#mainContainer section');
      if (allSections.length > 1) {
        const lastSection = allSections[allSections.length - 2];
        if (footerRef.current.offsetHeight <= window.innerHeight) {
          gsap.set(footerRef.current, { yPercent: -50 });
          const uncover = gsap.timeline({ paused: true });
          gsap.set(footerRef.current, { height: '100.5svh' });
          uncover.to(footerRef.current, {
            yPercent: 0,
            ease: 'none',
          });
          ScrollTrigger.create({
            id: 'footerTrigger',
            trigger: lastSection,
            start: 'bottom bottom',
            end: '+=100%',
            animation: uncover,
            scrub: true,
            scroller: document?.querySelector('main'),
          });
        } else {
          gsap.set(footerRef.current, { transform: 'translate(0%, 0%)', height: 'auto' });
        }
      }
    };

    setupFooterAnimation();

    const handleResize = () => {
      const footerTrigger = ScrollTrigger.getById('footerTrigger');
      if (footerTrigger) {
        footerTrigger.kill();
      }
      setupFooterAnimation();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      const footerTrigger = ScrollTrigger.getById('footerTrigger');
      if (footerTrigger) {
        footerTrigger.kill();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section
      ref={footerRef}
      role="contentinfo"
      className={clsx(
        'relative mb-0 overflow-hidden lg:min-h-screen',
        'flex flex-col gap-6 px-6 pt-0 pb-8 -mt-5',
        'lg:grid lg:grid-cols-[repeat(16,1fr)] lg:gap-x-[1.5vw] lg:px-[2vw] lg:pt-0 lg:pb-[2vw] lg:mt-0',
        'pb-6 xl:pb-12',
        '[translate:inherit] shadow-none',
        styles.root
      )}
    >
      <div className="absolute inset-0 pointer-events-none bg-black -z-10">
        <Silk />
      </div>

      {/* SITEMAP COLUMN */}
      <div
        style={{ gridColumn: isMobile ? '1 / 3' : '1 / 5' }}
        className={clsx("w-full mt-20 lg:mt-0 pt-[20vw] lg:pt-[6vw] [&>div]:w-full", styles.linksContainer)}
      >
        <AppearTitle isFooter>
          <h6 className={clsx(styles.title, 'h6 pb-6 text-white lg:pb-[1.5vw]')}>{t("nav")}</h6>
          {[
            { title: t("about"), href: "/#about" },
            { title: t("services"), href: "/#services" },
            { title: t("tools"), href: "/#tools" },
            { title: t("products"), href: "/products" },
          ].map((link) => (
            <div key={link.title} className={clsx("pt-2 lg:pt-[0.75vw] w-fit", styles.linkTextContainer)}
             onClick={(e) => handleNavClick(e, link.href)}
            >
              <LinkText
                className={clsx(
                  "group relative flex cursor-pointer items-center overflow-visible text-white",
                  "[&>svg]:h-[2vw] [&>svg]:w-[2vw] [&>svg]:fill-white [&>svg]:stroke-white [&>svg]:top-auto [&>svg]:overflow-visible [&>svg]:left-[-2vw]",
                  "lg:[&>svg]:h-[0.75vw] lg:[&>svg]:w-[0.75vw] lg:[&>svg]:left-0",
                  "[&>svg]:transition-transform [&>svg]:duration-[0.4s] [&>svg]:ease-[cubic-bezier(0.4,0,0.1,1)]",
                  "group-hover:[&>svg]:translate-x-[2vw] group-hover:[&>svg]:rotate-[-150deg]",
                  "lg:group-hover:[&>svg]:translate-x-[1vw]",
                  "[&>span]:transition-transform [&>span]:duration-[0.4s] [&>span]:ease-[cubic-bezier(0.4,0,0.1,1)]",
                  "group-hover:[&>span]:translate-x-[1.8vw] lg:group-hover:[&>span]:translate-x-[0.6vw]",
                  styles.linkText
                )}
                title={link.title}
                href={link.href}
              >
                <span className="footer text-white text-base lg:text-[1.1vw] transition-colors duration-300 group-hover:text-blue-400">{link.title}</span>
              </LinkText>
            </div>
          ))}
        </AppearTitle>
      </div>

      {/* SERVICES COLUMN */}
      <div
        style={{ gridColumn: isMobile ? '3 / 7' : '5 / 9' }}
        className={clsx("w-full pt-0 lg:pt-[6vw] [&>div]:w-full", styles.linksContainer)}
      >
        <AppearTitle isFooter>
          <h6 className={clsx(styles.title, 'h6 pb-6 text-white lg:pb-[1.5vw]')}>{t("services")}</h6>
          {staticServices.map((link) => (
            <div key={link.label} className={clsx("pt-2 lg:pt-[0.75vw] w-fit", styles.linkTextContainer)}
             onClick={(e) => handleNavClick(e, link.href)}
            >
              <LinkText
                className={clsx(
                  "group relative flex cursor-pointer items-center overflow-visible text-white",
                  "[&>svg]:h-[2vw] [&>svg]:w-[2vw] [&>svg]:fill-white [&>svg]:stroke-white [&>svg]:top-auto [&>svg]:overflow-visible [&>svg]:left-[-2vw]",
                  "lg:[&>svg]:h-[0.75vw] lg:[&>svg]:w-[0.75vw] lg:[&>svg]:left-0",
                  "[&>svg]:transition-transform [&>svg]:duration-[0.4s] [&>svg]:ease-[cubic-bezier(0.4,0,0.1,1)]",
                  "group-hover:[&>svg]:translate-x-[2vw] group-hover:[&>svg]:rotate-[-150deg]",
                  "lg:group-hover:[&>svg]:translate-x-[1vw]",
                  "[&>span]:transition-transform [&>span]:duration-[0.4s] [&>span]:ease-[cubic-bezier(0.4,0,0.1,1)]",
                  "group-hover:[&>span]:translate-x-[1.8vw] lg:group-hover:[&>span]:translate-x-[0.6vw]",
                  styles.linkText
                )}
                title={link.label}
                href={link.href}
              >
                <span className="footer text-white text-base lg:text-[1.1vw] transition-colors duration-300 group-hover:text-blue-400">{link.label}</span>
              </LinkText>
            </div>
          ))}
        </AppearTitle>
      </div>

      {/* CONTACT COLUMN — unchanged, already working correctly */}
      <div className={clsx("w-full pt-0 lg:pt-[6vw] lg:w-min", styles.emailContaineer)} style={{ gridColumn: '9 / 17' }}>
        <AppearTitle isFooter>
          <h4 className={clsx(styles.workWithMe, 'h4 text-white')}>{t("contact")}:</h4>
          <div className="flex flex-col gap-4 lg:gap-2">
            {finalContacts.map((contact, index) => {
              const Icon = contact.icon;
              return (
                <div
                  key={index}
                  className={clsx(
                    "relative cursor-pointer whitespace-nowrap text-white text-[8.5vw] leading-[6.5vw] lg:text-[2.5vw] lg:leading-[4.1vw]",
                    "before:absolute before:left-0 before:top-full before:h-px before:w-full before:content-['']",
                    styles.link
                  )}
                >
                  <Link
                    aria-label={contact.label}
                    scroll={false}
                    href={contact.href}
                    className="flex items-center gap-2 lg:gap-[0.8vw]"
                  >
                    {Icon && (
                      <Icon className="h-[4vw] w-[4vw] shrink-0 text-white lg:h-[2vw] lg:w-[2vw]" />
                    )}
                    <h4 className={clsx(styles.email, 'text-lg lg:text-[2.5vw] font-semibold lg:font-bold whitespace-nowrap text-white')}>{contact.label}</h4>
                  </Link>
                  <svg
                    className={clsx(
                      "pointer-events-none absolute bottom-0 left-0 fill-none stroke-white [stroke-width:0.03em] transition-transform duration-700 [transition-timing-function:cubic-bezier(0,0.25,0.5,1)] hover:translate-x-[-65.5%]",
                      styles.linkGraphic
                    )}
                    width="300%"
                    height="100%"
                    viewBox="0 0 1200 60"
                    preserveAspectRatio="none"
                  >
                    <path d="M0,56.5c0,0,298.666,0,399.333,0C448.336,56.5,513.994,46,597,46c77.327,0,135,10.5,200.999,10.5c95.996,0,402.001,0,402.001,0" />
                  </svg>
                </div>
              );
            })}
          </div>
        </AppearTitle>

          <div className="relative z-10 mt-6 flex flex-row items-center gap-6">
            <Link
              href="https://www.instagram.com/sanlyteklip/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit shrink-0 items-center justify-center transition-colors duration-300 hover:text-blue-400"
            >
              <FaInstagram size={28} className="text-white transition-colors duration-300 hover:text-blue-400" />
            </Link>

            <Link
              href="https://www.tiktok.com/@sanly.teklip8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-fit shrink-0 items-center justify-center transition-colors duration-300 hover:text-blue-400"
            >
              <FaTiktok size={25} className="text-white transition-colors duration-300 hover:text-blue-400" />
            </Link>
          </div>
      </div>

      <div className={clsx("pt-0 text-white", styles.middleContainer)} style={{ gridColumn: '1 / 9' }}>
        <AppearTitle isFooter>
          <div className="p-x flex items-center gap-2">
            <span>Based in Ashgabat, Turkmenistan</span>
          </div>
        </AppearTitle>
      </div>

      {/* COPYRIGHT */}
      <div className={clsx("pt-0 text-white", styles.middleContainer)} style={{ gridColumn: '13 / 17' }}>
        <AppearTitle isFooter>
          <div className="p-x flex flex-wrap items-center gap-x-2 justify-start text-left lg:justify-end lg:text-right">
            <span>© {currentYear} · Sanly Teklip</span>
            <span className="text-white/60">·</span>
            <span>All Rights Reserved</span>
          </div>
        </AppearTitle>
      </div>

      {/* BIG WORDMARK */}
      <div
        className={clsx(
          "mt-8 flex w-full justify-center whitespace-nowrap text-center text-[9.5vw] leading-[10vw] text-white lg:col-span-full lg:mt-0 lg:w-auto lg:translate-y-[2.1vw] lg:self-end lg:text-[15.2vw] lg:leading-[12.628vw]",
          styles.giats
        )}
        style={{ gridColumn: '1 / -1' }}
      >
        <span className="flex whitespace-nowrap">SANLY TEKLIP</span>
      </div>
    </section>
  );
}

export default Footer;