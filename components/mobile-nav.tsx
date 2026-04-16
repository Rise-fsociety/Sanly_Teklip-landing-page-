import { cn } from "@/lib/utils";
import React from "react";
import { Portal, PortalBackdrop } from "@/components/ui/portal";
import { Button } from "@/components/ui/button";
import { navLinks } from "@/components/header";
import { useActiveSection } from "@/hooks/use-active-section";
import { XIcon, MenuIcon } from "lucide-react";

export function MobileNav() {
	const [open, setOpen] = React.useState(false);
	const activeSection = useActiveSection(navLinks.map((link) => link.href.replace("#", "")));

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
				<Portal className="top-14" id="mobile-menu">
					<PortalBackdrop />
					<div
						className={cn(
							"data-[slot=open]:zoom-in-97 ease-out data-[slot=open]:animate-in",
							"size-full p-4"
						)}
						data-slot={open ? "open" : "closed"}
					>
						<div className="grid gap-y-4">
							{navLinks.map((link) => {
								const isActive = activeSection === link.href.replace("#", "");
								return (
									<Button
										asChild
										className={cn(
											"justify-start text-xl font-medium",
											isActive ? "text-brand-blue" : "text-slate-600"
										)}
										key={link.label}
										variant="ghost"
										onClick={() => setOpen(false)}
									>
										<a href={link.href}>{link.label}</a>
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
