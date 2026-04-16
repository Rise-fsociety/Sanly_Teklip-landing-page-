"use client";
import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { useActiveSection } from "@/hooks/use-active-section";
import { Button } from "@/components/ui/button";
import { MobileNav } from "@/components/mobile-nav";
import Image from "next/image";

export const navLinks = [
  {
    label: "Biz Hakda",
    href: "#features",
  },
  {
    label: "Hyzmatlar",
    href: "#services",
  },
  {
    label: "Nyrhlar",
    href: "#pricing",
  },
  {
    label: "Gatnaşyk",
    href: "#about",
  },
];

export function Header() {
  const scrolled = useScroll(10);
  const activeSection = useActiveSection(
    navLinks.map((link) => link.href.replace("#", "")),
  );

  return (
    <header className="sticky md:top-2 z-50 container md:px-4 mx-auto transition-all duration-300">
      <div
        className={cn(
          "mx-auto w-full border-transparent border-b md:rounded-md md:border md:transition-all md:ease-out",
          {
            "max-w-7xl border-brand-blue bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50 md:shadow":
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
          <a href="#">
            <Image
              src="/TransparentLogo.svg"
              alt="Logo"
              width={90}
              height={80}
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
                    <a href={link.href}>{link.label}</a>
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
