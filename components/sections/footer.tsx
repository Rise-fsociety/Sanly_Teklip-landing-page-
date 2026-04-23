"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { Mail, Phone, MapPin} from "lucide-react";
import { FaTiktok, FaInstagram } from 'react-icons/fa';

const IconInstagram = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-7 h-7"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

  

const footerNav = [
  {
    heading: "Nawigasiýa",
    links: [
      { label: "Biz Hakda", href: "/#about" },
      { label: "Hyzmatlar", href: "/#services" },
      { label: "Tehnologiýalar", href: "/#tools" },
      { label: "Harytlar", href: "/products" },
    ],
  },
  {
    heading: "Hyzmatlar",
    links: [
      { label: "Web", href: "" },
      { label: "Android", href: "" },
      { label: "iOS", href: "" },
      { label: "Akhasap Hyzmatlar", href: "" },
      { label: "IT Konsultasiýa", href: "" },
    ],
  },
  {
    heading: "Habarlaşmak",
    links: [
      {
        label: "sanlyteklip@sanlyteklip.com.tm",
        href: "mailto:sanlyteklip@sanlyteklip.com.tm",
        icon: Mail,
      },
      { label: "+99365688442", href: "tel:+99365688442", icon: Phone },
      {
        label: "Aşgabat, Türkmenistan",
        href: "#",
        icon: MapPin,
      },
    ],
  },
];


import { useSmoothScroll } from "@/context/smooth-scroll-context";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" as const },
  }),
};

export function Footer() {
  const currentYear = new Date().getFullYear();
  const { scrollTo } = useSmoothScroll();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isHomePage = window.location.pathname === "/";
    const targetHash = href.includes("#") ? href.split("#")[1] : null;

    if (href.startsWith("/#") && isHomePage && targetHash) {
      e.preventDefault();
      scrollTo(`#${targetHash}`);
      window.history.pushState(null, "", `/#${targetHash}`);
    }
  };

  return (
    <footer className="bg-[#0157A4] text-white overflow-hidden">
      <div className="container mx-auto px-4 md:pt-20 pb-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
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
              className="mb-6 brightness-0 invert"
            />
            <p className="text-white/90 leading-relaxed text-base md:text-lg max-w-xs mb-8">
              Siziň biznesiňizi sanly dünýäde ösdürmek üçin döwrebap tehnologiki
              çözgütleri hödürleýäris. Ideýaňyzy biziň bilen hakykata öwüriň.
            </p>
          <div className="flex items-center gap-4">
          <Link
              href="https://www.instagram.com/sanlyteklip/"
              target="_blank"
              rel="noopener noreferrer"
              >
              <FaInstagram size={32} className="text-white" />
            </Link>
            <Link
              href="https://www.tiktok.com/@sanly.teklip8"
              target="_blank"
              rel="noopener noreferrer"
              >
                <FaTiktok size={32} className="text-white"/>
            </Link>
          </div>
          </motion.div>

          {footerNav.map((col, colIdx) => (
            <motion.div
              key={col.heading}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={colIdx + 1}
              variants={fadeUp}
            >
              <h3 className="text-sm md:text-base font-bold tracking-widest uppercase text-white mb-5">
                {col.heading}
              </h3>
              <ul className="space-y-3">
                {col.links.map((link) => {
                  const Icon = "icon" in link ? link.icon : null;
                  return (
                    <li key={link.label}>
                      {link.href ? (
                        "featured" in link && link.featured ? (
                          <a
                            href={link.href}
                            target="_blank"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className="text-base md:text-lg text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-2 group"
                          >
                            {Icon && (
                              <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                            )}
                            <span>{link.label}</span>
                          </Link>
                        )
                      ) : (
                        <span className="text-base md:text-lg text-white/80 flex items-center gap-2">
                          {Icon && (
                            <Icon className="w-3.5 h-3.5 text-white flex-shrink-0" />
                          )}
                          {link.label}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
        <div className="my-6 md:my-12 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-base md:text-lg text-white/80">
          <p>© {currentYear} Sanly Teklip. Ähli hukuklar goraglydyr.</p>
        </div>
      </div>
    </footer>
  );
}
