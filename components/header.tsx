"use client";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";
import { useSmoothScroll } from "@/context/smooth-scroll-context";
import Link from "next/link";

export const navLinks = [
  {
    label: "Biz Hakda",
    href: "/#about",
  },
  {
    label: "Hyzmatlar",
    href: "/#services",
  },
  {
    label: "Tehnologiýalar",
    href: "/#tools",
  },
  {
    label: "Harytlar",
    href: "/products",
  },
];

export function Header() {
  const scrolled = useScroll(10);
  const { scrollTo } = useSmoothScroll();
  const activeSection = useActiveSection(
    navLinks.map((link) => link.href.replace("/#", "")),
  );

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: any,
  ) => {
    const isHomePage = window.location.pathname === "/";
    const targetHash = link.href.includes("#") ? link.href.split("#")[1] : null;

    if (link.href.startsWith("/#") && isHomePage && targetHash) {
      e.preventDefault();
      scrollTo(`#${targetHash}`);
      
      window.history.pushState(null, "", `/#${targetHash}`);
    } else if (link.href === "/products") {
    }
  };

  return (
    <header className="sticky md:top-2 z-50 container md:px-4 mx-auto transition-all duration-300">
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
          <a href="#" onClick={(e) => handleNavClick(e, "#")}>
            <Image
              src="/TransparentLogo.webp"
              alt="Logo"
              width={90}
              height={80}
              priority={true}
              className="mb-2"
            />
          </a>
          <div className="hidden items-center gap-2 md:flex">
            <div>
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("#", "");
                return (
                  <Button
                    asChild
                    key={link.label}
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
                      {link.label}
                    </Link>
                  </Button>
                );
              })}
            </div>
          </div>
          <MobileNav />
        </nav>
      </div>
    </header>
  );
}
