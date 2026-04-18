"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const IconInstagram = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);
const IconGithub = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58v-2.04c-3.34.72-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.5 1 .1-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.17 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 013.01-.4c1.02.005 2.05.138 3.01.4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.65.25 2.87.12 3.17.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.49 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 24 5.37 18.63 0 12 0z" />
  </svg>
);
const IconTwitter = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconLinkedin = () => (
  <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const footerNav = [
  {
    heading: "Nawigasiýa",
    links: [
      { label: "Biz Hakda", href: "#about" },
      { label: "Hyzmatlar", href: "#services" },
      { label: "Tehnologiýalar", href: "#tools" },
      { label: "Harytlar", href: "https://sanlyteklip.com.tm/ru/ag", featured: true },
    ],
  },
  {
    heading: "Hyzmatlar",
    links: [
      { label: "Web Ösüşi", href: "" },
      { label: "Android Goşundysy", href: "" },
      { label: "iOS Goşundysy", href: "" },
      { label: "UI/UX Dizaýn", href: "" },
      { label: "IT Konsultasiýa", href: "" },
    ],
  },
  {
    heading: "Habarlaşmak",
    links: [
      {
        label: "info@sanlyteklip.com",
        href: "mailto:info@sanlyteklip.com",
        icon: Mail,
      },
      { label: "+993 62 123456", href: "tel:+99362123456", icon: Phone },
      {
        label: "Aşgabat, Türkmenistan",
        href: "#",
        icon: MapPin,
      },
    ],
  },
];

const socials = [
  { Icon: IconInstagram, href: "#", label: "Instagram" },
  { Icon: IconGithub, href: "#", label: "GitHub" },
  { Icon: IconTwitter, href: "#", label: "Twitter" },
  { Icon: IconLinkedin, href: "#", label: "LinkedIn" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.08, duration: 0.6, ease: "easeOut" },
  }),
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-blue text-white overflow-hidden">
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
              Siziň biznesiňizi sanly dünýäde ösdürmek üçin döwrebap
              tehnologiki çözgütleri hödürleýäris. Ideýaňyzy biziň bilen
              hakykata öwüriň.
            </p>

            <div className="flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-10 h-10 rounded-xl bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-300 text-white"
                >
                  <Icon />
                </a>
              ))}
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
                        ("featured" in link && link.featured) ? (
                          <a
                            href={link.href}
                            target="_blank"
                            className="inline-flex items-center gap-2 mt-1 px-4 py-2 rounded-xl font-bold text-base md:text-lg
                              bg-white text-brand-blue shadow-lg
                              hover:bg-yellow-300 hover:text-slate-900
                              transition-all duration-300
                              animate-pulse hover:animate-none
                              ring-2 ring-white/40 hover:ring-yellow-300"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
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