import { cn } from "@/lib/utils";
import { FadeIn } from "@/components/motion/fade-in";

interface SectionHeadingProps {
  kicker: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeading({ kicker, title, description, className }: SectionHeadingProps) {
  return (
    <FadeIn className={cn("max-w-2xl", className)}>
      <p className="kicker text-sm text-accent-cyan">{kicker}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-muted-foreground leading-relaxed">{description}</p>
      ) : null}
    </FadeIn>
  );
}
