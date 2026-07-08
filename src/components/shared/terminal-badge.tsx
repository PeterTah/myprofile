import { cn } from "@/lib/utils";

export function TerminalBadge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "kicker inline-flex items-center rounded-md border border-border bg-muted/50 px-2.5 py-1 text-xs text-foreground/80",
        className
      )}
    >
      {children}
    </span>
  );
}
