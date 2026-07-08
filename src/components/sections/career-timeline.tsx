"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/section-heading";
import { FadeIn } from "@/components/motion/fade-in";
import { experience } from "@/data/experience";
import { cn } from "@/lib/utils";

export function CareerTimeline() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="career" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <SectionHeading
          kicker="// Career Journey"
          title="From frontline IT support to AI-era infrastructure leadership"
          description="Nineteen-plus years of enterprise engineering, cybersecurity-aware escalation, customer trust, and cross-functional leadership — building toward the next generation of intelligent infrastructure."
        />

        <ol className="mt-16 space-y-10">
          {experience.map((entry, index) => (
            <FadeIn key={entry.role + entry.period} delay={index * 0.05}>
              <li className="relative flex gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative flex size-3 shrink-0 items-center justify-center">
                    {entry.current ? (
                      <motion.span
                        className="absolute size-3 rounded-full bg-accent-cyan"
                        animate={{ scale: [1, 1.8, 1], opacity: [0.6, 0, 0.6] }}
                        transition={{
                          duration: shouldReduceMotion ? 0 : 2.4,
                          repeat: shouldReduceMotion ? 0 : Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    ) : null}
                    <span
                      className={cn(
                        "size-2.5 rounded-full",
                        entry.current ? "bg-accent-cyan" : "bg-border"
                      )}
                    />
                  </div>
                  {index < experience.length - 1 ? (
                    <div className="mt-1 w-px flex-1 bg-gradient-to-b from-border to-transparent" />
                  ) : null}
                </div>

                <div className={cn("pb-2", entry.current && "rounded-lg")}>
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight">{entry.role}</h3>
                    <span className="font-mono text-xs text-muted-foreground">
                      {entry.period}
                    </span>
                    {entry.current ? (
                      <span className="kicker rounded-full bg-accent-cyan/10 px-2 py-0.5 text-[0.65rem] text-accent-cyan">
                        Present
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-1 text-sm font-medium text-accent-violet">{entry.company}</p>
                  <p className="mt-2 max-w-2xl text-muted-foreground leading-relaxed">
                    {entry.description}
                  </p>
                </div>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
