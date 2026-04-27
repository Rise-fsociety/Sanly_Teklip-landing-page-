"use client";

import { cn } from "@/lib/utils";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { useActiveSection } from "@/hooks/use-active-section";
import { XIcon, MenuIcon } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { navLinks } from "./header";
import { useTranslations } from "next-intl";
import { useState } from "react";

export function MobileNav() {
  const [open, setOpen] = useState<boolean>(false);
  const activeSection = useActiveSection(
    navLinks.map((link) => link.href.replace("/#", "")),
  );
  const t = useTranslations('Header');

  return (
    <div className="md:hidden">
      <Button
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label="Toggle menu"
        className="md:hidden"
        onClick={() => setOpen(!open)}
        size="icon"
        variant="outline"
      >
        {open ? (
          <XIcon className="size-4.5" />
        ) : (
          <MenuIcon className="size-4.5" />
        )}
      </Button>
      {open && (
        <Portal id="mobile-menu">
          <PortalBackdrop onClick={() => setOpen(false)} />
          <div
            className={cn(
              "data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
              "size-full p-4",
            )}
            data-slot={open ? "open" : "closed"}
          >
            <div className="flex justify-end mb-4">
              <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
                <XIcon className="size-6" />
              </Button>
            </div>

            <div className="grid gap-y-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.replace("/#", "");
                return (
                  <Button
                    asChild
                    className={cn(
                      "justify-start text-xl font-medium",
                      isActive ? "text-brand-blue" : "text-slate-600",
                    )}
                    key={link.key}
                    variant="ghost"
                    onClick={() => setOpen(false)}
                  >
                    <Link href={link.href}>{t(link.key)}</Link>
                  </Button>
                );
              })}
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}