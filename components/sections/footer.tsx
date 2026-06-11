"use client";

import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import { FaTiktok, FaInstagram } from 'react-icons/fa';
import { useTranslations, useLocale } from "next-intl";
import { useSmoothScroll } from "@/context/smooth-scroll-context";
import { useEffect, useState } from "react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

interface FooterLink {
  label: string;
  href: string;
  icon?: any;
}

export function Footer() {
  const t = useTranslations("Footer");
  const locale = useLocale();
  const currentYear = new Date().getFullYear();
  const { scrollTo } = useSmoothScroll();
  const pathname = usePathname();
  
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
              dynamicContacts.push({ label, href: `mailto:${label}`, icon: Mail });
            }
          }

          if (addressMatch) {
            const label = locale === "ru" ? addressMatch.nameRu : locale === "en" ? addressMatch.nameEn : addressMatch.nameTm;
            if (label) {
              dynamicContacts.push({ label, href: "#", icon: MapPin });
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
    { label: t("address"), href: "#", icon: MapPin },
  ];

  const finalContacts = contactsList.length > 0 ? contactsList : fallbackContacts;

  const footerNav = [
    {
      heading: t("nav"),
      links: [
        { label: t("about"), href: "/#about" },
        { label: t("services"), href: "/#services" },
        { label: t("tools"), href: "/#tools" },
        { label: t("products"), href: "/products" },
      ],
    },
    {
      heading: t("services"),
      links: staticServices,
    },
    {
      heading: t("contact"),
      links: finalContacts,
    },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHomePage = pathname === "/";
    const targetHash = href.includes("#") ? href.split("#")[1] : null;

    if (href.startsWith("/#") && isHomePage && targetHash) {
      e.preventDefault();
      scrollTo(`#${targetHash}`);
      window.history.pushState(null, "", `#${targetHash}`);
    }
  };

  return (
    <footer className="relative bg-slate-950 text-white overflow-hidden pb-24 md:pb-32">
      <div className="container mx-auto px-4 pt-16 md:pt-32 pb-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 lg:gap-12 mb-20">
          <motion.div
            className="lg:col-span-2"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0}
            variants={fadeUp}
          >
             <Image
              src="/TransparentLogo.webp"
              alt="Sanly Teklip"
              width={140}
              height={56}
              className="mb-8 brightness-0 invert"
            /> 
            {/* Scaled up description font layout: text-lg / md:text-xl / 2xl:text-2xl */}
            <p className="text-slate-300 leading-relaxed text-lg md:text-xl 2xl:text-2xl max-w-sm mb-10 font-light">
              {t("description")}
            </p>
            <div className="flex items-center gap-6">
              <Link href="https://www.instagram.com/sanlyteklip/" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={32} className="text-slate-300 hover:text-blue-400 transition-colors duration-300" />
              </Link>
              <Link href="https://www.tiktok.com/@sanly.teklip8" target="_blank" rel="noopener noreferrer">
                <FaTiktok size={32} className="text-slate-300 hover:text-blue-400 transition-colors duration-300"/>
              </Link>
            </div>
          </motion.div>

          {footerNav.map((col, colIdx) => (
            <motion.div
              key={`footer-col-${col.heading}-${locale}-${colIdx}`}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={colIdx + 1}
              variants={fadeUp}
            >
              {/* Scaled up section header text typography */}
              <h3 className="text-sm md:text-base font-black tracking-widest uppercase text-white mb-6">
                {col.heading}
              </h3>
              <ul key={`list-${col.heading}-${locale}`} className="space-y-3 md:space-y-4">
                {col.links.map((link:any, linkIdx) => {
                  const Icon = link.icon || null;
                  const itemKey = `link-${col.heading}-${linkIdx}-${locale}`;

                  return (
                    <li key={itemKey}>
                      {link.href && link.href !== "#" ? (
                        /* Scaled up interactive nav targets: text-lg / md:text-xl / 2xl:text-2xl */
                        <Link
                          href={link.href}
                          onClick={(e) => handleNavClick(e, link.href)}
                          className="text-lg md:text-xl 2xl:text-2xl text-slate-400 hover:text-blue-400 transition-colors duration-300 flex items-center gap-2 group font-light"
                        >
                          {Icon && <Icon className="w-5 h-5 text-slate-300 flex-shrink-0 group-hover:text-blue-400 transition-colors" />}
                          <span className="truncate max-w-[220px] sm:max-w-none">{link.label}</span>
                        </Link>
                      ) : (
                        /* Scaled up regular spans text size properties */
                        <span className="text-lg md:text-xl 2xl:text-2xl text-slate-400 flex items-center gap-2 font-light">
                          {Icon && <Icon className="w-5 h-5 text-slate-300 flex-shrink-0" />}
                          <span>{link.label}</span>
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-20 md:bottom-10 left-0 right-0 leading-none pointer-events-none translate-y-[35%] md:translate-y-[30%] select-none z-0">
        <h1 className="text-[13vw] font-black tracking-tighter text-center uppercase text-transparent bg-clip-text bg-gradient-to-b from-slate-800 via-slate-900 to-slate-950 opacity-999">
          Sanly Teklip
        </h1>
      </div>
    </footer>
  );
}