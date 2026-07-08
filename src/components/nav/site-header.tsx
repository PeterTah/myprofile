"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { navItems } from "@/components/nav/nav-items";
import { useActiveSection } from "@/components/nav/use-active-section";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MobileNav } from "@/components/nav/mobile-nav";
import { profile } from "@/data/profile";

export function SiteHeader() {
  const pathname = usePathname();
  const activeId = useActiveSection(navItems.map((item) => item.href.slice(1)));

  if (pathname?.startsWith("/resume-print")) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 md:px-8">
        <a
          href="#"
          className="rounded-md font-mono text-sm font-medium tracking-tight focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          {profile.name}
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const isActive = activeId === item.href.slice(1);
            return (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-sm transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {item.label}
                {isActive ? (
                  <motion.span
                    layoutId="active-nav-indicator"
                    className="absolute inset-x-3 -bottom-px h-px bg-accent-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                ) : null}
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav activeId={activeId} />
        </div>
      </div>
    </header>
  );
}
