"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { navItems } from "@/components/nav/nav-items";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

export function MobileNav({ activeId }: { activeId: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Open menu">
            <Menu className="size-5" />
          </Button>
        }
      />
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle className="font-mono">{profile.name}</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={cn(
                "min-h-11 rounded-md px-3 py-2.5 text-base transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-cyan/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                activeId === item.href.slice(1)
                  ? "text-accent-cyan"
                  : "text-foreground/80"
              )}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
